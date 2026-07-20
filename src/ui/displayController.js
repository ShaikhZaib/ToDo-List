import initialLoad from "./initialLoad.js";
import ProjectsManager from "../models/ProjectsManager.js";
import Project from "../models/Project.js";

const DisplayController = (() => {
  const ui = initialLoad();
  const projectManager = new ProjectsManager();

  let currentProject = projectManager.getProject(
    projectManager.getProjects()[0].id,
  );

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

  function renderTodos() {
    ui.todoHeading.textContent = currentProject.name;

    ui.todosList.innerHTML = "";

    currentProject.todos.forEach();
  }

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

  function init() {
    renderProjects();
    renderTodos();

    ui.addProjectButton.addEventListener("click", handleAddProject);
    ui.projectsList.addEventListener("click", handleProjectSelection);
  }

  return {
    init,
  };
})();

export default DisplayController;
