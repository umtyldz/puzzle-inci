/* ============================================================
   RENKLİ PUZZLE DÜNYASI - PUZZLE.JS
   Tam teşekküllü Jigsaw puzzle motoru, dokunmatik/fare desteği,
   otomatik oturma (snap), konfeti ve kutlama animasyonları
   ============================================================ */

const PIECE_PRESETS = [
  { pieces: 4,   cols: 2,  rows: 2,  icon: "🐣", sub: "Çok Kolay", dense: 0 },
  { pieces: 6,   cols: 3,  rows: 2,  icon: "🐰", sub: "Kolay",     dense: 0 },
  { pieces: 9,   cols: 3,  rows: 3,  icon: "🐱", sub: "Orta",      dense: 0 },
  { pieces: 12,  cols: 4,  rows: 3,  icon: "🦊", sub: "Zevkli",    dense: 0 },
  { pieces: 16,  cols: 4,  rows: 4,  icon: "🦁", sub: "Zor",       dense: 0 },
  { pieces: 24,  cols: 6,  rows: 4,  icon: "🚀", sub: "Usta",      dense: 0 },
  { pieces: 50,  cols: 10, rows: 5,  icon: "🦄", sub: "Süper",     dense: 8 },
  { pieces: 100, cols: 10, rows: 10, icon: "🐉", sub: "Efsane",    dense: 6 },
  { pieces: 150, cols: 15, rows: 10, icon: "🦖", sub: "Dev",       dense: 5 },
  { pieces: 200, cols: 20, rows: 10, icon: "🦈", sub: "Zorlu",     dense: 4.5 },
  { pieces: 300, cols: 20, rows: 15, icon: "👑", sub: "Şampiyon",  dense: 4 },
  { pieces: 500, cols: 25, rows: 20, icon: "🏆", sub: "500 Usta!", dense: 3 },
];

class PuzzleGame {
  constructor() {
    // Oyun Durumu
    this.baseCols = 3;
    this.baseRows = 2;
    this.cols = 3;
    this.rows = 2;
    this.totalPieces = 6;
    this.currentImage = null;
    this.pieces = [];
    this.placedCount = 0;
    this.hintVisible = true;
    this.boardWidth = 0;
    this.boardHeight = 0;
    this.cellWidth = 0;
    this.cellHeight = 0;
    this.tabSize = 0;
    this.piecePad = 0;

    // DOM Elemanları
    this.gameApp = document.getElementById("game-app");
    this.board = document.getElementById("board");
    this.boardContainer = document.getElementById("board-container");
    this.boardStage = document.getElementById("board-stage");
    this.boardHintImg = document.getElementById("board-hint-img");
    this.boardGridSvg = document.getElementById("board-grid-svg");
    this.boardLockedLayer = document.getElementById("board-locked-pieces");
    this.boardFloatingLayer = document.getElementById("board-floating-pieces");
    this.trayPieces = document.getElementById("tray-pieces");
    this.trayCounter = document.getElementById("tray-counter");
    this.floatingLayer = document.getElementById("floating-pieces-layer");
    this.dragGroupContainer = document.getElementById("drag-group-container");
    this.btnBoardZoomReset = document.getElementById("btn-board-zoom-reset");

    // Modallar ve Butonlar
    this.currentPiecesBadge = document.getElementById("current-pieces-badge");
    this.modalSetup = document.getElementById("modal-setup");
    this.btnSetupResume = document.getElementById("btn-setup-resume");
    this.btnSetupClose = document.getElementById("btn-setup-close");
    this.hasStarted = false;
    this.celebrationOverlay = document.getElementById("celebration-overlay");
    this.completedImg = document.getElementById("completed-img");
    this.refPreviewBox = document.getElementById("ref-preview-box");
    this.refPreviewViewport = document.getElementById("ref-preview-viewport");
    this.refPreviewImg = document.getElementById("ref-preview-img");
    this.refZoom = 1;
    this.refPanX = 0;
    this.refPanY = 0;
    this.boardZoom = 1;
    this.boardPanX = 0;
    this.boardPanY = 0;
    this.pendingTrayTouch = null;
    this.isCompactMode = false;
    this.hadNativeFullscreen = false;
    this.recentImages = [];
    this.isHttpServer = location.protocol === "http:" || location.protocol === "https:";
    this.groups = new Map();
    this.piecesByCoord = new Map();

    // Sürükleme değişkenleri
    this.activeDrag = null;

    // Başlat
    this.initPiecesModal();
    this.initEvents();
    this.initBoardCamera();
    this.initRefPreview();
    this.initPresetsModal();
    this.loadRecentImages();
    this.initConfetti();
  }

  getCurrentImageAspect() {
    return this.currentImage && this.currentImage.naturalHeight
      ? this.currentImage.naturalWidth / this.currentImage.naturalHeight
      : 4 / 3;
  }

  computeGridForPieceCount(targetCount, imgAspect) {
    const count = Math.max(4, Math.min(500, Math.round(Number(targetCount) || 6)));
    const aspect = imgAspect || 4 / 3;

    // 1. Önce tam bölen çarpan çiftlerini tara (ör. 400 -> 25x16, 500 -> 25x20)
    let bestExact = null;
    let bestExactScore = Infinity;

    for (let r = 2; r <= Math.floor(count / 2); r++) {
      if (count % r !== 0) continue;
      const c = count / r;
      if (c < 2) continue;
      const cellAspect = (aspect * r) / c;
      if (cellAspect >= 0.45 && cellAspect <= 2.2) {
        const score = Math.abs(Math.log(cellAspect));
        if (score < bestExactScore) {
          bestExactScore = score;
          bestExact = { cols: c, rows: r, pieces: count };
        }
      }
    }

    if (bestExact) return bestExact;

    // 2. Asal veya aşırı oranlı sayılar için en yakın uyumlu ızgarayı bul
    const idealR = Math.max(2, Math.round(Math.sqrt(count / aspect)));
    const idealC = Math.max(2, Math.round(count / idealR));

    let bestApprox = { cols: 3, rows: 2, pieces: 6 };
    let bestScore = Infinity;

    for (let dr = -3; dr <= 3; dr++) {
      const r = idealR + dr;
      if (r < 2) continue;
      for (let dc = -3; dc <= 3; dc++) {
        const c = idealC + dc;
        if (c < 2) continue;
        const prod = c * r;
        if (prod < 4 || prod > 500) continue;
        const cellAspect = (aspect * r) / c;
        const score =
          (Math.abs(prod - count) / count) * 3 + Math.abs(Math.log(cellAspect));
        if (score < bestScore) {
          bestScore = score;
          bestApprox = { cols: c, rows: r, pieces: prod };
        }
      }
    }

    return bestApprox;
  }

  orientGridForImage(cols, rows) {
    const aspect = this.getCurrentImageAspect();
    if (aspect < 0.85 && cols > rows) {
      return { cols: rows, rows: cols };
    }
    if (aspect > 1.15 && rows > cols) {
      return { cols: rows, rows: cols };
    }
    return { cols, rows };
  }

  syncGridOrientation() {
    const oriented = this.orientGridForImage(this.baseCols, this.baseRows);
    this.cols = oriented.cols;
    this.rows = oriented.rows;
  }

