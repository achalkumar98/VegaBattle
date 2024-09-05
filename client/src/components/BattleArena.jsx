import React, { useEffect, useState } from 'react';
import useWebSocket from '../hooks/useWebSocket';

const BattleArena = ({ user, opponent }) => {
  const { message, sendMessage } = useWebSocket('ws://localhost:8080');
  const [battleStatus, setBattleStatus] = useState('Searching for opponent...');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (message) {
      // Handle incoming messages (e.g., opponent found, question assigned, battle updates)
      const data = JSON.parse(message);
      
      if (data.question) {
        setQuestion(data.question);
        setBattleStatus('Battle started! Solve the question.');
      } else {
        setBattleStatus(data.message);
      }
    }
  }, [message]);

  useEffect(() => {
    // Send a message to find an opponent when the component mounts
    sendMessage(JSON.stringify({ type: 'findOpponent', user: user.name }));
  }, [sendMessage, user.name]);

  const handleAnswerSubmit = () => {
    sendMessage(JSON.stringify({ type: 'submitAnswer', user: user.name, answer }));
  };

  return (
    <div>
      <h2>Battle Arena</h2>
      <p>User: {user.name}</p>
      <p>Opponent: {opponent.name}</p>
      <h3>Status: {battleStatus}</h3>

      {question && (
        <>
          <p><strong>Question:</strong> {question}</p>
          <input 
            type="text" 
            value={answer} 
            onChange={(e) => setAnswer(e.target.value)} 
            placeholder="Enter your answer" 
          />
          <button onClick={handleAnswerSubmit}>Submit Answer</button>
        </>
      )}
    </div>
  );
};

export default BattleArena;
