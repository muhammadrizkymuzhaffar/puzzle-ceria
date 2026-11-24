let audioCtx: AudioContext | null = null;
let lastWrongSpeakAt = 0;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctx =
    window.AudioContext ||
    (window as unknown as {webkitAudioContext?: typeof AudioContext}).webkitAudioContext;
  if (!Ctx) return null;
  if (!audioCtx) {
    audioCtx = new Ctx();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playTone(
  ctx: AudioContext,
  freq: number,
  startTime: number,
  duration: number,
  type: OscillatorType = 'sine',
  peakGain = 0.18
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(peakGain, startTime + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.02);
}

export function playClickSound(enabled: boolean) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  playTone(ctx, 520, now, 0.07, 'triangle', 0.12);
}

export function playPickSound(enabled: boolean) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(340, now);
  osc.frequency.exponentialRampToValueAtTime(540, now + 0.08);
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(0.14, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.1);
}

export function playSnapSound(enabled: boolean) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  // Cheerful marimba two-note chime
  playTone(ctx, 523.25, now, 0.14, 'triangle', 0.22); // C5
  playTone(ctx, 783.99, now + 0.07, 0.22, 'sine', 0.22); // G5
}

export function playWrongSound(enabled: boolean) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  // Gentle soft wooden boop (never harsh)
  playTone(ctx, 310, now, 0.12, 'sine', 0.12);
  playTone(ctx, 250, now + 0.09, 0.16, 'sine', 0.1);
}

export function playHintSound(enabled: boolean) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  playTone(ctx, 587.33, now, 0.12, 'sine', 0.15);
  playTone(ctx, 739.99, now + 0.08, 0.12, 'sine', 0.15);
  playTone(ctx, 880.0, now + 0.16, 0.24, 'sine', 0.16);
}

export function playWinSound(enabled: boolean) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  // Happy celebratory fanfare melody
  const notes = [
    {f: 523.25, t: 0, d: 0.14}, // C5
    {f: 659.25, t: 0.11, d: 0.14}, // E5
    {f: 783.99, t: 0.22, d: 0.16}, // G5
    {f: 1046.5, t: 0.36, d: 0.45}, // C6
  ];
  for (const n of notes) {
    playTone(ctx, n.f, now + n.t, n.d, 'triangle', 0.2);
  }

  // Synthesized gentle applause (rhythmic filtered noise claps)
  const bufferSize = Math.floor(ctx.sampleRate * 0.08);
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
  }

  const clapTimes = [0.42, 0.54, 0.65, 0.78, 0.9, 1.04, 1.18, 1.32, 1.48];
  for (const offset of clapTimes) {
    const src = ctx.createBufferSource();
    src.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1100 + Math.random() * 700;
    filter.Q.value = 1.4;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.14, now + offset);
    gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.08);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start(now + offset);
  }
}

export function speakIndonesian(text: string, enabled: boolean, throttleWrong = false) {
  if (!enabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  if (throttleWrong) {
    const now = Date.now();
    if (now - lastWrongSpeakAt < 1800) return;
    lastWrongSpeakAt = now;
  }

  try {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.92;
    utterance.pitch = 1.15;

    const voices = synth.getVoices();
    const indoVoice = voices.find(
      (v) => v.lang.toLowerCase().startsWith('id')
    );
    if (indoVoice) {
      utterance.voice = indoVoice;
    }

    synth.speak(utterance);
  } catch {
    // Gracefully ignore if WebView speech synthesis is blocked
  }
}

export function triggerGentleVibration(ms = 35) {
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    try {
      navigator.vibrate(ms);
    } catch {
      // Ignore if unsupported
    }
  }
}
