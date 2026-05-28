const previewBox = document.getElementById("previewBox");
const cssCode = document.getElementById("cssCode");
const message = document.getElementById("message");

const offsetX = document.getElementById("offsetX");
const offsetY = document.getElementById("offsetY");
const blur = document.getElementById("blur");
const spread = document.getElementById("spread");
const opacity = document.getElementById("opacity");
const shadowColor = document.getElementById("shadowColor");
const inset = document.getElementById("inset");

const offsetXValue = document.getElementById("offsetXValue");
const offsetYValue = document.getElementById("offsetYValue");
const blurValue = document.getElementById("blurValue");
const spreadValue = document.getElementById("spreadValue");
const opacityValue = document.getElementById("opacityValue");

const copyBtn = document.getElementById("copyBtn");
const resetBtn = document.getElementById("resetBtn");

function hexToRgb(hex) {
  const cleanHex = hex.replace("#", "");

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return `${r}, ${g}, ${b}`;
}

function createBoxShadow() {
  const insetValue = inset.checked ? "inset " : "";
  const color = `rgba(${hexToRgb(shadowColor.value)}, ${opacity.value})`;

  return `${insetValue}${offsetX.value}px ${offsetY.value}px ${blur.value}px ${spread.value}px ${color}`;
}

function updateValues() {
  offsetXValue.textContent = `${offsetX.value}px`;
  offsetYValue.textContent = `${offsetY.value}px`;
  blurValue.textContent = `${blur.value}px`;
  spreadValue.textContent = `${spread.value}px`;
  opacityValue.textContent = opacity.value;
}

function updateShadow() {
  const shadow = createBoxShadow();

  previewBox.style.boxShadow = shadow;
  cssCode.textContent = `box-shadow: ${shadow};`;

  updateValues();

  message.textContent = "";
}

function resetGenerator() {
  offsetX.value = 10;
  offsetY.value = 10;
  blur.value = 30;
  spread.value = 0;
  opacity.value = 0.35;
  shadowColor.value = "#000000";
  inset.checked = false;

  updateShadow();
}

async function copyCSS() {
  try {
    await navigator.clipboard.writeText(cssCode.textContent);
    message.textContent = "CSS copied to clipboard!";
  } catch {
    message.textContent = "Copy failed.";
  }
}

[
  offsetX,
  offsetY,
  blur,
  spread,
  opacity,
  shadowColor,
  inset
].forEach(input => {
  input.addEventListener("input", updateShadow);
});

copyBtn.addEventListener("click", copyCSS);
resetBtn.addEventListener("click", resetGenerator);

updateShadow();