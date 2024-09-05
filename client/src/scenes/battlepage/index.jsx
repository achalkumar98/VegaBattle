import React, { useState, useEffect } from 'react';
import BattleCard from '../../components/BattleCard'; 
import BattleQuestion from '../../components/BattleQuestions'; 
import useWebSocket from '../../hooks/useWebSocket'; 

const BattlePage = () => {
 
  const user = { name: 'Player 1' };
  const opponent = { name: 'Player 2' };

  const { message, sendMessage } = useWebSocket('ws://localhost:8080');

  const [battleStatus, setBattleStatus] = useState('Waiting for opponent...');
  const [isBattleStarted, setIsBattleStarted] = useState(false);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    if (message) {
      const parsedMessage = JSON.parse(message);
      //TODO Handle the parsed message
    }
  }, [message]);

  return (
    <div>
      <h1>Battle Arena</h1>
      <p>{battleStatus}</p>
      {isBattleStarted && <BattleQuestion question={question} />}
      <BattleCard user={user} opponent={opponent} />
    </div>
  );
};

export default BattlePage;