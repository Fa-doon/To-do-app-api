const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    value: ["pending", "completed", "deleted"],
    default: "pending",
  },
  user_id: { type: Schema.Types.ObjectId, ref: "users" },
});

module.exports = mongoose.model("tasks", taskSchema);
