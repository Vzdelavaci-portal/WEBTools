const previewButton = document.getElementById("previewButton");
const cssOutput = document.getElementById("cssOutput");
const message = document.getElementById("message");

const buttonText = document.getElementById("buttonText");
const bgColor = document.getElementById("bgColor");
const textColor = document.getElementById("textColor");

const paddingX = document.getElementById("paddingX");
const paddingY = document.getElementById("paddingY");
const fontSize = document.getElementById("fontSize");
const radius = document.getElementById("radius");

const paddingXValue = document.getElementById("paddingXValue");
const paddingYValue = document.getElementById("paddingYValue");
const fontSizeValue = document.getElementById("fontSizeValue");
const radiusValue = document.getElementById("radiusValue");

const shadow = document.getElementById("shadow");
const gradient = document.getElementById("gradient");
const glow = document.getElementById("glow");
const outline = document.getElementById("outline");
const hoverMove = document.getElementById("hoverMove");

const presetButtons = document.querySelectorAll("[data-preset]");
const copyBtn = document.getElementById("copyBtn");

function hexToRgb(hex) {
  const cleanHex = hex.replace("#", "");

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return `${r}, ${g}, ${b}`;
}

function getButtonStyles() {
  const bg = bgColor.value;
  const color = textColor.value;
  const rgb = hexToRgb(bg);

  const background = gradient.checked
    ? `linear-gradient(135deg, ${bg}, #8b5cf6)`
    : bg;

  const border = outline.checked
    ? `2px solid ${bg}`
    : "none";

  const finalBackground = outline.checked && !gradient.checked
    ? "transparent"
    : background;

  const boxShadow = glow.checked
    ? `0 0 28px rgba(${rgb}, 0.75)`
    : shadow.checked
      ? `0 12px 30px rgba(${rgb}, 0.35)`
      : "none";

  return {
    background: finalBackground,
    color,
    padding: `${paddingY.value}px ${paddingX.value}px`,
    fontSize: `${fontSize.value}px`,
    borderRadius: `${radius.value}px`,
    border,
    boxShadow
  };
}

function updateLabels() {
  paddingXValue.textContent = `${paddingX.value}px`;
  paddingYValue.textContent = `${paddingY.value}px`;
  fontSizeValue.textContent = `${fontSize.value}px`;
  radiusValue.textContent = `${radius.value}px`;
}

function updateButton() {
  const styles = getButtonStyles();

  previewButton.textContent = buttonText.value || "Button";

  previewButton.style.background = styles.background;
  previewButton.style.color = styles.color;
  previewButton.style.padding = styles.padding;
  previewButton.style.fontSize = styles.fontSize;
  previewButton.style.borderRadius = styles.borderRadius;
  previewButton.style.border = styles.border;
  previewButton.style.boxShadow = styles.boxShadow;
  previewButton.style.transform = "translateY(0)";

  if (hoverMove.checked) {
    previewButton.onmouseenter = () => {
      previewButton.style.transform = "translateY(-4px) scale(1.03)";
    };

    previewButton.onmouseleave = () => {
      previewButton.style.transform = "translateY(0) scale(1)";
    };
  } else {
    previewButton.onmouseenter = null;
    previewButton.onmouseleave = null;
  }

  cssOutput.textContent = `.button {
  background: ${styles.background};
  color: ${styles.color};
  padding: ${styles.padding};
  font-size: ${styles.fontSize};
  font-weight: 900;
  border: ${styles.border};
  border-radius: ${styles.borderRadius};
  box-shadow: ${styles.boxShadow};
  cursor: pointer;
  transition: 0.25s ease;
}

.button:hover {
  ${hoverMove.checked ? "transform: translateY(-4px) scale(1.03);" : "filter: brightness(1.08);"}
}`;

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
  if (preset === "modern") {
    bgColor.value = "#2563eb";
    textColor.value = "#ffffff";
    paddingX.value = 28;
    paddingY.value = 14;
    fontSize.value = 16;
    radius.value = 14;
    shadow.checked = true;
    gradient.checked = false;
    glow.checked = false;
    outline.checked = false;
    hoverMove.checked = true;
    buttonText.value = "Get Started";
  }

  if (preset === "neon") {
    bgColor.value = "#22d3ee";
    textColor.value = "#020617";
    paddingX.value = 34;
    paddingY.value = 15;
    fontSize.value = 17;
    radius.value = 18;
    shadow.checked = false;
    gradient.checked = false;
    glow.checked = true;
    outline.checked = false;
    hoverMove.checked = true;
    buttonText.value = "Neon Button";
  }

  if (preset === "glass") {
    bgColor.value = "#ffffff";
    textColor.value = "#ffffff";
    paddingX.value = 30;
    paddingY.value = 14;
    fontSize.value = 16;
    radius.value = 18;
    shadow.checked = true;
    gradient.checked = false;
    glow.checked = false;
    outline.checked = true;
    hoverMove.checked = true;
    buttonText.value = "Glass Button";
  }

  if (preset === "gradient") {
    bgColor.value = "#ec4899";
    textColor.value = "#ffffff";
    paddingX.value = 34;
    paddingY.value = 15;
    fontSize.value = 17;
    radius.value = 16;
    shadow.checked = true;
    gradient.checked = true;
    glow.checked = false;
    outline.checked = false;
    hoverMove.checked = true;
    buttonText.value = "Gradient Button";
  }

  if (preset === "gaming") {
    bgColor.value = "#84cc16";
    textColor.value = "#020617";
    paddingX.value = 36;
    paddingY.value = 16;
    fontSize.value = 18;
    radius.value = 6;
    shadow.checked = true;
    gradient.checked = false;
    glow.checked = true;
    outline.checked = false;
    hoverMove.checked = true;
    buttonText.value = "Play Now";
  }

  if (preset === "minimal") {
    bgColor.value = "#ffffff";
    textColor.value = "#020617";
    paddingX.value = 24;
    paddingY.value = 12;
    fontSize.value = 15;
    radius.value = 10;
    shadow.checked = false;
    gradient.checked = false;
    glow.checked = false;
    outline.checked = false;
    hoverMove.checked = false;
    buttonText.value = "Learn More";
  }

  if (preset === "random") {
    bgColor.value = randomColor();
    textColor.value = Math.random() > 0.5 ? "#ffffff" : "#020617";
    paddingX.value = Math.floor(Math.random() * 45) + 18;
    paddingY.value = Math.floor(Math.random() * 20) + 10;
    fontSize.value = Math.floor(Math.random() * 10) + 14;
    radius.value = Math.floor(Math.random() * 45);
    shadow.checked = Math.random() > 0.4;
    gradient.checked = Math.random() > 0.5;
    glow.checked = Math.random() > 0.7;
    outline.checked = Math.random() > 0.75;
    hoverMove.checked = true;
    buttonText.value = "Random Button";
  }

  updateButton();
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
  buttonText,
  bgColor,
  textColor,
  paddingX,
  paddingY,
  fontSize,
  radius,
  shadow,
  gradient,
  glow,
  outline,
  hoverMove
].forEach(input => {
  input.addEventListener("input", updateButton);
});

presetButtons.forEach(button => {
  button.addEventListener("click", () => {
    applyPreset(button.dataset.preset);
  });
});

copyBtn.addEventListener("click", copyCSS);

updateButton();