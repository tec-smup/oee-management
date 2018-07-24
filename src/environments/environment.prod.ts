const serverURL = 'https://oee-server.appspot.com/api/';
export const environment = {
  production: true,
  userAuthenticationURL: serverURL + 'user/authentication',
  machineListURL: serverURL + ':userId/:channelId/machine/list',       //machine
  machineAddURL: serverURL + 'machine',
  machineUpdateURL: serverURL + 'machine/update',
  machineDeleteURL: serverURL + 'machine/delete',
  channelListURL: serverURL + ':userId/channel',            //channel
  channelAddURL: serverURL + 'channel',
  channelUpdateURL: serverURL + 'channel/update',
  channelDeleteURL: serverURL + 'channel/delete',  
  lastFeedURL: serverURL + 'feed/lastFeed',         //dash 
  chartURL: serverURL + 'feed/chart',
  machinePauseListURL: serverURL + 'machinepause/list',  //machine pause
  machinePauseAddURL: serverURL + 'machinepause',
  machinePauseUpdateURL: serverURL + 'machinepause/update',
  machinePauseDeleteURL: serverURL + 'machinepause/delete',   
  userListURL: serverURL + 'user',                      //user
  userAddURL: serverURL + 'user',
  userUpdateURL: serverURL + 'user/update',
  userDeleteURL: serverURL + 'user/delete',   
};