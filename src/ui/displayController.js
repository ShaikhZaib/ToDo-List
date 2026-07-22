import initialLoad from "./initialLoad.js";
import ProjectsManager from "../models/ProjectsManager.js";
import Project from "../models/Project.js";
import Todo from "../models/Todo.js";

const DisplayController = (() => {
  const ui = initialLoad();
  const projectManager = new ProjectsManager();

  let editingTodo = null;

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
    editingTodo = null;
    ui.todoForm.reset();
    openTodoModal();
  }

  function handleCancelTodo() {
    ui.todoForm.reset();
    closeTodoModal();
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

    if (editingTodo === null) {
      const todo = new Todo({
        title,
        description,
        dueDate,
        priority,
        notes,
      });

      currentProject.addTodo(todo);
      editingTodo = null;
    } else {
      editingTodo.update({
        title,
        description,
        dueDate,
        priority,
        notes,
      });

      editingTodo = null;
    }

    closeTodoModal();

    ui.todoForm.reset();

    renderTodos();
  }

  function createTodoElement(todo) {
    const li = document.createElement("li");
    li.dataset.id = todo.id;
    li.classList.add("todo-card");

    const header = document.createElement("div");
    header.classList.add("todo-header");

    const content = document.createElement("div");
    content.classList.add("todo-content");

    const actions = document.createElement("div");
    actions.classList.add("todo-actions");

    const title = document.createElement("h3");
    title.textContent = todo.title;
    title.classList.add("todo-title");

    const completedCheckbox = document.createElement("input");
    completedCheckbox.type = "checkbox";
    completedCheckbox.checked = todo.completed;

    const description = document.createElement("p");
    description.textContent = `Description : ${todo.description}`;
    description.classList.add("todo-description");
    if (todo.description) {
      content.append(description);
    }

    const dueDate = document.createElement("p");
    dueDate.textContent = `Due: ${todo.dueDate}`;
    dueDate.classList.add("todo-due-date");
    if (todo.dueDate) {
      content.append(dueDate);
    }

    const priority = document.createElement("span");
    priority.textContent = `Priority: ${todo.priority}`;
    priority.classList.add("todo-priority");
    content.append(priority);

    const notes = document.createElement("p");
    notes.textContent = `Notes ${todo.notes}`;
    notes.classList.add("todo-notes");
    if (todo.notes) {
      content.append(notes);
    }

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    header.append(completedCheckbox, title);
    actions.append(editButton, deleteButton);

    li.append(header, content, actions);

    return li;
  }

  function renderTodos() {
    ui.todoHeading.textContent = currentProject.name;

    ui.todosList.innerHTML = "";

    currentProject.todos.forEach((todo) => {
      ui.todosList.append(createTodoElement(todo));
    });
  }

  function populateTodoForm(todo) {
    ui.todoForm.elements.title.value = todo.title;
    ui.todoForm.elements.description.value = todo.description;
    ui.todoForm.elements.dueDate.value = todo.dueDate;
    ui.todoForm.elements.priority.value = todo.priority;
    ui.todoForm.elements.notes.value = todo.notes;
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

  function handleEditTodo(event) {
    const todo = getTodoFromEvent(event);

    editingTodo = todo;

    populateTodoForm(todo);

    openTodoModal();
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

    if (event.target.closest(".edit-btn")) {
      handleEditTodo(event);
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

    ui.cancelButton.addEventListener("click", handleCancelTodo);
    ui.todoForm.addEventListener("submit", handleTodoFormSubmit);
  }

  return {
    init,
  };
})();

export default DisplayController;
