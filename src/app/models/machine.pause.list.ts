import { BaseModel } from "./baseModel";
import { MachinePause } from "./machine.pause";

class Pauses {
  id: number;
  mc_cd: string;
  name: string;
  date_ref: string;
  justification: string;
  inserted_at: string;
}

export class MachinePauseList extends BaseModel {
  list: Array<MachinePause>;
  pauses: Array<Pauses>;
  
  constructor() {
    super();
  }  
}