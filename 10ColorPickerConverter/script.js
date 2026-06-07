const colorPicker = document.getElementById("colorPicker");
const hexInput = document.getElementById("hexInput");
const colorPreview = document.getElementById("colorPreview");
const previewHex = document.getElementById("previewHex");

const hexValue = document.getElementById("hexValue");
const rgbValue = document.getElementById("rgbValue");
const hslValue = document.getElementById("hslValue");
const hsvValue = document.getElementById("hsvValue");
const cmykValue = document.getElementById("cmykValue");

const palette = document.getElementById("palette");
const whiteContrast = document.getElementById("whiteContrast");
const blackContrast = document.getElementById("blackContrast");
const whiteScore = document.getElementById("whiteScore");
const blackScore = document.getElementById("blackScore");

const gradientPreview = document.getElementById("gradientPreview");
const gradientCode = document.getElementById("gradientCode");

const randomBtn = document.getElementById("randomBtn");
const copyPaletteBtn = document.getElementById("copyPaletteBtn");
const copyButtons = document.querySelectorAll("[data-copy]");
const message = document.getElementById("message");

let currentHex = "#3B82F6";
let currentPalette = [];

function normalizeHex(hex) {
  let value = hex.trim().replace("#", "");

  if (value.length === 3) {
    value = value
      .split("")
      .map(char => char + char)
      .join("");
  }

  if (!/^[0-9a-fA-F]{6}$/.test(value)) {
    return null;
  }

  return `#${value.toUpperCase()}`;
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");

  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16)
  };
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map(value => value.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const diff = max - min;

    s = l > 0.5
      ? diff / (2 - max - min)
      : diff / (max + min);

    if (max === r) {
      h = (g - b) / diff + (g < b ? 6 : 0);
    }

    if (max === g) {
      h = (b - r) / diff + 2;
    }

    if (max === b) {
      h = (r - g) / diff + 4;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

function rgbToHsv(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;

  if (diff !== 0) {
    if (max === r) h = 60 * (((g - b) / diff) % 6);
    if (max === g) h = 60 * ((b - r) / diff + 2);
    if (max === b) h = 60 * ((r - g) / diff + 4);
  }

  if (h < 0) h += 360;

  return {
    h: Math.round(h),
    s: Math.round(max === 0 ? 0 : (diff / max) * 100),
    v: Math.round(max * 100)
  };
}

function rgbToCmyk(r, g, b) {
  const rValue = r / 255;
  const gValue = g / 255;
  const bValue = b / 255;

  const k = 1 - Math.max(rValue, gValue, bValue);

  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }

  const c = (1 - rValue - k) / (1 - k);
  const m = (1 - gValue - k) / (1 - k);
  const y = (1 - bValue - k) / (1 - k);

  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100)
  };
}

function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) [r, g, b] = [c, x, 0];
  if (h >= 60 && h < 120) [r, g, b] = [x, c, 0];
  if (h >= 120 && h < 180) [r, g, b] = [0, c, x];
  if (h >= 180 && h < 240) [r, g, b] = [0, x, c];
  if (h >= 240 && h < 300) [r, g, b] = [x, 0, c];
  if (h >= 300 && h <= 360) [r, g, b] = [c, 0, x];

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
}

function createPalette(hex) {
  const { r, g, b } = hexToRgb(hex);
  const hsl = rgbToHsl(r, g, b);

  const lightest = hslToRgb(hsl.h, hsl.s, Math.min(92, hsl.l + 28));
  const light = hslToRgb(hsl.h, hsl.s, Math.min(82, hsl.l + 14));
  const base = { r, g, b };
  const dark = hslToRgb(hsl.h, hsl.s, Math.max(18, hsl.l - 16));
  const darkest = hslToRgb(hsl.h, hsl.s, Math.max(10, hsl.l - 30));

  return [
    rgbToHex(lightest.r, lightest.g, lightest.b),
    rgbToHex(light.r, light.g, light.b),
    rgbToHex(base.r, base.g, base.b),
    rgbToHex(dark.r, dark.g, dark.b),
    rgbToHex(darkest.r, darkest.g, darkest.b)
  ];
}

function luminance(r, g, b) {
  const values = [r, g, b].map(value => {
    const channel = value / 255;

    return channel <= 0.03928
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2];
}

function contrastRatio(color1, color2) {
  const l1 = luminance(color1.r, color1.g, color1.b);
  const l2 = luminance(color2.r, color2.g, color2.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

function getContrastLabel(ratio) {
  if (ratio >= 7) return "AAA Pass";
  if (ratio >= 4.5) return "AA Pass";
  if (ratio >= 3) return "Large Text";
  return "Fail";
}

function renderPalette(colors) {
  palette.innerHTML = "";

  colors.forEach(color => {
    const item = document.createElement("div");
    item.className = "palette-color";
    item.style.background = color;

    item.innerHTML = `<span>${color}</span>`;

    item.addEventListener("click", () => {
      copyText(color);
    });

    palette.appendChild(item);
  });
}

function updateColor(hex) {
  const normalized = normalizeHex(hex);

  if (!normalized) {
    message.textContent = "Invalid HEX color.";
    return;
  }

  currentHex = normalized;

  const { r, g, b } = hexToRgb(currentHex);
  const hsl = rgbToHsl(r, g, b);
  const hsv = rgbToHsv(r, g, b);
  const cmyk = rgbToCmyk(r, g, b);

  colorPicker.value = currentHex;
  hexInput.value = currentHex;
  colorPreview.style.background = currentHex;
  previewHex.textContent = currentHex;

  hexValue.textContent = currentHex;
  rgbValue.textContent = `rgb(${r}, ${g}, ${b})`;
  hslValue.textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  hsvValue.textContent = `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;
  cmykValue.textContent = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;

  currentPalette = createPalette(currentHex);
  renderPalette(currentPalette);

  whiteContrast.style.background = currentHex;
  blackContrast.style.background = currentHex;

  const currentRgb = { r, g, b };
  const whiteRatio = contrastRatio(currentRgb, { r: 255, g: 255, b: 255 });
  const blackRatio = contrastRatio(currentRgb, { r: 2, g: 6, b: 23 });

  whiteScore.textContent = `${getContrastLabel(whiteRatio)} (${whiteRatio.toFixed(2)}:1)`;
  blackScore.textContent = `${getContrastLabel(blackRatio)} (${blackRatio.toFixed(2)}:1)`;

  const darkColor = currentPalette[3];

  gradientPreview.style.background = `linear-gradient(135deg, ${currentHex}, ${darkColor})`;

  gradientCode.textContent = `background: linear-gradient(135deg, ${currentHex}, ${darkColor});`;

  message.textContent = "";
}

function randomColor() {
  const color = rgbToHex(
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256)
  );

  updateColor(color);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    message.textContent = `${text} copied to clipboard.`;
  } catch {
    message.textContent = "Copy failed.";
  }
}

copyButtons.forEach(button => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.copy);
    copyText(target.textContent);
  });
});

copyPaletteBtn.addEventListener("click", () => {
  copyText(currentPalette.join(", "));
});

colorPicker.addEventListener("input", () => {
  updateColor(colorPicker.value);
});

hexInput.addEventListener("input", () => {
  updateColor(hexInput.value);
});

randomBtn.addEventListener("click", randomColor);

updateColor(currentHex);