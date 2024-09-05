import React, { useState } from 'react';

const BattleQuestion = ({ question, onAnswerSubmit }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    onAnswerSubmit(answer);
  };

  return (
    <div>
      <h2>{question.description}</h2>
      <pre>{question.code}</pre>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Enter your solution here"
      />
      <button onClick={handleSubmit}>Submit Answer</button>
    </div>
  );
};

export default BattleQuestion;
