const Joi = require('joi');
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

  const { error } = schema.validate(body.email, body.password);
  if (error && error.details.find(erro => erro)) {
    return { message: 'Invalid entries. Try again.' };
  }

  return true;

};

module.exports = { registerValidate, loginValidate };