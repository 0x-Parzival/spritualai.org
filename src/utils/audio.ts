/**
 * Play the first 6 seconds of the Om meditation audio file.
 */
let audioBuffer: AudioBuffer | null = null;

export const playOmSound = async () => {
    if (typeof window === 'undefined') return;

    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContext();

        // Load the audio file if not already loaded
        if (!audioBuffer) {
            const response = await fetch('/audio/om.mp3');
            const arrayBuffer = await response.arrayBuffer();
            audioBuffer = await ctx.decodeAudioData(arrayBuffer);
        }

        if (ctx.state === 'suspended') {
            await ctx.resume();
        }

        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;

        const masterGain = ctx.createGain();
        masterGain.connect(ctx.destination);

        // Fade in
        masterGain.gain.setValueAtTime(0, ctx.currentTime);
        masterGain.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.5);

        // Fade out starting at 5 seconds, ending at 6
        masterGain.gain.setValueAtTime(1, ctx.currentTime + 5);
        masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 6);

        source.connect(masterGain);
        
        // Start playing
        source.start(0);
        
        // Stop exactly at 6 seconds
        source.stop(ctx.currentTime + 6);

        // Auto-close context after playback
        setTimeout(() => {
            if (ctx.state !== 'closed') {
                ctx.close();
            }
        }, 6500);

    } catch (e) {
        console.warn("Audio playback failed:", e);
    }
};
