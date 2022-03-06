"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
            console.log(title, desc, people);
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
const a = new ProjectInput();
