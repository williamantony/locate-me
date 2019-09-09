/**
 * Generates Endpoint URL
 * based on request type and hostname
 * @param {String} type 
 */
export const getEndpoint = (type = 'REST') => {

  if (!new RegExp(/^REST|SOCKET$/i).test(type)) {
    console.error('Invalid Endpoint Type');
    return null;
  }

  const {
    REACT_APP_SERVER_PUBLIC_IP,
    REACT_APP_SERVER_LOCAL_IP,
    REACT_APP_REST_PORT,
    REACT_APP_SOCKET_PORT,
  } = process.env;

  const { hostname } = global.location;

  const port = (type === 'REST') ? REACT_APP_REST_PORT : REACT_APP_SOCKET_PORT;

  if (
    hostname !== REACT_APP_SERVER_PUBLIC_IP &&
    hostname !== REACT_APP_SERVER_LOCAL_IP &&
    hostname !== 'localhost'
  ) return null;

  return `https://${ hostname }:${ port }`;

};
