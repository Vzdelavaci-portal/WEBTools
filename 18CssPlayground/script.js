const previewCard = document.getElementById("previewCard");
const cssOutput = document.getElementById("cssOutput");
const message = document.getElementById("message");

const controls = {
  bgColor: document.getElementById("bgColor"),
  textColor: document.getElementById("textColor"),
  useGradient: document.getElementById("useGradient"),
  gradientColor: document.getElementById("gradientColor"),
  opacity: document.getElementById("opacity"),

  radius: document.getElementById("radius"),
  borderWidth: document.getElementById("borderWidth"),
  borderColor: document.getElementById("borderColor"),

  shadowX: document.getElementById("shadowX"),
  shadowY: document.getElementById("shadowY"),
  shadowBlur: document.getElementById("shadowBlur"),
  shadowColor: document.getElementById("shadowColor"),

  rotate: document.getElementById("rotate"),
  scale: document.getElementById("scale"),
  translateX: document.getElementById("translateX"),
  translateY: document.getElementById("translateY"),

  filterBlur: document.getElementById("filterBlur"),
  brightness: document.getElementById("brightness"),
  contrast: document.getElementById("contrast"),
  hue: document.getElementById("hue"),
  saturate: document.getElementById("saturate"),

  animation: document.getElementById("animation"),
  animationDuration: document.getElementById("animationDuration")
};

const labels = {
  opacityValue: document.getElementById("opacityValue"),
  radiusValue: document.getElementById("radiusValue"),
  borderWidthValue: document.getElementById("borderWidthValue"),
  shadowXValue: document.getElementById("shadowXValue"),
  shadowYValue: document.getElementById("shadowYValue"),
  shadowBlurValue: document.getElementById("shadowBlurValue"),
  rotateValue: document.getElementById("rotateValue"),
  scaleValue: document.getElementById("scaleValue"),
  translateXValue: document.getElementById("translateXValue"),
  translateYValue: document.getElementById("translateYValue"),
  filterBlurValue: document.getElementById("filterBlurValue"),
  brightnessValue: document.getElementById("brightnessValue"),
  contrastValue: document.getElementById("contrastValue"),
  hueValue: document.getElementById("hueValue"),
  saturateValue: document.getElementById("saturateValue"),
  animationDurationValue: document.getElementById("animationDurationValue")
};

const randomBtn = document.getElementById("randomBtn");
const resetBtn = document.getElementById("resetBtn");
const copyCssBtn = document.getElementById("copyCssBtn");
const presetButtons = document.querySelectorAll("[data-preset]");

const defaults = {
  bgColor: "#2563eb",
  textColor: "#ffffff",
  useGradient: true,
  gradientColor: "#8b5cf6",
  opacity: 1,
  radius: 28,
  borderWidth: 1,
  borderColor: "#ffffff",
  shadowX: 0,
  shadowY: 24,
  shadowBlur: 70,
  shadowColor: "#2563eb",
  rotate: 0,
  scale: 1,
  translateX: 0,
  translateY: 0,
  filterBlur: 0,
  brightness: 100,
  contrast: 100,
  hue: 0,
  saturate: 100,
  animation: "none",
  animationDuration: 2
};

function hexToRgb(hex) {
  const clean = hex.replace("#", "");

  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16)
  };
}

function rgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getValues() {
  return {
    bgColor: controls.bgColor.value,
    textColor: controls.textColor.value,
    useGradient: controls.useGradient.checked,
    gradientColor: controls.gradientColor.value,
    opacity: Number(controls.opacity.value),

    radius: Number(controls.radius.value),
    borderWidth: Number(controls.borderWidth.value),
    borderColor: controls.borderColor.value,

    shadowX: Number(controls.shadowX.value),
    shadowY: Number(controls.shadowY.value),
    shadowBlur: Number(controls.shadowBlur.value),
    shadowColor: controls.shadowColor.value,

    rotate: Number(controls.rotate.value),
    scale: Number(controls.scale.value),
    translateX: Number(controls.translateX.value),
    translateY: Number(controls.translateY.value),

    filterBlur: Number(controls.filterBlur.value),
    brightness: Number(controls.brightness.value),
    contrast: Number(controls.contrast.value),
    hue: Number(controls.hue.value),
    saturate: Number(controls.saturate.value),

    animation: controls.animation.value,
    animationDuration: Number(controls.animationDuration.value)
  };
}

