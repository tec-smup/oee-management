import { BaseModel } from "./baseModel";

export class ChannelMachine extends BaseModel {  
  channelId: number;
  machineCode: string;

  constructor() {
    super();
  }  
}