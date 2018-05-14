// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const serverURL = 'http://localhost:3000/oee/api/';
export const environment = {
  production: false,
  userAuthenticationURL: serverURL + 'user/authentication',
  machineListURL: serverURL + 'machine/list',                 //machine
  machineAddURL: serverURL + 'machine',
  machineUpdateURL: serverURL + 'machine/update',
  machineDeleteURL: serverURL + 'machine/delete',
  channelListURL: serverURL + 'channel',                      //channel
  channelAddURL: serverURL + 'channel',
  channelUpdateURL: serverURL + 'channel/update',
  channelDeleteURL: serverURL + 'channel/delete',    
  lastFeedURL: serverURL + 'feed/lastFeed',                  //dash
  chartURL: serverURL + 'feed/chart',
};
