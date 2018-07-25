import { BaseModel } from "./baseModel";

export class UserChannel extends BaseModel {
  userId: number;
  channelId: number;

  constructor() {
    super();
  }  
}