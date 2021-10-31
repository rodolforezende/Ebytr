const Joi = require('joi');
const validator = require('email-validator');

const SECRET_TOKEN = process.env.TOKEN_SECRET;

const registerValidate = async (name, email, password) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    email: Joi.string().required().min(3).max(50),
    password: Joi.string().required().min(5).max(200),
  });

  const validEmail = validator.validate(email);

  if (!validEmail) {
    return { message: 'Invalid entries. Try again.' };
  }

  const { error } = schema.validate(name, email, password);
  if (error && error.details.find(erro => erro)) {
    return { message: 'Invalid entries. Try again.' };
  }
};

const loginValidate = async (email, password) => {
  const schema = Joi.object({
    email: Joi.string().required().min(3).max(50),
    password: Joi.string().required().min(5).max(200),
  });

  const { error } = schema.validate(email, password);
  console.log(error)
  if (error && error.details.find(erro => erro)) {
    return { message: 'Invalid entries. Try again.' };
  }
}


module.exports = { registerValidate, loginValidate };