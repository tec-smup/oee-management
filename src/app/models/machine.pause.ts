import { BaseModel } from "./baseModel";

export class MachinePause extends BaseModel {
  id: number;
  mc_cd: string;
  pause: number;
  date_ref: string;
  inserted_at: string;
  justification: string;
  
  constructor() {
    super();
  }  
}