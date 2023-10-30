const jwt = require("jsonwebtoken");
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
    console.log(error.message);
  }
}

module.exports = { checkAuth };
