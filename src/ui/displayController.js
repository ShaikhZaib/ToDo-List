import initialLoad from "./initialLoad.js";
import ProjectsManager from "../models/ProjectsManager.js";
import Project from "../models/Project.js";
import Todo from "../models/Todo.js";

const DisplayController = (() => {
  const ui = initialLoad();
  const projectManager = new ProjectsManager();

  let currentProject = projectManager.getProject(
    projectManager.getProjects()[0].id,
  );

  function handleAddProject() {
    const projectName = prompt("Enter your project name: ");

    if (projectName === null) {
      return;
    }

    const trimmedName = projectName.trim();

    if (trimmedName === "") {
      return;
    }

    const project = new Project({
      name: trimmedName,
    });

    projectManager.addProject(project);

    renderProjects();
  }

  function handleProjectSelection(event) {
    const button = event.target.closest("button");
    if (!button) return;

    const projectId = button.dataset.id;

    currentProject = projectManager.getProject(projectId);

    renderProjects();
    renderTodos();
  }

  function renderProjects() {
    ui.projectsList.innerHTML = "";

    projectManager.getProjects().forEach((project) => {
      const projectLi = document.createElement("li");
      const projectButton = document.createElement("button");

      projectButton.textContent = project.name;
      projectButton.dataset.id = project.id;

      if (project.id === currentProject.id) {
        projectButton.classList.add("active");
      }

      projectLi.appendChild(projectButton);
      ui.projectsList.append(projectLi);
    });
  }

  function handleAddTodo() {
    const todoTitle = prompt("Enter the title for Todo: ");

    if (todoTitle === null) {
      return;
    }

    const trimmedTitle = todoTitle.trim();

    if (trimmedTitle === "") {
      return;
    }

    const todo = new Todo({
      title: trimmedTitle,
    });

    currentProject.addTodo(todo);

    renderTodos();
  }

  function renderTodos() {
    ui.todoHeading.textContent = currentProject.name;

    ui.todosList.innerHTML = "";

    currentProject.todos.forEach((todo) => {
      const li = document.createElement("li");
      const titleSpan = document.createElement("span");
      const completedCheckbox = document.createElement("input");
      completedCheckbox.type = "checkbox";

      titleSpan.textContent = todo.title;

      completedCheckbox.checked = todo.completed;
      completedCheckbox.dataset.id = todo.id;

      li.append(completedCheckbox, titleSpan);

      ui.todosList.append(li);
    });
  }

  function handleTodoCompletion(event) {
    const checkbox = event.target.closest('input[type="checkbox"]');

    if (!checkbox) return;

    const checkboxId = checkbox.dataset.id;

    const todo = currentProject.getTodo(checkboxId);

    todo.toggleComplete();

    renderTodos();
  }

  function init() {
    renderProjects();
    renderTodos();

    ui.addProjectButton.addEventListener("click", handleAddProject);
    ui.projectsList.addEventListener("click", handleProjectSelection);

    ui.addTodoButton.addEventListener("click", handleAddTodo);

    ui.todosList.addEventListener("click", handleTodoCompletion);
  }

  return {
    init,
  };
})();

export default DisplayController;
