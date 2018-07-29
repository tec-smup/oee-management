import { BaseModel } from "./baseModel";

export class MachineConfig extends BaseModel {
  id: number;
  machine_code: number;
  chart_sql: string;
  mobile_sql: string;
  chart_tooltip_desc: string;
  
  constructor() {
    super();
  }  
}