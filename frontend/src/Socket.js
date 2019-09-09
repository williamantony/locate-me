import io from 'socket.io-client';
import { getEndpoint } from './helper';

const SOCKET_URL = getEndpoint('SOCKET');

const Socket = io(SOCKET_URL, {
  path: '/location',
});

Socket.on('connect', () => {

  sessionStorage.setItem('socket', Socket.id);

  const client = localStorage.getItem('client');

  Socket.emit('set-connection', {
    client,
  });

});

export default Socket;
