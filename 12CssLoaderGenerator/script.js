const loaderPreview = document.getElementById("loaderPreview");
const htmlOutput = document.getElementById("htmlOutput");
const cssOutput = document.getElementById("cssOutput");
const message = document.getElementById("message");

const loaderType = document.getElementById("loaderType");
const loaderColor = document.getElementById("loaderColor");
const loaderSize = document.getElementById("loaderSize");
const loaderSpeed = document.getElementById("loaderSpeed");
const loaderThickness = document.getElementById("loaderThickness");

const sizeValue = document.getElementById("sizeValue");
const speedValue = document.getElementById("speedValue");
const thicknessValue = document.getElementById("thicknessValue");

const copyHtmlBtn = document.getElementById("copyHtmlBtn");
const copyCssBtn = document.getElementById("copyCssBtn");
const presetButtons = document.querySelectorAll("[data-preset]");

function getLoaderHTML(type) {
  if (type === "dots") {
    return `<div class="loader loader-dots">
  <span></span>
  <span></span>
  <span></span>
</div>`;
  }

  if (type === "bars") {
    return `<div class="loader loader-bars">
  <span></span>
  <span></span>
  <span></span>
</div>`;
  }

  return `<div class="loader loader-${type}"></div>`;
}

function getBaseCSS() {
  return `.loader {
  --loader-size: ${loaderSize.value}px;
  --loader-color: ${loaderColor.value};
  --loader-speed: ${loaderSpeed.value}s;
  --loader-thickness: ${loaderThickness.value}px;

  width: var(--loader-size);
  height: var(--loader-size);
  color: var(--loader-color);
}`;
}

function getLoaderCSS(type) {
  const base = getBaseCSS();

  const animations = `
@keyframes loader-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes loader-bounce {
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.45;
  }

  40% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes loader-pulse {
  0% {
    transform: scale(0.85);
    opacity: 0.45;
  }

  50% {
    transform: scale(1.12);
    opacity: 1;
  }

  100% {
    transform: scale(0.85);
    opacity: 0.45;
  }
}

@keyframes loader-bars {
  0%, 100% {
    transform: scaleY(0.45);
    opacity: 0.45;
  }

  50% {
    transform: scaleY(1);
    opacity: 1;
  }
}`;

  const cssMap = {
    spinner: `.loader-spinner {
  border: var(--loader-thickness) solid currentColor;
  border-color: currentColor transparent currentColor transparent;
  border-radius: 50%;
  animation: loader-spin var(--loader-speed) linear infinite;
}`,

    dots: `.loader-dots {
  display: flex;
  gap: calc(var(--loader-size) * 0.16);
  align-items: center;
  justify-content: center;
}

.loader-dots span {
  width: calc(var(--loader-size) * 0.22);
  height: calc(var(--loader-size) * 0.22);
  background: currentColor;
  border-radius: 50%;
  animation: loader-bounce var(--loader-speed) infinite ease-in-out;
}

.loader-dots span:nth-child(2) {
  animation-delay: 0.15s;
}

.loader-dots span:nth-child(3) {
  animation-delay: 0.3s;
}`,

    pulse: `.loader-pulse {
  border-radius: 50%;
  background: currentColor;
  animation: loader-pulse var(--loader-speed) infinite ease-in-out;
}`,

    bars: `.loader-bars {
  display: flex;
  gap: calc(var(--loader-size) * 0.08);
  align-items: center;
  justify-content: center;
}

.loader-bars span {
  width: calc(var(--loader-size) * 0.12);
  height: var(--loader-size);
  background: currentColor;
  border-radius: 999px;
  animation: loader-bars var(--loader-speed) infinite ease-in-out;
}

.loader-bars span:nth-child(2) {
  animation-delay: 0.15s;
}

.loader-bars span:nth-child(3) {
  animation-delay: 0.3s;
}`,

    ring: `.loader-ring {
  border-radius: 50%;
  border: var(--loader-thickness) solid currentColor;
  position: relative;
  animation: loader-spin var(--loader-speed) linear infinite;
}

.loader-ring::after {
  content: "";
  position: absolute;
  inset: calc(var(--loader-thickness) * -1);
  border-radius: 50%;
  border: var(--loader-thickness) solid transparent;
  border-top-color: currentColor;
}`,

    orbit: `.loader-orbit {
  position: relative;
  border: calc(var(--loader-thickness) / 2) solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  animation: loader-spin var(--loader-speed) linear infinite;
}

.loader-orbit::before {
  content: "";
  position: absolute;
  width: calc(var(--loader-size) * 0.22);
  height: calc(var(--loader-size) * 0.22);
  background: currentColor;
  border-radius: 50%;
  top: calc(var(--loader-size) * -0.11);
  left: 50%;
  transform: translateX(-50%);
}`
  };

  return `${base}

${cssMap[type]}

${animations}`;
}

