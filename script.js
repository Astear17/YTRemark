// Simple Snowfall Animation
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = 9999;

let flakes = [];
let flakeCount = window.innerWidth < 768 ? 40 : 100;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createFlakes() {
  flakes = [];
  for (let i = 0; i < flakeCount; i++) {
    flakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 4 + 1,
      d: Math.random() + 1
    });
  }
}
createFlakes();

function drawFlakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.beginPath();
  for (let flake of flakes) {
    ctx.moveTo(flake.x, flake.y);
    ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2, true);
  }
  ctx.fill();
  moveFlakes();
}

function moveFlakes() {
  for (let flake of flakes) {
    flake.y += Math.pow(flake.d, 2) + 1;
    if (flake.y > canvas.height) {
      flake.x = Math.random() * canvas.width;
      flake.y = 0;
    }
  }
}

function animateSnow() {
  drawFlakes();
  requestAnimationFrame(animateSnow);
}
animateSnow();
