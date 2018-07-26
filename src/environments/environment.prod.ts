const serverURL = 'https://oee-server.appspot.com/api/';
export const environment = {
  production: true,
  userAuthenticationURL: serverURL + 'user/authentication',
  machineListURL: serverURL + ':userId/:channelId/machine/list',       //machine
  machineListAllURL: serverURL + 'machine/list',
  machineListByChannelURL: serverURL + 'machine/channel/:channelId',
  machineAddURL: serverURL + 'machine',
  machineUpdateURL: serverURL + 'machine/update',
  machineDeleteURL: serverURL + 'machine/delete',
  channelListURL: serverURL + ':userId/channel',            //channel
  channelListAllURL: serverURL + 'channel/all',
  channelAddURL: serverURL + 'channel',
  channelAddMachineURL: serverURL + 'channel/machine',
  channelUpdateURL: serverURL + 'channel/update',
  channelDeleteURL: serverURL + 'channel/delete',  
  channelDeleteMachineURL: serverURL + 'channel/delete/machine',
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
  userChangePassURL: serverURL + 'user/changePass',
  userChannelAddURL: serverURL + 'userchannel', //userchannel
  userChannelDeleteURL: serverURL + 'userchannel/delete',   
};