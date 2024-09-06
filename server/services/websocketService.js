// const WebSocket = require('ws');

// module.exports = (server) => {
//   const wss = new WebSocket.Server({ server });

//   const clients = new Map();

//   wss.on('connection', (ws) => {
//     console.log('New client connected');

//     ws.on('message', (message) => {
//       try {
//         const data = JSON.parse(message);

//         switch (data.type) {
//           case 'register':
//             clients.set(data.username, ws);
//             ws.username = data.username;
//             console.log(`User registered: ${data.username}`);
//             break;

//           case 'battleRequest':
//             handleBattleRequest(data.username);
//             break;

//           case 'submitAnswer':
//             handleAnswerSubmission(data);
//             break;

//           default:
//             console.log('Unknown message type:', data.type);
//         }
//       } catch (err) {
//         console.error('Error parsing message:', err);
//       }
//     });

//     ws.on('close', () => {
//       if (ws.username) {
//         clients.delete(ws.username);
//         console.log(`User disconnected: ${ws.username}`);
//       }
//     });
//   });

//   const handleBattleRequest = (username) => {
//     console.log(`Handling battle request for ${username}`);
//     // Add your matching logic here
//   };

//   const handleAnswerSubmission = (data) => {
//     const { battleId, username, answer } = data;
//     console.log(`Answer submission by ${username} for battle ${battleId}`);
//     // Add your answer submission logic here
//   };

//   const notifyUser = (username, message) => {
//     const client = clients.get(username);
//     if (client && client.readyState === WebSocket.OPEN) {
//       client.send(JSON.stringify(message));
//     }
//   };

//   return { clients, notifyUser };
// };
