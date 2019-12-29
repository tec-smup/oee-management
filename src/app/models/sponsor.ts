import { BaseModel } from "./baseModel";

export class Sponsor extends BaseModel {
  sponsor_id: number;
  channel_id: number;
  channel_name?: string;
  sponsor_name: string;
  email: string;
  
  constructor() {
    super();
  }  
}