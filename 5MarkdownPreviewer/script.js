const markdownInput =
  document.getElementById("markdownInput");

const preview =
  document.getElementById("preview");

const clearBtn =
  document.getElementById("clearBtn");

function updatePreview() {

  const markdownText =
    markdownInput.value;

  preview.innerHTML =
    marked.parse(markdownText);
}

function clearEditor() {

  markdownInput.value = "";

  updatePreview();
}

markdownInput.addEventListener(
  "input",
  updatePreview
);

clearBtn.addEventListener(
  "click",
  clearEditor
);

updatePreview();