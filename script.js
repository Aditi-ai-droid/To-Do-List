// 🌸 Aditi's Dynamic To-Do List Logic
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskBody = document.getElementById("taskBody");
const prioritySelect = document.getElementById("prioritySelect");

// Progress elements
const progressCircle = document.getElementById("progressValue");
const progressText = document.getElementById("progressPercent");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
document.getElementById("date").textContent = new Date().toDateString();

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 🌸 Update Progress Circle dynamically
function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const circumference = 2 * Math.PI * 54;
  progressCircle.style.strokeDasharray = circumference;
  progressCircle.style.strokeDashoffset = circumference - (circumference * percent) / 100;

  progressText.textContent = `${percent}%`;
}

// 🖋 Render tasks
function renderTasks() {
  taskBody.innerHTML = "";
  tasks.forEach((task, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td class="${task.completed ? "completed" : ""}">${task.text}</td>
      <td class="priority-${task.priority.toLowerCase()}">${task.priority}</td>
      <td>${task.completed ? "✅ Done" : "🕓 In Progress"}</td>
      <td>
        <button class="action-btn edit-btn" onclick="editTask(${index}, event)">Edit</button>
        <button class="action-btn delete-btn" onclick="deleteTask(${index}, event)">Delete</button>
      </td>
    `;

    // 🩷 Click row to toggle complete
    row.onclick = () => toggleComplete(index);

    // Stop row click when pressing Edit/Delete
    row.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", e => e.stopPropagation());
    });

    taskBody.appendChild(row);
  });

  updateProgress();
}

// ➕ Add task
function addTask() {
  const text = taskInput.value.trim();
  const priority = prioritySelect.value;
  if (text === "") return alert("Please enter a task!");
  tasks.push({ text, priority, completed: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
  taskInput.focus();
}

// ❌ Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// ✅ Toggle complete
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// ✏️ Edit task
function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

// 🎯 Add with Enter key
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// 🩵 Initial render
renderTasks();

// 💫 Page Transition
const startBtn = document.getElementById("startBtn");
const heroSection = document.getElementById("heroSection");
const tasksSection = document.getElementById("tasksSection");
const homeLink = document.getElementById("homeLink");
const tasksLink = document.getElementById("tasksLink");

startBtn.addEventListener("click", () => {
  heroSection.classList.add("hidden");
  tasksSection.classList.remove("hidden");
  tasksSection.classList.add("fade-in");
  window.scrollTo(0, 0);
});

homeLink.addEventListener("click", () => {
  heroSection.classList.remove("hidden");
  tasksSection.classList.add("hidden");
  window.scrollTo(0, 0);
});

tasksLink.addEventListener("click", () => {
  heroSection.classList.add("hidden");
  tasksSection.classList.remove("hidden");
  tasksSection.classList.add("fade-in");
  window.scrollTo(0, 0);
});
