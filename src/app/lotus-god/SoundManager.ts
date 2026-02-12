export class SoundManager {
    static ctx: AudioContext | null = null;
    static masterGain: GainNode | null = null;
    static reverbNode: ConvolverNode | null = null;
    static initialized = false;

    static init() {
        if (typeof window === 'undefined') return;
        if (this.initialized) return;

        try {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            this.ctx = new AudioContextClass();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = 0.3; // Master volume
            this.masterGain.connect(this.ctx.destination);

            this.reverbNode = this.ctx.createConvolver();
            this.generateReverbImpulse();

            // Wet path
            const reverbGain = this.ctx.createGain();
            reverbGain.gain.value = 0.5;
            this.reverbNode.connect(reverbGain);
            reverbGain.connect(this.masterGain);

            this.initialized = true;
        } catch (e) {
            console.error("Web Audio initialization failed", e);
        }
    }

    private static generateReverbImpulse() {
        if (!this.ctx || !this.reverbNode) return;

        const duration = 2.0;
        const decay = 2.0;
        const rate = this.ctx.sampleRate;
        const length = rate * duration;
        const impulse = this.ctx.createBuffer(2, length, rate);
        const left = impulse.getChannelData(0);
        const right = impulse.getChannelData(1);

        for (let i = 0; i < length; i++) {
            const n = i / length;
            // Pink noise decay
            const noise = (Math.random() * 2 - 1) * Math.pow(1 - n, decay);
            left[i] = noise;
            right[i] = noise;
        }

        this.reverbNode.buffer = impulse;
    }

    static playHarmonicPulse(intensity: number) {
        if (!this.initialized) this.init();
        if (this.ctx?.state === 'suspended') this.ctx.resume();
        if (!this.ctx || !this.masterGain) return;

        const t = this.ctx.currentTime;

        // Osc 1: Fundamental Sine (55Hz - 110Hz range based on intensity)
        const osc1 = this.ctx.createOscillator();
        const baseFreq = 55 + (intensity / 33) * 55;
        osc1.frequency.setValueAtTime(baseFreq, t);
        osc1.type = 'sine';

        // Osc 2: Harmonic Triangle (Fifth above)
        const osc2 = this.ctx.createOscillator();
        osc2.frequency.setValueAtTime(baseFreq * 1.5, t);
        osc2.type = 'triangle';

        // Gain Envelopes
        const gain1 = this.ctx.createGain();
        const gain2 = this.ctx.createGain();

        // Soft attack for "breath" feel, long release for resonance
        gain1.gain.setValueAtTime(0, t);
        gain1.gain.linearRampToValueAtTime(0.5, t + 0.1);
        gain1.gain.exponentialRampToValueAtTime(0.001, t + 3.0);

        gain2.gain.setValueAtTime(0, t);
        gain2.gain.linearRampToValueAtTime(0.15, t + 0.15);
        gain2.gain.exponentialRampToValueAtTime(0.001, t + 2.5);

        // Connections
        osc1.connect(gain1);
        gain1.connect(this.masterGain);
        if (this.reverbNode) gain1.connect(this.reverbNode);

        osc2.connect(gain2);
        gain2.connect(this.masterGain);
        if (this.reverbNode) gain2.connect(this.reverbNode);

        osc1.start(t);
        osc1.stop(t + 4.0);
        osc2.start(t);
        osc2.stop(t + 4.0);
    }

    static playDeepDrone() {
        if (!this.initialized) this.init();
        if (!this.ctx || !this.masterGain) return;

        const t = this.ctx.currentTime;

        // Deep drone chord (Root, Fifth, Octave)
        const freqs = [55, 82.4, 110];
        freqs.forEach((freq, i) => {
            const osc = this.ctx!.createOscillator();
            const gain = this.ctx!.createGain();

            osc.frequency.setValueAtTime(freq, t);
            osc.type = i === 0 ? 'sine' : 'triangle'; // Root sine, others triangle

            // Lowpass filter for warmth
            const filter = this.ctx!.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(200, t);
            filter.Q.value = 1;

            // Slow swell envelope
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(0.2, t + 2.0); // 2s attack
            gain.gain.exponentialRampToValueAtTime(0.001, t + 8.0); // Long release

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain!);
            if (this.reverbNode) gain.connect(this.reverbNode!);

            osc.start(t);
            osc.stop(t + 8.0);
        });
    }

    static playAmbientHum() {
        if (!this.initialized) this.init();
        if (!this.ctx || !this.masterGain) return;

        const t = this.ctx.currentTime;

        // Low sine wave for "Temple Hum"
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.frequency.value = 55; // A1
        osc.type = 'sine';

        // Tremolo LFO
        const lfo = this.ctx.createOscillator();
        lfo.frequency.value = 0.1; // Slow modulation
        const lfoGain = this.ctx.createGain();
        lfoGain.gain.value = 0.05; // Modulation depth

        lfo.connect(lfoGain);
        lfoGain.connect(gain.gain);

        gain.gain.value = 0.05; // Very subtle base volume

        osc.connect(gain);
        gain.connect(this.masterGain);
        if (this.reverbNode) gain.connect(this.reverbNode);

        osc.start(t);
        lfo.start(t);
        // Loop forever
    }

    static playRewardSound() {
        if (!this.initialized) this.init();
        if (this.ctx?.state === 'suspended') this.ctx.resume();
        if (!this.ctx || !this.masterGain) return;

        const t = this.ctx.currentTime;

        // Digital Chime: Two high-frequency sine waves with a harmonic relationship
        // to simulate a "ding" or "credit" sound.
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'sine';

        // Frequencies for a "premium digital chime" (E6 and B6)
        osc1.frequency.setValueAtTime(1318.51, t); // E6
        osc2.frequency.setValueAtTime(1975.53, t); // B6

        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.2, t + 0.01); // Quick attack
        gain.gain.exponentialRampToValueAtTime(0.001, t + 1.5); // Sweet decay

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.masterGain);
        if (this.reverbNode) gain.connect(this.reverbNode);

        osc1.start(t);
        osc2.start(t);
        osc1.stop(t + 1.5);
        osc2.stop(t + 1.5);
    }
}
