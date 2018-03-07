export class Login {
    constructor(
      public success: boolean,
      public message: string,
      public token?: string,
    ) {  }  
}