/* ===================================================================
   A LITTLE WORLD MADE JUST FOR SANIAA 🎀
   Pure JavaScript - Interactions, Animations, Confetti & Sound
   =================================================================== */

// Global Configuration for Saniaa's Birthday
const SANIAA_CONFIG = {
  name: "Saniaa",
  happyThings: [
    { emoji: "🌼", front: "A little reminder...", back: "You deserve good things, every single day without exception." },
    { emoji: "☀️", front: "A little sunshine...", back: "May your radiant smile always find a million reasons to shine bright, Sanu." },
    { emoji: "🍓", front: "A little sweetness...", back: "May your upcoming year be sprinkled with unexpected joy and sweet moments." },
    { emoji: "🦋", front: "A little magic...", back: "The universe is so proud of how gracefully you navigate every step." },
    { emoji: "✨", front: "A little sparkle...", back: "Never forget how truly special, gentle, and brilliant your heart is." },
    { emoji: "🎂", front: "Extra blessings...", back: "Extra cake, extra hugs, infinite happiness — all curated just for you, Boss!" },
    { emoji: "🌸", front: "A little kindness...", back: "Aap bohot pyare insan ho, your warmth leaves the sweetest impression." },
    { emoji: "🧸", front: "A little comfort...", back: "Itna overthinking mat kiya karo, Don... you are doing great, always!" }
  ],
  wishes: [
    "May Allah bless you with unshakeable peace and a heart that overflows with joy. 🤍",
    "May every new sunrise bring you something worth smiling about with all your heart. ☀️",
    "May your dreams grow bigger and your courage always rise higher. 🌷",
    "May you always be surrounded by people who cherish and uplift you sincerely. 🧸",
    "May Allah protect you, guide your path, and shower your life with barakah. Ameen. 🌙",
    "May your future unfold into chapters more beautiful than you could ever imagine. 🎀",
    "May you laugh so hard today that your cheeks hurt and eyes sparkle with tears of joy. ♡",
    "May every little challenge turn into an even greater blessing for you. 🌈",
    "May you travel to breathtaking places and collect memories that feel like poetry. 🦋",
    "May you always remember how rare and deeply appreciated you are. 🌸",
    "May your inner confidence bloom like the prettiest rose in spring. 🌻",
    "May cozy moments, peaceful thoughts, and sweet smiles never leave your side. ☕",
    "May every closed door lead you to a palace of greater opportunities. ✨",
    "May your health remain strong, your soul light, and your days radiant like a true boss. 💛",
    "May you find pure magic in the smallest and sweetest everyday details. 🍀",
    "May your most heartfelt duas be answered in ways that make you cry happy tears. 🤲",
    "May this year be the benchmark of pure success, peace, and abundance for you. 🎊",
    "May you always smile from ear to ear, hamare sabse pyare insan! 🌷",
    "May life give you endless reasons to look up and whisper 'Alhamdulillah'. 🌙",
    "May you bloom gracefully in every season of life. 🌷",
    "May the kindness you offer the world come back to you tenfold. 💗",
    "May you never doubt how deeply valued, respected, and loved you are. 🎀",
    "May serenity follow your footsteps wherever you walk. ✨",
    "Happy Birthday once again to the wonderful, graceful Sania! 🌟"
  ],
  compliments: [
    "The world is genuinely a warmer and kinder place because you are in it. 🌷",
    "Aap sach me bohot pyare insan ho — never let the world dim your softness. ✨",
    "Don hai aap, walk with that quiet confidence! 💛",
    "Your sense of humor and warmth can light up any room. 🌸",
    "Thoda chill karo Don, you are already doing so amazingly well! 🧸",
    "Your happiness matters so much more than you probably realize. ☀️",
    "Never apologize for having a big, caring, beautiful heart. 🎀",
    "You carry a quiet strength and elegance that is truly admirable. 💗",
    "Taking time to rest and nurture your soul is your superpower. ☁️",
    "Stay exactly as sincere, sweet, and wonderfully unique as you are! 🤍"
  ]
};

// State Variables
let currentChapter = 0;
const totalChapters = 7;
let currentWishIndex = 0;
let complimentIndex = 0;
let candleBlown = false;
let audioPlaying = false;
let audioContext = null;

// ===================================================================
// CONFETTI SYSTEM (CANVAS ENGINE)
// ===================================================================
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");
let confettiParticles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const CONFETTI_COLORS = [
  "#FFB5C8", "#FF8FAB", "#FFE4A0", "#C9B8FF", "#A8D8EA", "#FFCBA4", "#B5EAD7", "#FF6B8B"
];

