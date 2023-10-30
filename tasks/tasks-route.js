const express = require("express");
const taskServices = require("./task-controller");
const authMiddleware = require("../middleware/checkAuth");
const cookieParser = require("cookie-parser");

const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());

router.post("/create", authMiddleware.checkAuth, async (req, res) => {
  const user = res.locals.user;
  const taskData = req.body;
  taskData.user_id = user._id;
  const response = await taskServices.createTask(taskData);

  if (response.code === 201) {
    res.redirect("/task");
  } else {
    res.send({
      message: `Please enter valid details`,
    });
  }
});

router.post("/complete-task/:taskId", authMiddleware.checkAuth, async (req, res) => {
  const taskId = req.params.taskId;
  const user = res.locals.user;

  const response = await taskServices.completeTask(taskId, user._id);

  if (response.code === 200) {
    res.redirect("/task");
  } else {
    res.status(response.code).send("Task completion failed");
  }
});

router.post("/delete-task/:taskId", authMiddleware.checkAuth, async (req, res) => {
  const taskId = req.params.taskId;
  const user = res.locals.user;

  const response = await taskServices.deleteTask(taskId, user._id);

  if (response.code === 200) {
    res.redirect("/task");
  } else {
    res.status(response.code).send("Task deletion failed");
  }
});
module.exports = router;