  initPiecesModal() {
    const grid = document.getElementById("piece-options-grid");
    grid.innerHTML = "";

    PIECE_PRESETS.forEach((preset) => {
      const btn = document.createElement("button");
      btn.className = "piece-card" + (preset.pieces === this.totalPieces ? " active" : "");
      btn.setAttribute("data-pieces", preset.pieces);
      btn.setAttribute("data-cols", preset.cols);
      btn.setAttribute("data-rows", preset.rows);

      btn.innerHTML = `
        <div class="piece-card-icon">${preset.icon}</div>
        <div class="piece-card-title">${preset.pieces} Parça</div>
        <div class="piece-card-sub">${preset.sub}</div>
      `;

      btn.addEventListener("click", () => {
        window.soundFX.playClick();
        this.setPendingPieceSelection(preset.cols, preset.rows);
      });

      grid.appendChild(btn);
    });

    const slider = document.getElementById("custom-pieces-slider");
    const numInput = document.getElementById("custom-pieces-input");

    slider.addEventListener("input", () => {
      const g = this.computeGridForPieceCount(slider.value, this.getCurrentImageAspect());
      numInput.value = slider.value;
      this.setPendingPieceSelection(g.cols, g.rows, true);
    });

    numInput.addEventListener("input", () => {
      const parsed = parseInt(numInput.value, 10);
      if (!isNaN(parsed)) {
        const clamped = Math.max(4, Math.min(500, parsed));
        if (parsed > 500) numInput.value = 500;
        slider.value = clamped;
        const g = this.computeGridForPieceCount(clamped, this.getCurrentImageAspect());
        this.setPendingPieceSelection(g.cols, g.rows, true);
      }
    });

    const clampAndSyncInput = () => {
      const parsed = parseInt(numInput.value, 10);
      const clamped = Math.max(4, Math.min(500, isNaN(parsed) ? this.totalPieces : parsed));
      const g = this.computeGridForPieceCount(clamped, this.getCurrentImageAspect());
      numInput.value = g.pieces;
      slider.value = g.pieces;
      this.setPendingPieceSelection(g.cols, g.rows, true);
      return g;
    };

    numInput.addEventListener("change", clampAndSyncInput);

    numInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        clampAndSyncInput();
      }
    });
  }

  syncPiecesModalUI(skipInputOverwrite = false) {
    document.querySelectorAll(".piece-card").forEach((card) => {
      const pieces = parseInt(card.getAttribute("data-pieces"), 10);
      card.classList.toggle("active", pieces === this.totalPieces);
    });

    const slider = document.getElementById("custom-pieces-slider");
    const numInput = document.getElementById("custom-pieces-input");
    const preview = document.getElementById("custom-pieces-preview");
    if (slider && numInput && preview) {
      if (!skipInputOverwrite) {
        slider.value = this.totalPieces;
        numInput.value = this.totalPieces;
      }
      preview.textContent = `${this.cols} × ${this.rows} = ${this.totalPieces} Parça`;
    }
  }

  setPendingPieceSelection(cols, rows, skipInputOverwrite = false) {
    this.baseCols = cols;
    this.baseRows = rows;
    this.syncGridOrientation();
    this.totalPieces = this.cols * this.rows;
    this.currentPiecesBadge.textContent = this.totalPieces;
    this.syncPiecesModalUI(skipInputOverwrite);
  }

  applyPieceSelection(cols, rows) {
    this.setPendingPieceSelection(cols, rows);
    this.startPuzzle();
  }

  openSetupModal() {
    this.syncPiecesModalUI();
    this.loadRecentImages();
    this.btnSetupResume.classList.toggle("hidden", !this.hasStarted);
    this.btnSetupClose.classList.toggle("hidden", !this.hasStarted);
    this.modalSetup.classList.remove("hidden");
    const card = this.modalSetup.querySelector(".modal-card");
    if (card) card.scrollTop = 0;
  }

  // ============================================================
  // OLAYLARI VE DİNLEYİCİLERİ BAŞLAT
  // ============================================================
  initEvents() {
    // Pencere yeniden boyutlandırma
    window.addEventListener("resize", () => {
      if (this.currentImage) {
        this.recalculateBoardSize();
      }
    });

    // Dosya Yükleme (Kamera veya Galeri)
    const fileInput = document.getElementById("file-input");
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.loadImage(event.target.result);
          this.saveUploadedFile(file, event.target.result);
        };
        reader.readAsDataURL(file);
      }
      fileInput.value = ""; // Sıfırla
    });

    // Sürükle Bırak (Tüm ekrana resim bırakabilme)
    window.addEventListener("dragover", (e) => e.preventDefault());
    window.addEventListener("drop", (e) => {
      e.preventDefault();
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (event) => {
            this.loadImage(event.target.result);
            this.saveUploadedFile(file, event.target.result);
          };
          reader.readAsDataURL(file);
        }
      }
    });

    // Giriş / Kurulum Modal Butonları
    document.getElementById("btn-open-setup").addEventListener("click", () => {
      window.soundFX.playClick();
      this.openSetupModal();
    });

    document.getElementById("btn-pieces-modal").addEventListener("click", () => {
      window.soundFX.playClick();
      this.openSetupModal();
    });

    this.btnSetupResume.addEventListener("click", () => {
      if (!this.hasStarted || !this.currentImage) return;
      window.soundFX.playClick();
      this.modalSetup.classList.add("hidden");
      this.syncGridOrientation();
      this.totalPieces = this.cols * this.rows;
      this.currentPiecesBadge.textContent = this.totalPieces;
      this.startPuzzle();
    });

    // Modal Kapatma Düğmeleri (yalnızca bir oyun başladıysa kapatılabilir)
    document.querySelectorAll(".modal-close").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (!this.hasStarted) return;
        window.soundFX.playClick();
        const modalId = e.currentTarget.getAttribute("data-close");
        document.getElementById(modalId).classList.add("hidden");
      });
    });

    // Modalların Dışına Tıklayınca Kapat (yalnızca bir oyun başladıysa)
    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop && this.hasStarted) {
          backdrop.classList.add("hidden");
        }
      });
    });

    // Linkten Resim Yükleme Butonu & Enter Desteği
    const urlInputField = document.getElementById("url-input-field");
    const submitUrl = () => {
      const url = urlInputField.value.trim();
      if (url) {
        window.soundFX.playClick();
        urlInputField.value = "";
        this.saveImageUrl(url);
      }
    };
    document.getElementById("btn-load-url").addEventListener("click", submitUrl);
    urlInputField.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submitUrl();
      }
    });

    // İpucu / Göz Butonu
    document.getElementById("btn-hint").addEventListener("click", () => {
      window.soundFX.playClick();
      this.hintVisible = !this.hintVisible;
      const icon = document.getElementById("hint-icon");
      if (this.hintVisible) {
        this.boardHintImg.classList.remove("hidden-hint");
        this.refPreviewBox.classList.add("hidden");
        icon.textContent = "👁️";
      } else {
        this.boardHintImg.classList.add("hidden-hint");
        this.refPreviewBox.classList.remove("hidden");
        this.resetRefPreview();
        icon.textContent = "🙈";
      }
    });

    // Ses Aç / Kapa Butonu
    document.getElementById("btn-sound").addEventListener("click", () => {
      const isSoundOn = window.soundFX.toggle();
      const soundIcon = document.getElementById("sound-icon");
      soundIcon.textContent = isSoundOn ? "🔊" : "🔇";
      if (isSoundOn) window.soundFX.playClick();
    });

    // Yeniden Başlat Butonu
    document.getElementById("btn-restart").addEventListener("click", () => {
      window.soundFX.playClick();
      this.startPuzzle();
    });

    // Tam Ekran / Kompakt Mod Butonu
    const fullscreenBtn = document.getElementById("btn-fullscreen");
    const fullscreenIcon = document.getElementById("fullscreen-icon");
    const syncCompactIcon = () => {
      this.gameApp.classList.toggle("compact-mode", this.isCompactMode);
      if (fullscreenIcon) {
        fullscreenIcon.textContent = this.isCompactMode ? "⤡" : "⛶";
      }
      requestAnimationFrame(() => this.updateBoardCamera());
    };

    fullscreenBtn.addEventListener("click", () => {
      window.soundFX.playClick();
      this.isCompactMode = !this.isCompactMode;
      syncCompactIcon();

      if (this.isCompactMode) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement
            .requestFullscreen()
            .then(() => {
              this.hadNativeFullscreen = true;
            })
            .catch(() => {});
        }
      } else if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    });

    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement && this.hadNativeFullscreen) {
        this.hadNativeFullscreen = false;
        if (this.isCompactMode) {
          this.isCompactMode = false;
          syncCompactIcon();
        }
      }
    });

    // Kutlama Ekranı Butonları
    document.getElementById("btn-play-again").addEventListener("click", () => {
      window.soundFX.playClick();
      this.confettiActive = false;
      this.celebrationOverlay.classList.add("hidden");
      this.startPuzzle();
    });

    document.getElementById("btn-next-level").addEventListener("click", () => {
      window.soundFX.playClick();
      this.confettiActive = false;
      this.celebrationOverlay.classList.add("hidden");
      const next = PIECE_PRESETS.find((p) => p.pieces > this.totalPieces) || PIECE_PRESETS[0];
      this.applyPieceSelection(next.cols, next.rows);
    });

    document.getElementById("btn-choose-new").addEventListener("click", () => {
      window.soundFX.playClick();
      this.confettiActive = false;
      this.celebrationOverlay.classList.add("hidden");
      this.openSetupModal();
    });
  }

  // ============================================================
  // SOL TAHTA YAKINLAŞTIRMA VE GEZİNME (BOARD CAMERA ZOOM & PAN)
  // ============================================================
  initBoardCamera() {
    const bc = this.boardContainer;
    const controls = document.getElementById("board-camera-controls");
    if (!bc || !this.boardStage) return;

    if (controls) {
      controls.addEventListener("pointerdown", (e) => e.stopPropagation());
    }

    document.getElementById("btn-board-zoom-in").addEventListener("click", (e) => {
      e.stopPropagation();
      window.soundFX.playClick();
      this.setBoardZoom(this.boardZoom + 0.5);
    });

    document.getElementById("btn-board-zoom-out").addEventListener("click", (e) => {
      e.stopPropagation();
      window.soundFX.playClick();
      this.setBoardZoom(this.boardZoom - 0.5);
    });

    this.btnBoardZoomReset.addEventListener("click", (e) => {
      e.stopPropagation();
      window.soundFX.playClick();
      this.resetBoardCamera();
    });

    // Fare tekerleği ile imlecin olduğu noktaya yakınlaştır
    bc.addEventListener(
      "wheel",
      (e) => {
        if (e.target.closest("#ref-preview-box")) return;
        e.preventDefault();
        const delta = e.deltaY < 0 ? 0.25 : -0.25;
        this.setBoardZoom(this.boardZoom + delta, e.clientX, e.clientY);
      },
      { passive: false }
    );

    const pointers = new Map();
    let panState = null;
    let pinchState = null;

    const getTwoFingerMetrics = () => {
      const pts = Array.from(pointers.values());
      if (pts.length < 2) return null;
      return {
        dist: Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y),
        midX: (pts[0].x + pts[1].x) / 2,
        midY: (pts[0].y + pts[1].y) / 2,
      };
    };

    bc.addEventListener("pointerdown", (e) => {
      if (
        e.target.closest("#ref-preview-box") ||
        e.target.closest("#board-camera-controls") ||
        e.target.closest(".puzzle-piece:not(.locked)")
      ) {
        return;
      }
      if (this.activeDrag) return;

      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.size === 1 && this.boardZoom > 1) {
        try {
          bc.setPointerCapture(e.pointerId);
        } catch (err) {}
        panState = {
          startX: e.clientX,
          startY: e.clientY,
          panX: this.boardPanX,
          panY: this.boardPanY,
        };
        pinchState = null;
        bc.classList.add("is-panning");
      } else if (pointers.size === 2) {
        panState = null;
        bc.classList.remove("is-panning");
        const metrics = getTwoFingerMetrics();
        if (metrics) {
          pinchState = {
            dist: metrics.dist,
            zoom: this.boardZoom,
            lastMidX: metrics.midX,
            lastMidY: metrics.midY,
          };
        }
      }
    });

    bc.addEventListener("pointermove", (e) => {
      if (!pointers.has(e.pointerId) || this.activeDrag) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.size === 2 && pinchState && pinchState.dist > 0) {
        e.preventDefault();
        const metrics = getTwoFingerMetrics();
        if (metrics) {
          this.boardPanX += metrics.midX - pinchState.lastMidX;
          this.boardPanY += metrics.midY - pinchState.lastMidY;
          pinchState.lastMidX = metrics.midX;
          pinchState.lastMidY = metrics.midY;
          this.setBoardZoom(
            pinchState.zoom * (metrics.dist / pinchState.dist),
            metrics.midX,
            metrics.midY
          );
        }
      } else if (pointers.size === 1 && panState && this.boardZoom > 1) {
        e.preventDefault();
        this.boardPanX = panState.panX + (e.clientX - panState.startX);
        this.boardPanY = panState.panY + (e.clientY - panState.startY);
        this.updateBoardCamera();
      }
    });

    const endBoardPointer = (e) => {
      if (!pointers.has(e.pointerId)) return;
      pointers.delete(e.pointerId);
      try {
        bc.releasePointerCapture(e.pointerId);
      } catch (err) {}

      if (pointers.size === 1 && this.boardZoom > 1) {
        const [rem] = pointers.values();
        panState = { startX: rem.x, startY: rem.y, panX: this.boardPanX, panY: this.boardPanY };
        pinchState = null;
      } else {
        panState = null;
        pinchState = null;
        bc.classList.remove("is-panning");
      }
    };

    bc.addEventListener("pointerup", endBoardPointer);
    bc.addEventListener("pointercancel", endBoardPointer);
  }

  setBoardZoom(nextZoom, pivotClientX, pivotClientY) {
    const oldZoom = this.boardZoom;
    const clampedZoom = Math.max(1, Math.min(4, Math.round((Number(nextZoom) || 1) * 100) / 100));
    if (clampedZoom === oldZoom) return;

    if (clampedZoom === 1) {
      this.boardZoom = 1;
      this.boardPanX = 0;
      this.boardPanY = 0;
      this.updateBoardCamera();
      return;
    }

    if (typeof pivotClientX === "number" && typeof pivotClientY === "number") {
      const rect = this.boardContainer.getBoundingClientRect();
      const px = pivotClientX - (rect.left + rect.width / 2);
      const py = pivotClientY - (rect.top + rect.height / 2);
      const ratio = clampedZoom / oldZoom;
      this.boardPanX = px - (px - this.boardPanX) * ratio;
      this.boardPanY = py - (py - this.boardPanY) * ratio;
    } else {
      const ratio = clampedZoom / oldZoom;
      this.boardPanX *= ratio;
      this.boardPanY *= ratio;
    }

    this.boardZoom = clampedZoom;
    this.updateBoardCamera();
  }

  resetBoardCamera() {
    this.boardZoom = 1;
    this.boardPanX = 0;
    this.boardPanY = 0;
    this.updateBoardCamera();
  }

  updateBoardCamera() {
    if (!this.boardStage || !this.boardContainer) return;
    const cw = this.boardContainer.clientWidth;
    const ch = this.boardContainer.clientHeight;
    const z = this.boardZoom;
    const maxX = Math.max(0, (cw * (z - 1)) / 2 + 80 * (z - 1));
    const maxY = Math.max(0, (ch * (z - 1)) / 2 + 80 * (z - 1));

    this.boardPanX = Math.max(-maxX, Math.min(maxX, this.boardPanX));
    this.boardPanY = Math.max(-maxY, Math.min(maxY, this.boardPanY));

    this.boardStage.style.transform = `translate(${this.boardPanX}px, ${this.boardPanY}px) scale(${z})`;
    this.boardContainer.classList.toggle("is-zoomed", z > 1);

    if (this.btnBoardZoomReset) {
      const label = Number.isInteger(z) ? `${z}x` : `${z.toFixed(1).replace(/\.0$/, "")}x`;
      this.btnBoardZoomReset.textContent = label;
    }
  }

  // ============================================================
  // KÖŞE TAM RESİM ÖNİZLEME (YAKINLAŞTIRMA & KAYDIRMA)
  // ============================================================
  initRefPreview() {
    const vp = this.refPreviewViewport;
    if (!vp) return;

    const pointers = new Map();
    let panStart = null;
    let pinchStart = null;

    this.refPreviewBox.addEventListener("pointerdown", (e) => {
      e.stopPropagation();
    });

    document.getElementById("btn-ref-zoom-in").addEventListener("click", (e) => {
      e.stopPropagation();
      window.soundFX.playClick();
      this.setRefZoom(this.refZoom + 0.5);
    });

    document.getElementById("btn-ref-zoom-out").addEventListener("click", (e) => {
      e.stopPropagation();
      window.soundFX.playClick();
      this.setRefZoom(this.refZoom - 0.5);
    });

    document.getElementById("btn-ref-reset").addEventListener("click", (e) => {
      e.stopPropagation();
      window.soundFX.playClick();
      this.resetRefPreview();
    });

    document.getElementById("btn-ref-size").addEventListener("click", (e) => {
      e.stopPropagation();
      window.soundFX.playClick();
      this.refPreviewBox.classList.toggle("expanded");
      setTimeout(() => this.updateRefPreviewTransform(), 210);
    });

    vp.addEventListener("wheel", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const delta = e.deltaY < 0 ? 0.3 : -0.3;
      this.setRefZoom(this.refZoom + delta);
    }, { passive: false });

    vp.addEventListener("dblclick", (e) => {
      e.stopPropagation();
      if (this.refZoom > 1.2) {
        this.resetRefPreview();
      } else {
        this.setRefZoom(2.5);
      }
    });

    const getPinchDist = () => {
      const pts = Array.from(pointers.values());
      if (pts.length < 2) return 0;
      return Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
    };

    vp.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      vp.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.size === 1) {
        panStart = { x: e.clientX, y: e.clientY, panX: this.refPanX, panY: this.refPanY };
        pinchStart = null;
        if (this.refZoom > 1) vp.classList.add("panning");
      } else if (pointers.size === 2) {
        panStart = null;
        vp.classList.remove("panning");
        pinchStart = { dist: getPinchDist(), zoom: this.refZoom };
      }
    });

    vp.addEventListener("pointermove", (e) => {
      if (!pointers.has(e.pointerId)) return;
      e.preventDefault();
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.size === 2 && pinchStart && pinchStart.dist > 0) {
        const curDist = getPinchDist();
        this.setRefZoom(pinchStart.zoom * (curDist / pinchStart.dist));
      } else if (pointers.size === 1 && panStart && this.refZoom > 1) {
        this.refPanX = panStart.panX + (e.clientX - panStart.x);
        this.refPanY = panStart.panY + (e.clientY - panStart.y);
        this.updateRefPreviewTransform();
      }
    });

    const endPointer = (e) => {
      if (!pointers.has(e.pointerId)) return;
      pointers.delete(e.pointerId);
      try {
        vp.releasePointerCapture(e.pointerId);
      } catch (err) {}

      if (pointers.size === 1) {
        const [remaining] = pointers.values();
        panStart = { x: remaining.x, y: remaining.y, panX: this.refPanX, panY: this.refPanY };
        pinchStart = null;
      } else {
        panStart = null;
        pinchStart = null;
        vp.classList.remove("panning");
      }
    };

    vp.addEventListener("pointerup", endPointer);
    vp.addEventListener("pointercancel", endPointer);
  }

  setRefZoom(nextZoom) {
    this.refZoom = Math.max(1, Math.min(5, Number(nextZoom) || 1));
    if (this.refZoom === 1) {
      this.refPanX = 0;
      this.refPanY = 0;
    }
    this.updateRefPreviewTransform();
  }

  resetRefPreview() {
    this.refZoom = 1;
    this.refPanX = 0;
    this.refPanY = 0;
    this.updateRefPreviewTransform();
  }

  updateRefPreviewTransform() {
    if (!this.refPreviewViewport || !this.refPreviewImg) return;
    const vw = this.refPreviewViewport.clientWidth;
    const vh = this.refPreviewViewport.clientHeight;
    const maxX = Math.max(0, (vw * (this.refZoom - 1)) / 2);
    const maxY = Math.max(0, (vh * (this.refZoom - 1)) / 2);

    this.refPanX = Math.max(-maxX, Math.min(maxX, this.refPanX));
    this.refPanY = Math.max(-maxY, Math.min(maxY, this.refPanY));

    this.refPreviewImg.style.transform = `translate(${this.refPanX}px, ${this.refPanY}px) scale(${this.refZoom})`;
  }

  // ============================================================
  // SON GÖRSELLER (KLASÖRE KAYDETME & YENİDEN YÜKLEME)
  // ============================================================
  async loadRecentImages() {
    if (this.isHttpServer) {
      try {
        const res = await fetch("/api/recent-images");
        if (res.ok) {
          const data = await res.json();
          this.recentImages = Array.isArray(data) ? data : [];
          this.renderRecentImages();
          return;
        }
      } catch (e) {
        console.warn("Sunucudan son görseller alınamadı:", e);
      }
    }

    try {
      const raw = localStorage.getItem("puzzle_recent_images_v1");
      const parsed = raw ? JSON.parse(raw) : [];
      this.recentImages = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      this.recentImages = [];
    }
    this.renderRecentImages();
  }

  saveToLocalStorage(item) {
    try {
      const raw = localStorage.getItem("puzzle_recent_images_v1");
      let list = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(list)) list = [];
      list = list.filter((x) => x.url !== item.url && x.name !== item.name);
      list.unshift({ ...item, localOnly: true });
      list = list.slice(0, 8);
      while (list.length > 0) {
        try {
          localStorage.setItem("puzzle_recent_images_v1", JSON.stringify(list));
          break;
        } catch (quotaErr) {
          list.pop();
        }
      }
      this.recentImages = list;
      this.renderRecentImages();
    } catch (e) {}
  }

  renderRecentImages() {
    const section = document.getElementById("recent-images-section");
    const grid = document.getElementById("recent-grid");
    if (!section || !grid) return;

    grid.innerHTML = "";
    if (!this.recentImages || this.recentImages.length === 0) {
      section.classList.add("hidden");
      return;
    }

    section.classList.remove("hidden");
    this.recentImages.forEach((item) => {
      const card = document.createElement("div");
      card.className = "preset-card";

      const img = document.createElement("img");
      img.src = item.url;
      img.alt = item.name || "Son Görsel";

      const title = document.createElement("div");
      title.className = "preset-card-title";
      title.textContent = item.name || "Kaydedilen Resim";

      const delBtn = document.createElement("button");
      delBtn.className = "preset-delete-btn";
      delBtn.title = "Görseli Sil";
      delBtn.textContent = "✖";
      delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.deleteRecentImage(item);
      });

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(delBtn);

      card.addEventListener("click", () => {
        window.soundFX.playClick();
        this.loadImage(item.url);
        this.modalSetup.classList.add("hidden");
      });

      grid.appendChild(card);
    });
  }

  async saveUploadedFile(file, dataUrl) {
    if (this.isHttpServer) {
      try {
        const res = await fetch(`/api/save-image?name=${encodeURIComponent(file.name || "resim.png")}`, {
          method: "POST",
          headers: { "Content-Type": file.type || "image/png" },
          body: file,
        });
        if (res.ok) {
          await this.loadRecentImages();
          return;
        }
      } catch (e) {
        console.warn("Görsel klasöre kaydedilemedi:", e);
      }
    }

    const cleanName = (file.name || "Yüklenen Resim").replace(/\.[^.]+$/, "");
    this.saveToLocalStorage({ filename: file.name, name: cleanName, url: dataUrl });
  }

  async saveImageUrl(url) {
    if (this.isHttpServer) {
      try {
        const res = await fetch("/api/save-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.ok && data.url) {
            this.loadImage(data.url);
            await this.loadRecentImages();
            return;
          }
        }
      } catch (e) {
        console.warn("Link resmi klasöre indirilemedi, doğrudan deneniyor:", e);
      }
    }

    this.loadImage(url);
    this.saveToLocalStorage({ filename: url, name: "Link Resmi", url });
  }

  async deleteRecentImage(item) {
    window.soundFX.playClick();
    if (this.isHttpServer && item.filename && !item.localOnly) {
      try {
        await fetch("/api/delete-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: item.filename }),
        });
        await this.loadRecentImages();
        return;
      } catch (e) {
        console.warn("Görsel silinemedi:", e);
      }
    }

    try {
      const raw = localStorage.getItem("puzzle_recent_images_v1");
      const list = raw ? JSON.parse(raw) : [];
      const next = Array.isArray(list) ? list.filter((x) => x.url !== item.url) : [];
      localStorage.setItem("puzzle_recent_images_v1", JSON.stringify(next));
      this.recentImages = next;
      this.renderRecentImages();
    } catch (e) {}
  }

  // ============================================================
  // HAZIR RESİMLER GALERİSİNİ DOLDUR
  // ============================================================
  initPresetsModal() {
    const grid = document.getElementById("presets-grid");
    grid.innerHTML = "";

    PRESET_IMAGES.forEach((item) => {
      const card = document.createElement("div");
      card.className = "preset-card";
      card.innerHTML = `
        <img src="${item.dataUrl}" alt="${item.title}">
        <div class="preset-card-title">${item.title}</div>
      `;
      card.addEventListener("click", () => {
        window.soundFX.playClick();
        this.loadPresetById(item.id);
        this.modalSetup.classList.add("hidden");
      });
      grid.appendChild(card);
    });
  }

  loadPresetById(id) {
    const preset = PRESET_IMAGES.find((p) => p.id === id) || PRESET_IMAGES[0];
    this.loadImage(preset.dataUrl);
  }

  // ============================================================
  // RESİM YÜKLE VE BOYUTLANDIR
  // ============================================================
  loadImage(src) {
    const img = new Image();
    if (src.startsWith("http")) {
      img.crossOrigin = "anonymous";
    }
    img.onload = () => {
      this.hasStarted = true;
      this.modalSetup.classList.add("hidden");
      this.currentImage = img;
      this.completedImg.src = src;
      this.boardHintImg.src = src;
      this.refPreviewImg.src = src;
      this.resetRefPreview();
      this.syncGridOrientation();
      this.totalPieces = this.cols * this.rows;
      this.currentPiecesBadge.textContent = this.totalPieces;
      this.syncPiecesModalUI();
      this.startPuzzle();
    };
    img.onerror = () => {
      if (!this.hasStarted) {
        this.openSetupModal();
      }
      alert("Resim yüklenirken bir hata oluştu! Lütfen başka bir resim veya link deneyin.");
    };
    img.src = src;
  }

  // ============================================================
  // TAHTA BOYUTUNU HESAPLA (YATAY ALANA GÖRE OTOMATİK SIĞDIR)
  // ============================================================
  recalculateBoardSize() {
    if (!this.currentImage) return;

    const containerW = Math.max(240, Math.min(this.boardContainer.clientWidth - 28, 1400));
    const containerH = Math.max(180, Math.min(this.boardContainer.clientHeight - 28, 1000));

    const imgAspect = this.currentImage.naturalWidth / this.currentImage.naturalHeight;
    const containerAspect = containerW / containerH;

    if (imgAspect > containerAspect) {
      // Genişliğe göre sınırla
      this.boardWidth = Math.round(containerW);
      this.boardHeight = Math.round(this.boardWidth / imgAspect);
    } else {
      // Yüksekliğe göre sınırla
      this.boardHeight = Math.round(containerH);
      this.boardWidth = Math.round(this.boardHeight * imgAspect);
    }

    this.board.style.width = `${this.boardWidth}px`;
    this.board.style.height = `${this.boardHeight}px`;

    this.cellWidth = this.boardWidth / this.cols;
    this.cellHeight = this.boardHeight / this.rows;
    const minCell = Math.min(this.cellWidth, this.cellHeight);
    // Kulakçık büyüklüğü hücre boyutuna orantılı (~22%)
    this.tabSize = Math.max(3, Math.min(Math.floor(minCell * 0.24), Math.round(minCell * 0.22)));
    this.piecePad = Math.ceil(this.tabSize * 1.2) + 2;
  }

  // ============================================================
  // YENİ PUZZLE BAŞLAT
  // ============================================================
  startPuzzle() {
    if (!this.currentImage) return;

    this.confettiActive = false;
    this.placedCount = 0;
    this.updateCounter();
    this.recalculateBoardSize();

    // Katmanları temizle
    this.boardLockedLayer.innerHTML = "";
    this.boardFloatingLayer.innerHTML = "";
    this.trayPieces.innerHTML = "";
    this.dragGroupContainer.innerHTML = "";
    this.dragGroupContainer.style.transform = "";
    this.resetBoardCamera();

    // 1. Jigsaw kenar yapılarını oluştur (İç içe geçmeli kulakçıklar ve yuvalar)
    this.generateEdges();

    // 2. Parça Canvas'larını çiz
    this.createPieces();

    // 3. Tahta kılavuz çizgilerini çiz
    this.drawBoardGrid();

    // 4. Parçaları karıştır ve tepsiye yerleştir
    this.shufflePiecesToTray();
  }

  // ============================================================
  // KENAR YAPILARI (HORİZONTAL & VERTİCAL JİGSAW TABS)
  // ============================================================
  generateEdges() {
    // Yatay iç kenarlar: rows - 1 adet satır arası, cols adet sütun
    this.hEdges = [];
    for (let r = 0; r < this.rows - 1; r++) {
      this.hEdges[r] = [];
      for (let c = 0; c < this.cols; c++) {
        // Rastgele +1 (aşağı doğru kulakçık) veya -1 (yukarı doğru kulakçık)
        this.hEdges[r][c] = Math.random() < 0.5 ? 1 : -1;
      }
    }

    // Dikey iç kenarlar: rows adet satır, cols - 1 adet sütun arası
    this.vEdges = [];
    for (let r = 0; r < this.rows; r++) {
      this.vEdges[r] = [];
      for (let c = 0; c < this.cols - 1; c++) {
        // Rastgele +1 (sağa doğru kulakçık) veya -1 (sola doğru kulakçık)
        this.vEdges[r][c] = Math.random() < 0.5 ? 1 : -1;
      }
    }
  }

  // ============================================================
  // KLASİK JİGSAW KENAR ÇİZİM FONKSİYONU (BEZİER EĞRİLERİ)
  // ============================================================
  drawJigsawEdge(ctx, x0, y0, x1, y1, tabDir) {
    if (tabDir === 0) {
      ctx.lineTo(x1, y1);
      return;
    }

    const dx = x1 - x0;
    const dy = y1 - y0;
    const len = Math.hypot(dx, dy);
    const ux = dx / len;
    const uy = dy / len;
    // Dışa bakan dik normal vektör
    const nx = uy;
    const ny = -ux;

    const s = tabDir;
    const ts = this.tabSize;

    // Bezier noktaları hesaplama yardımcısı
    const p = (u, v) => ({
      x: x0 + u * dx + v * ts * s * nx,
      y: y0 + u * dy + v * ts * s * ny,
    });

    // 1. Başlangıç düz çizgisi
    const p1 = p(0.35, 0);
    ctx.lineTo(p1.x, p1.y);

    // 2. Boyun başlangıcı
    const cp1 = p(0.38, 0);
    const cp2 = p(0.38, 0.2);
    const p2 = p(0.35, 0.4);
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, p2.x, p2.y);

    // 3. Yuvarlak kulak başı (tepe)
    const cp3 = p(0.32, 0.95);
    const cp4 = p(0.42, 1.05);
    const p3 = p(0.50, 1.05);
    ctx.bezierCurveTo(cp3.x, cp3.y, cp4.x, cp4.y, p3.x, p3.y);

    // 4. Yuvarlak kulak başı dönüşü
    const cp5 = p(0.58, 1.05);
    const cp6 = p(0.68, 0.95);
    const p4 = p(0.65, 0.4);
    ctx.bezierCurveTo(cp5.x, cp5.y, cp6.x, cp6.y, p4.x, p4.y);

    // 5. Boyun kapanışı ve ana hatta dönüş
    const cp7 = p(0.62, 0.2);
    const cp8 = p(0.62, 0);
    const p5 = p(0.65, 0);
    ctx.bezierCurveTo(cp7.x, cp7.y, cp8.x, cp8.y, p5.x, p5.y);

    // 6. Bitiş düz çizgisi
    ctx.lineTo(x1, y1);
  }

  // ============================================================
  // PARÇA PATH ÇİZİMİ (4 KENAR BİRLEŞİMİ)
  // ============================================================
  buildPiecePath(ctx, r, c, ox, oy) {
    const w = this.cellWidth;
    const h = this.cellHeight;

    // Kenar tab yönleri:
    // Üst kenar: r === 0 ise düz(0), aksi halde -hEdges[r-1][c]
    const topTab = r === 0 ? 0 : -this.hEdges[r - 1][c];
    // Sağ kenar: c === cols - 1 ise düz(0), aksi halde vEdges[r][c]
    const rightTab = c === this.cols - 1 ? 0 : this.vEdges[r][c];
    // Alt kenar: r === rows - 1 ise düz(0), aksi halde hEdges[r][c]
    const bottomTab = r === this.rows - 1 ? 0 : this.hEdges[r][c];
    // Sol kenar: c === 0 ise düz(0), aksi halde -vEdges[r][c-1]
    const leftTab = c === 0 ? 0 : -this.vEdges[r][c - 1];

    ctx.beginPath();
    // Sol üst köşe
    ctx.moveTo(ox, oy);

    // 1. Üst kenar: (ox, oy) -> (ox + w, oy)
    this.drawJigsawEdge(ctx, ox, oy, ox + w, oy, topTab);

    // 2. Sağ kenar: (ox + w, oy) -> (ox + w, oy + h)
    this.drawJigsawEdge(ctx, ox + w, oy, ox + w, oy + h, rightTab);

    // 3. Alt kenar: (ox + w, oy + h) -> (ox, oy + h)
    this.drawJigsawEdge(ctx, ox + w, oy + h, ox, oy + h, bottomTab);

    // 4. Sol kenar: (ox, oy + h) -> (ox, oy)
    this.drawJigsawEdge(ctx, ox, oy + h, ox, oy, leftTab);

    ctx.closePath();
  }

  // ============================================================
  // HER PARÇA İÇİN CANVAS ÜRET VE RESMİ DİLİMLE
  // ============================================================
  createPieces() {
    this.pieces = [];
    this.groups = new Map();
    this.piecesByCoord = new Map();
    this.gameApp.classList.toggle("many-pieces", this.totalPieces > 48);

    const pad = this.piecePad;
    const pw = Math.ceil(this.cellWidth + 2 * pad);
    const ph = Math.ceil(this.cellHeight + 2 * pad);
    const minCell = Math.min(this.cellWidth, this.cellHeight);
    const darkStroke = Math.max(0.8, Math.min(3, minCell * 0.03));
    const lightStroke = Math.max(0.5, Math.min(1.5, minCell * 0.015));

    // Kaynak resmi bir kez tahta boyutunda ara canvas'a çiz (500 parçada yüksek hız)
    const srcCanvas = document.createElement("canvas");
    srcCanvas.width = this.boardWidth;
    srcCanvas.height = this.boardHeight;
    const srcCtx = srcCanvas.getContext("2d");
    srcCtx.drawImage(this.currentImage, 0, 0, this.boardWidth, this.boardHeight);

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const canvas = document.createElement("canvas");
        canvas.width = pw;
        canvas.height = ph;
        const ctx = canvas.getContext("2d");

        const targetLeft = c * this.cellWidth - pad;
        const targetTop = r * this.cellHeight - pad;

        // Parça sınırları için kırpma (Clip)
        this.buildPiecePath(ctx, r, c, pad, pad);

        ctx.save();
        ctx.clip();

        // Kaynak canvas'tan kırpılmış bölgeyi güvenli sınırlarla kopyala
        const sx = Math.max(0, Math.floor(targetLeft));
        const sy = Math.max(0, Math.floor(targetTop));
        const ex = Math.min(this.boardWidth, Math.ceil(targetLeft + pw));
        const ey = Math.min(this.boardHeight, Math.ceil(targetTop + ph));
        const sw = ex - sx;
        const sh = ey - sy;
        if (sw > 0 && sh > 0) {
          const dx = sx - targetLeft;
          const dy = sy - targetTop;
          ctx.drawImage(srcCanvas, sx, sy, sw, sh, dx, dy, sw, sh);
        }

        // 3D Işık ve Gölge Kenarlık Efekti (Kabartmalı görünüm)
        ctx.restore();
        ctx.save();
        ctx.lineWidth = darkStroke;
        ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
        ctx.stroke();

        ctx.lineWidth = lightStroke;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.stroke();
        ctx.restore();

        // Parça DOM Elemanı Oluştur
        const pieceEl = document.createElement("div");
        pieceEl.className = "puzzle-piece";
        pieceEl.appendChild(canvas);

        const pieceObj = {
          row: r,
          col: c,
          id: `p_${r}_${c}`,
          groupId: `p_${r}_${c}`,
          x: 0,
          y: 0,
          element: pieceEl,
          canvas: canvas,
          targetLeft: targetLeft,
          targetTop: targetTop,
          isLocked: false,
        };

        this.groups.set(pieceObj.groupId, new Set([pieceObj]));
        this.piecesByCoord.set(`${r}_${c}`, pieceObj);

        // Pointer (Fare & Dokunmatik) olaylarını bağla
        this.attachPointerEvents(pieceObj);
        this.pieces.push(pieceObj);
      }
    }
  }

  getGroupPieces(groupId) {
    return Array.from(this.groups.get(groupId) || []);
  }

  setPieceLayerPos(piece, x, y) {
    piece.x = x;
    piece.y = y;
    piece.element.style.left = `${x}px`;
    piece.element.style.top = `${y}px`;
  }

  // ============================================================
  // TAHTA KILAVUZ ÇİZGİLERİ (SVG İLE DİLİMLERİ GÖSTERME)
  // ============================================================
  drawBoardGrid() {
    this.boardGridSvg.setAttribute("viewBox", `0 0 ${this.boardWidth} ${this.boardHeight}`);
    this.boardGridSvg.innerHTML = "";

    const pathParts = [];
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const ox = c * this.cellWidth;
        const oy = r * this.cellHeight;

        // Üst kenar (r > 0 ise)
        if (r > 0) {
          pathParts.push(this.edgeToSvgPath(ox, oy, ox + this.cellWidth, oy, -this.hEdges[r - 1][c]));
        }
        // Sol kenar (c > 0 ise)
        if (c > 0) {
          pathParts.push(this.edgeToSvgPath(ox, oy + this.cellHeight, ox, oy, -this.vEdges[r][c - 1]));
        }
      }
    }

    if (pathParts.length > 0) {
      const strokeW = this.totalPieces >= 100 ? 0.9 : 1.5;
      const opacity = this.totalPieces >= 100 ? 0.28 : 0.4;
      const dash = this.totalPieces >= 100 ? "3 3" : "4 4";
      this.boardGridSvg.innerHTML = `<path d="${pathParts.join(" ")}" stroke="rgba(255,255,255,${opacity})" stroke-width="${strokeW}" stroke-dasharray="${dash}" fill="none"/>`;
    }
  }

  edgeToSvgPath(x0, y0, x1, y1, tabDir) {
    if (tabDir === 0) return `M ${x0} ${y0} L ${x1} ${y1}`;

    const dx = x1 - x0;
    const dy = y1 - y0;
    const len = Math.hypot(dx, dy);
    const nx = dy / len;
    const ny = -dx / len;
    const s = tabDir;
    const ts = this.tabSize;

    const p = (u, v) => ({
      x: (x0 + u * dx + v * ts * s * nx).toFixed(1),
      y: (y0 + u * dy + v * ts * s * ny).toFixed(1),
    });

    const p1 = p(0.35, 0);
    const cp1 = p(0.38, 0), cp2 = p(0.38, 0.2), p2 = p(0.35, 0.4);
    const cp3 = p(0.32, 0.95), cp4 = p(0.42, 1.05), p3 = p(0.50, 1.05);
    const cp5 = p(0.58, 1.05), cp6 = p(0.68, 0.95), p4 = p(0.65, 0.4);
    const cp7 = p(0.62, 0.2), cp8 = p(0.62, 0), p5 = p(0.65, 0);

    return `M ${x0} ${y0} L ${p1.x} ${p1.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${p2.x} ${p2.y} C ${cp3.x} ${cp3.y}, ${cp4.x} ${cp4.y}, ${p3.x} ${p3.y} C ${cp5.x} ${cp5.y}, ${cp6.x} ${cp6.y}, ${p4.x} ${p4.y} C ${cp7.x} ${cp7.y}, ${cp8.x} ${cp8.y}, ${p5.x} ${p5.y} L ${x1} ${y1}`;
  }

  // ============================================================
  // PARÇALARI KARIŞTIR VE SAĞ ÇEKMECEYE (TEPSİYE) KOY
  // ============================================================
  shufflePiecesToTray() {
    // Fisher-Yates Karıştırma
    const shuffled = [...this.pieces];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const frag = document.createDocumentFragment();
    shuffled.forEach((piece) => {
      piece.element.classList.add("in-tray");
      piece.element.classList.remove("locked", "dragging");
      frag.appendChild(piece.element);
    });
    this.trayPieces.appendChild(frag);
  }

  // ============================================================
  // PARÇA SÜRÜKLEME VE BIRAKMA (AKILLI TEPSİ SCROLL + ZOOM UYUMLU GRUP)
  // ============================================================
  startPieceDrag(piece, clientX, clientY, pointerId, wasInTray) {
    window.soundFX.playPick();

    const el = piece.element;
    const group = this.getGroupPieces(piece.groupId);
    const lockedRect = this.boardLockedLayer.getBoundingClientRect();
    const layerRect = this.floatingLayer.getBoundingClientRect();
    const z = this.boardZoom;

    let anchorLocalX = 0;
    let anchorLocalY = 0;
    let startScreenAnchorX = 0;
    let startScreenAnchorY = 0;
    let offsets = [];

    if (wasInTray) {
      startScreenAnchorX = clientX - layerRect.left - (piece.canvas.width * z) / 2;
      startScreenAnchorY = clientY - layerRect.top - (piece.canvas.height * z) / 2;
      el.classList.remove("in-tray", "floating");
      el.classList.add("dragging");
      el.style.left = "0px";
      el.style.top = "0px";
      this.dragGroupContainer.appendChild(el);
      offsets = [{ piece, ox: 0, oy: 0 }];
    } else {
      anchorLocalX = piece.x;
      anchorLocalY = piece.y;
      startScreenAnchorX = lockedRect.left - layerRect.left + anchorLocalX * z;
      startScreenAnchorY = lockedRect.top - layerRect.top + anchorLocalY * z;

      const isMulti = group.length > 1;
      offsets = group.map((p) => {
        const ox = p.x - anchorLocalX;
        const oy = p.y - anchorLocalY;
        p.element.classList.remove("in-tray", "floating");
        p.element.classList.add("dragging");
        if (isMulti) {
          p.element.classList.add("dragging-group");
        }
        p.element.style.left = `${ox}px`;
        p.element.style.top = `${oy}px`;
        this.dragGroupContainer.appendChild(p.element);
        return { piece: p, ox, oy };
      });
    }

    this.dragGroupContainer.style.transform = `translate(${startScreenAnchorX}px, ${startScreenAnchorY}px) scale(${z})`;

    try {
      el.setPointerCapture(pointerId);
    } catch (err) {}

    this.activeDrag = {
      piece: piece,
      group: group,
      pointerId: pointerId,
      startClientX: clientX,
      startClientY: clientY,
      startScreenAnchorX: startScreenAnchorX,
      startScreenAnchorY: startScreenAnchorY,
      curScreenAnchorX: startScreenAnchorX,
      curScreenAnchorY: startScreenAnchorY,
      offsets: offsets,
    };
  }

  attachPointerEvents(piece) {
    const el = piece.element;

    el.addEventListener("pointerdown", (e) => {
      if (piece.isLocked) return;

      const wasInTray = el.classList.contains("in-tray");
      if (wasInTray && e.pointerType !== "mouse") {
        // Dokunmatik tepside dikey kaydırmaya izin ver: yön belli olana kadar parçayı koparma
        if (this.pendingTrayTouch) {
          clearTimeout(this.pendingTrayTouch.timer);
          this.pendingTrayTouch = null;
        }
        const pending = {
          piece: piece,
          pointerId: e.pointerId,
          startX: e.clientX,
          startY: e.clientY,
          lastX: e.clientX,
          lastY: e.clientY,
          timer: setTimeout(() => {
            if (this.pendingTrayTouch && this.pendingTrayTouch.pointerId === e.pointerId) {
              const pt = this.pendingTrayTouch;
              this.pendingTrayTouch = null;
              this.startPieceDrag(pt.piece, pt.lastX, pt.lastY, pt.pointerId, true);
            }
          }, 220),
        };
        this.pendingTrayTouch = pending;
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      this.startPieceDrag(piece, e.clientX, e.clientY, e.pointerId, wasInTray);
    });

    el.addEventListener("pointermove", (e) => {
      if (this.pendingTrayTouch && this.pendingTrayTouch.pointerId === e.pointerId) {
        const pt = this.pendingTrayTouch;
        pt.lastX = e.clientX;
        pt.lastY = e.clientY;
        const dx = e.clientX - pt.startX;
        const dy = e.clientY - pt.startY;
        const dist = Math.hypot(dx, dy);

        if (dist >= 8) {
          clearTimeout(pt.timer);
          this.pendingTrayTouch = null;
          if (Math.abs(dy) > Math.abs(dx) * 1.15) {
            // Dikey kaydırma (tepsi scroll)
            return;
          }
          // Yatay çekiş -> parçayı tepsiden kaldır
          e.preventDefault();
          this.startPieceDrag(piece, e.clientX, e.clientY, e.pointerId, true);
        }
        return;
      }

      if (!this.activeDrag || this.activeDrag.pointerId !== e.pointerId) return;
      e.preventDefault();

      const dx = e.clientX - this.activeDrag.startClientX;
      const dy = e.clientY - this.activeDrag.startClientY;

      this.activeDrag.curScreenAnchorX = this.activeDrag.startScreenAnchorX + dx;
      this.activeDrag.curScreenAnchorY = this.activeDrag.startScreenAnchorY + dy;

      this.dragGroupContainer.style.transform = `translate(${this.activeDrag.curScreenAnchorX}px, ${this.activeDrag.curScreenAnchorY}px) scale(${this.boardZoom})`;
    });

    const onPointerUp = (e) => {
      if (this.pendingTrayTouch && this.pendingTrayTouch.pointerId === e.pointerId) {
        clearTimeout(this.pendingTrayTouch.timer);
        this.pendingTrayTouch = null;
        return;
      }

      if (!this.activeDrag || this.activeDrag.pointerId !== e.pointerId) return;
      e.preventDefault();

      try {
        el.releasePointerCapture(e.pointerId);
      } catch (err) {}

      const drag = this.activeDrag;
      const lockedRect = this.boardLockedLayer.getBoundingClientRect();
      const layerRect = this.floatingLayer.getBoundingClientRect();
      const z = this.boardZoom;

      const baseBoardX = (drag.curScreenAnchorX + layerRect.left - lockedRect.left) / z;
      const baseBoardY = (drag.curScreenAnchorY + layerRect.top - lockedRect.top) / z;

      drag.offsets.forEach((item) => {
        item.piece.element.classList.remove("dragging", "dragging-group");
        this.boardFloatingLayer.appendChild(item.piece.element);
        this.setPieceLayerPos(item.piece, baseBoardX + item.ox, baseBoardY + item.oy);
      });

      this.dragGroupContainer.style.transform = "";
      this.checkGroupPlacement(piece, e.clientX, e.clientY);
      this.activeDrag = null;
    };

    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
  }

  // ============================================================
  // YERLEŞTİRME, SERBEST GRUP BİRLEŞTİRME VE TAHTAYA KİLİTLEME
  // ============================================================
  checkGroupPlacement(draggedPiece, dropClientX, dropClientY) {
    // Oturma eşiği (küçük ve büyük parçalara duyarlı)
    const minCell = Math.min(this.cellWidth, this.cellHeight);
    const snapThreshold = Math.max(16, Math.min(44, minCell * 0.42));

    const lockGroupToBoard = (group) => {
      const gid = draggedPiece.groupId;
      group.forEach((p) => {
        p.isLocked = true;
        p.element.classList.add("locked");
        p.element.classList.remove("in-tray", "floating", "merge-flash");
        p.element.style.left = `${p.targetLeft}px`;
        p.element.style.top = `${p.targetTop}px`;
        this.boardLockedLayer.appendChild(p.element);
      });
      this.groups.delete(gid);

      window.soundFX.playSnap();
      this.createSparkles(
        draggedPiece.targetLeft + this.cellWidth / 2,
        draggedPiece.targetTop + this.cellHeight / 2
      );

      this.placedCount += group.length;
      this.updateCounter();

      if (this.placedCount === this.totalPieces) {
        setTimeout(() => this.triggerVictory(), 450);
      }
    };

    // A) Doğrudan tahtadaki doğru yerine yakınsa tüm grubu tahtaya kilitle
    if (
      Math.hypot(draggedPiece.x - draggedPiece.targetLeft, draggedPiece.y - draggedPiece.targetTop) <
      snapThreshold
    ) {
      lockGroupToBoard(this.getGroupPieces(draggedPiece.groupId));
      return;
    }

    // B) Masada yanlış yerde olsa bile komşu parçalarla eşleşiyorsa grupla (zincirleme destekli)
    const dirs = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    let mergedAny = false;
    let keepScanning = true;

    while (keepScanning) {
      keepScanning = false;
      const currentGroup = this.getGroupPieces(draggedPiece.groupId);

      for (const p of currentGroup) {
        for (const [dr, dc] of dirs) {
          const neighbor = this.piecesByCoord.get(`${p.row + dr}_${p.col + dc}`);
          if (
            !neighbor ||
            neighbor.isLocked ||
            neighbor.element.classList.contains("in-tray") ||
            neighbor.groupId === draggedPiece.groupId
          ) {
            continue;
          }

          const expectedX = neighbor.x + (p.col - neighbor.col) * this.cellWidth;
          const expectedY = neighbor.y + (p.row - neighbor.row) * this.cellHeight;

          if (Math.hypot(p.x - expectedX, p.y - expectedY) < snapThreshold) {
            const shiftX = expectedX - p.x;
            const shiftY = expectedY - p.y;

            currentGroup.forEach((gp) => {
              this.setPieceLayerPos(gp, gp.x + shiftX, gp.y + shiftY);
            });

            const oldGid = draggedPiece.groupId;
            const targetGid = neighbor.groupId;
            const targetSet = this.groups.get(targetGid);

            currentGroup.forEach((gp) => {
              gp.groupId = targetGid;
              targetSet.add(gp);
            });
            this.groups.delete(oldGid);

            const seamBoardX = (p.x + neighbor.x) / 2 + p.canvas.width / 2;
            const seamBoardY = (p.y + neighbor.y) / 2 + p.canvas.height / 2;
            this.createSparkles(seamBoardX, seamBoardY);

            this.getGroupPieces(targetGid).forEach((gp) => {
              gp.element.classList.remove("merge-flash");
              void gp.element.offsetWidth;
              gp.element.classList.add("merge-flash");
              setTimeout(() => gp.element.classList.remove("merge-flash"), 380);
            });

            mergedAny = true;
            keepScanning = true;
            break;
          }
        }
        if (keepScanning) break;
      }
    }

    if (mergedAny) {
      window.soundFX.playSnap();
      const mergedGroup = this.getGroupPieces(draggedPiece.groupId);
      mergedGroup.forEach((gp) => {
        gp.element.classList.remove("in-tray");
        gp.element.classList.add("floating");
      });

      // Birleştikten sonra doğru tahta konumuna denk geldiyse hemen kilitle
      if (
        Math.hypot(draggedPiece.x - draggedPiece.targetLeft, draggedPiece.y - draggedPiece.targetTop) <
        snapThreshold
      ) {
        lockGroupToBoard(mergedGroup);
      }
      return;
    }

    // C) Eşleşme yok: Tekli parça sağdaki tepsiye bırakıldıysa tepsiye iade et, yoksa tahta katmanında bırak
    const group = this.getGroupPieces(draggedPiece.groupId);
    const trayRect = document.getElementById("tray-container").getBoundingClientRect();
    const inTrayZone =
      dropClientX >= trayRect.left &&
      dropClientX <= trayRect.right &&
      dropClientY >= trayRect.top &&
      dropClientY <= trayRect.bottom;

    if (group.length === 1 && inTrayZone) {
      const el = draggedPiece.element;
      el.classList.add("in-tray");
      el.classList.remove("floating");
      draggedPiece.x = 0;
      draggedPiece.y = 0;
      el.style.left = "";
      el.style.top = "";
      this.trayPieces.appendChild(el);
    } else {
      group.forEach((gp) => {
        gp.element.classList.remove("in-tray");
        gp.element.classList.add("floating");
      });
    }
  }

  createSparkles(boardX, boardY) {
    const lockedRect = this.boardLockedLayer.getBoundingClientRect();
    this.createSparklesAtViewport(
      lockedRect.left + boardX * this.boardZoom,
      lockedRect.top + boardY * this.boardZoom
    );
  }

  createSparklesAtViewport(globalX, globalY) {
    const symbols = ["✨", "⭐", "🌟", "💛", "🎉"];

    for (let i = 0; i < 8; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle-particle";
      sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      sparkle.style.left = `${globalX}px`;
      sparkle.style.top = `${globalY}px`;
      const angle = (i / 8) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const dist = Math.random() * 40 + 30;
      sparkle.style.setProperty("--tx", `${Math.cos(angle) * dist}px`);
      sparkle.style.setProperty("--ty", `${Math.sin(angle) * dist}px`);
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 600);
    }
  }

  updateCounter() {
    this.trayCounter.textContent = `${this.placedCount} / ${this.totalPieces}`;
  }

  // ============================================================
  // ZAFER VE KUTLAMA KANONLARI (CONFETTİ & FANFARE)
  // ============================================================
  triggerVictory() {
    window.soundFX.playWin();
    this.celebrationOverlay.classList.remove("hidden");
    this.startConfetti();
  }

  // ============================================================
  // RENGÂRENK KONFETİ MOTORU (CANVAS)
  // ============================================================
  initConfetti() {
    this.confettiCanvas = document.getElementById("confetti-canvas");
    this.confettiCtx = this.confettiCanvas.getContext("2d");
    this.confettiParticles = [];
    this.confettiActive = false;

    const resizeConfetti = () => {
      this.confettiCanvas.width = window.innerWidth;
      this.confettiCanvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeConfetti);
    resizeConfetti();
  }

  startConfetti() {
    this.confettiActive = true;
    this.confettiParticles = [];
    const colors = ["#ff5722", "#ffeb3b", "#00e676", "#00e5ff", "#e91e63", "#9c27b0", "#ff9800"];

    for (let i = 0; i < 180; i++) {
      this.confettiParticles.push({
        x: Math.random() * this.confettiCanvas.width,
        y: -20 - Math.random() * 200,
        size: Math.random() * 10 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        velX: (Math.random() - 0.5) * 5,
        velY: Math.random() * 5 + 3,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        shape: Math.random() < 0.3 ? "circle" : "rect",
      });
    }

    const animate = () => {
      if (!this.confettiActive) return;
      this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

      this.confettiParticles.forEach((p) => {
        p.x += p.velX;
        p.y += p.velY;
        p.rot += p.rotSpeed;

        this.confettiCtx.save();
        this.confettiCtx.translate(p.x, p.y);
        this.confettiCtx.rotate((p.rot * Math.PI) / 180);
        this.confettiCtx.fillStyle = p.color;

        if (p.shape === "circle") {
          this.confettiCtx.beginPath();
          this.confettiCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          this.confettiCtx.fill();
        } else {
          this.confettiCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        }
        this.confettiCtx.restore();

        // Aşağıdan çıkanları tekrar yukarı al
        if (p.y > this.confettiCanvas.height + 30) {
          p.y = -20;
          p.x = Math.random() * this.confettiCanvas.width;
        }
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }
}

// Oyunu sayfa yüklenince başlat
window.addEventListener("DOMContentLoaded", () => {
  window.game = new PuzzleGame();
});
