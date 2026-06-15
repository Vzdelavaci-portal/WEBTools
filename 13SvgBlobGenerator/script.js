const blobSvg = document.getElementById("blobSvg");
const svgOutput = document.getElementById("svgOutput");
const message = document.getElementById("message");
const previewStage = document.getElementById("previewStage");

const pointsInput = document.getElementById("points");
const irregularityInput = document.getElementById("irregularity");
const smoothnessInput = document.getElementById("smoothness");
const color1Input = document.getElementById("color1");
const color2Input = document.getElementById("color2");
const useGradientInput = document.getElementById("useGradient");
const showGridInput = document.getElementById("showGrid");

const pointsValue = document.getElementById("pointsValue");
const irregularityValue = document.getElementById("irregularityValue");
const smoothnessValue = document.getElementById("smoothnessValue");

const randomBtn = document.getElementById("randomBtn");
const copySvgBtn = document.getElementById("copySvgBtn");
const copyCssBtn = document.getElementById("copyCssBtn");

let seed = Math.random();

function randomFromSeed(index) {
  const x = Math.sin(seed * 10000 + index * 999) * 10000;
  return x - Math.floor(x);
}

function generatePoints() {
  const count = Number(pointsInput.value);
  const irregularity = Number(irregularityInput.value);
  const centerX = 250;
  const centerY = 250;
  const baseRadius = 150;

  const points = [];

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;

    const randomOffset =
      (randomFromSeed(i) - 0.5) * 2 * irregularity;

    const radius = baseRadius + randomOffset;

    points.push({
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius
    });
  }

  return points;
}

function createSmoothPath(points) {
  const smoothness = Number(smoothnessInput.value) / 100;
  let path = "";

  for (let i = 0; i < points.length; i++) {
    const current = points[i];
    const next = points[(i + 1) % points.length];
    const previous = points[(i - 1 + points.length) % points.length];
    const afterNext = points[(i + 2) % points.length];

    if (i === 0) {
      path += `M ${current.x.toFixed(2)} ${current.y.toFixed(2)} `;
    }

    const controlPoint1 = {
      x: current.x + (next.x - previous.x) * smoothness * 0.18,
      y: current.y + (next.y - previous.y) * smoothness * 0.18
    };

    const controlPoint2 = {
      x: next.x - (afterNext.x - current.x) * smoothness * 0.18,
      y: next.y - (afterNext.y - current.y) * smoothness * 0.18
    };

    path += `C ${controlPoint1.x.toFixed(2)} ${controlPoint1.y.toFixed(2)}, ${controlPoint2.x.toFixed(2)} ${controlPoint2.y.toFixed(2)}, ${next.x.toFixed(2)} ${next.y.toFixed(2)} `;
  }

  path += "Z";

  return path;
}

function getSvgMarkup(path) {
  const color1 = color1Input.value;
  const color2 = color2Input.value;
  const useGradient = useGradientInput.checked;

  if (useGradient) {
    return `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
  </defs>

  <path d="${path}" fill="url(#blobGradient)" />
</svg>`;
  }

  return `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
  <path d="${path}" fill="${color1}" />
</svg>`;
}

function renderBlob() {
  const points = generatePoints();
  const path = createSmoothPath(points);
  const svgMarkup = getSvgMarkup(path);

  blobSvg.innerHTML = svgMarkup
    .replace(`<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">`, "")
    .replace("</svg>", "");

  svgOutput.textContent = svgMarkup;

  pointsValue.textContent = pointsInput.value;
  irregularityValue.textContent = `${irregularityInput.value}%`;
  smoothnessValue.textContent = `${smoothnessInput.value}%`;

  previewStage.classList.toggle("grid", showGridInput.checked);

  message.textContent = "";
}

function randomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

function randomBlob() {
  seed = Math.random();

  pointsInput.value = Math.floor(Math.random() * 8) + 6;
  irregularityInput.value = Math.floor(Math.random() * 55) + 15;
  smoothnessInput.value = Math.floor(Math.random() * 45) + 50;

  color1Input.value = randomColor();
  color2Input.value = randomColor();
  useGradientInput.checked = Math.random() > 0.25;

  renderBlob();
}

function getCssCode() {
  const color1 = color1Input.value;
  const color2 = color2Input.value;

  if (useGradientInput.checked) {
    return `.blob {
  background: linear-gradient(135deg, ${color1}, ${color2});
  clip-path: path("SVG path can be used directly inside inline SVG.");
}`;
  }

  return `.blob {
  background: ${color1};
}`;
}

async function copyText(text, type) {
  try {
    await navigator.clipboard.writeText(text);
    message.textContent = `${type} copied to clipboard!`;
  } catch {
    message.textContent = "Copy failed.";
  }
}

[
  pointsInput,
  irregularityInput,
  smoothnessInput,
  color1Input,
  color2Input,
  useGradientInput,
  showGridInput
].forEach(input => {
  input.addEventListener("input", renderBlob);
});

randomBtn.addEventListener("click", randomBlob);

copySvgBtn.addEventListener("click", () => {
  copyText(svgOutput.textContent, "SVG");
});

copyCssBtn.addEventListener("click", () => {
  copyText(getCssCode(), "CSS");
});

randomBlob();