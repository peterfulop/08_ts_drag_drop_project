namespace App {
  export enum ProjectStatus {
    ACTIVE = "active",
    FINISHED = "finished",
  }

  export class Project {
    constructor(
      public Id: string,
      public Title: string,
      public Description: string,
      public People: number,
      public Status: ProjectStatus
    ) {}
  }
}
