export default function initialLoad() {
  const contentSection = document.querySelector("#content");

  const app = document.createElement("div");
  const header = document.createElement("header");
  const main = document.createElement("main");
  const sidebar = document.createElement("aside");
  const todoSection = document.createElement("section");

  app.classList.add("app");
  sidebar.classList.add("sidebar");
  todoSection.classList.add("todo-section");

  //   Header
  const headerH1 = document.createElement("h1");
  headerH1.textContent = "Todo-List";

  header.append(headerH1);

  //   main sidebar
  const sidebarH2 = document.createElement("h2");
  sidebarH2.textContent = "Projects";

  const projectsList = document.createElement("ul");
  projectsList.classList.add("projects-list");

  const addProjectButton = document.createElement("button");
  addProjectButton.textContent = "+ Add Project";

  sidebar.append(sidebarH2, projectsList, addProjectButton);

  //    main ToDo-Section
  const todoH2 = document.createElement("h2");
  todoH2.textContent = "Inbox";

  const todosList = document.createElement("ul");
  todosList.classList.add("todos-list");

  const addTodoButton = document.createElement("button");
  addTodoButton.textContent = "+ Add Todo";

  todoSection.append(todoH2, todosList, addTodoButton);

  //   Add Todo Form
  const todoModal = document.createElement("div");
  todoModal.classList.add("todo-modal");
  todoModal.classList.add("hidden");

  const todoForm = document.createElement("form");

  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Title";
  titleLabel.htmlFor = "todo-title";
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "todo-title";
  titleInput.placeholder = "Enter todo title";
  titleInput.name = "title";

  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Description";
  descriptionLabel.htmlFor = "todo-description";
  const descriptionTextarea = document.createElement("textarea");
  descriptionTextarea.placeholder = "Enter project description...";
  descriptionTextarea.name = "description";
  descriptionTextarea.id = "todo-description";

  const dueDateLabel = document.createElement("label");
  dueDateLabel.textContent = "Due Date";
  dueDateLabel.htmlFor = "todo-duedate";
  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.name = "dueDate";
  dueDateInput.id = "todo-duedate";

  const priorityLabel = document.createElement("label");
  priorityLabel.textContent = "Priority";
  priorityLabel.htmlFor = "todo-priority";
  const prioritySelect = document.createElement("select");
  prioritySelect.name = "priority";
  prioritySelect.id = "todo-priority";

  const lowOption = document.createElement("option");
  lowOption.value = "low";
  lowOption.textContent = "Low";
  const mediumOption = document.createElement("option");
  mediumOption.value = "medium";
  mediumOption.textContent = "Medium";
  mediumOption.selected = true;
  mediumOption.setAttribute("selected", "selected");
  const highOption = document.createElement("option");
  highOption.value = "high";
  highOption.textContent = "High";

  prioritySelect.append(lowOption, mediumOption, highOption);

  const notesLabel = document.createElement("label");
  notesLabel.textContent = "Notes";
  notesLabel.htmlFor = "todo-notes";
  const notesTextarea = document.createElement("textarea");
  notesTextarea.placeholder = "Enter extra notes here...";
  notesTextarea.name = "notes";
  notesTextarea.id = "todo-notes";

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.id = "btn-cancel";
  cancelButton.textContent = "Cancel";

  const addFormTodoButton = document.createElement("button");
  addFormTodoButton.type = "submit";
  addFormTodoButton.id = "btn-add-todo";
  addFormTodoButton.textContent = "Add Todo";

  todoForm.append(
    titleLabel,
    titleInput,
    descriptionLabel,
    descriptionTextarea,
    dueDateLabel,
    dueDateInput,
    priorityLabel,
    prioritySelect,
    notesLabel,
    notesTextarea,
    cancelButton,
    addFormTodoButton,
  );

  todoModal.append(todoForm);

  main.append(sidebar, todoSection, todoModal);
  app.append(header, main);
  contentSection.append(app);

  return {
    projectsList,
    todosList,
    addProjectButton,
    addTodoButton,
    todoSection,
    todoHeading: todoH2,
    todoModal,
    todoForm,
    cancelButton,
  };
}
