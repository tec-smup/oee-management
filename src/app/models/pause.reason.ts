import { BaseModel } from "./baseModel";

export class PauseReason extends BaseModel {
  id: number;
  name: string;
  description?: string;
  active: boolean;
  created_at: string;
  
  constructor() {
    super();
  }  
}