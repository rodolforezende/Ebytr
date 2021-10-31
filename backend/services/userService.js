const User = require('../models/userSchema');
const bcrypt = require('bcryptjs')
const { registerValidate, loginValidate } = require('../middlewares/validations');

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

const loginControl = async (email, password) => {
  const validate = await loginValidate(email, password)
  if (validate.message) {
    return validate;
  }

  const searchUser = await User.findOne(email);
  if (!searchUser) {
    return { message: 'Email or Password incorrect' }
  }

  const passwordAndUserMatch = bcrypt.compareSync(password, searchUser.password);
  if (!passwordAndUserMatch) {
    return { message: 'Email or Password incorrect' }
  }

  const token = jwt.sign({ _id: selectedUser._id, name: selectedUser.name, email: selectedUser.email, admin: selectedUser.admin }, SECRET_TOKEN);
  return token;
}

module.exports = { userRegisters, loginControl };