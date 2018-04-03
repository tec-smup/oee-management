import { BaseModel } from "./baseModel";

export class Channel extends BaseModel {
  id: number;
  name: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  time_shift: number;
  
  constructor() {
    super();
  }  
}