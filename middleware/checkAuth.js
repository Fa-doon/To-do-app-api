const jwt = require("jsonwebtoken");
const logger = require("../logger/index");
require("dotenv").config();

async function checkAuth(req, res, next) {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.redirect("/login");
    }

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    res.locals.user = decoded;

    next();
  } catch (error) {
    logger.error(error);
    return res.status(500).send(`Something went wrong`);
  }
}

module.exports = { checkAuth };
