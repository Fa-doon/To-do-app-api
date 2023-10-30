const Model = require("../models/user");
const jwt = require("jsonwebtoken");
const logger = require("../logger/index");
require("dotenv").config();

async function createUser({ username, email, password }) {
  try {
    logger.info("CreateUser => creation process statrted");
    const user = { username, email, password };

    const existingUser = await Model.findOne({ email: user.email });
    if (existingUser) {
      return {
        message: `User already exists`,
        code: 409,
      };
    }

    const newUser = await Model.create({
      username: user.username,
      email: user.email,
      password: user.password,
    });
    logger.info("CreateUser => creation ended");
    return {
      message: `Registration successful`,
      code: 201,
      newUser,
    };
  } catch (error) {
    logger.error(error);
    res.status(500).send(`Something went wrong!`);
    return {
      message: `Server error`,
      eeror: error,
    };
  }
}

async function login({ email, password }) {
  try {
    logger.info("Log in user => clogin process statrted");
    const user = { email, password };

    const existingUser = await Model.findOne({ email: user.email });

    if (!existingUser) {
      return {
        message: `User not found. Please sign up`,
        code: 400,
      };
    }

    const validPassword = await existingUser.isValidPassword(user.password);

    if (!validPassword) {
      return {
        message: `Email or password incorrect`,
        code: 422,
      };
    }

    const token = jwt.sign({ username: existingUser.username, _id: existingUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    logger.info("Log in user => clogin process ended");
    return {
      message: `Login successful`,
      code: 200,
      token,
      user: {
        email: existingUser.email,
        _id: existingUser._id,
      },
    };
  } catch (error) {
    logger.error(error);
    res.status(500).send(`Something went wrong!`);
    return {
      message: `Something went wrong`,
      code: 500,
    };
  }
}

module.exports = {
  createUser,
  login,
};
