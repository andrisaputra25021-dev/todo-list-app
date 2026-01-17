// setting jam otomatis
const dateElement = document.getElementById("date");
const timeElement = document.getElementById("time");

function timeUpdate() {
  const now = new Date();

  const dateFormat = {
    day: "numeric",
    weekday: "long",
    month: "long",
    year: "numeric",
  };

  const timeFormat = {
    hour: "2-digit",
    minute: "2-digit",
  };

  dateElement.innerText = now.toLocaleDateString("id-ID", dateFormat);
  timeElement.innerText = now.toLocaleTimeString("id-ID", timeFormat);
}

timeUpdate();
setInterval(timeUpdate, 1000);

// sumber data utama
let data = [];

// load data dari localstorage
const savedTasks = localStorage.getItem("taskList");
if (savedTasks) {
  data = JSON.parse(savedTasks);
}

//  rendering data to UI
const taskListElement = document.getElementById("task-list");
function renderTaskList() {
  taskListElement.innerHTML = "";

  data.forEach(function (item) {
    const listElement = document.createElement("li");
    listElement.textContent = item.text;
    taskListElement.appendChild(listElement);
  });
}
renderTaskList();

// proses submit form
const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskDate = document.getElementById("task-date");
const taskTime = document.getElementById("task-time");
const taskPriority = document.getElementById("task-priority");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = taskInput.value.trim();
  const date = taskDate.value;
  const time = taskTime.value;
  const priority = taskPriority.value;

  if (!text || !date || !time || !priority) {
    alert("Semua field harus diisi!");
    return;
  }

  const newTask = {
    id: Date.now(),
    text: text,
    date: date,
    time: time,
    priority: priority,
    complete: false,
  };

  data.push(newTask);

  localStorage.setItem("taskList", JSON.stringify(data));
  renderTaskList();
  form.reset();
});
