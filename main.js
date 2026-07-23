const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext("2d");

const speedSlider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");

// مركز الثقب الأسود
const cx = canvas.width / 2;
const cy = canvas.height / 2;

// خصائص الثقب الأسود
const blackHoleMass = 1000;
const r = 30;

// الكوكب
let planet = {
  x: cx + 200,
  y: cy,
  vx: 0,
  vy: Number(speedSlider.value)
};

// تحديث السرعة من السلايدر
speedSlider.addEventListener("input", () => {
  speedValue.textContent = speedSlider.value;

  // إعادة ضبط الكوكب
  planet.x = cx + 200;
  planet.y = cy;
  planet.vx = 0;
  planet.vy = Number(speedSlider.value);
});

function update() {
  let dx = cx - planet.x;
  let dy = cy - planet.y;

  let distance = Math.sqrt(dx * dx + dy * dy);

  // الجاذبية
  let force = blackHoleMass / (distance * distance);
  let ax = force * dx / distance;
  let ay = force * dy / distance;

  // تحديث السرعة
  planet.vx += ax;
  planet.vy += ay;

  // تحديث الموقع
  planet.x += planet.vx;
  planet.y += planet.vy;

  // إذا دخل الثقب → يوقف
  if (distance < r) {
    planet.vx = 0;
    planet.vy = 0;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // الثقب الأسود
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();

  // الكوكب
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