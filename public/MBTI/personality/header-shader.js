
const vertexShaderSrc = `#version 300 es
layout (location=0) in vec2 point;
void main() {
   gl_Position = vec4(point.x, point.y, 0.0, 1.0);
}
`;

const fragShaderSrc = `#version 300 es
precision highp float;

float N21(vec2 p) {
   p = fract(p * vec2(233.34, 851.73));
   p += dot(p, p + 23.45);
   return fract(p.x * p.y);
}

vec2 N22(vec2 p) {
   float n = N21(p);
   return vec2(n, N21(p + n));
}

vec2 getPos(vec2 id, vec2 offset, float iTime) {
   vec2 n = N22(id + offset);
   float x = cos(iTime * n.x);
   float y = sin(iTime * n.y);
   return vec2(x, y) * 0.4 + offset;
}

float distanceToLine(vec2 p, vec2 a, vec2 b) {
   vec2 pa = p - a;
   vec2 ba = b - a;
   float t = clamp(dot(pa, ba) / dot(ba, ba), 0., 1.);
   return length(pa - t * ba);
}

float getLine(vec2 p, vec2 a, vec2 b, vec2 iResolution) {
   float distance = distanceToLine(p, a, b);
   float dx = 15./iResolution.y;
   return smoothstep(dx, 0., distance) * smoothstep(1.2, 0.3, length(a - b));
}

float layer(vec2 st, float iTime, vec2 iResolution) {
   float m = 0.;
   vec2 gv = fract(st) - 0.5;
   vec2 id = floor(st);

   vec2 p[9];
   int i = 0;
   for (float x = -1.; x <= 1.; x++) {
       for (float y = -1.; y <= 1.; y++) {
           p[i++] = getPos(id, vec2(x, y), iTime);
       }
   }

   for (int j = 0; j <= 8; j++) {
       m += getLine(gv, p[4], p[j], iResolution);
       vec2 temp = (gv - p[j]) * 20.;
       m += 1./dot(temp, temp) * (sin(10. * iTime + fract(p[j].x) * 20.) * 0.5 + 0.5);
   }

   m += getLine(gv, p[1], p[3], iResolution);
   m += getLine(gv, p[1], p[5], iResolution);
   m += getLine(gv, p[3], p[7], iResolution);
   m += getLine(gv, p[5], p[7], iResolution);

   return m;
}
   
uniform float iTime;
uniform vec2 iResolution;
out vec4 fragColor;
void main()
{
   vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;

   float m = 0.;

   float theta = iTime * 0.1;
   mat2 rot = mat2(cos(theta), -sin(theta), sin(theta), cos(theta));
   vec2 gradient = uv;
   uv = rot * uv;

   for (float i = 0.; i < 1.0 ; i += 0.25) {
       float depth = fract(i + iTime * 0.1);
       m += layer(uv * mix(10., 0.5, depth) + i * 20., iTime, iResolution) * smoothstep(0., 0.2, depth) * smoothstep(1., 0.8, depth);
   }

   vec3 baseColor = sin(vec3(3.45, 6.56, 8.78) * iTime * 0.2) * 0.5 + 0.5;

   vec3 col = (m - gradient.y) * baseColor;
   fragColor = vec4(col, 1.0);
}
`;

class RenderLoop {
    constructor(cb, fps = 0) {
        this.currentFps = 0;
        this.isActive = false;
        this.msLastFrame = performance.now();
        this.cb = cb;
        this.totalTime = 0;

        if (fps && typeof fps === 'number' && !Number.isNaN(fps)) {
            this.msFpsLimit = 1000 / fps;
            this.run = () => {
                const currentTime = performance.now();
                const msDt = currentTime - this.msLastFrame;
                this.totalTime += msDt;
                const dt = msDt / 1000;

                if (msDt >= this.msFpsLimit) {
                    this.cb(dt, this.totalTime);
                    this.currentFps = Math.floor(1.0 / dt);
                    this.msLastFrame = currentTime;
                }

                if (this.isActive) window.requestAnimationFrame(this.run);
            };
        } else {
            this.run = () => {
                const currentTime = performance.now();
                const dt = (currentTime - this.msLastFrame) / 1000;
                this.totalTime += (currentTime - this.msLastFrame);
                this.cb(dt, this.totalTime);
                this.currentFps = Math.floor(1.0 / dt);
                this.msLastFrame = currentTime;
                if (this.isActive) window.requestAnimationFrame(this.run);
            };
        }
    }

    changeCb(cb) {
        this.cb = cb;
    }

    start() {
        this.msLastFrame = performance.now();
        this.isActive = true;
        window.requestAnimationFrame(this.run);
        return this;
    }

    stop() {
        this.isActive = false;
        return this;
    }
}

const initGl = (canvas) => {
    const gl = canvas.getContext('webgl2');
    if (!gl) {
        console.error('WebGL 2.0 not supported');
        return null;
    }
    gl.clearColor(0, 0, 0, 0.0); // Transparent background if possible, or matches body

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderSrc.trim());
    gl.shaderSource(fragmentShader, fragShaderSrc.trim());

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(vertexShader));
        return null;
    }

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(fragmentShader));
        return null;
    }

    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log(gl.getProgramInfoLog(program));
        return null;
    }

    gl.useProgram(program);

    return { gl, program };
}

const initHeartShader = () => {
    const canvas = document.getElementById('header-canvas');
    if (!canvas) return;

    // Handle resizing
    const resizeCanvas = () => {
        const parent = canvas.parentElement;
        if (parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial size

    const glResult = initGl(canvas);
    if (!glResult) return;

    const { gl, program } = glResult;

    gl.enable(gl.DEPTH_TEST);

    let vertexBuffer = gl.createBuffer();
    let indexBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([1, 0, 2, 3]), gl.STATIC_DRAW);

    const uResolution = gl.getUniformLocation(program, 'iResolution');
    const uTimeIndex = gl.getUniformLocation(program, 'iTime');

    new RenderLoop(function (dt, tInMs) {
        // Update resolution uniform on every frame in case of resize or just to be safe
        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.uniform1f(uTimeIndex, tInMs / 1000.0);

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLE_STRIP, 4, gl.UNSIGNED_SHORT, 0);
    }).start();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeartShader);
} else {
    initHeartShader();
}