function updateLabels() {
  sizeValue.textContent = `${loaderSize.value}px`;
  speedValue.textContent = `${Number(loaderSpeed.value).toFixed(2)}s`;
  thicknessValue.textContent = `${loaderThickness.value}px`;
}

function updateLoader() {
  const type = loaderType.value;

  loaderPreview.innerHTML = getLoaderHTML(type);

  const loader = loaderPreview.querySelector(".loader");

  loader.style.setProperty("--loader-size", `${loaderSize.value}px`);
  loader.style.setProperty("--loader-color", loaderColor.value);
  loader.style.setProperty("--loader-speed", `${loaderSpeed.value}s`);
  loader.style.setProperty("--loader-thickness", `${loaderThickness.value}px`);

  loader.style.width = `${loaderSize.value}px`;
  loader.style.height = `${loaderSize.value}px`;
  loader.style.color = loaderColor.value;

  htmlOutput.textContent = getLoaderHTML(type);
  cssOutput.textContent = getLoaderCSS(type);

  updateLabels();

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

function applyPreset(preset) {
  if (preset === "random") {
    const types = ["spinner", "dots", "pulse", "bars", "ring", "orbit"];

    loaderType.value = types[Math.floor(Math.random() * types.length)];
    loaderColor.value = randomColor();
    loaderSize.value = Math.floor(Math.random() * 90) + 50;
    loaderSpeed.value = (Math.random() * 1.8 + 0.5).toFixed(1);
    loaderThickness.value = Math.floor(Math.random() * 10) + 5;

    updateLoader();
    return;
  }

  loaderType.value = preset;

  if (preset === "spinner") {
    loaderColor.value = "#38bdf8";
    loaderSize.value = 80;
    loaderSpeed.value = 1;
    loaderThickness.value = 8;
  }

  if (preset === "dots") {
    loaderColor.value = "#22c55e";
    loaderSize.value = 90;
    loaderSpeed.value = 0.8;
    loaderThickness.value = 8;
  }

  if (preset === "pulse") {
    loaderColor.value = "#ec4899";
    loaderSize.value = 90;
    loaderSpeed.value = 1.2;
    loaderThickness.value = 8;
  }

  if (preset === "bars") {
    loaderColor.value = "#facc15";
    loaderSize.value = 90;
    loaderSpeed.value = 0.9;
    loaderThickness.value = 8;
  }

  if (preset === "ring") {
    loaderColor.value = "#a855f7";
    loaderSize.value = 85;
    loaderSpeed.value = 1;
    loaderThickness.value = 7;
  }

  if (preset === "orbit") {
    loaderColor.value = "#67e8f9";
    loaderSize.value = 95;
    loaderSpeed.value = 1.4;
    loaderThickness.value = 6;
  }

  updateLoader();
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
  loaderType,
  loaderColor,
  loaderSize,
  loaderSpeed,
  loaderThickness
].forEach(input => {
  input.addEventListener("input", updateLoader);
});

presetButtons.forEach(button => {
  button.addEventListener("click", () => {
    applyPreset(button.dataset.preset);
  });
});

copyHtmlBtn.addEventListener("click", () => {
  copyText(htmlOutput.textContent, "HTML");
});

copyCssBtn.addEventListener("click", () => {
  copyText(cssOutput.textContent, "CSS");
});

updateLoader();