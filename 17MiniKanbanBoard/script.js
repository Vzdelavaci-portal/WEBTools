const todoList = document.getElementById("todoList");
const progressList = document.getElementById("progressList");
const doneList = document.getElementById("doneList");

const totalTasks = document.getElementById("totalTasks");
const activeTasks = document.getElementById("activeTasks");
const doneTasks = document.getElementById("doneTasks");
const progressValue = document.getElementById("progressValue");
const progressFill = document.getElementById("progressFill");

const todoCount = document.getElementById("todoCount");
const progressCount = document.getElementById("progressCount");
const doneCount = document.getElementById("doneCount");

const searchInput = document.getElementById("searchInput");
const labelFilter = document.getElementById("labelFilter");
const addTaskBtn = document.getElementById("addTaskBtn");
const exportBtn = document.getElementById("exportBtn");
const importInput = document.getElementById("importInput");

const taskModal = document.getElementById("taskModal");
const modalTitle = document.getElementById("modalTitle");
const closeModalBtn = document.getElementById("closeModalBtn");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const deleteTaskBtn = document.getElementById("deleteTaskBtn");

const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskPriority = document.getElementById("taskPriority");
const taskLabel = document.getElementById("taskLabel");
const taskDueDate = document.getElementById("taskDueDate");
const taskChecklist = document.getElementById("taskChecklist");

let tasks = JSON.parse(localStorage.getItem("miniKanbanTasks")) || [
  {
    id: crypto.randomUUID(),
    title: "Create first WebTools task",
    description: "Drag this card between columns.",
    priority: "Medium",
    label: "Project",
    dueDate: "",
    checklist: ["Try drag and drop", "Edit this card"],
    status: "todo"
  },
  {
    id: crypto.randomUUID(),
    title: "Record reel preview",
    description: "Show adding a task and moving it to Done.",
    priority: "High",
    label: "Work",
    dueDate: "",
    checklist: ["Open board", "Move card", "Export JSON"],
    status: "progress"
  }
];

let editingTaskId = null;
let draggedTaskId = null;

const lists = {
  todo: todoList,
  progress: progressList,
  done: doneList
};

function saveTasks() {
  localStorage.setItem("miniKanbanTasks", JSON.stringify(tasks));
}

function getFilteredTasks() {
  const search = searchInput.value.toLowerCase().trim();
  const label = labelFilter.value;

  return tasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(search) ||
      task.description.toLowerCase().includes(search);

    const matchesLabel =
      label === "all" || task.label === label;

    return matchesSearch && matchesLabel;
  });
}

function isOverdue(date, status) {
  if (!date || status === "done") return false;

  const today = new Date();
  const due = new Date(date + "T23:59:59");

  return due < today;
}

function getPriorityStars(priority) {
  if (priority === "High") return "⭐⭐⭐";
  if (priority === "Medium") return "⭐⭐";
  return "⭐";
}

function renderTasks() {
  Object.values(lists).forEach(list => {
    list.innerHTML = "";
  });

  const filteredTasks = getFilteredTasks();

  ["todo", "progress", "done"].forEach(status => {
    const columnTasks = filteredTasks.filter(task => task.status === status);

    if (columnTasks.length === 0) {
      lists[status].innerHTML = `
        <div class="empty-column">
          No tasks here.
        </div>
      `;
      return;
    }

    columnTasks.forEach(task => {
      const card = document.createElement("article");
      card.className = "task-card";
      card.draggable = true;
      card.dataset.id = task.id;

      const checklistCount = task.checklist.length;
      const overdueClass = isOverdue(task.dueDate, task.status) ? "overdue" : "";

      card.innerHTML = `
        <div class="task-title">${escapeHTML(task.title)}</div>

        <div class="task-description">
          ${escapeHTML(task.description || "No description.")}
        </div>

        <div class="task-meta">
          <span class="badge label-${task.label.toLowerCase()}">
            ${task.label}
          </span>

          <span class="badge priority-${task.priority.toLowerCase()}">
            ${getPriorityStars(task.priority)} ${task.priority}
          </span>
        </div>

        ${task.dueDate ? `
          <div class="due-date ${overdueClass}">
            ${overdueClass ? "⚠️ Overdue:" : "📅 Due:"} ${task.dueDate}
          </div>
        ` : ""}

        ${checklistCount > 0 ? `
          <div class="checklist-preview">
            ☑ ${checklistCount} checklist item${checklistCount !== 1 ? "s" : ""}
          </div>
        ` : ""}
      `;

      card.addEventListener("click", () => openEditModal(task.id));

      card.addEventListener("dragstart", event => {
        draggedTaskId = task.id;
        card.classList.add("dragging");
        event.dataTransfer.effectAllowed = "move";
      });

      card.addEventListener("dragend", () => {
        draggedTaskId = null;
        card.classList.remove("dragging");
      });

      lists[status].appendChild(card);
    });
  });

  updateStats();
}

