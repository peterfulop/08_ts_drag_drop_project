import { Autobind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";
import { ValidatableInput } from "../util/validation.js";
import Component from "./base-component.js";

export default class ProjectInput extends Component<
  HTMLDivElement,
  HTMLFormElement
> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;

    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;

    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;
    this.configure();
  }

  public configure() {
    // use a decorator instead of .bind(this)
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent(): void {}

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const title = new ValidatableInput({
      name: this.titleInputElement.name,
      value: enteredTitle,
      required: true,
    });

    const description = new ValidatableInput({
      name: this.descriptionInputElement.name,
      value: enteredDescription,
      required: true,
      minLength: 5,
    });

    const people = new ValidatableInput({
      name: this.peopleInputElement.name,
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    });

    if (!title.validate() || !description.validate() || !people.validate()) {
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }
  private clearInputs() {
    this.element.reset();
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }
}
