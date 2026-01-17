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

    if (item.completed) {
      listElement.classList.add("item-checked");
    }

    const checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    checkboxElement.checked = item.completed;
    checkboxElement.dataset.id = item.id;

    checkboxElement.addEventListener("change", function (event) {
      const newTaskId = Number(event.target.dataset.id);
      const newTaskTarget = data.find(function (item) {
        return item.id === newTaskId;
      });

      if (newTaskTarget) {
        newTaskTarget.completed = event.target.checked;

        localStorage.setItem("taskList", JSON.stringify(data));
        renderTaskList();
      }
    });

    const textSpanElement = document.createElement("span");
    textSpanElement.textContent = item.text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.dataset.id = item.id;

    deleteButton.addEventListener("click", function (event) {
      const newTaskId = Number(event.target.dataset.id);

      data = data.filter(function (newTask) {
        return newTask.id !== newTaskId;
      });

      localStorage.setItem("taskList", JSON.stringify(data));
      renderTaskList();
    });

    taskListElement.appendChild(listElement);

    listElement.appendChild(checkboxElement);
    listElement.appendChild(textSpanElement);
    listElement.appendChild(deleteButton);
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
    completed: false,
  };

  data.push(newTask);

  localStorage.setItem("taskList", JSON.stringify(data));
  renderTaskList();
  form.reset();
});
