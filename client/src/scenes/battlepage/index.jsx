// src/pages/BattlePage.js
import React, { useEffect, useState } from 'react';
import BattleCard from '../components/BattleCard';
import useWebSocket from '../hooks/useWebSocket';

const BattlePage = () => {
  // Example user and opponent data
  const user = { name: 'Player 1' };
  const opponent = { name: 'Player 2' };

  const { message, sendMessage } = useWebSocket('ws://localhost:8080');

  const [battleStatus, setBattleStatus] = useState('Waiting for opponent...');

  useEffect(() => {
    if (message) {
      // Handle incoming messages
      setBattleStatus(message);
    }
  }, [message]);

  const startBattle = () => {
    sendMessage('Battle started between Player 1 and Player 2');
  };

  return (
    <div>
      <BattleCard user={user} opponent={opponent} />
      <div>
        <button onClick={startBattle}>Start Battle</button>
      </div>
      <div>
        <h2>Battle Status: {battleStatus}</h2>
      </div>
    </div>
  );
};

export default BattlePage;
