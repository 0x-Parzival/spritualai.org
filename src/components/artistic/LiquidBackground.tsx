"use client";

import React, { useEffect, useRef } from 'react';

const LiquidBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        if (!gl) return;

        const compile = (type: number, src: string) => {
            const s = gl.createShader(type);
            if (!s) return null;
            gl.shaderSource(s, src);
            gl.compileShader(s);
            if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(s));
                gl.deleteShader(s);
                return null;
            }
            return s;
        };

        const createProgram = (vs: WebGLShader, fs: WebGLShader) => {
            const p = gl.createProgram();
            if (!p) return null;
            gl.attachShader(p, vs);
            gl.attachShader(p, fs);
            gl.linkProgram(p);
            if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
                console.error(gl.getProgramInfoLog(p));
                return null;
            }
            return p;
        };

        const baseV = `#version 300 es
            precision highp float;
            in vec2 aPos;
            out vec2 vUv;
            void main(){ vUv = (aPos + 1.0) * 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }`;

        const dispF = `#version 300 es
            precision highp float;
            in vec2 vUv;
            out vec4 color;

            uniform float uTime;
            uniform vec2 uMouse;
            uniform vec2 uResolution;
            uniform vec3 uCursorColor;

            float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
            float noise(vec2 p){
                vec2 i = floor(p);
                vec2 f = fract(p);
                float a = hash(i);
                float b = hash(i + vec2(1.0, 0.0));
                float c = hash(i + vec2(0.0, 1.0));
                float d = hash(i + vec2(1.0, 1.0));
                vec2 u = f*f*(3.0-2.0*f);
                return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
            }
            float fbm(vec2 p){
                float v = 0.0;
                float a = 0.5;
                for(int i=0;i<5;i++){
                    v += a * noise(p);
                    p *= 2.0;
                    a *= 0.5;
                }
                return v;
            }

            vec3 palette(float t){
                if(t < 0.33){
                    float tt = t/0.33;
                    return mix(vec3(180./255.,94./255.,255./255.), vec3(0./255.,188./255.,255./255.), tt);
                } else if(t < 0.66){
                    float tt = (t-0.33)/0.33;
                    return mix(vec3(0./255.,188./255.,255./255.), vec3(0./255.,230./255.,140./255.), tt);
                }
                float tt = (t-0.66)/0.34;
                return mix(vec3(0./255.,230./255.,140./255.), vec3(250./255.,230./255.,80./255.), tt);
            }

            void main(){
                vec2 uv = vUv;
                vec2 p = (uv - 0.5) * vec2(uResolution.x/uResolution.y, 1.0) * 2.0;
                float t = uTime * 0.4; // Slightly slower
                float q = fbm(p * 0.6 + vec2(t*0.3, -t*0.2));
                float r = fbm(p * 1.2 - vec2(t*0.6, t*0.4));
                float f = fbm(p + q * 2.0 + r * 1.5);
                float ripple = sin((p.x*3.0 + t*1.2) + fbm(p*2.3 + t*0.9)*2.0) * 0.25;
                ripple += cos((p.y*2.2 - t*0.8) + fbm(p*1.6 - t*0.7)*1.2) * 0.18;
                float liquid = clamp((f*1.2 + ripple*0.6), -1.0, 1.0);
                float hx = smoothstep(0.0, 1.0, uv.x);
                vec3 baseCol = palette(hx);
                vec2 m = uMouse / uResolution;
                vec2 diff = uv - m;
                float dist = length(diff);
                float influence = exp(-dist * 6.0);
                vec3 cursorWash = uCursorColor * (0.95 * influence) * (0.6 + 0.6*liquid);
                
                // Brighter than original
                vec3 col = baseCol * (0.3 + 0.4 * (0.1 + liquid * 0.3));
                col = mix(col, vec3(0.01, 0.015, 0.025), 0.5); 
                col += cursorWash * 2.5;
                
                float vign = smoothstep(0.8, 0.2, length(uv - vec2(0.5)));
                col *= mix(1.0, 0.5, vign);
                color = vec4(col, 1.0);
            }`;

        const vs = compile(gl.VERTEX_SHADER, baseV);
        const fs = compile(gl.FRAGMENT_SHADER, dispF);
        if (!vs || !fs) return;
        const program = createProgram(vs, fs);
        if (!program) return;

        const posLoc = gl.getAttribLocation(program, 'aPos');
        const timeLoc = gl.getUniformLocation(program, 'uTime');
        const mouseLoc = gl.getUniformLocation(program, 'uMouse');
        const resLoc = gl.getUniformLocation(program, 'uResolution');
        const colorLoc = gl.getUniformLocation(program, 'uCursorColor');

        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

        let mouse = [0, 0];
        const handleMouseMove = (e: MouseEvent) => {
            mouse = [e.clientX, window.innerHeight - e.clientY];
        };
        window.addEventListener('mousemove', handleMouseMove);

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        window.addEventListener('resize', resize);
        resize();

        const render = (t: number) => {
            gl.useProgram(program);
            if (timeLoc) gl.uniform1f(timeLoc, t * 0.001);
            if (mouseLoc) gl.uniform2f(mouseLoc, mouse[0], mouse[1]);
            if (resLoc) gl.uniform2f(resLoc, canvas.width, canvas.height);
            if (colorLoc) gl.uniform3f(colorLoc, 0.0, 0.8, 1.0); // Bright Cyan
            gl.enableVertexAttribArray(posLoc);
            gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                pointerEvents: 'none',
                display: 'block'
            }}
        />
    );
};

export default LiquidBackground;
