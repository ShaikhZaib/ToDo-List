export default class Todo {
  constructor({
    title,
    description = "",
    dueDate = null,
    priority = "medium",
    notes = "",
    checklist = [],
    completed = false,
  }) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    this.completed = completed;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  update({ title, description, dueDate, priority, notes }) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
  }
}
