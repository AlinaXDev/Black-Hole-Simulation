const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext("2d");

const speedSlider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");

const cx = canvas.width / 2;
const cy = canvas.height / 2;

const blackHoleMass = 1000;
const r = 30;

let planet = {
  x: cx + 200,
  y: cy,
  vx: 0,
  vy: Number(speedSlider.value)
};

speedSlider.addEventListener("input", () => {
  speedValue.textContent = speedSlider.value;

  planet.x = cx + 200;
  planet.y = cy;
  planet.vx = 0;
  planet.vy = Number(speedSlider.value);
});

function update() {
  let dx = cx - planet.x;
  let dy = cy - planet.y;

  let distance = Math.sqrt(dx * dx + dy * dy);

  let force = blackHoleMass / (distance * distance);
  let ax = force * dx / distance;
  let ay = force * dy / distance;

  planet.vx += ax;
  planet.vy += ay;

  planet.x += planet.vx;
  planet.y += planet.vy;

  if (distance < r) {
    planet.vx = 0;
    planet.vy = 0;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(planet.x, planet.y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "blue";
  ctx.fill();
}

function animate() {
  update();
  draw();
  requestAnimationFrame(animate);
}

animate();