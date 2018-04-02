const serverURL = 'http://www.paul8liveira.blog.br:8008/api/';
export const environment = {
  production: true,
  userAuthenticationURL: serverURL + 'user/authentication',
  machineListURL: serverURL + 'machine/list',
  machineAddURL: serverURL + 'machine',
  machineUpdateURL: serverURL + 'machine/update',
  machineDeleteURL: serverURL + 'machine/delete',
};