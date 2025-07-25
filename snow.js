// ❄️ SNOWFALL ANIMATION
const canvas = document.getElementById("snowfall");
const ctx = canvas.getContext("2d");

let w = window.innerWidth;
let h = window.innerHeight;
canvas.width = w;
canvas.height = h;

let flakes = [];

function initFlakes() {
  flakes = [];
  for (let i = 0; i < 150; i++) {
    flakes.push({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 3 + 1,
      speedY: Math.random() * 1 + 0.5,
      speedX: Math.random() * 0.5 - 0.25,
      opacity: Math.random() * 0.5 + 0.5
    });
  }
}

function drawFlakes() {
  ctx.clearRect(0, 0, w, h);
  for (let flake of flakes) {
    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
    ctx.fill();

    flake.y += flake.speedY;
    flake.x += flake.speedX;

    // Respawn at top when flake goes off bottom
    if (flake.y > h) {
      flake.y = 0;
      flake.x = Math.random() * w;
    }
  }
  requestAnimationFrame(drawFlakes);
}

// Reinitialize on resize
window.addEventListener("resize", () => {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
  initFlakes();
});

initFlakes();
drawFlakes();


// 🌙 DARK MODE TOGGLE (with localStorage support)
function toggleDarkMode() {
  const body = document.body;
  const btn = document.querySelector(".toggle-btn");

  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    if (btn) btn.textContent = "🌙";
  } else {
    localStorage.setItem("theme", "light");
    if (btn) btn.textContent = "❄️";
  }
}

// 🖋️ TYPING EFFECT (only if #typedText exists)
function startTypingEffect() {
  const typedText = document.getElementById("typedText");
  if (!typedText) return;

  const phrases = [
    "DEVELOPER",
    "VIDEO EDITOR",
    "UI/UX DESIGNER",
    "CREATIVE TECHNOLOGIST"
  ];

  let phraseIndex = 0;
  let letterIndex = 0;
  let currentPhrase = "";
  let isDeleting = false;

  function typeEffect() {
    if (phraseIndex >= phrases.length) phraseIndex = 0;
    currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      typedText.textContent = currentPhrase.substring(0, letterIndex);
      letterIndex++;
      if (letterIndex > currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
        return;
      }
    } else {
      typedText.textContent = currentPhrase.substring(0, letterIndex);
      letterIndex--;
      if (letterIndex === 0) {
        isDeleting = false;
        phraseIndex++;
      }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }

  typeEffect();
}


// 🚀 INTRO SCREEN + TYPING ON FIRST VISIT
document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");

  // 🌙 Apply saved theme preference
  const savedTheme = localStorage.getItem("theme");
  const btn = document.querySelector(".toggle-btn");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (btn) btn.textContent = "🌙";
  } else {
    document.body.classList.remove("dark-mode");
    if (btn) btn.textContent = "❄️";
  }

  if (!hasSeenIntro && intro) {
    intro.style.display = "flex";
    intro.addEventListener("animationend", () => {
      intro.style.display = "none";
      startTypingEffect();
      sessionStorage.setItem("hasSeenIntro", "true");
    });
  } else {
    if (intro) intro.style.display = "none";
    startTypingEffect();
  }

});


// 📄 MODAL CONTROLS
function openModal(modalId) {
  const modal = document.getElementById(`${modalId}-modal`);
  const navBar = document.querySelector("nav");

  if (modal) {
    modal.style.display = "block";
    navBar.style.display = "none"; // Hide nav bar when modal opens
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(`${modalId}-modal`);
  const navBar = document.querySelector("nav");

  if (modal) {
    modal.style.display = "none";
    navBar.style.display = "flex"; // Restore nav bar when modal closes
  }
}

// ⛔ Close modal when clicking outside its content (but ignore clicks on trigger buttons)
window.addEventListener("click", function (event) {
  const modals = document.querySelectorAll(".modal");

  modals.forEach((modal) => {
    const content = modal.querySelector(".modal-content");

    const isOpen = modal.style.display === "block";
    const clickedInsideModal = content.contains(event.target);
    const clickedTrigger = event.target.matches(".view-btn, .view-btn ,view*");

    if (isOpen && !clickedInsideModal && !clickedTrigger) {
      modal.style.display = "none";
      const navBar = document.querySelector("nav");
      if (navBar) navBar.style.display = "flex";
    }
  });
});
