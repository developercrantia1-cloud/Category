const { io } = require('socket.io-client');

function createFakeJwt(userId) {
  const header = Buffer.from(
    JSON.stringify({ alg: 'none', typ: 'JWT' }),
  ).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ id: userId })).toString(
    'base64url',
  );

  return `${header}.${payload}.x`;
}

function makeClient(userId, roomId, label) {
  const socket = io('http://localhost:3000', {
    auth: {
      token: createFakeJwt(userId),
    },
  });

  socket.on('connect', () => {
    console.log(`${label} connected with socket id ${socket.id}`);
    socket.emit('join_room', { roomId });
  });

  socket.on('receive_message', (message) => {
    console.log(`${label} received:`, message);
  });

  socket.on('error', (error) => {
    console.log(`${label} error:`, error);
  });

  socket.on('disconnect', (reason) => {
    console.log(`${label} disconnected:`, reason);
  });

  return socket;
}

const roomId = Number(process.argv[2] || 1);

const user1 = makeClient(1, roomId, 'user1');
const user2 = makeClient(2, roomId, 'user2');

setTimeout(() => {
  user1.emit('send_message', {
    roomId,
    message: 'hello from user1',
  });
}, 2000);

setTimeout(() => {
  user2.emit('send_message', {
    roomId,
    message: 'reply from user2',
  });
}, 4000);

setTimeout(() => {
  user1.disconnect();
  user2.disconnect();
}, 7000);
