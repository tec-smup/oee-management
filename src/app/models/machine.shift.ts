import { BaseModel } from "./baseModel";

export class MachineShift extends BaseModel {  
  Id: number;
  machineCode: string;
  hourIni: string;
  hourFin: string;

  constructor() {
    super();
  }  
}