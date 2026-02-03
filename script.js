// ====== EDIT THESE ======
const CONFIG = {
  name1: "Maurya",
  name2: "Amrutha",
  madeBy: "MK",
  sinceDateISO: "2025-02-03T00:00:00", // <-- change to your relationship start date
  typedLines: [
    "I made this for you, so you can smile anytime,anywhere. 💖",
    "Every day with you feels like my favorite day.",
    "Nannu miss ayna prathi sari ikkadiki ochey ✨ srey na??"
    
  ],
  // Put your photos in /images and list them here:
  gallery: [
    { src: "images/photo1.jpg", caption: "First date❤️" },
    { src: "images/photo2.jpg", caption: "My favorite day" },
    { src: "images/photo3.jpg", caption: "Always you" },
    { src: "images/photo4.jpg", caption: "Forever" },
    { src: "images/photo5.jpg", caption: "Rosehill" },
    { src: "images/photo6.jpg", caption: "Ethnic day" },
    { src: "images/photo7.jpg", caption: "Dept Day" },
    { src: "images/photo8.jpg", caption: "Maya World" },
    { src: "images/photo9.jpg", caption: "New YOU new US" },
    { src: "images/photo10.jpg", caption: "With fam" },
    { src: "images/photo11.jpg", caption: "Fine shyt pulled" },
    { src: "images/photo12.jpg", caption: "Natural and Divine" },
    { src: "images/photo13.jpg", caption: "First Proposal" },
    { src: "images/photo14.jpg", caption: "O.O" },
    { src: "images/photo15.jpg", caption: "Destiny?! " },
    { src: "images/photo16.jpg", caption: "Unfiltered US ❤️ " },
    { src: "images/photo17.jpg", caption: "Us ❤️" },
    { src: "images/photo18.jpg", caption: "Brew and Bistro" },
    { src: "images/photo19.jpg", caption: "I think I won in Life" },
    { src: "images/photo20.jpg", caption: "Simple " },
    { src: "images/photo21.jpg", caption: "Baguunav le❤️" },
    { src: "images/photo22.jpg", caption: "Sarsarle inka po choosindhi challu Go and smile My queen!le❤️" },
  
  ]
};
// ========================

const $ = (id) => document.getElementById(id);

function setText() {
  $("name1").textContent = CONFIG.name1;
  $("name2").textContent = CONFIG.name2;
  $("madeBy").textContent = CONFIG.madeBy;

  const d = new Date(CONFIG.sinceDateISO);
  const opts = { day: "2-digit", month: "short", year: "numeric" };
  $("sinceDateText").textContent = d.toLocaleDateString(undefined, opts);
}

function startTyping() {
  const el = $("typed");
  let lineIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const line = CONFIG.typedLines[lineIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = line.slice(0, charIndex);
      if (charIndex >= line.length) {
        deleting = true;
        setTimeout(tick, 1200);
        return;
      }
    } else {
      charIndex--;
      el.textContent = line.slice(0, charIndex);
      if (charIndex <= 0) {
        deleting = false;
        lineIndex = (lineIndex + 1) % CONFIG.typedLines.length;
      }
    }
    setTimeout(tick, deleting ? 24 : 34);
  };

  tick();
}

function startCountdown() {
  const base = new Date(CONFIG.sinceDateISO).getTime();

  const loop = () => {
    const now = Date.now();
    let diff = Math.max(0, now - base);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);

    const mins = Math.floor(diff / (1000 * 60));

    $("cdDays").textContent = String(days);
    $("cdHours").textContent = String(hours);
    $("cdMins").textContent = String(mins);
  };

  loop();
  setInterval(loop, 1000);
}

function renderGallery() {
  const grid = $("galleryGrid");
  grid.innerHTML = "";

  CONFIG.gallery.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "gItem";
    div.setAttribute("role", "button");
    div.setAttribute("tabindex", "0");
    div.dataset.index = String(i);

    div.innerHTML = `
      <img loading="lazy" src="${item.src}" alt="${item.caption}">
      <div class="gCap">${item.caption}</div>
    `;

    div.addEventListener("click", () => openLightbox(i));
    div.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") openLightbox(i);
    });

    grid.appendChild(div);
  });
}

// Lightbox
let currentIndex = 0;

function openLightbox(i) {
  currentIndex = i;
  const item = CONFIG.gallery[currentIndex];
  $("lbImg").src = item.src;
  $("lbCap").textContent = item.caption;

  $("lightbox").classList.add("show");
  $("lightbox").setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  $("lightbox").classList.remove("show");
  $("lightbox").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function nextPhoto(dir) {
  const n = CONFIG.gallery.length;
  currentIndex = (currentIndex + dir + n) % n;
  const item = CONFIG.gallery[currentIndex];
  $("lbImg").src = item.src;
  $("lbCap").textContent = item.caption;
}

// Music
function setupMusic() {
  const audio = $("bgMusic");
  const btn = $("toggleMusic");

  // Remember state
  const wasPlaying = localStorage.getItem("anniv_music") === "on";
  if (wasPlaying) {
    audio.play().then(() => {
      btn.textContent = "Pause Music 🔇";
      localStorage.setItem("anniv_music", "on");
    }).catch(() => {});
  }

  btn.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
        btn.textContent = "Pause Music 🔇";
        localStorage.setItem("anniv_music", "on");
      } else {
        audio.pause();
        btn.textContent = "Play Music 🎵";
        localStorage.setItem("anniv_music", "off");
      }
    } catch (e) {
      alert("Music couldn’t autoplay. Try tapping again.");
    }
  });
}

function setupLightboxControls() {
  $("lbClose").addEventListener("click", closeLightbox);
  $("lightbox").addEventListener("click", (e) => {
    if (e.target.id === "lightbox") closeLightbox();
  });

  $("lbPrev").addEventListener("click", () => nextPhoto(-1));
  $("lbNext").addEventListener("click", () => nextPhoto(1));

  document.addEventListener("keydown", (e) => {
    const open = $("lightbox").classList.contains("show");
    if (!open) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") nextPhoto(-1);
    if (e.key === "ArrowRight") nextPhoto(1);
  });
}

function init() {
  setText();
  startTyping();
  startCountdown();
  renderGallery();
  setupLightboxControls();
  setupMusic();
}

init();
