namespace App {
  export class ProjectItem
    extends Component<HTMLUListElement, HTMLLinkElement>
    implements Draggable
  {
    private project: Project;

    get persons() {
      if (this.project.People === 1) {
        return "1 person";
      } else {
        return `${this.project.People} persons`;
      }
    }

    constructor(hostId: string, project: Project) {
      super("single-project", hostId, false, project.Id);
      this.project = project;
      this.configure();
      this.renderContent();
    }

    @Autobind
    dragStartHandler(event: DragEvent): void {
      event.dataTransfer!.setData("text/plain", this.project.Id);
      event.dataTransfer!.effectAllowed = "move";
    }

    @Autobind
    dragEndHandler(event: DragEvent): void {}

    configure(): void {
      this.element.addEventListener("dragstart", this.dragStartHandler);
      this.element.addEventListener("dragend", this.dragEndHandler);
    }

    renderContent(): void {
      this.element.querySelector("h2")!.textContent = this.project.Title;
      this.element.querySelector("h3")!.textContent = this.persons;
      this.element.querySelector("p")!.textContent = this.project.Description;
    }
  }
}
