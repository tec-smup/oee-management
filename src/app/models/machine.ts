export class Machine {
    constructor(
      public code: string,
      public name: string,
      public department?: string,
      public product?: string,
      public last_maintenance?: string,
      public next_maintenance?: string,
    ) {  }  
}