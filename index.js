const input = document.getElementById("input");
const btn = document.getElementById("btn");
const container = document.getElementById("container");

// Function to create a task element
function createTaskElement(taskText) {
  let taskWrap = document.createElement("div");
  taskWrap.classList.add("taskWrap");

  let newElement = document.createElement("p");
  newElement.textContent = taskText;

  let deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";

  taskWrap.appendChild(newElement);
  taskWrap.appendChild(deleteButton);

  // Add event listener to delete button
  deleteButton.addEventListener("click", () => {
    container.removeChild(taskWrap);
    saveTasks(); // Update localStorage after deletion
  });

  return taskWrap;
}

// Function to save tasks to localStorage
function saveTasks() {
  const tasks = [];
  container.querySelectorAll(".taskWrap p").forEach((paragraph) => {
    tasks.push(paragraph.textContent);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // console.log("Saving tasks:", tasks); // Debugging
  // localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTask() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((taskText) => {
    const taskElement = createTaskElement(taskText);
    container.appendChild(taskElement);
  });
}

// Add new task when the button is clicked
btn.addEventListener("click", () => {
  if (input.value.trim() !== "") {
    const taskElement = createTaskElement(input.value.trim());
    container.appendChild(taskElement);
    input.value = ""; // Clear the input field
    saveTasks(); // Save tasks to localStorage
  }
});

// Load tasks when the page loads
window.addEventListener("load", loadTask);