import { BaseModel } from "./baseModel";

export class MachinePause extends BaseModel {
  id: number;
  mc_cd: string;
  pause_ini: string;
  pause_fin: string;
  justification1: string;
  justification2: string;
  justification3: string;
  dateTimeRange: Date[];
  
  constructor() {
    super();
  }  
}