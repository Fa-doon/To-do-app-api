const Joi = require("joi");

const validateNewUser = async (req, res, next) => {
  try {
    const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    await schema.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (error) {
    res.status(422).json({
      message: `Invalid credentials`,
      error: error.message,
    });
  }
};

const login = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    await schema.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (error) {
    res.status(422).json({
      message: `Invalid credentials`,
      error: error.message,
    });
  }
};

module.exports = {
  validateNewUser,
  login,
};
