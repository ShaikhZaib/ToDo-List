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
  const projectsList = document.createElement("ul");
  const addProjectButton = document.createElement("button");

  projectsList.classList.add("projects-list");

  sidebarH2.textContent = "Projects";
  addProjectButton.textContent = "+ Add Project";

  sidebar.append(sidebarH2, projectsList, addProjectButton);

  //    main ToDo-Section
  const todoH2 = document.createElement("h2");
  const todosList = document.createElement("ul");
  const addTodoButton = document.createElement("button");

  todosList.classList.add("todos-list");

  todoH2.textContent = "Inbox";
  addTodoButton.textContent = "+ Add Todo";

  todoSection.append(todoH2, todosList, addTodoButton);

  main.append(sidebar, todoSection);
  app.append(header, main);
  contentSection.append(app);

  return {
    projectsList,
    todosList,
    addProjectButton,
    addTodoButton,
    todoSection,
    todoHeading: todoH2,
  };
}