class ConfettiParticle {
  constructor(x, y, isExplosion = false) {
    this.x = x ?? Math.random() * canvas.width;
    this.y = y ?? -20;
    this.size = Math.random() * 8 + 6;
    this.color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 8;
    this.shape = Math.random() > 0.4 ? "circle" : (Math.random() > 0.5 ? "rect" : "heart");
    
    if (isExplosion) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 12 + 4;
      this.vx = Math.cos(angle) * velocity;
      this.vy = Math.sin(angle) * velocity - 3;
      this.gravity = 0.22;
      this.drag = 0.96;
    } else {
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = Math.random() * 2.5 + 1.5;
      this.gravity = 0.05;
      this.drag = 0.99;
    }
    this.opacity = 1;
    this.fade = isExplosion ? 0.012 : 0.003;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.vx *= this.drag;
    this.vy *= this.drag;
    this.rotation += this.rotationSpeed;
    this.opacity -= this.fade;
  }

  draw() {
    if (this.opacity <= 0) return;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.globalAlpha = Math.max(0, this.opacity);
    ctx.fillStyle = this.color;

    if (this.shape === "circle") {
      ctx.beginPath();
      ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.shape === "rect") {
      ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
    } else if (this.shape === "heart") {
      const s = this.size * 0.7;
      ctx.beginPath();
      ctx.moveTo(0, s / 4);
      ctx.quadraticCurveTo(0, 0, s / 2, 0);
      ctx.quadraticCurveTo(s, 0, s, s / 2);
      ctx.quadraticCurveTo(s, s, 0, s * 1.3);
      ctx.quadraticCurveTo(-s, s, -s, s / 2);
      ctx.quadraticCurveTo(-s, 0, -s / 2, 0);
      ctx.quadraticCurveTo(0, 0, 0, s / 4);
      ctx.fill();
    }
    ctx.restore();
  }
}

function burstConfetti(count = 70, x = window.innerWidth / 2, y = window.innerHeight / 2) {
  for (let i = 0; i < count; i++) {
    confettiParticles.push(new ConfettiParticle(x, y, true));
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    const p = confettiParticles[i];
    p.update();
    p.draw();
    if (p.opacity <= 0 || p.y > canvas.height + 50) {
      confettiParticles.splice(i, 1);
    }
  }
  requestAnimationFrame(animateConfetti);
}
animateConfetti();

// ===================================================================
// AMBIENT MUSIC BOX (WEB AUDIO API - ZERO EXTERNAL DEPENDENCY)
// ===================================================================
function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
}

// Gentle pleasant lullaby melody chords (C major / G major dream chords)
const MELODY_NOTES = [
  261.63, 329.63, 392.00, 523.25, 493.88, 392.00, 329.63,
  293.66, 369.99, 440.00, 587.33, 440.00, 369.99, 293.66,
  329.63, 392.00, 523.25, 659.25, 523.25, 392.00, 329.63
];
let melodyIndex = 0;
let melodyInterval = null;

function playMusicBoxNote(freq) {
  if (!audioContext || !audioPlaying) return;
  try {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioContext.currentTime);

    gain.gain.setValueAtTime(0.001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, audioContext.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1.8);

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start();
    osc.stop(audioContext.currentTime + 1.8);
  } catch (e) {
    console.error(e);
  }
}

function startMelody() {
  melodyInterval = setInterval(() => {
    if (audioPlaying) {
      playMusicBoxNote(MELODY_NOTES[melodyIndex]);
      melodyIndex = (melodyIndex + 1) % MELODY_NOTES.length;
    }
  }, 450);
}

const audioToggleBtn = document.getElementById("audio-toggle");
const audioIcon = document.getElementById("audio-icon");
const audioText = document.getElementById("audio-text");

audioToggleBtn.addEventListener("click", () => {
  initAudio();
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  audioPlaying = !audioPlaying;

  if (audioPlaying) {
    audioIcon.textContent = "🎵";
    audioText.textContent = "Melody Playing";
    if (!melodyInterval) startMelody();
  } else {
    audioIcon.textContent = "🎶";
    audioText.textContent = "Play Melody";
  }
});

// Sound chime for cute interactions
function playChime() {
  initAudio();
  if (!audioContext) return;
  try {
    if (audioContext.state === "suspended") audioContext.resume();
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(587.33, audioContext.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.2); // A5

    gain.gain.setValueAtTime(0.1, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.45);

    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start();
    osc.stop(audioContext.currentTime + 0.45);
  } catch(e) {}
}

