// === script.js ===

// Bunny loading animation
const bunnyContainer = document.getElementById("bunny");
const loadingScreen = document.getElementById("loading");
const welcomeScreen = document.getElementById("welcome");
const mainContent = document.getElementById("main");
const openBtn = document.getElementById("openBtn");
const bgMusic = document.getElementById("bgMusic");
const musicToggleBtn = document.getElementById("musicToggle");

// Load Lottie animation
lottie.loadAnimation({
  container: bunnyContainer,
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "assets/bunny-loading.json",
});

// Show welcome screen after loading
window.addEventListener("load", () => {
  setTimeout(() => {
    loadingScreen.style.display = "none";
    welcomeScreen.classList.remove("hidden");
  }, 2000);
});

// Load confetti function (from external script)
function launchConfetti(duration = 5000) {
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// Handle open invitation click
openBtn.addEventListener("click", () => {
  const clickSound = new Audio("assets/click.mp3");
  clickSound.play();
  launchConfetti();

  welcomeScreen.classList.add("hidden");
  mainContent.classList.remove("hidden");

  // Start background music if not autoplayed
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {
      console.log("Autoplay prevented by browser.");
    });
  }
});

// Toggle music play/pause
if (musicToggleBtn) {
  musicToggleBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicToggleBtn.textContent = "🔊 Music On";
    } else {
      bgMusic.pause();
      musicToggleBtn.textContent = "🔇 Music Off";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const bunnyContainer = document.getElementById("bunny");
  const loadingScreen = document.getElementById("loading");
  const welcomeScreen = document.getElementById("welcome");
  const mainContent = document.getElementById("main");
  const openBtn = document.getElementById("openBtn");
  const bgMusic = document.getElementById("bgMusic");
  const musicToggleBtn = document.getElementById("musicToggle");

  // Load Lottie animation
  lottie.loadAnimation({
    container: bunnyContainer,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "assets/bunny-loading.json",
  });

  // Show welcome screen after loading
  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.style.display = "none";
      welcomeScreen.classList.remove("hidden");
    }, 2000);
  });

  // Confetti effect
  function launchConfetti(duration = 5000) {
    const end = Date.now() + duration;
    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }

  // Handle invitation open
  if (openBtn) {
    openBtn.addEventListener("click", () => {
      const clickSound = new Audio("assets/click.mp3");
      clickSound.play();
      launchConfetti();
      welcomeScreen.classList.add("hidden");
      mainContent.classList.remove("hidden");
      if (bgMusic && bgMusic.paused) {
        bgMusic.play().catch(() => console.log("Autoplay prevented by browser."));
      }
    });
  }

  // Toggle music
  if (musicToggleBtn) {
    musicToggleBtn.addEventListener("click", () => {
      if (bgMusic.paused) {
        bgMusic.play();
        musicToggleBtn.textContent = "🔊 Music On";
      } else {
        bgMusic.pause();
        musicToggleBtn.textContent = "🔇 Music Off";
      }
    });
  }
});
