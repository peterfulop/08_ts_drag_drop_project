export var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["ACTIVE"] = "active";
    ProjectStatus["FINISHED"] = "finished";
})(ProjectStatus || (ProjectStatus = {}));
export class Project {
    constructor(Id, Title, Description, People, Status) {
        this.Id = Id;
        this.Title = Title;
        this.Description = Description;
        this.People = People;
        this.Status = Status;
    }
}