// ===================================================================
// CHAPTER NAVIGATION & SWIPE SUPPORT
// ===================================================================
function goToChapter(index) {
  if (index < 0 || index >= totalChapters) return;
  currentChapter = index;

  // Update Sections
  const sections = document.querySelectorAll(".chapter-section");
  sections.forEach((sec, idx) => {
    if (idx === currentChapter) {
      sec.classList.add("active");
    } else {
      sec.classList.remove("active");
    }
  });

  // Update Bottom Nav
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((btn, idx) => {
    btn.classList.toggle("active", idx === currentChapter);
    btn.classList.toggle("completed", idx < currentChapter);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });

  // Confetti trigger for celebratory chapters
  if (currentChapter === 1 || currentChapter === 6) {
    burstConfetti(50);
  }
}

// Bottom nav clicks
document.querySelectorAll(".nav-item").forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    playChime();
    goToChapter(idx);
  });
});

// Mobile Swipe Detection
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const swipeDist = touchEndX - touchStartX;
  if (Math.abs(swipeDist) > 60) {
    if (swipeDist < 0 && currentChapter < totalChapters - 1) {
      // Swiped Left -> Next Chapter
      playChime();
      goToChapter(currentChapter + 1);
    } else if (swipeDist > 0 && currentChapter > 0) {
      // Swiped Right -> Previous Chapter
      playChime();
      goToChapter(currentChapter - 1);
    }
  }
}

// ===================================================================
// CHAPTER 1: ENVELOPE OPENING
// ===================================================================
const envelopeWrapper = document.getElementById("envelope-wrapper");
const openSurpriseBtn = document.getElementById("open-surprise-btn");

function triggerOpenEnvelope() {
  if (envelopeWrapper.classList.contains("opened")) {
    goToChapter(1);
    return;
  }
  playChime();
  envelopeWrapper.classList.add("opened");
  burstConfetti(60, window.innerWidth / 2, window.innerHeight / 2);

  setTimeout(() => {
    goToChapter(1);
  }, 1600);
}

if (envelopeWrapper) envelopeWrapper.addEventListener("click", triggerOpenEnvelope);
if (openSurpriseBtn) openSurpriseBtn.addEventListener("click", triggerOpenEnvelope);

// ===================================================================
// CHAPTER 2: BLOWING CANDLE & CAKE CELEBRATION
// ===================================================================
const cakeStage = document.getElementById("cake-stage");
const candleFlame = document.getElementById("candle-flame");
const candleSmoke = document.getElementById("candle-smoke");
const wishUnfolded = document.getElementById("wish-unfolded");
const cakeNextBtn = document.getElementById("cake-next-btn");

function blowCandle() {
  if (candleBlown) return;
  candleBlown = true;
  playChime();

  candleFlame.classList.add("blown");
  candleSmoke.classList.add("show");

  burstConfetti(100, window.innerWidth / 2, window.innerHeight * 0.4);

  setTimeout(() => {
    wishUnfolded.style.display = "block";
  }, 400);
}

if (cakeStage) cakeStage.addEventListener("click", blowCandle);
if (cakeNextBtn) cakeNextBtn.addEventListener("click", () => goToChapter(2));

// ===================================================================
// CHAPTER 3: RENDER FLIP CARDS (HAPPY THINGS FOR SANIAA)
// ===================================================================
const cardsGrid = document.getElementById("cards-grid");
if (cardsGrid) {
  cardsGrid.innerHTML = SANIAA_CONFIG.happyThings.map((item, index) => `
    <div class="flip-card" data-index="${index}">
      <div class="flip-card-inner">
        <div class="card-front">
          <div class="card-emoji">${item.emoji}</div>
          <div class="card-title">${item.front}</div>
          <div class="card-tap-hint">Tap to reveal ✨</div>
        </div>
        <div class="card-back">
          <p>${item.back}</p>
        </div>
      </div>
    </div>
  `).join("");

  document.querySelectorAll(".flip-card").forEach(card => {
    card.addEventListener("click", () => {
      playChime();
      card.classList.toggle("is-flipped");
    });
  });
}

const flipNextBtn = document.getElementById("flip-next-btn");
if (flipNextBtn) flipNextBtn.addEventListener("click", () => goToChapter(3));

// ===================================================================
// CHAPTER 4: 24 BIRTHDAY WISHES CAROUSEL
// ===================================================================
const wishContent = document.getElementById("wish-content");
const wishCounter = document.getElementById("wish-counter");
const prevWishBtn = document.getElementById("prev-wish-btn");
const nextWishBtn = document.getElementById("next-wish-btn");
const wishesDots = document.getElementById("wishes-dots");

function renderWish(index) {
  currentWishIndex = (index + SANIAA_CONFIG.wishes.length) % SANIAA_CONFIG.wishes.length;
  
  if (wishContent) {
    wishContent.style.opacity = "0";
    setTimeout(() => {
      wishContent.textContent = `"${SANIAA_CONFIG.wishes[currentWishIndex]}"`;
      wishContent.style.opacity = "1";
    }, 180);
  }

  if (wishCounter) {
    wishCounter.textContent = `WISH ${currentWishIndex + 1} OF ${SANIAA_CONFIG.wishes.length}`;
  }

  // Update dots
  document.querySelectorAll(".wish-dot").forEach((dot, idx) => {
    dot.classList.toggle("active", idx === currentWishIndex);
  });
}

