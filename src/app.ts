// Validation
interface Validatable {
  name: string;
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

class ValidatableInput {
  constructor(public input: Validatable) {}
  public validate(): boolean {
    let validatableInput: Validatable = this.input;
    let isValid: boolean = true;

    if (validatableInput.required) {
      isValid =
        isValid && validatableInput.value.toString().trim().length !== 0;
      if (!isValid) {
        alert(`${validatableInput.name} kitöltése kötelező!`);
        return false;
      }
    }
    if (
      validatableInput.minLength != null &&
      typeof validatableInput.value === "string"
    ) {
      isValid =
        isValid && validatableInput.value.length > validatableInput.minLength;
      if (!isValid) {
        alert(
          `${validatableInput.name} hossza minimum ${validatableInput.minLength}!`
        );
        return false;
      }
    }
    if (
      validatableInput.maxLength != null &&
      typeof validatableInput.value === "string"
    ) {
      isValid =
        isValid && validatableInput.value.length > validatableInput.maxLength;
      if (!isValid) {
        alert(
          `${validatableInput.name} hossza maximum ${validatableInput.maxLength}!`
        );
        return false;
      }
    }
    if (
      validatableInput.min != null &&
      typeof validatableInput.value === "number"
    ) {
      isValid = isValid && validatableInput.value >= validatableInput.min;
      if (!isValid) {
        alert(
          `${validatableInput.name} értéke minimum ${validatableInput.min}!`
        );
        return false;
      }
    }
    if (
      validatableInput.max != null &&
      typeof validatableInput.value === "number"
    ) {
      isValid = isValid && validatableInput.value <= validatableInput.max;
      if (!isValid) {
        alert(
          `${validatableInput.name} értéke maximum ${validatableInput.max}!`
        );
        return false;
      }
    }
    return isValid;
  }
}

// autobind decorator: Need to set tsconfig => "experimentalDecorators": true
function Autobind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescritor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescritor;
}

// class Project {
//   templateElement: HTMLTemplateElement;
//   hostElement: HTMLDivElement;
//   element: HTMLElement;
//   constructor() {
//     this.templateElement = document.getElementById(
//       "project-input"
//     ) as HTMLTemplateElement;
//     this.hostElement = document.getElementById("app") as HTMLDivElement;

//     const importedNode = document.importNode(
//       this.templateElement.content,
//       true
//     );
//     this.element = importedNode.firstElementChild as HTMLFormElement;
//     this.element.id = "user-input";
//   }
// }

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById("app") as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;

    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;

    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.attach();
    this.configure();
  }

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
      console.log(title, desc, people);
      this.clearInputs();
    }
  }

  private configure() {
    // use a decorator instead of .bind(this)
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

enum ProjectType {
  ACTIVE = "active",
  FINISHED = "finished",
}

class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor(private type: ProjectType) {
    this.templateElement = document.getElementById(
      "project-list"
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById("app") as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;
    this.attach();
    this.renderContent();
  }

  private renderContent() {
    const listId = `${this.type}-project-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + "PROJECTS";
  }

  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList(ProjectType.ACTIVE);
const finishedPrjList = new ProjectList(ProjectType.FINISHED);
