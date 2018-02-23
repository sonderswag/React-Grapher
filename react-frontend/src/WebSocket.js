import SocketIOClient from 'socket.io-client';

export const socket = SocketIOClient('http://localhost:4200/', { transports: ['websocket'] });

socket.on('connect', () => {
  console.log("Connection made")
})
