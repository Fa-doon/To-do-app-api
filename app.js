const express = require("express");
const taskModel = require("./models/task");
const usersRoute = require("./users/users-route");
const tasksRoute = require("./tasks/tasks-route");
const taskServices = require("./tasks/task-controller");
const authMiddleware = require("./middleware/checkAuth");

const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/users", usersRoute);
app.use("/tasks", tasksRoute);

// Basic routes

app.get("/", (req, res) => {
  res.redirect("home");
});

app.get("/home", (req, res) => {
  res.render("home", { navs: ["Home", "Signup", "Login"] });
});

app.get("/signup", (req, res) => {
  res.render("signup", { navs: ["Home", "Login"] });
});

app.get("/login", (req, res) => {
  res.render("login", { navs: ["Home", "Logout"] });
});

// Defining date variables
const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
const today = new Date();
let day = today.toLocaleDateString("en-US", options);

app.get("/create", authMiddleware.checkAuth, async (req, res) => {
  res.status(200).render("create_task", { navs: ["Home", "Logout"], Day: day });
});

app.get("/task", authMiddleware.checkAuth, async (req, res) => {
  const userId = res.locals.user._id;
  const response = await taskServices.getTask(userId);
  res
    .status(200)
    .render("task", { navs: ["Create", "Logout"], user: res.locals.user, tasks: response.data.tasks, Day: day });
});

app.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("home");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    data: null,
    error: "Server Error",
  });
});

module.exports = app;
