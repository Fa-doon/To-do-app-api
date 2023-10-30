const express = require("express");
const cookieParser = require("cookie-parser");
const middleware = require("./user-middleware");
const controller = require("./users-controller");

const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());

router.post("/signup", middleware.validateNewUser, async (req, res) => {
  const userResponse = await controller.createUser({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  if (userResponse.code === 201) {
    res.redirect("/login");
  } else {
    res.send({
      message: `User already exists`,
    });
  }
});

router.post("/login", middleware.login, async (req, res) => {
  const userResponse = await controller.login({
    email: req.body.email,
    password: req.body.password,
  });

  if (userResponse.code === 200) {
    res.cookie("jwt", userResponse.token, { maxAge: 360000 });
    res.redirect("/task");
  } else if (userResponse.code === 400) {
    res.send({
      message: `User not found, sign up`,
    });
  } else {
    res.send(`Invalid credentials`);
  }
});

module.exports = router;
