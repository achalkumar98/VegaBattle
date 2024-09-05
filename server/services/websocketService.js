const WebSocket = require('ws');
const clients = new Map();
const waitingQueue = []; // Queue for matchmaking

const setupWebSocketServer = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => {
        const id = Date.now();
        const username = new URL(req.url, `http://${req.headers.host}`).searchParams.get('username');
        clients.set(id, { ws, username, isInBattle: false });
        console.log(`Client connected with ID: ${id} and username: ${username}`);

        // Check if a user is ready to be matched
        waitingQueue.push(id);

        // Try to match with another user
        if (waitingQueue.length >= 2) {
            const user1Id = waitingQueue.shift();
            const user2Id = waitingQueue.shift();
            startBattle(user1Id, user2Id);
        }

        ws.on('message', (message) => {
            console.log(`Received message from ${username || id}: ${message}`);
            // Broadcast to both users in a battle
            const battle = getBattleForUser(id);
            if (battle) {
                battle.forEach(clientId => {
                    const client = clients.get(clientId);
                    if (client && client.ws.readyState === WebSocket.OPEN) {
                        client.ws.send(JSON.stringify({ from: username, message }));
                    }
                });
            }
        });

        ws.on('close', () => {
            clients.delete(id);
            console.log(`Client disconnected with ID: ${id} and username: ${username}`);
            // Remove from waitingQueue if still present
            const index = waitingQueue.indexOf(id);
            if (index > -1) {
                waitingQueue.splice(index, 1);
            }
        });
    });

    const startBattle = (user1Id, user2Id) => {
        const user1 = clients.get(user1Id);
        const user2 = clients.get(user2Id);

        if (user1 && user2) {
            user1.isInBattle = true;
            user2.isInBattle = true;

            user1.ws.send(JSON.stringify({ type: 'battle_start', opponent: user2.username }));
            user2.ws.send(JSON.stringify({ type: 'battle_start', opponent: user1.username }));

            console.log(`Battle started between ${user1.username} and ${user2.username}`);
        }
    }

    const getBattleForUser = (userId) => {
        // Find if the user is in a battle
        for (const [id, client] of clients.entries()) {
            if (client.isInBattle && id !== userId) {
                return [id, userId];
            }
        }
        return null;
    }
};

module.exports = { setupWebSocketServer };
