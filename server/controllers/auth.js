const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require('dotenv').config();
const jwtPass = process.env.JWTPASS;

if (!jwtPass) {
    throw new Error('JWT secret key is not defined');
  }

  const register = async (req, res) => {
    try {
      const { name, email, password, location, occupation } = req.body;
  
      
      console.log("Received registration data:", { name, email, password, location, occupation });
  
      if (!name || !email || !password || !location || !occupation) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        location,
        occupation,
      });
  
      const savedUser = await newUser.save();
  
      res.status(201).json(savedUser);
    } catch (err) {
      console.error('Registration error:', err.message); 
      res.status(500).json({ error: err.message });
    }
  };
  

 const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        msg: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        msg: "Password is incorrect",
      });
    }

    const token = jwt.sign({ id: user._id }, jwtPass);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login };