document.addEventListener("DOMContentLoaded", () => {
  const bunnyContainer = document.getElementById("bunny");
  const loadingScreen = document.getElementById("loading");
  const welcomeScreen = document.getElementById("welcome");
  const mainContent = document.getElementById("main");
  const openBtn = document.getElementById("openBtn");
  const bgMusic = document.getElementById("bgMusic");
  const countdownEl = document.getElementById("countdown");

  lottie.loadAnimation({ container: bunnyContainer, renderer: "svg", loop: true, autoplay: true, path: "assets/bunny-loading.json" });

  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.style.display = "none";
      welcomeScreen.classList.remove("hidden");
    }, 2000);
  });

  function spawnButterflyLottie(path) {
    const container = document.getElementById("butterfly-container");
    const positions = [
      { left: "10px", top: "10px" },
      { left: "20px", bottom: "10px" },
      { right: "10px", top: "20px" },
      { right: "20px", bottom: "20px" },
    ];
    positions.forEach(pos => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("butterfly-lottie");
      Object.assign(wrapper.style, pos);
      wrapper.style.setProperty("--x", (Math.random() * 300 - 150) + "px");
      wrapper.style.setProperty("--y", (Math.random() * 300 - 150) + "px");
      wrapper.style.animationDuration = (15 + Math.random() * 10) + "s";
      container.appendChild(wrapper);
      lottie.loadAnimation({ container: wrapper, renderer: "svg", loop: true, autoplay: true, path: path });
    });
  }

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      const clickSound = new Audio("assets/click.mp3");
      clickSound.play();
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      const duration = 5000;
      const end = Date.now() + duration;
      (function frame() {
        confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 } });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
      welcomeScreen.style.display = "none";
      mainContent.classList.remove("hidden");
      mainContent.style.display = "flex";
      if (bgMusic && bgMusic.paused) {
        bgMusic.play().catch(() => console.log("Autoplay prevented by browser."));
      }
      spawnButterflyLottie("assets/butterfly.json");
    });
  }

  const Days = document.getElementById('days');
  const Hours = document.getElementById('hours');
  const Minutes = document.getElementById('minutes');
  const Seconds = document.getElementById('seconds');

  const targetDate = new Date("April 29 2025 00:00:00").getTime();

  function timer () {
      const currentDate = new Date().getTime();
      const distance = targetDate - currentDate;

      const days = Math.floor(distance / 1000 / 60 / 60 / 24);
      const hours = Math.floor(distance / 1000 / 60 / 60) % 24;
      const minutes = Math.floor(distance / 1000 / 60) % 60;
      const seconds = Math.floor(distance / 1000) % 60;

      Days.innerHTML = days;
      Hours.innerHTML = hours;
      Minutes.innerHTML = minutes;
      Seconds.innerHTML = seconds;

      if(distance < 0){
          Days.innerHTML = "00";
          Hours.innerHTML = "00";
          Minutes.innerHTML = "00";
          Seconds.innerHTML = "00";
      }
    } 

setInterval(timer, 1000);


const giftButton = document.getElementById('giftButton');
const modal = document.getElementById('giftModal');
const closeBtn = document.querySelector('.close');
const correctPassword = "290403"; // Ganti password sesuai keinginanmu

giftButton.addEventListener('click', () => {
  // Tambahkan animasi shake
  giftButton.classList.add('shake');

  // Setelah animasi selesai (500ms), cek password
  setTimeout(() => {
    giftButton.classList.remove('shake');
    const password = prompt('Masukkan password untuk membuka hadiah:');
    if (password === correctPassword) {
      modal.style.display = 'block';
    } else {
      alert('Password salah!');
    }
  }, 500);
});

// Menutup modal
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// Klik di luar modal untuk menutup
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
});
const firebaseConfig = {
  apiKey: "AIzaSyBUUuSPj-VnfcXNHchP4CWYeJBUixj5MlM",
  authDomain: "komentarpubliklani.firebaseapp.com",
  databaseURL: "https://komentarpubliklani-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "komentarpubliklani",
  storageBucket: "komentarpubliklani.firebasestorage.app",
  messagingSenderId: "725152035101",
  appId: "1:725152035101:web:dadebe33dc87d877f1b1f4"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Submit Comment
document.getElementById('commentForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const comment = document.getElementById('comment').value.trim();
  
  if (name && comment) {
    db.ref('comments').push({
      name: name,
      comment: comment,
      timestamp: Date.now()
    });
    document.getElementById('commentForm').reset();
  }
});

// Load Comments
  db.ref('comments').on('child_added', function(snapshot) {
  const data = snapshot.val();
  
  const commentItem = document.createElement('div');
  commentItem.classList.add('comment-note');

  // Variasi warna pastel
  const colors = ['#f9d5d3', '#fceabb', '#d5f4e6', '#e0c3fc', '#ffecd2'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  // Variasi rotasi kecil
  const randomRotate = (Math.random() * 6 - 3).toFixed(2); // -3deg sampai +3deg

  // Apply style
  commentItem.style.background = randomColor;
  commentItem.style.transform = `rotate(${randomRotate}deg)`;

  // Tambahkan solasi
  const tapeTopLeft = document.createElement('div');
  tapeTopLeft.classList.add('tape-top-left');
  commentItem.appendChild(tapeTopLeft);

  const tapeBottomRight = document.createElement('div');
  tapeBottomRight.classList.add('tape-bottom-right');
  commentItem.appendChild(tapeBottomRight);

  // Isi komentar
  commentItem.innerHTML += `
    <strong style="color: #754a80; font-size: 1.1rem;">${"From : "+data.name}</strong>
    <p style="margin: 0.5rem 0 0; font-size: 1rem; color: #555;">${data.comment}</p>
  `;

  document.getElementById('commentList').appendChild(commentItem);
});