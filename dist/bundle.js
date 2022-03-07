"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var App;
(function (App) {
    let ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus["ACTIVE"] = "active";
        ProjectStatus["FINISHED"] = "finished";
    })(ProjectStatus = App.ProjectStatus || (App.ProjectStatus = {}));
    class Project {
        constructor(Id, Title, Description, People, Status) {
            this.Id = Id;
            this.Title = Title;
            this.Description = Description;
            this.People = People;
            this.Status = Status;
        }
    }
    App.Project = Project;
})(App || (App = {}));
var App;
(function (App) {
    class Component {
        constructor(templateId, hostElementId, insertAtStart, newElementId) {
            this.templateElement = document.getElementById(templateId);
            this.hostElement = document.getElementById(hostElementId);
            const importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild;
            if (newElementId)
                this.element.id = newElementId;
            this.attach(insertAtStart);
        }
        attach(insertAtBeginning) {
            this.hostElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
        }
    }
    App.Component = Component;
})(App || (App = {}));
var App;
(function (App) {
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
    App.Autobind = Autobind;
})(App || (App = {}));
var App;
(function (App) {
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
    App.ValidatableInput = ValidatableInput;
})(App || (App = {}));
var App;
(function (App) {
    class State {
        constructor() {
            this.listeners = [];
        }
        addListener(listenerFn) {
            this.listeners.push(listenerFn);
        }
    }
    class ProjectState extends State {
        constructor() {
            super();
            this.projects = [];
        }
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            this.instance = new ProjectState();
            return this.instance;
        }
        addProject(title, description, people) {
            const newProject = new App.Project(Date.now().toString(), title, description, people, App.ProjectStatus.ACTIVE);
            this.projects.push(newProject);
            this.updateListeners();
        }
        moveProject(projectId, newStatus) {
            const project = this.projects.find((prj) => prj.Id === projectId);
            if (project && project.Status !== newStatus) {
                project.Status = newStatus;
                this.updateListeners();
            }
        }
        updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        }
    }
    App.ProjectState = ProjectState;
    App.projectState = ProjectState.getInstance();
})(App || (App = {}));
/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../util/validation.ts" />
/// <reference path="../state/project-state.ts" />
var App;
(function (App) {
    class ProjectInput extends App.Component {
        constructor() {
            super("project-input", "app", true, "user-input");
            this.titleInputElement = this.element.querySelector("#title");
            this.descriptionInputElement = this.element.querySelector("#description");
            this.peopleInputElement = this.element.querySelector("#people");
            this.configure();
        }
        configure() {
            // use a decorator instead of .bind(this)
            this.element.addEventListener("submit", this.submitHandler);
        }
        renderContent() { }
        gatherUserInput() {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;
            const title = new App.ValidatableInput({
                name: this.titleInputElement.name,
                value: enteredTitle,
                required: true,
            });
            const description = new App.ValidatableInput({
                name: this.descriptionInputElement.name,
                value: enteredDescription,
                required: true,
                minLength: 5,
            });
            const people = new App.ValidatableInput({
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
                App.projectState.addProject(title, desc, people);
                this.clearInputs();
            }
        }
    }
    __decorate([
        App.Autobind
    ], ProjectInput.prototype, "submitHandler", null);
    App.ProjectInput = ProjectInput;
})(App || (App = {}));
/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/project.ts" />
var App;
(function (App) {
    class ProjectList extends App.Component {
        constructor(type) {
            super("project-list", "app", false, `${type}-projects`);
            this.type = type;
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
                event.preventDefault();
                const listEl = this.element.querySelector("ul");
                listEl === null || listEl === void 0 ? void 0 : listEl.classList.add("droppable");
            }
        }
        dropHandler(event) {
            const prjId = event.dataTransfer.getData("text/plain");
            App.projectState.moveProject(prjId, this.type);
        }
        dragLeaveHandler(_) {
            const listEl = this.element.querySelector("ul");
            listEl === null || listEl === void 0 ? void 0 : listEl.classList.remove("droppable");
        }
        configure() {
            this.element.addEventListener("dragover", this.dragOverHandler);
            this.element.addEventListener("dragleave", this.dragLeaveHandler);
            this.element.addEventListener("drop", this.dropHandler);
            App.projectState.addListener((projects) => {
                const relevantProjects = projects.filter((prj) => {
                    if (this.type === App.ProjectStatus.ACTIVE) {
                        return prj.Status === App.ProjectStatus.ACTIVE;
                    }
                    return prj.Status === App.ProjectStatus.FINISHED;
                });
                this.assignedProjects = relevantProjects;
                this.renderProjects();
            });
            this.renderContent();
        }
        renderContent() {
            const listId = `${this.type}-project-list`;
            this.element.querySelector("ul").id = listId;
            this.element.querySelector("h2").textContent =
                this.type.toUpperCase() + "PROJECTS";
        }
        renderProjects() {
            const listEl = document.getElementById(`${this.type}-project-list`);
            listEl.innerHTML = "";
            for (const prjItem of this.assignedProjects) {
                new App.ProjectItem(this.element.querySelector("ul").id, prjItem);
            }
        }
    }
    __decorate([
        App.Autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        App.Autobind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        App.Autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    App.ProjectList = ProjectList;
})(App || (App = {}));
/// <reference path="models/project.ts" />
/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />
var App;
(function (App) {
    new App.ProjectInput();
    new App.ProjectList(App.ProjectStatus.ACTIVE);
    new App.ProjectList(App.ProjectStatus.FINISHED);
})(App || (App = {}));
/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/drag-drop.ts" />
var App;
(function (App) {
    class ProjectItem extends App.Component {
        constructor(hostId, project) {
            super("single-project", hostId, false, project.Id);
            this.project = project;
            this.configure();
            this.renderContent();
        }
        get persons() {
            if (this.project.People === 1) {
                return "1 person";
            }
            else {
                return `${this.project.People} persons`;
            }
        }
        dragStartHandler(event) {
            event.dataTransfer.setData("text/plain", this.project.Id);
            event.dataTransfer.effectAllowed = "move";
        }
        dragEndHandler(event) { }
        configure() {
            this.element.addEventListener("dragstart", this.dragStartHandler);
            this.element.addEventListener("dragend", this.dragEndHandler);
        }
        renderContent() {
            this.element.querySelector("h2").textContent = this.project.Title;
            this.element.querySelector("h3").textContent = this.persons;
            this.element.querySelector("p").textContent = this.project.Description;
        }
    }
    __decorate([
        App.Autobind
    ], ProjectItem.prototype, "dragStartHandler", null);
    __decorate([
        App.Autobind
    ], ProjectItem.prototype, "dragEndHandler", null);
    App.ProjectItem = ProjectItem;
})(App || (App = {}));
