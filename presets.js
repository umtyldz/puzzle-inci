/* ============================================================
   RENKLİ PUZZLE DÜNYASI - PRESETS.JS
   Tamamen çevrimdışı, yüksek kaliteli, çocuk dostu SVG resimler
   ============================================================ */

const PRESET_IMAGES = [
  {
    id: "puppy",
    title: "🐶 Sevimli Köpek",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <defs>
        <linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4fc3f7"/>
          <stop offset="100%" stop-color="#b3e5fc"/>
        </linearGradient>
        <linearGradient id="grass1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#81c784"/>
          <stop offset="100%" stop-color="#388e3c"/>
        </linearGradient>
        <linearGradient id="fur" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ffb74d"/>
          <stop offset="100%" stop-color="#f57c00"/>
        </linearGradient>
      </defs>
      <!-- Gökyüzü ve Güneş -->
      <rect width="800" height="600" fill="url(#sky1)"/>
      <circle cx="700" cy="110" r="65" fill="#fdd835"/>
      <circle cx="700" cy="110" r="80" fill="#fff59d" opacity="0.3"/>
      <!-- Bulutlar -->
      <path d="M 100 120 Q 130 80 170 110 Q 210 90 230 130 Q 250 160 210 170 L 110 170 Z" fill="#ffffff" opacity="0.9"/>
      <path d="M 500 180 Q 530 140 570 170 Q 610 150 630 190 L 510 190 Z" fill="#ffffff" opacity="0.8"/>
      <!-- Çimen Tepeleri -->
      <circle cx="200" cy="650" r="350" fill="url(#grass1)"/>
      <circle cx="600" cy="680" r="380" fill="#4caf50"/>
      <!-- Köpek Gövdesi -->
      <ellipse cx="400" cy="420" rx="140" ry="110" fill="url(#fur)"/>
      <!-- Kuyruk -->
      <path d="M 270 410 Q 200 370 230 310" stroke="#f57c00" stroke-width="26" stroke-linecap="round" fill="none"/>
      <!-- Patiler -->
      <ellipse cx="330" cy="500" rx="35" ry="25" fill="#ffe0b2"/>
      <ellipse cx="470" cy="500" rx="35" ry="25" fill="#ffe0b2"/>
      <!-- Kafa -->
      <circle cx="400" cy="270" r="105" fill="url(#fur)"/>
      <!-- Kulaklar -->
      <path d="M 310 210 Q 240 240 270 330 Q 310 330 330 260 Z" fill="#d84315"/>
      <path d="M 490 210 Q 560 240 530 330 Q 490 330 470 260 Z" fill="#d84315"/>
      <!-- Yüz / Ağız Bölgesi -->
      <ellipse cx="400" cy="305" rx="60" ry="45" fill="#fff3e0"/>
      <!-- Gözler -->
      <circle cx="360" cy="245" r="16" fill="#212121"/>
      <circle cx="440" cy="245" r="16" fill="#212121"/>
      <circle cx="355" cy="240" r="6" fill="#ffffff"/>
      <circle cx="435" cy="240" r="6" fill="#ffffff"/>
      <!-- Burun ve Gülümseme -->
      <ellipse cx="400" cy="285" rx="18" ry="12" fill="#212121"/>
      <path d="M 385 305 Q 400 320 415 305" stroke="#212121" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Dil -->
      <path d="M 393 313 C 393 335 407 335 407 313 Z" fill="#ff5252"/>
      <!-- Çiçekler -->
      <circle cx="150" cy="520" r="14" fill="#e91e63"/>
      <circle cx="150" cy="520" r="6" fill="#ffeb3b"/>
      <circle cx="650" cy="510" r="16" fill="#9c27b0"/>
      <circle cx="650" cy="510" r="7" fill="#ffeb3b"/>
    </svg>`
  },
  {
    id: "space",
    title: "🚀 Uzay Macerası",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <defs>
        <radialGradient id="spacebg" cx="50%" cy="50%" r="75%">
          <stop offset="0%" stop-color="#1a237e"/>
          <stop offset="100%" stop-color="#05081c"/>
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill="url(#spacebg)"/>
      <!-- Parlayan Yıldızlar -->
      <g fill="#fff">
        <circle cx="100" cy="80" r="4"/><circle cx="250" cy="120" r="3"/><circle cx="400" cy="60" r="5"/>
        <circle cx="600" cy="140" r="4"/><circle cx="720" cy="90" r="3"/><circle cx="150" cy="350" r="4"/>
        <circle cx="70" cy="480" r="3"/><circle cx="720" cy="420" r="4"/><circle cx="620" cy="520" r="5"/>
      </g>
      <!-- Satürn benzeri gezegen -->
      <circle cx="650" cy="200" r="60" fill="#ffb74d"/>
      <ellipse cx="650" cy="200" rx="100" ry="20" fill="none" stroke="#ffe082" stroke-width="12" transform="rotate(-20 650 200)"/>
      <!-- Dünya / Mavi Gezegen -->
      <circle cx="150" cy="450" r="80" fill="#29b6f6"/>
      <circle cx="170" cy="430" r="40" fill="#66bb6a" opacity="0.8"/>
      <!-- Roket Ateşi -->
      <polygon points="350,380 410,480 430,370" fill="#ff3d00"/>
      <polygon points="365,380 405,450 420,370" fill="#ffeb3b"/>
      <!-- Roket Gövdesi -->
      <path d="M 400 130 C 350 240 340 370 340 370 L 440 370 C 440 370 430 240 400 130 Z" fill="#eeeeee"/>
      <!-- Roket Burnu -->
      <path d="M 400 130 C 375 185 365 220 365 220 L 415 220 C 415 220 405 185 400 130 Z" fill="#f44336"/>
      <!-- Kanatlar -->
      <polygon points="340,320 280,390 340,370" fill="#00bcd4"/>
      <polygon points="440,320 500,390 440,370" fill="#00bcd4"/>
      <!-- Pencere ve Sevimli Astronot -->
      <circle cx="390" cy="270" r="28" fill="#42a5f5" stroke="#37474f" stroke-width="6"/>
      <circle cx="390" cy="270" r="16" fill="#fff9c4"/>
      <circle cx="385" cy="268" r="3" fill="#212121"/>
      <circle cx="395" cy="268" r="3" fill="#212121"/>
    </svg>`
  },
  {
    id: "cat",
    title: "🐱 Neşeli Kedicik",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <rect width="800" height="600" fill="#ffe0b2"/>
      <!-- Halı Zemin -->
      <ellipse cx="400" cy="520" rx="360" ry="80" fill="#ffcc80"/>
      <!-- Kedi Gövdesi -->
      <ellipse cx="380" cy="380" rx="130" ry="100" fill="#fff"/>
      <!-- Kedi Kuyruğu -->
      <path d="M 500 390 C 580 370 600 280 560 250 C 530 230 520 270 540 280" stroke="#fff" stroke-width="26" stroke-linecap="round" fill="none"/>
      <!-- Kedi Kafası -->
      <circle cx="340" cy="250" r="95" fill="#fff"/>
      <!-- Kulaklar -->
      <polygon points="260,190 280,100 330,170" fill="#fff"/>
      <polygon points="275,175 285,120 315,165" fill="#f48fb1"/>
      <polygon points="350,170 400,100 420,190" fill="#fff"/>
      <polygon points="365,165 395,120 405,175" fill="#f48fb1"/>
      <!-- Gözler -->
      <ellipse cx="305" cy="240" rx="14" ry="20" fill="#4caf50"/>
      <ellipse cx="375" cy="240" rx="14" ry="20" fill="#4caf50"/>
      <ellipse cx="305" cy="240" rx="6" ry="16" fill="#212121"/>
      <ellipse cx="375" cy="240" rx="6" ry="16" fill="#212121"/>
      <!-- Burun ve Bıyıklar -->
      <polygon points="335,265 345,265 340,273" fill="#f48fb1"/>
      <path d="M 340 273 L 340 282 M 330 282 Q 340 290 350 282" stroke="#424242" stroke-width="4" fill="none"/>
      <line x1="260" y1="265" x2="310" y2="272" stroke="#424242" stroke-width="3"/>
      <line x1="255" y1="285" x2="310" y2="282" stroke="#424242" stroke-width="3"/>
      <line x1="370" y1="272" x2="420" y2="265" stroke="#424242" stroke-width="3"/>
      <line x1="370" y1="282" x2="425" y2="285" stroke="#424242" stroke-width="3"/>
      <!-- Yün Yumağı Oyuncak -->
      <circle cx="560" cy="460" r="45" fill="#e91e63"/>
      <path d="M 520 460 Q 560 430 590 470 Q 550 500 530 450" stroke="#ad1457" stroke-width="5" fill="none"/>
      <path d="M 560 460 Q 480 470 420 440" stroke="#e91e63" stroke-width="5" fill="none"/>
    </svg>`
  },
  {
    id: "dino",
    title: "🦕 Minik Dinozor",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <defs>
        <linearGradient id="dinobg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fff9c4"/>
          <stop offset="100%" stop-color="#c8e6c9"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#dinobg)"/>
      <!-- Zemin -->
      <rect y="480" width="800" height="120" fill="#8d6e63"/>
      <rect y="460" width="800" height="30" fill="#66bb6a" rx="10"/>
      <!-- Sevimli Dino Gövdesi -->
      <ellipse cx="420" cy="360" rx="170" ry="120" fill="#4caf50"/>
      <!-- Uzun Boyun ve Kafa -->
      <path d="M 280 360 C 240 320 220 200 240 130 C 250 80 320 80 330 130 C 330 170 340 280 380 340 Z" fill="#4caf50"/>
      <!-- Sırt Dikenleri -->
      <polygon points="380,240 400,210 410,245" fill="#ffb300"/>
      <polygon points="430,245 450,215 460,250" fill="#ffb300"/>
      <polygon points="480,255 500,225 510,265" fill="#ffb300"/>
      <polygon points="530,275 550,245 560,290" fill="#ffb300"/>
      <!-- Kuyruk -->
      <path d="M 580 380 Q 720 370 750 300 Q 690 440 540 440 Z" fill="#4caf50"/>
      <!-- Bacaklar -->
      <rect x="330" y="420" width="55" height="80" rx="20" fill="#388e3c"/>
      <rect x="460" y="420" width="55" height="80" rx="20" fill="#388e3c"/>
      <!-- Dino Yüzü -->
      <circle cx="280" cy="115" r="14" fill="#212121"/>
      <circle cx="276" cy="110" r="5" fill="#ffffff"/>
      <path d="M 260 140 Q 285 155 310 140" stroke="#1b5e20" stroke-width="5" fill="none" stroke-linecap="round"/>
      <circle cx="310" cy="140" r="10" fill="#ff80ab" opacity="0.6"/>
    </svg>`
  },
  {
    id: "ocean",
    title: "🐬 Neşeli Yunus",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <defs>
        <linearGradient id="oceanbg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#00e5ff"/>
          <stop offset="50%" stop-color="#0288d1"/>
          <stop offset="100%" stop-color="#01579b"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#oceanbg)"/>
      <!-- Deniz Tabanı -->
      <path d="M 0 540 Q 200 500 400 530 T 800 510 L 800 600 L 0 600 Z" fill="#ffe082"/>
      <!-- Mercanlar ve Deniz Yosunları -->
      <path d="M 80 550 Q 60 450 90 400 Q 110 470 90 550" fill="#e91e63"/>
      <path d="M 700 540 Q 730 430 690 380 Q 680 470 710 540" fill="#00e676"/>
      <!-- Baloncuklar -->
      <circle cx="220" cy="300" r="14" fill="rgba(255,255,255,0.4)"/>
      <circle cx="240" cy="240" r="9" fill="rgba(255,255,255,0.5)"/>
      <circle cx="580" cy="180" r="16" fill="rgba(255,255,255,0.4)"/>
      <!-- Yunus Gövdesi -->
      <path d="M 220 280 C 260 170 440 180 560 260 C 600 290 640 280 680 230 C 660 300 620 340 560 330 C 440 370 300 380 220 280 Z" fill="#3f51b5"/>
      <path d="M 250 285 C 320 260 450 280 530 330 C 440 365 310 360 250 285 Z" fill="#e8eaf6"/>
      <!-- Yüzgeçler -->
      <path d="M 420 200 Q 440 130 480 160 Q 450 210 420 200 Z" fill="#303f9f"/>
      <path d="M 370 320 Q 360 380 410 360 Z" fill="#303f9f"/>
      <!-- Yunus Gözü ve Ağzı -->
      <circle cx="280" cy="265" r="8" fill="#212121"/>
      <circle cx="277" cy="262" r="3" fill="#ffffff"/>
      <path d="M 225 285 Q 245 295 260 285" stroke="#1a237e" stroke-width="3" fill="none"/>
    </svg>`
  },
  {
    id: "balloons",
    title: "🎈 Renkli Balonlar",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <defs>
        <linearGradient id="skyballoons" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#80d8ff"/>
          <stop offset="100%" stop-color="#fff9c4"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#skyballoons)"/>
      <!-- Yeşil Tepeler -->
      <circle cx="150" cy="700" r="320" fill="#81c784"/>
      <circle cx="550" cy="720" r="360" fill="#66bb6a"/>
      <!-- Büyük Sıcak Hava Balonu -->
      <g transform="translate(320, 100)">
        <ellipse cx="80" cy="110" rx="80" ry="100" fill="#ff5722"/>
        <!-- Dilimler -->
        <path d="M 80 10 C 40 40 40 180 80 210 C 120 180 120 40 80 10 Z" fill="#ffeb3b"/>
        <path d="M 80 10 C 60 50 60 170 80 210 Z" fill="#00e5ff"/>
        <!-- Sepet İpleri ve Sepet -->
        <line x1="55" y1="210" x2="65" y2="245" stroke="#5d4037" stroke-width="3"/>
        <line x1="105" y1="210" x2="95" y2="245" stroke="#5d4037" stroke-width="3"/>
        <rect x="60" y="245" width="40" height="30" rx="4" fill="#8d6e63"/>
      </g>
      <!-- Küçük Sıcak Hava Balonu -->
      <g transform="translate(120, 180) scale(0.6)">
        <ellipse cx="80" cy="110" rx="80" ry="100" fill="#9c27b0"/>
        <path d="M 80 10 C 40 40 40 180 80 210 C 120 180 120 40 80 10 Z" fill="#ff4081"/>
        <rect x="65" y="240" width="30" height="25" rx="4" fill="#5d4037"/>
      </g>
      <!-- Uzaktaki Mini Balon -->
      <g transform="translate(620, 220) scale(0.4)">
        <ellipse cx="80" cy="110" rx="80" ry="100" fill="#4caf50"/>
        <path d="M 80 10 C 40 40 40 180 80 210 C 120 180 120 40 80 10 Z" fill="#ffeb3b"/>
      </g>
    </svg>`
  }
];

// SVG'leri Base64 Data URL'e çevirip hızlı yükleme sağlar
function getPresetDataUrl(svgString) {
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString.trim());
}

// Preset listesi için data URL'leri hazırla
PRESET_IMAGES.forEach(p => {
  p.dataUrl = getPresetDataUrl(p.svg);
});
