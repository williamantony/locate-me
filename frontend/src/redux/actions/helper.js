import Store from '../../Store';

export const getClientId = () => {
  return new Promise((resolve, reject) => {

    const SI = setInterval(() => {
      const clientId = localStorage.getItem('client');

      if (!!clientId) {
        clearInterval(SI);
        resolve(clientId);
      }
    }, 250);

  });
};

export const getSocketId = () => {
  return new Promise((resolve, reject) => {

    const SI = setInterval(() => {
      const socketId = sessionStorage.getItem('socket');

      if (!!socketId) {
        clearInterval(SI);
        resolve(socketId);
      }
    }, 250);

  });
};

export const getCurrentConnectionId = () => {
  return new Promise((resolve, reject) => {

    const SI = setInterval(() => {
      const connectionId = Store.getState().self.currentConnection;

      if (!!connectionId) {
        clearInterval(SI);
        resolve(connectionId);
      }
    }, 250);

  });
};
