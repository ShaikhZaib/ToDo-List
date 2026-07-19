import initialLoad from "./initialLoad.js";
import ProjectsManager from "../models/ProjectsManager.js";

const DisplayController = (() => {
  const ui = initialLoad();
  const projectManager = new ProjectsManager();

  let currentProject = projectManager.getProject(projectManager.projects[0].id);

  function renderProjects() {
    ui.projectsList.innerHTML = "";

    projectManager.getProjects().forEach((project) => {
      const projectLi = document.createElement("li");
      const projectButton = document.createElement("button");

      projectButton.textContent = project.name;
      projectButton.dataset.id = project.id;

      projectLi.appendChild(projectButton);

      ui.projectsList.append(projectLi);
    });
  }

  function renderTodos() {}

  function init() {
    renderProjects();
    renderTodos();
  }

  return {
    init,
  };
})();

export default DisplayController;
