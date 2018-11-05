import { BaseModel } from "./baseModel";

export class MachinePauseDash extends BaseModel {
  id: number;
  channel_id: number;
  machine_code: string;
  date_ref: string;
  date_formated: string;
  value: string;
  pause_reason_id: number;
  date_dif: number;
  
  constructor() {
    super();
  }  
}