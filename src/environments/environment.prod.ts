let host = window.location.hostname
let proto= window.location.protocol
export const environment = {
  production: true,
  urlApi: `${proto}//${host}:3000`
};
