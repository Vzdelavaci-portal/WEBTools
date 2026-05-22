const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");
const direction = document.getElementById("direction");

const cssCode = document.getElementById("cssCode");

const copyBtn = document.getElementById("copyBtn");
const randomBtn = document.getElementById("randomBtn");

const copyMessage = document.getElementById("copyMessage");

function updateGradient() {

  const gradient =
    `linear-gradient(${direction.value}, ${color1.value}, ${color2.value})`;

  document.body.style.background = gradient;

  cssCode.textContent = `background: ${gradient};`;

  copyMessage.textContent = "";
}

function generateRandomColor() {

  const letters = "0123456789ABCDEF";

  let color = "#";

  for (let i = 0; i < 6; i++) {

    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

function randomGradient() {

  color1.value = generateRandomColor();
  color2.value = generateRandomColor();

  const directions = [
    "135deg",
    "to right",
    "to left",
    "to bottom",
    "to top",
    "45deg",
    "90deg",
    "180deg"
  ];

  direction.value =
    directions[Math.floor(Math.random() * directions.length)];

  updateGradient();
}

copyBtn.addEventListener("click", async () => {

  try {

    await navigator.clipboard.writeText(cssCode.textContent);

    copyMessage.textContent =
      "CSS code copied!";

  } catch {

    copyMessage.textContent =
      "Copy failed.";
  }
});

color1.addEventListener("input", updateGradient);
color2.addEventListener("input", updateGradient);

direction.addEventListener("change", updateGradient);

randomBtn.addEventListener("click", randomGradient);

updateGradient();