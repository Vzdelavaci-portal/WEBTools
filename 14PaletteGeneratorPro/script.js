const baseColor = document.getElementById("baseColor");
const hexInput = document.getElementById("hexInput");
const paletteType = document.getElementById("paletteType");

const mainPreview = document.getElementById("mainPreview");
const mainHex = document.getElementById("mainHex");

const paletteTitle = document.getElementById("paletteTitle");
const paletteDescription = document.getElementById("paletteDescription");
const paletteGrid = document.getElementById("paletteGrid");

const uiPreview = document.getElementById("uiPreview");
const cssOutput = document.getElementById("cssOutput");
const message = document.getElementById("message");

const randomBtn = document.getElementById("randomBtn");
const copyPaletteBtn = document.getElementById("copyPaletteBtn");
const copyCssBtn = document.getElementById("copyCssBtn");

let currentPalette = [];

const paletteDescriptions = {
  monochromatic: {
    title: "Monochromatic Palette",
    description: "Different shades and tints of one base color."
  },
  complementary: {
    title: "Complementary Palette",
    description: "A strong contrast palette based on opposite colors."
  },
  analogous: {
    title: "Analogous Palette",
    description: "Soft and harmonious colors located next to each other."
  },
  triadic: {
    title: "Triadic Palette",
    description: "Three balanced colors evenly spaced around the color wheel."
  },
  split: {
    title: "Split Complementary Palette",
    description: "A balanced alternative to complementary colors with less contrast."
  }
};

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
      .map(value =>
        Math.max(0, Math.min(255, value))
          .toString(16)
          .padStart(2, "0")
      )
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

    if (max === r) h = (g - b) / diff + (g < b ? 6 : 0);
    if (max === g) h = (b - r) / diff + 2;
    if (max === b) h = (r - g) / diff + 4;

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360;
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

function hslToHex(h, s, l) {
  const rgb = hslToRgb(h, s, l);

  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

function createPalette(hex, type) {
  const { r, g, b } = hexToRgb(hex);
  const hsl = rgbToHsl(r, g, b);

  if (type === "monochromatic") {
    return [
      hslToHex(hsl.h, hsl.s, 88),
      hslToHex(hsl.h, hsl.s, 72),
      hslToHex(hsl.h, hsl.s, hsl.l),
      hslToHex(hsl.h, hsl.s, 38),
      hslToHex(hsl.h, hsl.s, 22)
    ];
  }

  if (type === "complementary") {
    return [
      hslToHex(hsl.h, hsl.s, 82),
      hslToHex(hsl.h, hsl.s, 58),
      hex,
      hslToHex(hsl.h + 180, hsl.s, 55),
      hslToHex(hsl.h + 180, hsl.s, 32)
    ];
  }

  if (type === "analogous") {
    return [
      hslToHex(hsl.h - 40, hsl.s, 58),
      hslToHex(hsl.h - 20, hsl.s, 58),
      hex,
      hslToHex(hsl.h + 20, hsl.s, 58),
      hslToHex(hsl.h + 40, hsl.s, 58)
    ];
  }

  if (type === "triadic") {
    return [
      hslToHex(hsl.h, hsl.s, 82),
      hex,
      hslToHex(hsl.h + 120, hsl.s, 58),
      hslToHex(hsl.h + 240, hsl.s, 58),
      hslToHex(hsl.h + 240, hsl.s, 34)
    ];
  }

  if (type === "split") {
    return [
      hslToHex(hsl.h, hsl.s, 82),
      hex,
      hslToHex(hsl.h + 150, hsl.s, 56),
      hslToHex(hsl.h + 210, hsl.s, 56),
      hslToHex(hsl.h + 210, hsl.s, 32)
    ];
  }

  return [hex];
}

function renderPalette(colors) {
  paletteGrid.innerHTML = "";

  colors.forEach((color, index) => {
    const card = document.createElement("div");
    card.className = "color-card";

    const rgb = hexToRgb(color);

    card.innerHTML = `
      <div class="color-swatch" style="background:${color}"></div>

      <div class="color-info">
        <strong>${color}</strong>
        <span>Color ${index + 1} • rgb(${rgb.r}, ${rgb.g}, ${rgb.b})</span>
      </div>
    `;

    card.addEventListener("click", () => {
      copyText(color, `${color} copied to clipboard!`);
    });

    paletteGrid.appendChild(card);
  });
}

function updateUiPreview(colors) {
  const [light, soft, base, dark, darkest] = colors;

  uiPreview.style.background = `linear-gradient(135deg, ${light}, ${soft})`;

  const card = uiPreview.querySelector(".ui-card");
  const badge = uiPreview.querySelector(".badge");
  const button = uiPreview.querySelector("button");

  card.style.background = darkest;
  card.style.color = "#ffffff";
  badge.style.background = light;
  badge.style.color = darkest;
  button.style.background = base;
  button.style.color = "#ffffff";
}

function generateCssVariables(colors) {
  return `:root {
  --color-1: ${colors[0]};
  --color-2: ${colors[1]};
  --color-3: ${colors[2]};
  --color-4: ${colors[3]};
  --color-5: ${colors[4]};
}`;
}

function updatePalette() {
  const hex = normalizeHex(hexInput.value);

  if (!hex) {
    message.textContent = "Invalid HEX color.";
    return;
  }

  baseColor.value = hex;
  hexInput.value = hex;

  mainPreview.style.background = hex;
  mainHex.textContent = hex;

  const type = paletteType.value;
  currentPalette = createPalette(hex, type);

  const data = paletteDescriptions[type];

  paletteTitle.textContent = data.title;
  paletteDescription.textContent = data.description;

  renderPalette(currentPalette);
  updateUiPreview(currentPalette);

  cssOutput.textContent = generateCssVariables(currentPalette);

  message.textContent = "";
}

function randomColor() {
  const color = rgbToHex(
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256)
  );

  hexInput.value = color;
  updatePalette();
}

async function copyText(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
    message.textContent = successMessage;
  } catch {
    message.textContent = "Copy failed.";
  }
}

baseColor.addEventListener("input", () => {
  hexInput.value = baseColor.value.toUpperCase();
  updatePalette();
});

hexInput.addEventListener("input", updatePalette);
paletteType.addEventListener("change", updatePalette);

randomBtn.addEventListener("click", randomColor);

copyPaletteBtn.addEventListener("click", () => {
  copyText(
    currentPalette.join(", "),
    "Palette copied to clipboard!"
  );
});

copyCssBtn.addEventListener("click", () => {
  copyText(
    cssOutput.textContent,
    "CSS variables copied to clipboard!"
  );
});

updatePalette();