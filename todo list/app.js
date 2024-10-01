document.addEventListener('DOMContentLoaded', loadTasks);

const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

addTaskButton.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const task = document.createElement('li');
    task.innerHTML = `${taskText} <button onclick="deleteTask(this)">Delete</button>`;
    taskList.appendChild(task);
    taskInput.value = '';

    saveTasks();
}

function deleteTask(button) {
    const task = button.parentElement;
    taskList.removeChild(task);
    saveTasks();
}

function saveTasks() {
    const tasks = Array.from(taskList.children).map(task => task.innerText.replace(' Delete', ''));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => {
        const task = document.createElement('li');
        task.innerHTML = `${taskText} <button onclick="deleteTask(this)">Delete</button>`;
        taskList.appendChild(task);
    });
}
