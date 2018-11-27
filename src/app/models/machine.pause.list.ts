import { BaseModel } from "./baseModel";
import { MachinePause } from "./machine.pause";

class Pauses {
  id: number;
  channel_id: number;
  date_ref: string;
  date_ref_format: string;
  machine_code: string;
  machine_name: string;
  pause: string;
  pause_id: number;
  pause_reason: string;
  pause_time: string;
  row_num: number;
}

export class MachinePauseList extends BaseModel {
  list: Array<MachinePause>;
  pauses: Array<Pauses>;
  
  constructor() {
    super();
  }  
}