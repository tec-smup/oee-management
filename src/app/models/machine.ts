import { BaseModel } from "./baseModel";

export class Machine extends BaseModel {
  code: string;
  name: string;
  department?: string;
  product?: string;
  last_maintenance?: string;
  next_maintenance?: string;
  
  constructor() {
    super();
  }  
}