/* ============================================================
   RENKLİ PUZZLE DÜNYASI - AUDIO.JS
   Web Audio API ile bağımsız, harici dosya gerektirmeyen sesler
   ============================================================ */

class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.initAudio();
  }

  initAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    } catch (e) {
      console.warn("Web Audio API desteklenmiyor:", e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  // 1. Düğme Tıklama Sesi (Hafif ahşap dokunma sesi)
  playClick() {
    if (!this.enabled || !this.ctx) return;
    this.resume();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  // 2. Parça Kaldırma Sesi (Baloncuk 'bloop' sesi)
  playPick() {
    if (!this.enabled || !this.ctx) return;
    this.resume();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(580, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  // 3. Parçayı Yerine Oturtma / Snap Sesi (Çok tatmin edici 'çıt + zil' sesi)
  playSnap() {
    if (!this.enabled || !this.ctx) return;
    this.resume();

    const t = this.ctx.currentTime;
    
    // Tok vuruş
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(180, t);
    osc1.frequency.exponentialRampToValueAtTime(70, t + 0.1);
    gain1.gain.setValueAtTime(0.4, t);
    gain1.gain.linearRampToValueAtTime(0.01, t + 0.1);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(t);
    osc1.stop(t + 0.1);

    // Parlak zil armonisi
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, t);
    osc2.frequency.exponentialRampToValueAtTime(1320, t + 0.18);
    gain2.gain.setValueAtTime(0.3, t);
    gain2.gain.exponentialRampToValueAtTime(0.01, t + 0.22);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(t);
    osc2.stop(t + 0.22);
  }

  // 4. Zafer / Tebrikler Fanfarı (Eğlenceli melodik kutlama)
  playWin() {
    if (!this.enabled || !this.ctx) return;
    this.resume();

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6
    const startTime = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime + idx * 0.1);

      gain.gain.setValueAtTime(0, startTime + idx * 0.1);
      gain.gain.linearRampToValueAtTime(0.35, startTime + idx * 0.1 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + idx * 0.1 + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime + idx * 0.1);
      osc.stop(startTime + idx * 0.1 + 0.45);
    });
  }
}

window.soundFX = new SoundFX();
