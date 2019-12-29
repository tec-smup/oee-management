import { BaseModel } from "./baseModel";

export class Alert extends BaseModel {
  channel_id: number;
  channel_name: string;
  sponsor_id: number;
  sponsor_name: string;
  pause_reason_id: number;
  pause_reason_name: string;
  pause_time: number;
  
  constructor() {
    super();
  }  
}