import { BaseModel } from "./baseModel";

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
  pause_type: string;
  type: string;
  pause_in_minutes: number;
}

class PauseGrouped {
  machine_code: string;
  pp: string;
  pnp: string;
}

class Pareto {
  pause_name: string; 
  pause_type: string;
  pause: number;
  pause_in_time: string;
  percentage: number;
  sum_percentage: number;
}

export class MachinePauseList extends BaseModel {
  pauses: Array<Pauses>;
  pause_grouped: Array<PauseGrouped>;
  pareto: Array<Pareto>;

  constructor() {
    super();
  }  
}