/* ============================================================
   RENKLİ PUZZLE DÜNYASI - AUDIO.JS
   Web Audio API ile bağımsız, harici dosya gerektirmeyen sesler
   ============================================================ */

class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = this.loadPreference();
    this.initAudio();
  }

  loadPreference() {
    try {
      const saved = localStorage.getItem("puzzle_sound_v1");
      if (saved === "0" || saved === "false") return false;
    } catch (e) {}
    return true;
  }

  savePreference() {
    try {
      localStorage.setItem("puzzle_sound_v1", this.enabled ? "1" : "0");
    } catch (e) {}
  }

  initAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext && !this.ctx) {
        this.ctx = new AudioContext();
      }
    } catch (e) {
      console.warn("Web Audio API desteklenmiyor:", e);
    }
  }

  resume() {
    if (!this.ctx) this.initAudio();
    if (this.ctx && this.ctx.state === "suspended") {
      try {
        const p = this.ctx.resume();
        if (p && typeof p.catch === "function") p.catch(() => {});
      } catch (e) {}
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    this.savePreference();
    if (this.enabled) this.resume();
    return this.enabled;
  }

  scheduleTone(type, startFreq, endFreq, duration, peakGain, startOffset = 0, expGain = false) {
    if (!this.enabled) return;
    this.resume();
    if (!this.ctx) return;

    try {
      const t0 = this.ctx.currentTime + startOffset;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(startFreq, t0);
      if (endFreq && endFreq !== startFreq) {
        osc.frequency.exponentialRampToValueAtTime(endFreq, t0 + duration);
      }

      if (startOffset > 0) {
        gain.gain.setValueAtTime(0.0001, t0);
        gain.gain.linearRampToValueAtTime(peakGain, t0 + Math.min(0.02, duration * 0.25));
      } else {
        gain.gain.setValueAtTime(peakGain, t0);
      }

      if (expGain) {
        gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
      } else {
        gain.gain.linearRampToValueAtTime(0.001, t0 + duration);
      }

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch (e) {}
      };

      osc.start(t0);
      osc.stop(t0 + duration + 0.01);
    } catch (e) {}
  }

  // 1. Düğme Tıklama Sesi (Hafif ahşap dokunma sesi)
  playClick() {
    this.scheduleTone("triangle", 440, 120, 0.08, 0.3, 0, false);
  }

  // 2. Parça Kaldırma Sesi (Baloncuk 'bloop' sesi)
  playPick() {
    this.scheduleTone("sine", 320, 580, 0.12, 0.35, 0, true);
  }

  // 3. Parçayı Yerine Oturtma / Snap Sesi (Çok tatmin edici 'çıt + zil' sesi)
  playSnap() {
    this.scheduleTone("triangle", 180, 70, 0.1, 0.4, 0, false);
    this.scheduleTone("sine", 880, 1320, 0.2, 0.3, 0, true);
  }

  // 4. Zafer / Tebrikler Fanfarı (Eğlenceli melodik kutlama)
  playWin() {
    if (!this.enabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6
    notes.forEach((freq, idx) => {
      this.scheduleTone("triangle", freq, freq, 0.45, 0.35, idx * 0.1, true);
    });
  }
}

window.soundFX = new SoundFX();
