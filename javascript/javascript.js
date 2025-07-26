const projects = [];

class Project {
    constructor(name) {
        this.id = Date.now().toString();
        this.name = name;
        this.todos = [];
    }
}

class Todo {
    constructor(title, desc, dueDate, priority) {
        this.id = Date.now().toString();
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }
}

//DOM elements
const projectListEl = document.getElementById("project-list");
const projectFormEl = document.getElementById("project-form");
const projectNameInput = document.getElementById("project-name");

const todoSection = document.getElementById("todo-section");
const currentProjectTitle = document.getElementById("current-project-title");
const todoListEl = document.getElementById("todo-list");
const todoFormEl = document.getElementById("todo-form");

let currentProjectId = null;

//add new project
projectFormEl.addEventListener("submit", e => {
    e.preventDefault();
    const name = projectNameInput.value.trim();
    if (name === "") return;

    const project = new Project(name);
    projects.push(project);
    renderProjects();
    projectNameInput.value = "";
})

//render all projects
function renderProjects(){
    projectListEl.innerHTML = "";
    projects.forEach(project => {
        const li = document.createElement("li");
        li.textContent = project.name;
        li.dataset.id = project.id;
        li.classList.add("project-item");
        projectListEl.appendChild(li);
    });
}

//select project to view todos
projectListEl.addEventListener("click", e => {
    if (!e.target.matches(".project-item")) return;
    currentProjectId = e.target.dataset.id;
    const project = projects.find(p => p.id === currentProjectId);
    if (!project) return;

    currentProjectTitle.textContent = `Todos for: ${project.name}`;
    todoSection.style.display = "block";
    renderTodos();
})

//add a new todo
todoFormEl.addEventListener("submit", e => {
    e.preventDefault();
    const title = document.getElementById("todo-title").value;
    const desc = document.getElementById("todo-desc").value;
    const dueDate = document.getElementById("todo-dueDate").value;
    const priority = document.getElementById("todo-priority").value;

    const project = projects.find(p => p.id === currentProjectId);
    if (!project) return;

    const todo = new Todo(title, desc, dueDate, priority);
    project.todos.push(todo);
    renderTodos();
    todoFormEl.reset();
})

// Render todos for current project
function renderTodos() {
    const project = projects.find(p => p.id === currentProjectId);
    if (!project) return;

    todoListEl.innerHTML = "";
    project.todos.forEach(todo => {
        const li = document.createElement("li");
        li.textContent = `${todo.title} - Due: ${todo.dueDate} - Priority: ${todo.priority}`;
        todoListEl.appendChild(li);
    });
}