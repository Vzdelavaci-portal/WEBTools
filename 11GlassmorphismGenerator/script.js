const glassCard = document.getElementById("glassCard");
const previewStage = document.getElementById("previewStage");
const cssOutput = document.getElementById("cssOutput");
const message = document.getElementById("message");

const blurInput = document.getElementById("blur");
const opacityInput = document.getElementById("opacity");
const radiusInput = document.getElementById("radius");
const borderOpacityInput = document.getElementById("borderOpacity");
const shadowInput = document.getElementById("shadow");

const glowInput = document.getElementById("glow");
const lightBorderInput = document.getElementById("lightBorder");

const blurValue = document.getElementById("blurValue");
const opacityValue = document.getElementById("opacityValue");
const radiusValue = document.getElementById("radiusValue");
const borderOpacityValue = document.getElementById("borderOpacityValue");
const shadowValue = document.getElementById("shadowValue");

const copyBtn = document.getElementById("copyBtn");
const backgroundButtons = document.querySelectorAll("[data-bg]");
const presetButtons = document.querySelectorAll("[data-preset]");

const backgrounds = {
  ocean: `
    radial-gradient(circle at 20% 20%, #38bdf8, transparent 28%),
    radial-gradient(circle at 80% 30%, #0ea5e9, transparent 28%),
    radial-gradient(circle at 50% 85%, #22c55e, transparent 26%),
    linear-gradient(135deg, #0f172a, #1e3a8a)
  `,

  sunset: `
    radial-gradient(circle at 20% 20%, #fb7185, transparent 28%),
    radial-gradient(circle at 80% 30%, #f97316, transparent 28%),
    radial-gradient(circle at 50% 85%, #facc15, transparent 26%),
    linear-gradient(135deg, #431407, #7f1d1d)
  `,

  purple: `
    radial-gradient(circle at 20% 20%, #a855f7, transparent 28%),
    radial-gradient(circle at 80% 30%, #ec4899, transparent 28%),
    radial-gradient(circle at 50% 85%, #6366f1, transparent 26%),
    linear-gradient(135deg, #1e1b4b, #581c87)
  `,

  cyber: `
    radial-gradient(circle at 20% 20%, #22d3ee, transparent 28%),
    radial-gradient(circle at 80% 30%, #f0abfc, transparent 28%),
    radial-gradient(circle at 50% 85%, #84cc16, transparent 26%),
    linear-gradient(135deg, #020617, #111827)
  `,

  aurora: `
    radial-gradient(circle at 20% 20%, #2dd4bf, transparent 28%),
    radial-gradient(circle at 80% 30%, #818cf8, transparent 28%),
    radial-gradient(circle at 50% 85%, #f472b6, transparent 26%),
    linear-gradient(135deg, #064e3b, #312e81)
  `
};

let currentBackground = backgrounds.ocean;

function updateLabels() {
  blurValue.textContent = `${blurInput.value}px`;
  opacityValue.textContent = opacityInput.value;
  radiusValue.textContent = `${radiusInput.value}px`;
  borderOpacityValue.textContent = borderOpacityInput.value;
  shadowValue.textContent = `${shadowInput.value}%`;
}

function getGlassCSS() {
  const blur = blurInput.value;
  const opacity = opacityInput.value;
  const radius = radiusInput.value;
  const borderOpacity = borderOpacityInput.value;
  const shadow = shadowInput.value;

  const border = lightBorderInput.checked
    ? `1px solid rgba(255, 255, 255, ${borderOpacity})`
    : "none";

  const glowShadow = glowInput.checked
    ? `0 0 40px rgba(34, 211, 238, 0.45), 0 25px 80px rgba(0, 0, 0, ${shadow / 100})`
    : `0 25px 80px rgba(0, 0, 0, ${shadow / 100})`;

  return {
    background: `rgba(255, 255, 255, ${opacity})`,
    backdropFilter: `blur(${blur}px)`,
    borderRadius: `${radius}px`,
    border,
    boxShadow: glowShadow
  };
}

function updateGlass() {
  const styles = getGlassCSS();

  glassCard.style.background = styles.background;
  glassCard.style.backdropFilter = styles.backdropFilter;
  glassCard.style.webkitBackdropFilter = styles.backdropFilter;
  glassCard.style.borderRadius = styles.borderRadius;
  glassCard.style.border = styles.border;
  glassCard.style.boxShadow = styles.boxShadow;

  previewStage.style.background = currentBackground;

  cssOutput.textContent = `.glass-card {
  background: ${styles.background};
  backdrop-filter: ${styles.backdropFilter};
  -webkit-backdrop-filter: ${styles.backdropFilter};
  border-radius: ${styles.borderRadius};
  border: ${styles.border};
  box-shadow: ${styles.boxShadow};
}`;

  updateLabels();
  message.textContent = "";
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDecimal(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

function applyBackground(name) {
  if (name === "random") {
    const keys = Object.keys(backgrounds);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    currentBackground = backgrounds[randomKey];
  } else {
    currentBackground = backgrounds[name];
  }

  updateGlass();
}

function applyPreset(preset) {
  if (preset === "apple") {
    blurInput.value = 26;
    opacityInput.value = 0.18;
    radiusInput.value = 30;
    borderOpacityInput.value = 0.28;
    shadowInput.value = 35;
    glowInput.checked = false;
    lightBorderInput.checked = true;
  }

  if (preset === "windows") {
    blurInput.value = 18;
    opacityInput.value = 0.12;
    radiusInput.value = 20;
    borderOpacityInput.value = 0.22;
    shadowInput.value = 28;
    glowInput.checked = false;
    lightBorderInput.checked = true;
  }

  if (preset === "frosted") {
    blurInput.value = 38;
    opacityInput.value = 0.26;
    radiusInput.value = 34;
    borderOpacityInput.value = 0.35;
    shadowInput.value = 45;
    glowInput.checked = false;
    lightBorderInput.checked = true;
  }

  if (preset === "neon") {
    blurInput.value = 22;
    opacityInput.value = 0.14;
    radiusInput.value = 28;
    borderOpacityInput.value = 0.4;
    shadowInput.value = 40;
    glowInput.checked = true;
    lightBorderInput.checked = true;
    currentBackground = backgrounds.cyber;
  }

  updateGlass();
}

function randomGlass() {
  blurInput.value = randomNumber(5, 45);
  opacityInput.value = randomDecimal(0.08, 0.35);
  radiusInput.value = randomNumber(12, 50);
  borderOpacityInput.value = randomDecimal(0.1, 0.55);
  shadowInput.value = randomNumber(15, 70);
  glowInput.checked = Math.random() > 0.65;
  lightBorderInput.checked = Math.random() > 0.2;

  applyBackground("random");
}

async function copyCSS() {
  try {
    await navigator.clipboard.writeText(cssOutput.textContent);
    message.textContent = "CSS copied to clipboard!";
  } catch {
    message.textContent = "Copy failed.";
  }
}

[
  blurInput,
  opacityInput,
  radiusInput,
  borderOpacityInput,
  shadowInput,
  glowInput,
  lightBorderInput
].forEach(input => {
  input.addEventListener("input", updateGlass);
});

backgroundButtons.forEach(button => {
  button.addEventListener("click", () => {
    applyBackground(button.dataset.bg);
  });
});

presetButtons.forEach(button => {
  button.addEventListener("click", () => {
    applyPreset(button.dataset.preset);
  });
});

copyBtn.addEventListener("click", copyCSS);

updateGlass();