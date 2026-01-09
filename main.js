// setting waktu otomatis
const dateElement = document.getElementById("date");

function timeUpdate() {
  const today = new Date();
  const timeDetail = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  dateElement.innerText = today.toLocaleDateString("id-ID", timeDetail);
}
timeUpdate();
setInterval(timeUpdate, 1000);

// sumber data utma
let taskList = [];

// load data dari localstorage
const savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
  taskList = JSON.parse(savedTasks);
}
