const previewShape = document.getElementById("previewShape");
const cssOutput = document.getElementById("cssOutput");
const message = document.getElementById("message");

const modeButtons = document.querySelectorAll(".mode-btn");
const basicControls = document.getElementById("basicControls");
const blobControls = document.getElementById("blobControls");

const topLeft = document.getElementById("topLeft");
const topRight = document.getElementById("topRight");
const bottomRight = document.getElementById("bottomRight");
const bottomLeft = document.getElementById("bottomLeft");

const topLeftValue = document.getElementById("topLeftValue");
const topRightValue = document.getElementById("topRightValue");
const bottomRightValue = document.getElementById("bottomRightValue");
const bottomLeftValue = document.getElementById("bottomLeftValue");

const topX = document.getElementById("topX");
const rightX = document.getElementById("rightX");
const bottomX = document.getElementById("bottomX");
const leftX = document.getElementById("leftX");

const topY = document.getElementById("topY");
const rightY = document.getElementById("rightY");
const bottomY = document.getElementById("bottomY");
const leftY = document.getElementById("leftY");

const topXValue = document.getElementById("topXValue");
const rightXValue = document.getElementById("rightXValue");
const bottomXValue = document.getElementById("bottomXValue");
const leftXValue = document.getElementById("leftXValue");

const topYValue = document.getElementById("topYValue");
const rightYValue = document.getElementById("rightYValue");
const bottomYValue = document.getElementById("bottomYValue");
const leftYValue = document.getElementById("leftYValue");

const presetButtons = document.querySelectorAll("[data-preset]");
const copyBtn = document.getElementById("copyBtn");

let currentMode = "basic";

function setMode(mode) {
  currentMode = mode;

  modeButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });

  basicControls.classList.toggle("hidden", mode !== "basic");
  blobControls.classList.toggle("hidden", mode !== "blob");

  updatePreview();
}

function getBasicRadius() {
  return `${topLeft.value}px ${topRight.value}px ${bottomRight.value}px ${bottomLeft.value}px`;
}

function getBlobRadius() {
  return `${topX.value}% ${rightX.value}% ${bottomX.value}% ${leftX.value}% / ${topY.value}% ${rightY.value}% ${bottomY.value}% ${leftY.value}%`;
}

function updateLabels() {
  topLeftValue.textContent = `${topLeft.value}px`;
  topRightValue.textContent = `${topRight.value}px`;
  bottomRightValue.textContent = `${bottomRight.value}px`;
  bottomLeftValue.textContent = `${bottomLeft.value}px`;

  topXValue.textContent = `${topX.value}%`;
  rightXValue.textContent = `${rightX.value}%`;
  bottomXValue.textContent = `${bottomX.value}%`;
  leftXValue.textContent = `${leftX.value}%`;

  topYValue.textContent = `${topY.value}%`;
  rightYValue.textContent = `${rightY.value}%`;
  bottomYValue.textContent = `${bottomY.value}%`;
  leftYValue.textContent = `${leftY.value}%`;
}

function updatePreview() {
  const radius = currentMode === "basic"
    ? getBasicRadius()
    : getBlobRadius();

  previewShape.style.borderRadius = radius;

  cssOutput.textContent = `border-radius: ${radius};`;

  updateLabels();

  message.textContent = "";
}

function setBasicValues(tl, tr, br, bl) {
  topLeft.value = tl;
  topRight.value = tr;
  bottomRight.value = br;
  bottomLeft.value = bl;
}

function setBlobValues(values) {
  topX.value = values[0];
  rightX.value = values[1];
  bottomX.value = values[2];
  leftX.value = values[3];

  topY.value = values[4];
  rightY.value = values[5];
  bottomY.value = values[6];
  leftY.value = values[7];
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function applyPreset(preset) {
  if (preset === "square") {
    setMode("basic");
    setBasicValues(0, 0, 0, 0);
  }

  if (preset === "rounded") {
    setMode("basic");
    setBasicValues(40, 40, 40, 40);
  }

  if (preset === "pill") {
    setMode("basic");
    setBasicValues(160, 160, 160, 160);
  }

  if (preset === "circle") {
    setMode("basic");
    setBasicValues(140, 140, 140, 140);
  }

  if (preset === "blob") {
    setMode("blob");
    setBlobValues([62, 38, 58, 42, 42, 58, 38, 62]);
  }

  if (preset === "random") {
    if (currentMode === "basic") {
      setBasicValues(
        randomNumber(0, 160),
        randomNumber(0, 160),
        randomNumber(0, 160),
        randomNumber(0, 160)
      );
    } else {
      setBlobValues([
        randomNumber(25, 75),
        randomNumber(25, 75),
        randomNumber(25, 75),
        randomNumber(25, 75),
        randomNumber(25, 75),
        randomNumber(25, 75),
        randomNumber(25, 75),
        randomNumber(25, 75)
      ]);
    }
  }

  updatePreview();
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
  topLeft,
  topRight,
  bottomRight,
  bottomLeft,
  topX,
  rightX,
  bottomX,
  leftX,
  topY,
  rightY,
  bottomY,
  leftY
].forEach(input => {
  input.addEventListener("input", updatePreview);
});

modeButtons.forEach(button => {
  button.addEventListener("click", () => {
    setMode(button.dataset.mode);
  });
});

presetButtons.forEach(button => {
  button.addEventListener("click", () => {
    applyPreset(button.dataset.preset);
  });
});

copyBtn.addEventListener("click", copyCSS);

updatePreview();