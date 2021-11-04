
const userService = require('../services/userService');

const userRegister = async (req, res) => {
  try {
    const result = await userService.userRegisters(req.body)

    if (result.message) {
      return res.status(400).json(result)
    }
    res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ message: 'Something is wrong' });
  }
};

const login = async (req, res) => {
  try {
    const result = await userService.loginVerification(req.body);
    if (result.message) {
      return res.status(400).json(result)
    }
    console.log(req.body)
    res.status(200).json({ token: result })

  } catch (error) {
    return res.status(400).json({ message: 'Something is wrong' });
  }
}

module.exports = { userRegister, login }