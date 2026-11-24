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
  },
  {
    id: "unicorn",
    title: "🦄 Gökkuşağı Unicorn",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <defs>
        <linearGradient id="sky_uni" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ce93d8"/>
          <stop offset="55%" stop-color="#f8bbd0"/>
          <stop offset="100%" stop-color="#fff9c4"/>
        </linearGradient>
        <linearGradient id="horn_uni" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffd54f"/>
          <stop offset="100%" stop-color="#ff8f00"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#sky_uni)"/>
      <!-- Gökkuşağı -->
      <path d="M 60 500 A 340 340 0 0 1 740 500" stroke="#ef5350" stroke-width="22" fill="none"/>
      <path d="M 82 500 A 318 318 0 0 1 718 500" stroke="#ffa726" stroke-width="22" fill="none"/>
      <path d="M 104 500 A 296 296 0 0 1 696 500" stroke="#ffee58" stroke-width="22" fill="none"/>
      <path d="M 126 500 A 274 274 0 0 1 674 500" stroke="#66bb6a" stroke-width="22" fill="none"/>
      <path d="M 148 500 A 252 252 0 0 1 652 500" stroke="#42a5f5" stroke-width="22" fill="none"/>
      <path d="M 170 500 A 230 230 0 0 1 630 500" stroke="#ab47bc" stroke-width="22" fill="none"/>
      <!-- Yıldızlar -->
      <circle cx="110" cy="95" r="7" fill="#fff59d"/>
      <circle cx="690" cy="110" r="9" fill="#fff59d"/>
      <circle cx="630" cy="70" r="5" fill="#ffffff"/>
      <!-- Çayır -->
      <ellipse cx="400" cy="590" rx="480" ry="150" fill="#81c784"/>
      <!-- Bulutlar -->
      <g fill="#ffffff">
        <circle cx="140" cy="465" r="42"/><circle cx="185" cy="455" r="50"/><circle cx="230" cy="470" r="38"/>
        <circle cx="570" cy="470" r="38"/><circle cx="615" cy="455" r="50"/><circle cx="660" cy="468" r="40"/>
      </g>
      <!-- Unicorn Gövde -->
      <ellipse cx="430" cy="395" rx="125" ry="82" fill="#ffffff"/>
      <rect x="335" y="445" width="26" height="75" rx="12" fill="#ffffff"/>
      <rect x="385" y="452" width="26" height="72" rx="12" fill="#f3e5f5"/>
      <rect x="465" y="452" width="26" height="72" rx="12" fill="#f3e5f5"/>
      <rect x="505" y="445" width="26" height="75" rx="12" fill="#ffffff"/>
      <!-- Toynaklar -->
      <rect x="335" y="505" width="26" height="16" rx="6" fill="#ffd54f"/>
      <rect x="385" y="509" width="26" height="16" rx="6" fill="#ffd54f"/>
      <rect x="465" y="509" width="26" height="16" rx="6" fill="#ffd54f"/>
      <rect x="505" y="505" width="26" height="16" rx="6" fill="#ffd54f"/>
      <!-- Renkli Kuyruk -->
      <path d="M 545 385 Q 635 350 615 445 Q 585 435 550 410 Z" fill="#ec407a"/>
      <path d="M 545 395 Q 615 385 595 460 Q 565 445 545 415 Z" fill="#29b6f6"/>
      <!-- Boyun ve Kafa -->
      <path d="M 320 385 C 310 300 325 235 360 220 L 405 250 C 390 315 390 355 410 385 Z" fill="#ffffff"/>
      <!-- Renkli Yele -->
      <path d="M 380 215 Q 445 235 425 280 Q 455 310 420 345 Q 400 300 390 250 Z" fill="#ec407a"/>
      <path d="M 390 235 Q 435 255 418 290 Q 438 318 412 340 Z" fill="#ffca28"/>
      <!-- Kafa -->
      <ellipse cx="330" cy="225" rx="75" ry="56" fill="#ffffff" transform="rotate(-12 330 225)"/>
      <ellipse cx="282" cy="242" rx="34" ry="26" fill="#fce4ec"/>
      <!-- Kulak & Altın Boynuz -->
      <polygon points="365,175 395,128 400,190" fill="#ffffff"/>
      <polygon points="374,173 392,143 395,183" fill="#f48fb1"/>
      <polygon points="315,175 285,82 346,162" fill="url(#horn_uni)"/>
      <!-- Yüz -->
      <circle cx="328" cy="212" r="11" fill="#263238"/>
      <circle cx="324" cy="208" r="4" fill="#ffffff"/>
      <circle cx="295" cy="242" r="7" fill="#f48fb1"/>
      <path d="M 272 252 Q 286 264 300 252" stroke="#ad1457" stroke-width="4" fill="none" stroke-linecap="round"/>
      <!-- Çiçekler -->
      <circle cx="120" cy="545" r="14" fill="#ff4081"/><circle cx="120" cy="545" r="6" fill="#ffeb3b"/>
      <circle cx="685" cy="540" r="14" fill="#7c4dff"/><circle cx="685" cy="540" r="6" fill="#ffeb3b"/>
    </svg>`
  },
  {
    id: "train",
    title: "🚂 Renkli Tren",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <defs>
        <linearGradient id="sky_trn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#29b6f6"/>
          <stop offset="100%" stop-color="#e1f5fe"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#sky_trn)"/>
      <circle cx="110" cy="100" r="55" fill="#ffee58"/>
      <!-- Bulutlar -->
      <path d="M 520 110 Q 550 75 590 100 Q 630 80 650 115 L 520 115 Z" fill="#ffffff"/>
      <!-- Uzak Tepeler -->
      <path d="M 0 420 Q 180 280 390 400 T 800 370 L 800 600 L 0 600 Z" fill="#81c784"/>
      <path d="M 0 460 Q 250 380 500 450 T 800 430 L 800 600 L 0 600 Z" fill="#4caf50"/>
      <!-- Çam Ağaçları -->
      <g transform="translate(80, 290)">
        <rect x="22" y="90" width="16" height="35" fill="#6d4c41"/>
        <polygon points="30,10 0,60 60,60" fill="#2e7d32"/>
        <polygon points="30,35 -6,92 66,92" fill="#388e3c"/>
      </g>
      <g transform="translate(670, 275)">
        <rect x="22" y="90" width="16" height="35" fill="#6d4c41"/>
        <polygon points="30,10 0,60 60,60" fill="#2e7d32"/>
        <polygon points="30,35 -6,92 66,92" fill="#388e3c"/>
      </g>
      <!-- Ray ve Köprü -->
      <rect y="485" width="800" height="22" fill="#78909c"/>
      <rect y="507" width="800" height="93" fill="#5d4037"/>
      <g fill="#455a64">
        <rect x="40" y="520" width="90" height="80" rx="45"/>
        <rect x="210" y="520" width="90" height="80" rx="45"/>
        <rect x="380" y="520" width="90" height="80" rx="45"/>
        <rect x="550" y="520" width="90" height="80" rx="45"/>
      </g>
      <!-- Duman Bulutları -->
      <g fill="#ffffff" opacity="0.9">
        <circle cx="220" cy="215" r="22"/><circle cx="255" cy="180" r="30"/><circle cx="305" cy="145" r="38"/><circle cx="365" cy="115" r="44"/>
      </g>
      <!-- Lokomotif -->
      <rect x="160" y="340" width="180" height="105" rx="14" fill="#ef5350"/>
      <rect x="255" y="265" width="95" height="180" rx="10" fill="#d32f2f"/>
      <rect x="245" y="252" width="115" height="18" rx="6" fill="#ffca28"/>
      <rect x="275" y="285" width="55" height="48" rx="6" fill="#b3e5fc"/>
      <!-- Baca & Tampon -->
      <polygon points="195,340 185,260 225,260 215,340" fill="#37474f"/>
      <polygon points="160,415 115,445 160,445" fill="#ffca28"/>
      <circle cx="160" cy="392" r="24" fill="#455a64"/>
      <circle cx="152" cy="392" r="10" fill="#fff59d"/>
      <!-- Bağlantı -->
      <rect x="350" y="415" width="35" height="12" fill="#37474f"/>
      <!-- Mavi Vagon -->
      <rect x="380" y="325" width="150" height="120" rx="12" fill="#29b6f6"/>
      <rect x="372" y="315" width="166" height="16" rx="6" fill="#0277bd"/>
      <rect x="402" y="348" width="42" height="42" rx="6" fill="#fff9c4"/>
      <rect x="466" y="348" width="42" height="42" rx="6" fill="#fff9c4"/>
      <rect x="530" y="415" width="30" height="12" fill="#37474f"/>
      <!-- Sarı-Mor Vagon -->
      <rect x="558" y="325" width="150" height="120" rx="12" fill="#ab47bc"/>
      <rect x="550" y="315" width="166" height="16" rx="6" fill="#6a1b9a"/>
      <rect x="580" y="348" width="42" height="42" rx="6" fill="#fff9c4"/>
      <rect x="644" y="348" width="42" height="42" rx="6" fill="#fff9c4"/>
      <!-- Tekerlekler -->
      <g fill="#263238" stroke="#ffca28" stroke-width="6">
        <circle cx="195" cy="455" r="26"/><circle cx="265" cy="455" r="30"/><circle cx="322" cy="455" r="26"/>
        <circle cx="420" cy="455" r="24"/><circle cx="495" cy="455" r="24"/>
        <circle cx="595" cy="455" r="24"/><circle cx="670" cy="455" r="24"/>
      </g>
    </svg>`
  },
  {
    id: "butterfly",
    title: "🦋 Kelebek Bahçesi",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <defs>
        <linearGradient id="sky_btf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#81d4fa"/>
          <stop offset="100%" stop-color="#e8f5e9"/>
        </linearGradient>
        <linearGradient id="wing_btf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ff4081"/>
          <stop offset="50%" stop-color="#ff9800"/>
          <stop offset="100%" stop-color="#ffee58"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#sky_btf)"/>
      <circle cx="690" cy="95" r="55" fill="#fdd835"/>
      <!-- Çimen -->
      <path d="M 0 460 Q 250 420 500 455 T 800 440 L 800 600 L 0 600 Z" fill="#66bb6a"/>
      <!-- Kelebek Kanatları -->
      <path d="M 400 265 C 310 100 120 110 140 245 C 155 335 285 335 395 295 Z" fill="url(#wing_btf)" stroke="#4a148c" stroke-width="6"/>
      <path d="M 400 265 C 490 100 680 110 660 245 C 645 335 515 335 405 295 Z" fill="url(#wing_btf)" stroke="#4a148c" stroke-width="6"/>
      <path d="M 395 305 C 290 315 170 375 215 445 C 260 495 365 440 398 345 Z" fill="#7c4dff" stroke="#4a148c" stroke-width="6"/>
      <path d="M 405 305 C 510 315 630 375 585 445 C 540 495 435 440 402 345 Z" fill="#7c4dff" stroke="#4a148c" stroke-width="6"/>
      <!-- Kanat Benekleri -->
      <circle cx="235" cy="215" r="36" fill="#00e5ff"/>
      <circle cx="565" cy="215" r="36" fill="#00e5ff"/>
      <circle cx="285" cy="390" r="24" fill="#ffeb3b"/>
      <circle cx="515" cy="390" r="24" fill="#ffeb3b"/>
      <!-- Kelebek Gövde ve Kafa -->
      <ellipse cx="400" cy="315" rx="18" ry="85" fill="#311b92"/>
      <circle cx="400" cy="215" r="26" fill="#311b92"/>
      <circle cx="390" cy="210" r="5" fill="#ffffff"/>
      <circle cx="410" cy="210" r="5" fill="#ffffff"/>
      <path d="M 390 190 Q 355 130 330 140" stroke="#311b92" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M 410 190 Q 445 130 470 140" stroke="#311b92" stroke-width="5" fill="none" stroke-linecap="round"/>
      <circle cx="330" cy="140" r="7" fill="#ff4081"/>
      <circle cx="470" cy="140" r="7" fill="#ff4081"/>
      <!-- Laleler ve Papatyalar -->
      <g transform="translate(110, 450)">
        <rect x="16" y="45" width="8" height="80" fill="#2e7d32"/>
        <path d="M 0 35 C 0 5 40 5 40 35 C 40 60 0 60 0 35 Z" fill="#e91e63"/>
      </g>
      <g transform="translate(650, 445)">
        <rect x="16" y="45" width="8" height="80" fill="#2e7d32"/>
        <circle cx="20" cy="32" r="24" fill="#ffffff"/>
        <circle cx="20" cy="32" r="10" fill="#ffeb3b"/>
      </g>
    </svg>`
  },
  {
    id: "castle",
    title: "🏰 Masal Şatosu",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <defs>
        <linearGradient id="sky_cst" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#3949ab"/>
          <stop offset="55%" stop-color="#7986cb"/>
          <stop offset="100%" stop-color="#ffccbc"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#sky_cst)"/>
      <!-- Hilal Ay ve Yıldızlar -->
      <circle cx="120" cy="105" r="44" fill="#fff59d"/>
      <circle cx="138" cy="95" r="38" fill="#4353b3"/>
      <circle cx="640" cy="85" r="6" fill="#fff9c4"/><circle cx="710" cy="150" r="5" fill="#fff9c4"/><circle cx="250" cy="70" r="5" fill="#fff9c4"/>
      <!-- Tepe ve Göl -->
      <ellipse cx="400" cy="590" rx="500" ry="130" fill="#66bb6a"/>
      <ellipse cx="640" cy="545" rx="140" ry="38" fill="#4fc3f7"/>
      <!-- Yan Kuleler -->
      <rect x="200" y="270" width="85" height="230" fill="#fff8e1"/>
      <polygon points="190,270 242,165 295,270" fill="#ec407a"/>
      <rect x="515" y="270" width="85" height="230" fill="#fff8e1"/>
      <polygon points="505,270 558,165 610,270" fill="#ec407a"/>
      <!-- Merkez Kule -->
      <rect x="345" y="185" width="110" height="190" fill="#fffde7"/>
      <polygon points="335,185 400,75 465,185" fill="#7c4dff"/>
      <!-- Bayraklar -->
      <line x1="400" y1="75" x2="400" y2="42" stroke="#ffd54f" stroke-width="4"/>
      <polygon points="400,42 440,54 400,66" fill="#ff5722"/>
      <polygon points="242,140 272,150 242,160" fill="#ffeb3b"/>
      <polygon points="558,140 588,150 558,160" fill="#ffeb3b"/>
      <!-- Ana Kale Duvarı -->
      <rect x="260" y="330" width="280" height="175" fill="#ffe0b2"/>
      <!-- Mazgallar -->
      <g fill="#ffe0b2">
        <rect x="260" y="310" width="32" height="22"/><rect x="310" y="310" width="32" height="22"/>
        <rect x="458" y="310" width="32" height="22"/><rect x="508" y="310" width="32" height="22"/>
      </g>
      <!-- Büyük Kemer Kapı -->
      <path d="M 355 505 L 355 415 A 45 45 0 0 1 445 415 L 445 505 Z" fill="#6d4c41"/>
      <path d="M 366 505 L 366 420 A 34 34 0 0 1 434 420 L 434 505 Z" fill="#8d6e63"/>
      <!-- Pencereler -->
      <rect x="228" y="310" width="28" height="44" rx="14" fill="#29b6f6"/>
      <rect x="544" y="310" width="28" height="44" rx="14" fill="#29b6f6"/>
      <rect x="384" y="230" width="32" height="52" rx="16" fill="#ffeb3b"/>
    </svg>`
  },
  {
    id: "panda",
    title: "🐼 Bambu Panda",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <defs>
        <linearGradient id="sky_pnd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#c8e6c9"/>
          <stop offset="100%" stop-color="#f1f8e9"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#sky_pnd)"/>
      <!-- Arka Bambular -->
      <g fill="#66bb6a">
        <rect x="75" y="20" width="28" height="560" rx="6"/>
        <rect x="135" y="40" width="24" height="540" rx="6"/>
        <rect x="640" y="20" width="28" height="560" rx="6"/>
        <rect x="700" y="50" width="24" height="530" rx="6"/>
      </g>
      <g fill="#43a047">
        <ellipse cx="120" cy="110" rx="40" ry="12" transform="rotate(-25 120 110)"/>
        <ellipse cx="180" cy="170" rx="38" ry="11" transform="rotate(20 180 170)"/>
        <ellipse cx="620" cy="120" rx="40" ry="12" transform="rotate(25 620 120)"/>
        <ellipse cx="680" cy="200" rx="38" ry="11" transform="rotate(-20 680 200)"/>
      </g>
      <!-- Çimen -->
      <ellipse cx="400" cy="580" rx="460" ry="110" fill="#81c784"/>
      <!-- Panda Gövde -->
      <ellipse cx="400" cy="405" rx="128" ry="115" fill="#ffffff"/>
      <!-- Omuz Bandı & Kollar -->
      <ellipse cx="400" cy="345" rx="115" ry="34" fill="#212121"/>
      <ellipse cx="295" cy="395" rx="38" ry="62" fill="#212121" transform="rotate(20 295 395)"/>
      <ellipse cx="505" cy="395" rx="38" ry="62" fill="#212121" transform="rotate(-20 505 395)"/>
      <!-- Bacaklar -->
      <ellipse cx="320" cy="495" rx="48" ry="38" fill="#212121"/>
      <ellipse cx="480" cy="495" rx="48" ry="38" fill="#212121"/>
      <ellipse cx="320" cy="495" rx="22" ry="16" fill="#f8bbd0"/>
      <ellipse cx="480" cy="495" rx="22" ry="16" fill="#f8bbd0"/>
      <!-- Kulaklar & Kafa -->
      <circle cx="310" cy="155" r="42" fill="#212121"/>
      <circle cx="490" cy="155" r="42" fill="#212121"/>
      <ellipse cx="400" cy="235" rx="115" ry="96" fill="#ffffff"/>
      <!-- Göz Lekeleri & Gözler -->
      <ellipse cx="352" cy="228" rx="30" ry="38" fill="#212121" transform="rotate(18 352 228)"/>
      <ellipse cx="448" cy="228" rx="30" ry="38" fill="#212121" transform="rotate(-18 448 228)"/>
      <circle cx="356" cy="224" r="11" fill="#ffffff"/><circle cx="356" cy="224" r="5" fill="#212121"/>
      <circle cx="444" cy="224" r="11" fill="#ffffff"/><circle cx="444" cy="224" r="5" fill="#212121"/>
      <!-- Yanaklar, Burun, Gülümseme -->
      <circle cx="325" cy="268" r="14" fill="#f48fb1" opacity="0.7"/>
      <circle cx="475" cy="268" r="14" fill="#f48fb1" opacity="0.7"/>
      <ellipse cx="400" cy="262" rx="16" ry="11" fill="#212121"/>
      <path d="M 382 282 Q 400 296 418 282" stroke="#212121" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- Elinde Bambu -->
      <rect x="470" y="340" width="16" height="125" rx="5" fill="#43a047" transform="rotate(15 470 340)"/>
    </svg>`
  },
  {
    id: "lighthouse",
    title: "⛵ Deniz Feneri",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <defs>
        <linearGradient id="sky_lth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ff8a65"/>
          <stop offset="55%" stop-color="#ffd54f"/>
          <stop offset="100%" stop-color="#fff9c4"/>
        </linearGradient>
        <linearGradient id="sea_lth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#29b6f6"/>
          <stop offset="100%" stop-color="#0277bd"/>
        </linearGradient>
      </defs>
      <rect width="800" height="410" fill="url(#sky_lth)"/>
      <circle cx="640" cy="180" r="65" fill="#fff59d"/>
      <!-- Martılar -->
      <path d="M 480 110 Q 495 95 510 110 Q 525 95 540 110" stroke="#455a64" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M 550 80 Q 562 68 574 80 Q 586 68 598 80" stroke="#455a64" stroke-width="3" fill="none" stroke-linecap="round"/>
      <!-- Deniz -->
      <rect y="395" width="800" height="205" fill="url(#sea_lth)"/>
      <!-- Dalgalar -->
      <path d="M 0 435 Q 80 415 160 435 T 320 435 T 480 435 T 640 435 T 800 435" stroke="#81d4fa" stroke-width="6" fill="none"/>
      <!-- Kayalık Ada -->
      <path d="M 85 455 Q 150 375 260 390 Q 335 400 355 460 Z" fill="#78909c"/>
      <!-- Fener Kulesi -->
      <polygon points="175,395 192,165 258,165 275,395" fill="#ffffff"/>
      <polygon points="180,335 184,280 266,280 270,335" fill="#ef5350"/>
      <polygon points="188,225 192,165 258,165 262,225" fill="#ef5350"/>
      <!-- Fener Işığı ve Tepesi -->
      <polygon points="260,135 660,70 660,210" fill="#fff59d" opacity="0.35"/>
      <rect x="182" y="155" width="86" height="14" rx="4" fill="#37474f"/>
      <rect x="198" y="112" width="54" height="44" fill="#ffee58"/>
      <polygon points="190,112 225,75 260,112" fill="#d32f2f"/>
      <!-- Yelkenli Tekne 1 -->
      <g transform="translate(440, 345)">
        <polygon points="10,115 150,115 130,148 30,148" fill="#8d6e63"/>
        <rect x="76" y="12" width="7" height="105" fill="#4e342e"/>
        <polygon points="83,16 145,105 83,105" fill="#ffffff"/>
        <polygon points="75,28 22,105 75,105" fill="#ff7043"/>
      </g>
      <!-- Küçük Yelkenli 2 -->
      <g transform="translate(645, 360) scale(0.65)">
        <polygon points="10,115 150,115 130,148 30,148" fill="#5d4037"/>
        <rect x="76" y="12" width="7" height="105" fill="#3e2723"/>
        <polygon points="83,16 145,105 83,105" fill="#ffee58"/>
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