function updateStats() {
  const total = tasks.length;
  const done = tasks.filter(task => task.status === "done").length;
  const active = total - done;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  totalTasks.textContent = total;
  activeTasks.textContent = active;
  doneTasks.textContent = done;
  progressValue.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;

  todoCount.textContent = tasks.filter(task => task.status === "todo").length;
  progressCount.textContent = tasks.filter(task => task.status === "progress").length;
  doneCount.textContent = done;
}

function openAddModal() {
  editingTaskId = null;
  modalTitle.textContent = "Add Task";

  taskTitle.value = "";
  taskDescription.value = "";
  taskPriority.value = "Medium";
  taskLabel.value = "Work";
  taskDueDate.value = "";
  taskChecklist.value = "";

  deleteTaskBtn.style.display = "none";

  taskModal.classList.remove("hidden");
  taskTitle.focus();
}

function openEditModal(id) {
  const task = tasks.find(item => item.id === id);

  if (!task) return;

  editingTaskId = id;
  modalTitle.textContent = "Edit Task";

  taskTitle.value = task.title;
  taskDescription.value = task.description;
  taskPriority.value = task.priority;
  taskLabel.value = task.label;
  taskDueDate.value = task.dueDate;
  taskChecklist.value = task.checklist.join("\n");

  deleteTaskBtn.style.display = "block";

  taskModal.classList.remove("hidden");
}

function closeModal() {
  taskModal.classList.add("hidden");
}

function saveTask() {
  const title = taskTitle.value.trim();

  if (!title) {
    alert("Task title is required.");
    return;
  }

  const taskData = {
    title,
    description: taskDescription.value.trim(),
    priority: taskPriority.value,
    label: taskLabel.value,
    dueDate: taskDueDate.value,
    checklist: taskChecklist.value
      .split("\n")
      .map(item => item.trim())
      .filter(Boolean)
  };

  if (editingTaskId) {
    tasks = tasks.map(task => {
      if (task.id !== editingTaskId) return task;

      return {
        ...task,
        ...taskData
      };
    });
  } else {
    tasks.unshift({
      id: crypto.randomUUID(),
      ...taskData,
      status: "todo"
    });
  }

  saveTasks();
  renderTasks();
  closeModal();
}

function deleteTask() {
  if (!editingTaskId) return;

  const confirmDelete = confirm("Delete this task?");

  if (!confirmDelete) return;

  tasks = tasks.filter(task => task.id !== editingTaskId);

  saveTasks();
  renderTasks();
  closeModal();
}

function setupDragAndDrop() {
  document.querySelectorAll(".column").forEach(column => {
    column.addEventListener("dragover", event => {
      event.preventDefault();
      column.classList.add("drag-over");
    });

    column.addEventListener("dragleave", () => {
      column.classList.remove("drag-over");
    });

    column.addEventListener("drop", event => {
      event.preventDefault();

      const newStatus = column.dataset.status;
      const task = tasks.find(item => item.id === draggedTaskId);

      if (!task) return;

      const oldStatus = task.status;
      task.status = newStatus;

      column.classList.remove("drag-over");

      saveTasks();
      renderTasks();

      if (newStatus === "done" && oldStatus !== "done") {
        launchConfetti();
      }
    });
  });
}

function exportTasks() {
  const data = JSON.stringify(tasks, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "mini-kanban-board.json";
  link.click();

  URL.revokeObjectURL(url);
}

function importTasks(event) {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);

      if (!Array.isArray(imported)) {
        throw new Error("Invalid JSON format.");
      }

      tasks = imported.map(task => ({
        id: task.id || crypto.randomUUID(),
        title: task.title || "Untitled Task",
        description: task.description || "",
        priority: task.priority || "Medium",
        label: task.label || "Work",
        dueDate: task.dueDate || "",
        checklist: Array.isArray(task.checklist) ? task.checklist : [],
        status: ["todo", "progress", "done"].includes(task.status)
          ? task.status
          : "todo"
      }));

      saveTasks();
      renderTasks();
    } catch {
      alert("Invalid JSON file.");
    }

    importInput.value = "";
  };

  reader.readAsText(file);
}

function launchConfetti() {
  const colors = ["#38bdf8", "#22c55e", "#facc15", "#ec4899", "#a855f7"];

  for (let i = 0; i < 28; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";

    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${Math.random() * 0.25}s`;

    document.body.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, 1200);
  }
}

function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

addTaskBtn.addEventListener("click", openAddModal);
closeModalBtn.addEventListener("click", closeModal);
saveTaskBtn.addEventListener("click", saveTask);
deleteTaskBtn.addEventListener("click", deleteTask);

taskModal.addEventListener("click", event => {
  if (event.target === taskModal) {
    closeModal();
  }
});

searchInput.addEventListener("input", renderTasks);
labelFilter.addEventListener("change", renderTasks);

exportBtn.addEventListener("click", exportTasks);
importInput.addEventListener("change", importTasks);

setupDragAndDrop();
renderTasks();