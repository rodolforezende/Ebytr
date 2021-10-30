const User = require('../models/userSchema');
const bcrypt = require('bcryptjs')
const { registerValidate } = require('../middlewares/validations');

const userRegisters = async (name, email, password) => {
  const validate = await registerValidate(name, email, password);
  if (validate.message) {
    return validate;
  }
  
  const findExistUser = await User.findOne({ email });
  if(findExistUser) return { message: 'Email already exists' };
  const newUser = new User({
    name,
    email,
    password: bcrypt.hashSync(password),
  });
  try {
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    return { error };
  }
}

module.exports = { userRegisters };