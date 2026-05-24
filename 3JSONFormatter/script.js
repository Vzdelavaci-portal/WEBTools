const input = document.getElementById("input");
const output = document.getElementById("output");

const formatBtn = document.getElementById("formatBtn");
const minifyBtn = document.getElementById("minifyBtn");
const clearBtn = document.getElementById("clearBtn");

const copyBtn = document.getElementById("copyBtn");
const pasteBtn = document.getElementById("pasteBtn");

const statusBox = document.getElementById("status");
const errorLine = document.getElementById("errorLine");

let lastErrorLine = null;

function setStatus(message, type = "") {
  statusBox.textContent = message;
  statusBox.className = "status";

  if (type) {
    statusBox.classList.add(type);
  }
}

function clearErrorHighlight() {
  errorLine.style.display = "none";
  input.classList.remove("input-error");
  lastErrorLine = null;
}

function getErrorPosition(errorMessage) {
  const match = errorMessage.match(/position (\d+)/);

  if (!match) {
    return null;
  }

  return Number(match[1]);
}

function getLineAndColumn(text, position) {
  const beforeError = text.slice(0, position);
  const lines = beforeError.split("\n");

  return {
    line: lines.length,
    column: lines[lines.length - 1].length + 1
  };
}

function highlightErrorLine(lineNumber) {
  const lineHeight = 24;
  const paddingTop = 18;

  const top = paddingTop + (lineNumber - 1) * lineHeight - input.scrollTop;

  errorLine.style.top = `${top}px`;
  errorLine.style.display = "block";

  input.classList.add("input-error");
  lastErrorLine = lineNumber;
}

function handleJsonError(error) {
  output.value = "";

  const position = getErrorPosition(error.message);

  if (position !== null) {
    const location = getLineAndColumn(input.value, position);

    highlightErrorLine(location.line);

    setStatus(
      `Invalid JSON: error on line ${location.line}, column ${location.column}`,
      "error"
    );
  } else {
    setStatus(`Invalid JSON: ${error.message}`, "error");
    input.classList.add("input-error");
  }
}

function formatJSON() {
  try {
    const parsed = JSON.parse(input.value);
    const formatted = JSON.stringify(parsed, null, 2);

    output.value = formatted;

    clearErrorHighlight();

    setStatus("Valid JSON formatted successfully!", "success");
  } catch (error) {
    handleJsonError(error);
  }
}

function minifyJSON() {
  try {
    const parsed = JSON.parse(input.value);
    const minified = JSON.stringify(parsed);

    output.value = minified;

    clearErrorHighlight();

    setStatus("JSON minified successfully!", "success");
  } catch (error) {
    handleJsonError(error);
  }
}

function clearAll() {
  input.value = "";
  output.value = "";

  clearErrorHighlight();

  setStatus("Waiting for JSON input...");
  input.focus();
}

async function copyOutput() {
  if (!output.value) {
    setStatus("Nothing to copy.", "error");
    return;
  }

  try {
    await navigator.clipboard.writeText(output.value);
    setStatus("JSON copied to clipboard!", "success");
  } catch {
    setStatus("Copy failed. Clipboard access denied.", "error");
  }
}

async function pasteInput() {
  try {
    const text = await navigator.clipboard.readText();

    input.value = text;
    output.value = "";

    clearErrorHighlight();

    setStatus("JSON pasted successfully!", "success");
  } catch {
    setStatus("Paste failed. Clipboard access denied.", "error");
  }
}

input.addEventListener("input", () => {
  clearErrorHighlight();
  output.value = "";

  if (!input.value.trim()) {
    setStatus("Waiting for JSON input...");
  }
});

input.addEventListener("scroll", () => {
  if (lastErrorLine !== null) {
    highlightErrorLine(lastErrorLine);
  }
});

formatBtn.addEventListener("click", formatJSON);
minifyBtn.addEventListener("click", minifyJSON);
clearBtn.addEventListener("click", clearAll);
copyBtn.addEventListener("click", copyOutput);
pasteBtn.addEventListener("click", pasteInput);