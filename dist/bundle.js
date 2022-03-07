var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("decorators/autobind", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Autobind = void 0;
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
    exports.Autobind = Autobind;
});
define("models/project", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Project = exports.ProjectStatus = void 0;
    var ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus["ACTIVE"] = "active";
        ProjectStatus["FINISHED"] = "finished";
    })(ProjectStatus = exports.ProjectStatus || (exports.ProjectStatus = {}));
    class Project {
        constructor(Id, Title, Description, People, Status) {
            this.Id = Id;
            this.Title = Title;
            this.Description = Description;
            this.People = People;
            this.Status = Status;
        }
    }
    exports.Project = Project;
});
define("state/project-state", ["require", "exports", "models/project"], function (require, exports, project_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.projectState = exports.ProjectState = void 0;
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
            const newProject = new project_js_1.Project(Date.now().toString(), title, description, people, project_js_1.ProjectStatus.ACTIVE);
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
    exports.ProjectState = ProjectState;
    exports.projectState = ProjectState.getInstance();
});
define("util/validation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ValidatableInput = void 0;
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
    exports.ValidatableInput = ValidatableInput;
});
define("components/base-component", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Component = void 0;
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
    exports.Component = Component;
});
define("components/project-input", ["require", "exports", "decorators/autobind", "state/project-state", "util/validation", "components/base-component"], function (require, exports, autobind_js_1, project_state_js_1, validation_js_1, base_component_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectInput = void 0;
    class ProjectInput extends base_component_js_1.Component {
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
            const title = new validation_js_1.ValidatableInput({
                name: this.titleInputElement.name,
                value: enteredTitle,
                required: true,
            });
            const description = new validation_js_1.ValidatableInput({
                name: this.descriptionInputElement.name,
                value: enteredDescription,
                required: true,
                minLength: 5,
            });
            const people = new validation_js_1.ValidatableInput({
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
                project_state_js_1.projectState.addProject(title, desc, people);
                this.clearInputs();
            }
        }
    }
    __decorate([
        autobind_js_1.Autobind
    ], ProjectInput.prototype, "submitHandler", null);
    exports.ProjectInput = ProjectInput;
});
define("models/drag-drop", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/project-item", ["require", "exports", "decorators/autobind", "components/base-component"], function (require, exports, autobind_js_2, base_component_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectItem = void 0;
    class ProjectItem extends base_component_js_2.Component {
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
        autobind_js_2.Autobind
    ], ProjectItem.prototype, "dragStartHandler", null);
    __decorate([
        autobind_js_2.Autobind
    ], ProjectItem.prototype, "dragEndHandler", null);
    exports.ProjectItem = ProjectItem;
});
define("components/project-list", ["require", "exports", "decorators/autobind", "models/project", "state/project-state", "components/base-component", "components/project-item"], function (require, exports, autobind_js_3, project_js_2, project_state_js_2, base_component_js_3, project_item_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectList = void 0;
    class ProjectList extends base_component_js_3.Component {
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
            project_state_js_2.projectState.moveProject(prjId, this.type);
        }
        dragLeaveHandler(_) {
            const listEl = this.element.querySelector("ul");
            listEl === null || listEl === void 0 ? void 0 : listEl.classList.remove("droppable");
        }
        configure() {
            this.element.addEventListener("dragover", this.dragOverHandler);
            this.element.addEventListener("dragleave", this.dragLeaveHandler);
            this.element.addEventListener("drop", this.dropHandler);
            project_state_js_2.projectState.addListener((projects) => {
                const relevantProjects = projects.filter((prj) => {
                    if (this.type === project_js_2.ProjectStatus.ACTIVE) {
                        return prj.Status === project_js_2.ProjectStatus.ACTIVE;
                    }
                    return prj.Status === project_js_2.ProjectStatus.FINISHED;
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
                new project_item_js_1.ProjectItem(this.element.querySelector("ul").id, prjItem);
            }
        }
    }
    __decorate([
        autobind_js_3.Autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        autobind_js_3.Autobind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        autobind_js_3.Autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    exports.ProjectList = ProjectList;
});
define("app", ["require", "exports", "components/project-input", "components/project-list", "models/project"], function (require, exports, project_input_js_1, project_list_js_1, project_js_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new project_input_js_1.ProjectInput();
    new project_list_js_1.ProjectList(project_js_3.ProjectStatus.ACTIVE);
    new project_list_js_1.ProjectList(project_js_3.ProjectStatus.FINISHED);
});
