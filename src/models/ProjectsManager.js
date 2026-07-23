import Project from "./Project.js";

export default class ProjectsManager {
  constructor() {
    this.projects = [];

    this.addProject("Inbox");
  }

  getProjects() {
    return this.projects;
  }

  addProject(name) {
    const project = new Project({ name });
    this.projects.push(project);
    return project;
  }

  removeProject(id) {
    this.projects = this.projects.filter((project) => project.id !== id);
  }

  getProject(id) {
    return this.projects.find((project) => project.id === id);
  }
}