function getStyleData() {
  const v = getValues();

  const background = v.useGradient
    ? `linear-gradient(135deg, ${v.bgColor}, ${v.gradientColor})`
    : v.bgColor;

  const border = `${v.borderWidth}px solid ${rgba(v.borderColor, 0.35)}`;

  const shadow = `${v.shadowX}px ${v.shadowY}px ${v.shadowBlur}px ${rgba(v.shadowColor, 0.35)}`;

  const transform = `translate(${v.translateX}px, ${v.translateY}px) rotate(${v.rotate}deg) scale(${v.scale})`;

  const filter = `blur(${v.filterBlur}px) brightness(${v.brightness}%) contrast(${v.contrast}%) hue-rotate(${v.hue}deg) saturate(${v.saturate}%)`;

  const animationName = {
    none: "none",
    float: "cssFloat",
    pulse: "cssPulse",
    rotate: "cssRotate",
    shake: "cssShake",
    swing: "cssSwing"
  }[v.animation];

  const animation = animationName === "none"
    ? "none"
    : `${animationName} ${v.animationDuration}s ease-in-out infinite`;

  return {
    background,
    border,
    shadow,
    transform,
    filter,
    animation,
    ...v
  };
}

function updateLabels() {
  const v = getValues();

  labels.opacityValue.textContent = v.opacity.toFixed(2);
  labels.radiusValue.textContent = `${v.radius}px`;
  labels.borderWidthValue.textContent = `${v.borderWidth}px`;
  labels.shadowXValue.textContent = `${v.shadowX}px`;
  labels.shadowYValue.textContent = `${v.shadowY}px`;
  labels.shadowBlurValue.textContent = `${v.shadowBlur}px`;
  labels.rotateValue.textContent = `${v.rotate}deg`;
  labels.scaleValue.textContent = v.scale.toFixed(2);
  labels.translateXValue.textContent = `${v.translateX}px`;
  labels.translateYValue.textContent = `${v.translateY}px`;
  labels.filterBlurValue.textContent = `${v.filterBlur}px`;
  labels.brightnessValue.textContent = `${v.brightness}%`;
  labels.contrastValue.textContent = `${v.contrast}%`;
  labels.hueValue.textContent = `${v.hue}deg`;
  labels.saturateValue.textContent = `${v.saturate}%`;
  labels.animationDurationValue.textContent = `${v.animationDuration.toFixed(2)}s`;
}

function generateCSS() {
  const s = getStyleData();

  return `.css-playground-card {
  background: ${s.background};
  color: ${s.textColor};
  opacity: ${s.opacity};
  border-radius: ${s.radius}px;
  border: ${s.border};
  box-shadow: ${s.shadow};
  transform: ${s.transform};
  filter: ${s.filter};
  animation: ${s.animation};
  transition: 0.25s ease;
}

.css-playground-card:hover {
  transform: ${s.transform} translateY(-8px);
  box-shadow: ${s.shadowX}px ${s.shadowY + 12}px ${s.shadowBlur + 20}px ${rgba(s.shadowColor, 0.45)};
}

@keyframes cssFloat {
  0%, 100% { translate: 0 0; }
  50% { translate: 0 -24px; }
}

@keyframes cssPulse {
  0%, 100% { scale: 1; }
  50% { scale: 1.08; }
}

@keyframes cssRotate {
  to { rotate: 360deg; }
}

@keyframes cssShake {
  0%, 100% { translate: 0 0; }
  25% { translate: -12px 0; }
  75% { translate: 12px 0; }
}

@keyframes cssSwing {
  0%, 100% { rotate: 0deg; }
  25% { rotate: 8deg; }
  75% { rotate: -8deg; }
}`;
}

function updatePreview() {
  const s = getStyleData();

  previewCard.style.background = s.background;
  previewCard.style.color = s.textColor;
  previewCard.style.opacity = s.opacity;
  previewCard.style.borderRadius = `${s.radius}px`;
  previewCard.style.border = s.border;
  previewCard.style.boxShadow = s.shadow;
  previewCard.style.transform = s.transform;
  previewCard.style.filter = s.filter;
  previewCard.style.animation = s.animation;

  cssOutput.textContent = generateCSS();

  updateLabels();

  message.textContent = "";
}

