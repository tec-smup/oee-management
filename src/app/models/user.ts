import { BaseModel } from "./baseModel";

export class User extends BaseModel {
  id: number;
  username: string;
  password: string;
  active: number;
  admin: number;
  created_at: string;
  company_name: string;
  
  constructor() {
    super();
    this.admin = 0;
    this.active = 1;
  }  
}