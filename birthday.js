// Particle animation with shining stars
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 100;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.opacity = Math.random();
    this.fadeSpeed = Math.random() * 0.02 + 0.01;
    this.growing = Math.random() > 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.growing) {
      this.opacity += this.fadeSpeed;
      if (this.opacity >= 1) this.growing = false;
    } else {
      this.opacity -= this.fadeSpeed;
      if (this.opacity <= 0) this.growing = true;
    }

    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#fff";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

function init() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }

  requestAnimationFrame(animate);
}

init();
animate();

// Create floating hearts
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "hearts";
  heart.style.left = Math.random() * 100 + "%";
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";
  heart.style.animationDelay = Math.random() * 2 + "s";
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

setInterval(createHeart, 500);

// Handle photo upload
const fileInput = document.getElementById("fileInput");
const photoContainer = document.getElementById("photoContainer");

fileInput.addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = document.createElement("img");
      img.src = event.target.result;
      photoContainer.innerHTML = "";
      photoContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
});

// Resize canvas on window resize
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

// Add sparkle effect on click
document.addEventListener("click", function (e) {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const sparkle = new Particle();
      sparkle.x = e.clientX;
      sparkle.y = e.clientY;
      sparkle.size = Math.random() * 4 + 2;
      particlesArray.push(sparkle);
    }, i * 50);
  }
});
