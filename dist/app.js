"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProjectType;
(function (ProjectType) {
    ProjectType["ACTIVE"] = "active";
    ProjectType["FINISHED"] = "finished";
})(ProjectType || (ProjectType = {}));
class Project {
    constructor(Id, Title, Description, People, Status) {
        this.Id = Id;
        this.Title = Title;
        this.Description = Description;
        this.People = People;
        this.Status = Status;
    }
}
class ProjectState {
    constructor() {
        this.listeners = [];
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
    addProject(title, description, people) {
        const newProject = new Project(Date.now().toString(), title, description, people, ProjectType.ACTIVE);
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();
class ValidatableInput {
    constructor(input) {
        this.input = input;
    }
    validate() {
        let validatableInput = this.input;
        let isValid = true;
        if (validatableInput.required) {
            isValid =
                isValid && validatableInput.value.toString().trim().length !== 0;
            if (!isValid) {
                alert(`${validatableInput.name} kitöltése kötelező!`);
                return false;
            }
        }
        if (validatableInput.minLength != null &&
            typeof validatableInput.value === "string") {
            isValid =
                isValid && validatableInput.value.length > validatableInput.minLength;
            if (!isValid) {
                alert(`${validatableInput.name} hossza minimum ${validatableInput.minLength}!`);
                return false;
            }
        }
        if (validatableInput.maxLength != null &&
            typeof validatableInput.value === "string") {
            isValid =
                isValid && validatableInput.value.length > validatableInput.maxLength;
            if (!isValid) {
                alert(`${validatableInput.name} hossza maximum ${validatableInput.maxLength}!`);
                return false;
            }
        }
        if (validatableInput.min != null &&
            typeof validatableInput.value === "number") {
            isValid = isValid && validatableInput.value >= validatableInput.min;
            if (!isValid) {
                alert(`${validatableInput.name} értéke minimum ${validatableInput.min}!`);
                return false;
            }
        }
        if (validatableInput.max != null &&
            typeof validatableInput.value === "number") {
            isValid = isValid && validatableInput.value <= validatableInput.max;
            if (!isValid) {
                alert(`${validatableInput.name} értéke maximum ${validatableInput.max}!`);
                return false;
            }
        }
        return isValid;
    }
}
// autobind decorator: Need to set tsconfig => "experimentalDecorators": true
function Autobind(_target, _methodName, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescritor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescritor;
}
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById("project-input");
        this.hostElement = document.getElementById("app");
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = "user-input";
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptionInputElement = this.element.querySelector("#description");
        this.peopleInputElement = this.element.querySelector("#people");
        this.attach();
        this.configure();
    }
    gatherUserInput() {
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
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    clearInputs() {
        this.element.reset();
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            this.clearInputs();
        }
    }
    configure() {
        // use a decorator instead of .bind(this)
        this.element.addEventListener("submit", this.submitHandler);
    }
    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}
__decorate([
    Autobind
], ProjectInput.prototype, "submitHandler", null);
class ProjectList {
    constructor(type) {
        this.type = type;
        this.assignedProjects = [];
        this.templateElement = document.getElementById("project-list");
        this.hostElement = document.getElementById("app");
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = `${this.type}-projects`;
        projectState.addListener((projects) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-project-list`);
        for (const prjItem of this.assignedProjects) {
            const listItem = document.createElement("li");
            listItem.textContent = prjItem.Title;
            listEl.appendChild(listItem);
        }
    }
    renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent =
            this.type.toUpperCase() + "PROJECTS";
    }
    attach() {
        this.hostElement.insertAdjacentElement("beforeend", this.element);
    }
}
const prjInput = new ProjectInput();
const activePrjList = new ProjectList(ProjectType.ACTIVE);
const finishedPrjList = new ProjectList(ProjectType.FINISHED);
