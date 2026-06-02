const inputValue = document.getElementById("inputValue");
const statusText = document.getElementById("status");

const decValue = document.getElementById("decValue");
const binValue = document.getElementById("binValue");
const hexValue = document.getElementById("hexValue");
const octValue = document.getElementById("octValue");

const bitSize = document.getElementById("bitSize");
const bitGrid = document.getElementById("bitGrid");

const baseButtons = document.querySelectorAll(".base-btn");
const copyButtons = document.querySelectorAll("[data-copy]");
const quickButtons = document.querySelectorAll("[data-example]");

let currentBase = 10;
let currentNumber = null;

function setStatus(message, type = "") {
  statusText.textContent = message;
  statusText.className = "status";

  if (type) {
    statusText.classList.add(type);
  }
}

function setBase(base) {
  currentBase = Number(base);

  baseButtons.forEach(button => {
    button.classList.toggle(
      "active",
      Number(button.dataset.base) === currentBase
    );
  });

  convertValue();
}

function cleanInput(value) {
  return value
    .trim()
    .replace(/^0x/i, "")
    .replace(/^0b/i, "")
    .replace(/^0o/i, "");
}

function isValidForBase(value, base) {
  if (!value) return false;

  const patterns = {
    2: /^[01]+$/,
    8: /^[0-7]+$/,
    10: /^[0-9]+$/,
    16: /^[0-9a-fA-F]+$/
  };

  return patterns[base].test(value);
}

function clearResults() {
  decValue.textContent = "—";
  binValue.textContent = "—";
  hexValue.textContent = "—";
  octValue.textContent = "—";
  bitGrid.innerHTML = "";
  currentNumber = null;
}

function convertValue() {
  const rawValue = inputValue.value;
  const value = cleanInput(rawValue);

  if (!value) {
    clearResults();
    setStatus("Enter a number to start converting.");
    return;
  }

  if (!isValidForBase(value, currentBase)) {
    clearResults();
    setStatus(`Invalid value for base ${currentBase}.`, "error");
    return;
  }

  const number = parseInt(value, currentBase);

  if (!Number.isSafeInteger(number)) {
    clearResults();
    setStatus("Number is too large for safe JavaScript conversion.", "error");
    return;
  }

  currentNumber = number;

  decValue.textContent = number.toString(10);
  binValue.textContent = number.toString(2);
  hexValue.textContent = number.toString(16).toUpperCase();
  octValue.textContent = number.toString(8);

  setStatus("Conversion completed successfully.", "success");

  renderBits();
}

function renderBits() {
  bitGrid.innerHTML = "";

  if (currentNumber === null) return;

  const size = Number(bitSize.value);
  const maxValue = 2 ** size - 1;

  const value = currentNumber > maxValue
    ? currentNumber % (maxValue + 1)
    : currentNumber;

  const binary = value
    .toString(2)
    .padStart(size, "0")
    .slice(-size);

  [...binary].forEach((bit, index) => {
    const bitElement = document.createElement("div");

    bitElement.className = bit === "1"
      ? "bit on"
      : "bit";

    bitElement.innerHTML = `
      ${bit}
      <small>${size - index - 1}</small>
    `;

    bitGrid.appendChild(bitElement);
  });
}

async function copyValue(elementId) {
  const element = document.getElementById(elementId);
  const value = element.textContent;

  if (!value || value === "—") {
    setStatus("Nothing to copy.", "error");
    return;
  }

  try {
    await navigator.clipboard.writeText(value);
    setStatus(`${value} copied to clipboard.`, "success");
  } catch {
    setStatus("Copy failed. Clipboard access denied.", "error");
  }
}

baseButtons.forEach(button => {
  button.addEventListener("click", () => {
    setBase(button.dataset.base);
  });
});

copyButtons.forEach(button => {
  button.addEventListener("click", () => {
    copyValue(button.dataset.copy);
  });
});

quickButtons.forEach(button => {
  button.addEventListener("click", () => {
    inputValue.value = button.dataset.example;
    setBase(button.dataset.base);
  });
});

inputValue.addEventListener("input", convertValue);
bitSize.addEventListener("change", renderBits);

convertValue();