const canvas = document.getElementById("futuristic-bg");
const ctx = canvas.getContext("2d");

let width, height, particles;
let mouse = { x: null, y: null };
let hue = 200; // color base

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      radius: Math.random() * 1.5 + 0.5
    });
  }
}

function drawBackgroundGradient() {
  const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width);
  const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (darkMode) {
    gradient.addColorStop(0, "#000010");
    gradient.addColorStop(1, "#000000");
  } else {
    gradient.addColorStop(0, "#e0f7fa");
    gradient.addColorStop(1, "#ffffff");
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        const alpha = 1 - dist / 100;
        ctx.strokeStyle = `hsla(${hue}, 100%, 70%, ${alpha})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function draw() {
  drawBackgroundGradient();

  drawLines();

  ctx.fillStyle = `hsl(${hue}, 100%, 70%)`;
  for (const p of particles) {
    // interacción con el mouse
    let dx = mouse.x - p.x;
    let dy = mouse.y - p.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100 && mouse.x !== null && mouse.y !== null) {
      p.vx += dx * 0.0005;
      p.vy += dy * 0.0005;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;
  }

  hue = (hue + 0.5) % 360;
  requestAnimationFrame(draw);
}

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("mouseout", () => {
  mouse.x = null;
  mouse.y = null;
});

window.addEventListener("resize", () => {
  resize();
  initParticles();
});

resize();
initParticles();
draw();
