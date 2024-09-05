const Battle = require('../models/Battle');
const questions = require('../data/questions');
const clients = require('../services/websocketService');

const matchUsers = async (req, res) => {
  const { username } = req.params;

  try {
    let battle = await Battle.findOne({ status: 'pending', player2: null });

    if (battle) {
      battle.player2 = username;
      battle.status = 'ongoing';
      battle.question = getRandomQuestion();
      await battle.save();

      notifyUsers(battle.player1, battle.player2, `Battle started between ${battle.player1} and ${battle.player2}`, battle);
      
      return res.json({ message: 'Battle started', battle });
    }

    battle = new Battle({ player1: username, status: 'pending' });
    await battle.save();

    res.json({ message: 'Waiting for an opponent', battle });
  } catch (error) {
    console.error('Error matching users:', error);
    res.status(500).json({ message: 'An error occurred while matching users' });
  }
};

const getRandomQuestion = () => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
};

const submitAnswer = async (req, res) => {
  const { battleId, username, answer } = req.body;

  try {
    const battle = await Battle.findById(battleId);

    if (!battle || battle.status !== 'ongoing') {
      return res.status(400).json({ message: 'Invalid battle or battle is not ongoing' });
    }

    const isCorrect = checkAnswer(battle.question, answer);

    if (isCorrect) {
      battle.status = 'completed';
      battle.winner = username;
      battle.endTime = Date.now();
      await battle.save();

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

const checkAnswer = (question, answer) => {
  return answer.trim() === question.solution.trim();
};

const notifyUsers = (player1, player2, message, battle) => {
  clients.forEach((client, id) => {
    if (client.username === player1 || client.username === player2) {
      client.send(JSON.stringify({ message, battle }));
    }
  });
};

module.exports = { matchUsers, submitAnswer };
