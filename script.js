// ===============================
// Canvas setup
// ===============================
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ===============================
// Button setup
// ===============================
const button = document.getElementById("valentinesButton");
button.style.display = "block"; // ALWAYS show button

// ===============================
// Stars
// ===============================
const stars = [];
const STAR_COUNT = 200;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: random(0, canvas.width),
    y: random(0, canvas.height),
    radius: random(0.5, 1.5),
    alpha: random(0.3, 1),
    speed: random(0.2, 0.6),
  });
}

// ===============================
// Text
// ===============================
const textLines = [
  "amongst trillions and trillions of stars,",
  "over billions of years,",
  "in infinite galaxies...",
  "I found you ❤️"
];

let currentLine = 0;
let textAlpha = 0;

// ===============================
// Draw stars
// ===============================
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let star of stars) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();

    star.alpha += star.speed * 0.01;
    if (star.alpha >= 1 || star.alpha <= 0.3) {
      star.speed *= -1;
    }
  }
}

// ===============================
// Draw text
// ===============================
function drawText() {
  if (currentLine >= textLines.length) return;

  ctx.font = "32px Comic Sans MS";
  ctx.textAlign = "center";
  ctx.fillStyle = `rgba(0, 100, 255, ${textAlpha})`;
  ctx.shadowColor = "#66aaff";
  ctx.shadowBlur = 15;

  ctx.fillText(
    textLines[currentLine],
    canvas.width / 2,
    canvas.height / 2
  );

  textAlpha += 0.01;

  if (textAlpha >= 1) {
    setTimeout(() => {
      textAlpha = 0;
      currentLine++;
    }, 1200);
  }
}

// ===============================
// Animation loop
// ===============================
function animate() {
  drawStars();
  drawText();
  requestAnimationFrame(animate);
}

animate();

// ===============================
// Button click
// ===============================
button.addEventListener("click", () => {
  alert("Happy Valentine’s Day ❤️\nYou mean the universe to me ✨");
});