function setValues(values) {
  Object.entries(values).forEach(([key, value]) => {
    if (!controls[key]) return;

    if (controls[key].type === "checkbox") {
      controls[key].checked = value;
    } else {
      controls[key].value = value;
    }
  });

  updatePreview();
}

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")
    .toUpperCase()}`;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomStyle() {
  setValues({
    bgColor: randomColor(),
    textColor: Math.random() > 0.5 ? "#ffffff" : "#020617",
    useGradient: Math.random() > 0.25,
    gradientColor: randomColor(),
    opacity: (Math.random() * 0.35 + 0.65).toFixed(2),
    radius: randomNumber(0, 70),
    borderWidth: randomNumber(0, 5),
    borderColor: randomColor(),
    shadowX: randomNumber(-30, 30),
    shadowY: randomNumber(10, 60),
    shadowBlur: randomNumber(20, 120),
    shadowColor: randomColor(),
    rotate: randomNumber(-18, 18),
    scale: (Math.random() * 0.5 + 0.85).toFixed(2),
    translateX: randomNumber(-30, 30),
    translateY: randomNumber(-30, 30),
    filterBlur: randomNumber(0, 2),
    brightness: randomNumber(80, 130),
    contrast: randomNumber(80, 140),
    hue: randomNumber(0, 360),
    saturate: randomNumber(80, 180),
    animation: ["none", "float", "pulse", "rotate", "shake", "swing"][randomNumber(0, 5)],
    animationDuration: (Math.random() * 3 + 1).toFixed(1)
  });
}

function applyPreset(name) {
  const presets = {
    glass: {
      bgColor: "#ffffff",
      textColor: "#ffffff",
      useGradient: false,
      gradientColor: "#ffffff",
      opacity: 0.25,
      radius: 34,
      borderWidth: 1,
      borderColor: "#ffffff",
      shadowX: 0,
      shadowY: 24,
      shadowBlur: 80,
      shadowColor: "#000000",
      rotate: 0,
      scale: 1,
      translateX: 0,
      translateY: 0,
      filterBlur: 0,
      brightness: 110,
      contrast: 105,
      hue: 0,
      saturate: 120,
      animation: "float",
      animationDuration: 3
    },

    neon: {
      bgColor: "#22d3ee",
      textColor: "#020617",
      useGradient: true,
      gradientColor: "#ec4899",
      opacity: 1,
      radius: 26,
      borderWidth: 2,
      borderColor: "#ffffff",
      shadowX: 0,
      shadowY: 0,
      shadowBlur: 80,
      shadowColor: "#22d3ee",
      rotate: 0,
      scale: 1,
      translateX: 0,
      translateY: 0,
      filterBlur: 0,
      brightness: 115,
      contrast: 120,
      hue: 0,
      saturate: 160,
      animation: "pulse",
      animationDuration: 2
    },

    clay: {
      bgColor: "#f97316",
      textColor: "#ffffff",
      useGradient: true,
      gradientColor: "#fb7185",
      opacity: 1,
      radius: 42,
      borderWidth: 0,
      borderColor: "#ffffff",
      shadowX: 18,
      shadowY: 24,
      shadowBlur: 40,
      shadowColor: "#7c2d12",
      rotate: -2,
      scale: 1,
      translateX: 0,
      translateY: 0,
      filterBlur: 0,
      brightness: 105,
      contrast: 105,
      hue: 0,
      saturate: 120,
      animation: "none",
      animationDuration: 2
    },

    minimal: {
      bgColor: "#ffffff",
      textColor: "#020617",
      useGradient: false,
      gradientColor: "#ffffff",
      opacity: 1,
      radius: 18,
      borderWidth: 1,
      borderColor: "#e2e8f0",
      shadowX: 0,
      shadowY: 12,
      shadowBlur: 30,
      shadowColor: "#000000",
      rotate: 0,
      scale: 1,
      translateX: 0,
      translateY: 0,
      filterBlur: 0,
      brightness: 100,
      contrast: 100,
      hue: 0,
      saturate: 100,
      animation: "none",
      animationDuration: 2
    },

    cyber: {
      bgColor: "#020617",
      textColor: "#67e8f9",
      useGradient: true,
      gradientColor: "#111827",
      opacity: 1,
      radius: 8,
      borderWidth: 2,
      borderColor: "#67e8f9",
      shadowX: 0,
      shadowY: 0,
      shadowBlur: 70,
      shadowColor: "#67e8f9",
      rotate: 0,
      scale: 1,
      translateX: 0,
      translateY: 0,
      filterBlur: 0,
      brightness: 110,
      contrast: 130,
      hue: 0,
      saturate: 140,
      animation: "shake",
      animationDuration: 1.2
    },

    soft: {
      bgColor: "#e0f2fe",
      textColor: "#0f172a",
      useGradient: true,
      gradientColor: "#fce7f3",
      opacity: 1,
      radius: 38,
      borderWidth: 0,
      borderColor: "#ffffff",
      shadowX: 12,
      shadowY: 18,
      shadowBlur: 45,
      shadowColor: "#94a3b8",
      rotate: 0,
      scale: 1,
      translateX: 0,
      translateY: 0,
      filterBlur: 0,
      brightness: 105,
      contrast: 95,
      hue: 0,
      saturate: 110,
      animation: "float",
      animationDuration: 4
    }
  };

  setValues(presets[name]);
}

async function copyCSS() {
  try {
    await navigator.clipboard.writeText(cssOutput.textContent);
    message.textContent = "CSS copied to clipboard!";
  } catch {
    message.textContent = "Copy failed.";
  }
}

Object.values(controls).forEach(input => {
  input.addEventListener("input", updatePreview);
  input.addEventListener("change", updatePreview);
});

presetButtons.forEach(button => {
  button.addEventListener("click", () => {
    applyPreset(button.dataset.preset);
  });
});

randomBtn.addEventListener("click", randomStyle);
resetBtn.addEventListener("click", () => setValues(defaults));
copyCssBtn.addEventListener("click", copyCSS);

setValues(defaults);