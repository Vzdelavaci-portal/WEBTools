const noteInput =
  document.getElementById("noteInput");

const saveBtn =
  document.getElementById("saveBtn");

const clearAllBtn =
  document.getElementById("clearAllBtn");

const notesGrid =
  document.getElementById("notesGrid");

const notesCount =
  document.getElementById("notesCount");

let notes =
  JSON.parse(localStorage.getItem("clipboardNotes")) || [];

function saveToStorage() {

  localStorage.setItem(
    "clipboardNotes",
    JSON.stringify(notes)
  );
}

function updateCount() {

  notesCount.textContent =
    `${notes.length} note${notes.length !== 1 ? "s" : ""}`;
}

function renderNotes() {

  notesGrid.innerHTML = "";

  if (notes.length === 0) {

    notesGrid.innerHTML = `
      <div class="empty">
        No saved notes yet.
      </div>
    `;

    updateCount();

    return;
  }

  notes.forEach((note, index) => {

    const card =
      document.createElement("div");

    card.className = "note-card";

    card.innerHTML = `
      <div class="note-content">
        ${escapeHTML(note)}
      </div>

      <div class="note-actions">

        <button
          class="copy-btn"
          onclick="copyNote(${index})"
        >
          Copy
        </button>

        <button
          class="delete-btn"
          onclick="deleteNote(${index})"
        >
          Delete
        </button>

      </div>
    `;

    notesGrid.appendChild(card);
  });

  updateCount();
}

function escapeHTML(text) {

  const div =
    document.createElement("div");

  div.textContent = text;

  return div.innerHTML;
}

function saveNote() {

  const value =
    noteInput.value.trim();

  if (!value) return;

  notes.unshift(value);

  saveToStorage();

  renderNotes();

  noteInput.value = "";
}

async function copyNote(index) {

  try {

    await navigator.clipboard.writeText(
      notes[index]
    );

  } catch {

    alert("Clipboard access denied.");
  }
}

function deleteNote(index) {

  notes.splice(index, 1);

  saveToStorage();

  renderNotes();
}

function clearAll() {

  const confirmDelete =
    confirm("Delete all notes?");

  if (!confirmDelete) return;

  notes = [];

  saveToStorage();

  renderNotes();
}

saveBtn.addEventListener(
  "click",
  saveNote
);

clearAllBtn.addEventListener(
  "click",
  clearAll
);

renderNotes();