const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const SECRET_TOKEN = process.env.TOKEN_SECRET;

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await userService.userRegisters(name, email, password)
    if(result.message) {
      return res.status(400).json(result)
    }
    res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ message: 'Something is wrong' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
  } catch (error) {
    return res.status(400).json({ message: 'Something is wrong' });
  }
}

module.exports = { userRegister }