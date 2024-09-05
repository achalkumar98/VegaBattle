const mongoose = require('mongoose');

const battleSchema = new mongoose.Schema({
  player1: {
    type: mongoose.Schema.Types.String,
    ref: 'User',
    required: true,
  },
  player2: {
    type: mongoose.Schema.Types.String,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'ongoing', 'completed', 'cancelled'],
    default: 'pending',
  },
  winner: {
    type: mongoose.Schema.Types.String,
    ref: 'User',
    default: null,
  },
  question: {
    type: String,  //  question 
    required: true,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
    default: null,
  },
}, { timestamps: true });

const Battle = mongoose.model('Battle', battleSchema);

module.exports = Battle;
