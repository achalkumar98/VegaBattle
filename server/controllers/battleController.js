const Battle = require('../models/Battle');
const questions = require('../data/questions'); // File that stores questions
const clients = require('../services/websocketService'); // Assuming you export WebSocket clients map from a separate module

// Match users for a battle
const matchUsers = async (req, res) => {
  const { username } = req.params;

  try {
    // Find a pending battle where player2 is not yet assigned
    let battle = await Battle.findOne({ status: 'pending', player2: null });

    if (battle) {
      // Assign the current user as player2
      battle.player2 = username;
      battle.status = 'ongoing';
      battle.question = getRandomQuestion(); // Assign a random question
      await battle.save();

      // Notify both players that the battle has started
      notifyUsers(battle.player1, battle.player2, `Battle started between ${battle.player1} and ${battle.player2}`, battle);
      
      return res.json({ message: 'Battle started', battle });
    }

    // No pending battles, create a new one with this user as player1
    battle = new Battle({ player1: username, status: 'pending' });
    await battle.save();

    res.json({ message: 'Waiting for an opponent', battle });
  } catch (error) {
    console.error('Error matching users:', error);
    res.status(500).json({ message: 'An error occurred while matching users' });
  }
};

// Function to get a random question
const getRandomQuestion = () => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
};

// Handle answer submissions
const submitAnswer = async (req, res) => {
  const { battleId, username, answer } = req.body;

  try {
    const battle = await Battle.findById(battleId);

    if (!battle || battle.status !== 'ongoing') {
      return res.status(400).json({ message: 'Invalid battle or battle is not ongoing' });
    }

    // Check if the answer is correct
    const isCorrect = checkAnswer(battle.question, answer); // Assume you have a function to check answers

    if (isCorrect) {
      battle.status = 'completed';
      battle.winner = username;
      battle.endTime = Date.now();
      await battle.save();

      // Notify both players of the result
      notifyUsers(battle.player1, battle.player2, `${username} won the battle!`, battle);

      return res.json({ message: `${username} won the battle!` });
    } else {
      return res.json({ message: 'Incorrect answer, keep trying!' });
    }
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({ message: 'An error occurred while submitting the answer' });
  }
};

// Function to check if the answer is correct
const checkAnswer = (question, answer) => {
  // Implement the logic to check if the answer is correct
  // Example: compare the provided answer with the expected solution
  return answer.trim() === question.solution.trim(); // Replace with actual logic
};

// Function to notify both users
const notifyUsers = (player1, player2, message, battle) => {
  // Broadcast the message to both users via WebSocket
  clients.forEach((client, id) => {
    if (client.username === player1 || client.username === player2) {
      client.send(JSON.stringify({ message, battle }));
    }
  });
};

module.exports = { matchUsers, submitAnswer };
