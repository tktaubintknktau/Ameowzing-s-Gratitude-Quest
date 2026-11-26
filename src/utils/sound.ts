class SuperheroSoundEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  public setMuted(muted: boolean): void {
    this.muted = muted;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  private getContext(): AudioContext | null {
    if (this.muted || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private playTone(
    freq: number,
    startOffset: number,
    duration: number,
    type: OscillatorType = 'triangle',
    gainLevel = 0.14
  ): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime + startOffset;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(gainLevel, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.03);
  }

  public playSelect(): void {
    this.playTone(523.25, 0, 0.08, 'sine', 0.1);
    this.playTone(659.25, 0.03, 0.08, 'sine', 0.08);
  }

  public playHeroEntrance(): void {
    const notes = [392.0, 493.88, 587.33, 783.99];
    notes.forEach((n, idx) => {
      this.playTone(n, idx * 0.08, 0.24, 'triangle', 0.14);
    });
  }

  public playCorrect(): void {
    const chord = [523.25, 659.25, 783.99, 1046.5];
    chord.forEach((freq, i) => {
      this.playTone(freq, i * 0.065, 0.28, 'triangle', 0.15);
    });
  }

  public playIncorrect(): void {
    // Gentle, encouraging warm chime (never a harsh buzzer)
    this.playTone(440.0, 0, 0.18, 'sine', 0.11);
    this.playTone(392.0, 0.14, 0.22, 'sine', 0.11);
    this.playTone(493.88, 0.3, 0.28, 'sine', 0.1);
  }

  public playBadgeUnlock(): void {
    const arpeggio = [587.33, 739.99, 880.0, 1174.66, 1479.98];
    arpeggio.forEach((freq, i) => {
      this.playTone(freq, i * 0.07, 0.32, 'sine', 0.15);
    });
  }

  public playVictory(): void {
    const fanfare = [
      { f: 523.25, t: 0, d: 0.16 },
      { f: 659.25, t: 0.12, d: 0.16 },
      { f: 783.99, t: 0.24, d: 0.16 },
      { f: 1046.5, t: 0.38, d: 0.45 },
      { f: 783.99, t: 0.56, d: 0.18 },
      { f: 1046.5, t: 0.72, d: 0.55 },
    ];
    fanfare.forEach((note) => {
      this.playTone(note.f, note.t, note.d, 'triangle', 0.16);
    });
  }
}

export const soundEngine = new SuperheroSoundEngine();
