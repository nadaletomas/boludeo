const canvas = document.getElementById("futuristic-bg");
const ctx = canvas.getContext("2d");
let width, height, particles;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 1.5 + 0.5
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#0ff";
  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;
  }

  requestAnimationFrame(draw);
}

window.addEventListener("resize", () => {
  resize();
  initParticles();
});

resize();
initParticles();
draw();
