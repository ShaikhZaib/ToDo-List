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
    openTodoModal();
  }

  function handleTodoFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(ui.todoForm);

    const title = formData.get("title").trim();
    const description = formData.get("description").trim();
    const dueDate = formData.get("dueDate");
    const priority = formData.get("priority");
    const notes = formData.get("notes").trim();

    if (title === "") return;

    const todo = new Todo({
      title,
      description,
      dueDate,
      priority,
      notes,
    });

    currentProject.addTodo(todo);

    closeTodoModal();

    ui.todoForm.reset();

    renderTodos();
  }

  function renderTodos() {
    ui.todoHeading.textContent = currentProject.name;

    ui.todosList.innerHTML = "";

    currentProject.todos.forEach((todo) => {
      const li = document.createElement("li");
      li.dataset.id = todo.id;

      const titleSpan = document.createElement("span");
      titleSpan.textContent = todo.title;

      const completedCheckbox = document.createElement("input");
      completedCheckbox.type = "checkbox";
      completedCheckbox.checked = todo.completed;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-btn");

      li.append(completedCheckbox, titleSpan, deleteButton);
      ui.todosList.append(li);
    });
  }

  function getTodoFromEvent(event) {
    const li = event.target.closest("li");
    const todoId = li.dataset.id;

    return currentProject.getTodo(todoId);
  }

  function handleToggleTodo(event) {
    const checkbox = event.target.closest('input[type="checkbox"]');
    if (!checkbox) return;

    const todo = getTodoFromEvent(event);
    todo.toggleComplete();

    renderTodos();
  }

  function handleDeleteTodo(event) {
    const deleteButton = event.target.closest(".delete-btn");
    if (!deleteButton) return;

    const todo = getTodoFromEvent(event);

    currentProject.removeTodo(todo.id);

    renderTodos();
  }

  function handleTodoClick(event) {
    if (event.target.closest('input[type="checkbox"]')) {
      handleToggleTodo(event);
      return;
    }

    if (event.target.closest(".delete-btn")) {
      handleDeleteTodo(event);
      return;
    }
  }

  function openTodoModal() {
    ui.todoModal.classList.remove("hidden");
    ui.todoForm.elements.title.focus();
  }

  function closeTodoModal() {
    ui.todoModal.classList.add("hidden");
  }

  function init() {
    renderProjects();
    renderTodos();

    ui.addProjectButton.addEventListener("click", handleAddProject);
    ui.projectsList.addEventListener("click", handleProjectSelection);

    ui.addTodoButton.addEventListener("click", handleAddTodo);

    ui.todosList.addEventListener("click", handleTodoClick);

    ui.todoForm.addEventListener("submit", handleTodoFormSubmit);
  }

  return {
    init,
  };
})();

export default DisplayController;
