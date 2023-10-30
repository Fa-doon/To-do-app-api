const Model = require("../models/task");
const logger = require("../logger/index");

async function getTask(userId) {
  try {
    logger.info("Get Task => process started");
    const tasks = await Model.find({ user_id: userId });

    logger.info("Get Task => process ended");
    return {
      code: 200,
      message: `Tasks successfully retrieved`,
      data: {
        tasks,
      },
    };
  } catch (error) {
    logger.error(error);
    return {
      message: "Task fetching failed",
      code: 500,
    };
  }
}

async function createTask(taskData) {
  try {
    logger.info("Create Task => process started");
    const newTask = new Model({
      title: taskData.title,
      description: taskData.description,
      user_id: taskData.user_id,
    });

    const savedTask = await newTask.save();

    logger.info("Create Task => process ended");
    return {
      message: `Successfully created task`,
      code: 201,
      data: {
        task: savedTask,
      },
    };
  } catch (error) {
    logger.error(error);
    res.status(500).send(`Something went wrong!`);
    return {
      message: "Something went wrong",
      code: 500,
    };
  }
}

async function completeTask(taskId, userId) {
  try {
    const task = await Model.findOne({ _id: taskId, user_id: userId });

    if (!task) {
      return {
        code: 404,
        data: "Task not found",
      };
    }

    task.status = "completed";
    await task.save();

    return {
      code: 200,
      message: `Task ${taskId} marked as completed`,
    };
  } catch (error) {
    logger.error(error);
    res.status(500).send(`Something went wrong!`);
    return {
      message: "Task completion failed",
      code: 500,
    };
  }
}

async function deleteTask(taskId, userId) {
  try {
    const task = await Model.findOne({ _id: taskId, user_id: userId });

    if (!task) {
      return {
        code: 404,
        data: "Task not found or unauthorized",
      };
    }

    await task.deleteOne();

    return {
      code: 200,
      message: `Task ${taskId} has been deleted`,
    };
  } catch (error) {
    logger.error(error);
    res.status(500).send(`Something went wrong!`);
    return {
      message: "Task deletion failed",
      code: 500,
    };
  }
}

module.exports = {
  createTask,
  getTask,
  completeTask,
  deleteTask,
};
