const serverURL = 'https://oee-server.appspot.com/api/';
export const environment = {
  production: true,  
  //machine
  machineListURL: `${serverURL}:userId/:channelId/machine/list`,
  machineListAllURL: `${serverURL}machine/list`,
  machineListByChannelURL: `${serverURL}machine/channel/:channelId`,
  machineAddURL: `${serverURL}machine`,
  machineUpdateURL: `${serverURL}machine/update`,
  machineDeleteURL: `${serverURL}machine/delete`,
  machineConfigURL: `${serverURL}machineconfig/:machineCode`,
  machineConfigUpdateURL: `${serverURL}machineconfig`,
  machineSQLUpdateURL: `${serverURL}machineconfig/sql`,  
  //channel
  channelListURL: `${serverURL}:userId/channel`,
  channelConfigURL: `${serverURL}channelconfig/:channelId`,
  channelConfigUpdateURL: `${serverURL}channelconfig`,
  channelSQLUpdateURL: `${serverURL}channelconfig/sql`,
  channelListAllURL: `${serverURL}channel/all`,
  channelAddURL: `${serverURL}channel`,
  channelAddMachineURL: `${serverURL}channel/machine`,
  channelUpdateURL: `${serverURL}channel/update`,
  channelDeleteURL: `${serverURL}channel/delete`,      
  channelDeleteMachineURL: `${serverURL}channel/delete/machine`,      
  //dash
  lastFeedURL: `${serverURL}feed/lastFeed`,
  chartURL: `${serverURL}feed/chart`,
  exportChartExcelURL: `${serverURL}exportexcel/chart`,
  exportProductionExcelURL: `${serverURL}exportexcel/production`,
  exportPauseExcelURL: `${serverURL}exportexcel/pause`,
  productionURL: `${serverURL}feed/production`,
  productionURL2: `${serverURL}feed/production2`,
  //machine pause
  machinePauseListURL: `${serverURL}machinepause/list`,  
  machinePauseAddURL: `${serverURL}machinepause`,
  machinePauseUpdateURL: `${serverURL}machinepause/update`,
  machinePauseDeleteURL: `${serverURL}machinepause/delete`, 
  machinePauseDashAddURL: `${serverURL}machinepausedash`, 
  //user
  userAuthenticationURL: `${serverURL}auth`,
  userListURL: `${serverURL}user`,
  userAddURL: `${serverURL}user`,
  userUpdateURL: `${serverURL}user/update`,
  userDeleteURL: `${serverURL}user/delete`,    
  userChangePassURL: `${serverURL}user/changePass`,
  userGetDataByTokenPassURL: `${serverURL}user/data`,
  //userchannel    
  userChannelAddURL: `${serverURL}userchannel`, 
  userChannelDeleteURL: `${serverURL}userchannel/delete`,
  //docs
  docsURL: serverURL,  
  //pause reason
  pauseReasonDropdownURL: `${serverURL}pausereason/dropdown/:channelId`,
};