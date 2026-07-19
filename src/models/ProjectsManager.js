import Project from "./Project.js";

export default class ProjectsManager {
  constructor() {
    this.projects = [];

    this.addProject(new Project({ name: "Inbox" }));
  }

  getProjects() {
    return this.projects;
  }

  addProject(project) {
    this.projects.push(project);
  }

  removeProject(id) {
    this.projects = this.projects.filter((project) => project.id !== id);
  }

  getProject(id) {
    return this.projects.find((project) => project.id === id);
  }
}
