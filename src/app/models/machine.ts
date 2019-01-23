import { BaseModel } from "./baseModel";

export class Machine extends BaseModel {
  code: string;
  name: string;
  mobile_name: string;
  department?: string;
  product?: string;
  last_maintenance?: string;
  next_maintenance?: string;
  dropdown_label: string;
  nominal_output: number;
  
  constructor() {
    super();
  }  
}