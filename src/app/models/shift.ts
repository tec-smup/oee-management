import { BaseModel } from "./baseModel";

export class Shift extends BaseModel {
  id: number;
  hour: string;
  
  constructor() {
    super();
  }  
}