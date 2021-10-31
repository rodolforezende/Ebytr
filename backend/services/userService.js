const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const { registerValidate, loginValidate } = require('../middlewares/validations');

const userRegisters = async (body) => {
  const validate = await registerValidate(body);
  if (validate.message) {
    return validate;
  }
  const findExistUser = await User.findOne({ email: body.email });
  console.log(findExistUser, 'data')
  if (findExistUser) return { message: 'Email already exists' };
  const newUser = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password),
  });
  try {
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    return { error };
  }
}

const loginVerification = async (body) => {
  const validate = await loginValidate(body.email, body.password);
  if (validate.message) {
    return validate;
  }

  const findExistUser = await User.findOne({ email: body.email });
  if (!findExistUser) return { message: 'Email or Password incorrect' };

  const passwordAndUserMatch = bcrypt.compareSync(body.password, findExistUser.password);
  if (!passwordAndUserMatch) return { message: 'Email or Password incorrect' };

  const token = jwt.sign({ _id: findExistUser._id, email: findExistUser,  admin: findExistUser.admin }, process.env.TOKEN_SECRET);
  return token;
}
module.exports = { userRegisters, loginVerification };