// Render dots preview
if (wishesDots) {
  wishesDots.innerHTML = SANIAA_CONFIG.wishes.map((_, i) => `
    <span class="wish-dot ${i === 0 ? 'active' : ''}" data-wish="${i}"></span>
  `).join("");

  document.querySelectorAll(".wish-dot").forEach(dot => {
    dot.addEventListener("click", (e) => {
      const idx = parseInt(e.target.dataset.wish);
      playChime();
      renderWish(idx);
    });
  });
}

if (prevWishBtn) prevWishBtn.addEventListener("click", () => {
  playChime();
  renderWish(currentWishIndex - 1);
});

if (nextWishBtn) nextWishBtn.addEventListener("click", () => {
  playChime();
  renderWish(currentWishIndex + 1);
});

const wishesNextChapterBtn = document.getElementById("wishes-next-chapter-btn");
if (wishesNextChapterBtn) wishesNextChapterBtn.addEventListener("click", () => goToChapter(4));

// Initialize first wish
renderWish(0);

// ===================================================================
// CHAPTER 5: DUA & PRAYER GARDEN FOR SANIAA
// ===================================================================
const gardenNextBtn = document.getElementById("garden-next-btn");
if (gardenNextBtn) gardenNextBtn.addEventListener("click", () => goToChapter(5));

// ===================================================================
// CHAPTER 6: COMPLIMENT BOX (A JAR OF SWEET REMINDERS FOR SANIAA)
// ===================================================================
const giftBoxStage = document.getElementById("gift-box-stage");
const complimentText = document.getElementById("compliment-text");
const nextComplimentBtn = document.getElementById("next-compliment-btn");
const complimentNextBtn = document.getElementById("compliment-next-btn");

function getNextCompliment() {
  playChime();
  burstConfetti(45, window.innerWidth / 2, window.innerHeight * 0.45);
  complimentIndex = (complimentIndex + 1) % SANIAA_CONFIG.compliments.length;
  
  if (complimentText) {
    complimentText.style.opacity = "0";
    setTimeout(() => {
      complimentText.textContent = SANIAA_CONFIG.compliments[complimentIndex];
      complimentText.style.opacity = "1";
    }, 150);
  }
}

if (giftBoxStage) giftBoxStage.addEventListener("click", getNextCompliment);
if (nextComplimentBtn) nextComplimentBtn.addEventListener("click", getNextCompliment);
if (complimentNextBtn) complimentNextBtn.addEventListener("click", () => goToChapter(6));

// ===================================================================
// CHAPTER 7: GRAND FINALE KEEPSAKE LETTER FOR SANIAA
// ===================================================================
const copyLetterBtn = document.getElementById("copy-letter-btn");
const replayJourneyBtn = document.getElementById("replay-journey-btn");
const celebrationBurstBtn = document.getElementById("celebration-burst-btn");

if (celebrationBurstBtn) {
  celebrationBurstBtn.addEventListener("click", () => {
    playChime();
    burstConfetti(120);
  });
}

if (copyLetterBtn) {
  copyLetterBtn.addEventListener("click", () => {
    playChime();
    const letterContent = `Happy Birthday Dearest Saniaa! 🎀\n\nMay Allah always protect you, bless your life with genuine peace, and guide you towards everything that is best for you.\nMay your days be filled with warm smiles, boundless barakah, good health, and joyful moments.\n\nKeep smiling and shining bright, Sanu!\n— With love & sincere duas. ♡`;
    
    navigator.clipboard.writeText(letterContent).then(() => {
      const originalText = copyLetterBtn.innerHTML;
      copyLetterBtn.innerHTML = `<span>Copied with Love! 💌</span>`;
      setTimeout(() => {
        copyLetterBtn.innerHTML = originalText;
      }, 2500);
    }).catch(() => {
      alert("Letter copied to your heart! 💌");
    });
  });
}

if (replayJourneyBtn) {
  replayJourneyBtn.addEventListener("click", () => {
    playChime();
    candleBlown = false;
    if (candleFlame) candleFlame.classList.remove("blown");
    if (candleSmoke) candleSmoke.classList.remove("show");
    if (wishUnfolded) wishUnfolded.style.display = "none";
    if (envelopeWrapper) envelopeWrapper.classList.remove("opened");
    goToChapter(0);
  });
}

// Initial Chapter Activation
goToChapter(0);
