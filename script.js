// 🌸 Aditi's Dynamic To-Do List Logic
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskBody = document.getElementById("taskBody");
const prioritySelect = document.getElementById("prioritySelect");

// Progress elements
const progressCircle = document.getElementById("progressValue");
const progressText = document.getElementById("progressPercent");

// Sections
const startBtn = document.getElementById("startBtn");
const heroSection = document.getElementById("heroSection");
const tasksSection = document.getElementById("tasksSection");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
document.getElementById("date").textContent = new Date().toDateString();

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ✅ Update Progress Circle
function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const circumference = 2 * Math.PI * 54;
  progressCircle.style.strokeDasharray = circumference;
  progressCircle.style.strokeDashoffset = circumference - (circumference * percent) / 100;

  progressText.textContent = `${percent}%`;
}

// ✅ Render
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

    // ✅ Click row → toggle complete
    row.onclick = () => toggleComplete(index);

    // Prevent toggle when clicking buttons
    row.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", e => e.stopPropagation());
    });

    taskBody.appendChild(row);
  });

  updateProgress();
}


// ✅ Add Task
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


// ✅ Delete
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}


// ✅ Toggle
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}



// ✅ ✅ ✅ INLINE EDIT START
function editTask(index, event) {
  event.stopPropagation();

  const row = event.target.closest("tr");
  const textCell = row.children[1];
  const priorityCell = row.children[2];
  const actionCell = row.children[4];

  const oldText = textCell.textContent;
  const oldPriority = priorityCell.textContent;

  textCell.innerHTML = `
    <input type="text" id="editText${index}" value="${oldText}" style="width:90%; padding:6px; border-radius:6px;">
  `;

  priorityCell.innerHTML = `
    <select id="editPriority${index}" style="padding:6px; border-radius:6px;">
      <option ${oldPriority === "Low" ? "selected" : ""}>Low</option>
      <option ${oldPriority === "Medium" ? "selected" : ""}>Medium</option>
      <option ${oldPriority === "High" ? "selected" : ""}>High</option>
    </select>
  `;

  actionCell.innerHTML = `
    <button class="action-btn save-btn" onclick="saveTask(${index}, event)">Save</button>
    <button class="action-btn cancel-btn" onclick="cancelEdit(${index}, '${oldText}', '${oldPriority}', event)">Cancel</button>
  `;
}

function saveTask(index, event) {
  event.stopPropagation();

  const newText = document.getElementById(`editText${index}`).value.trim();
  const newPriority = document.getElementById(`editPriority${index}`).value;

  if (newText === "") return alert("Task cannot be empty!");

  tasks[index].text = newText;
  tasks[index].priority = newPriority;
  saveTasks();
  renderTasks();
}

function cancelEdit(index, oldText, oldPriority, event) {
  event.stopPropagation();
  renderTasks();
}
// ✅ ✅ ✅ INLINE EDIT END



// ENTER → Add
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});


// ✅ Start Button → Page Switch
startBtn.addEventListener("click", () => {
  heroSection.classList.add("hidden");
  tasksSection.classList.remove("hidden");
  tasksSection.classList.add("fade-in");
  window.scrollTo(0, 0);
});


// ✅ Load
renderTasks();
