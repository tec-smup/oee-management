import { BaseModel } from "./baseModel";
import { MachinePauseList } from "./machine.pause.list";

class LastFeed {
  channel_name: string;
  machine_code: string;
  machine_name: number;
  field1: string;
  field2: number;
  field3: number;
  field4: number;
  field5: string;
  inserted_at: string;
  field1_desc: string;
  field2_desc: string;
  field3_desc: string;
  field4_desc: string;
  field5_desc: string;  
  refresh_time: number;
}

class Chart {
  labels: string;
  data: string;
  chart_tooltip_desc: string;
}

class Production {
  hora: string;
  total: number;
  tipo: string; 
}

export class Dashboard extends BaseModel {
  lastFeed: LastFeed;
  chart: Chart;
  lastFeeds: Array<LastFeed>;
  pauses: MachinePauseList["pauses"];  
  production: Production;
  
  constructor() {
    super();
  }  
}