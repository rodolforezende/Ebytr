const Joi = require('joi');
const jwt = require('jsonwebtoken');
const validator = require('email-validator');

const registerValidate = async (body) => {

  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    email: Joi.string().required().min(3).max(50),
    password: Joi.string().required().min(5).max(200),
  });
  const validEmail = validator.validate(body.email);
  if (!validEmail) {
    return { message: 'Invalid entries. Try again.' };
  }
  
  const { error } = schema.validate(body);
  if (error && error.details.find(erro => erro)) {
    return { message: 'Invalid entries. Try again.' };
  }
  return true;
}

const loginValidate = async (body) => {
  const schema = Joi.object({
    email: Joi.string().required().min(3).max(50),
    password: Joi.string().required().min(5).max(200),
  });
  console.log(body)
  const { error } = schema.validate(body);
  if (error && error.details.find(erro => erro)) {
    return { message: 'Invalid entries. Try again.' };
  }

  return true;

};

const taskValidate = async (body) => {
  const schema = Joi.object({
    taskTitle: Joi.string().required().min(3).max(50),
    taskDescription: Joi.string().required().min(5).max(500),
    status: Joi.string().require(),
  });

  const { error } = schema.validate(body);
  if (error && error.details.find(erro => erro)) {
    return { message: 'Invalid entries. Try again.' };
  }

  return true
}

const validateAuth = async (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  };
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
  
  req.userId = decoded._id;
  next();
  })
};

module.exports = { registerValidate, loginValidate, taskValidate, validateAuth };