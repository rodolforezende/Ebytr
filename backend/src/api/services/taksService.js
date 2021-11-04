const Task = require('../models/taskSchema');
const { ObjectId } = require('mongodb');
const { taskValidate } = require('../middlewares/validations');

const registerValidate = async (body, userId) => {
  const validate = await taskValidate(body);
  if (validate.message) {
    return validate;
  }
  const newTask = new Task({
    taskTitle: body.taskTitle,
    taskDescription: body.taskDescription,
    status: body.status,
    userTask: userId,
  });

  try {
    const savedTask = await newTask.save();
    return savedTask;
  } catch (error) {
    return { error };
  };
};


const printAllTasksByLogin = async (userId) => {
  const result = await Task.find({ userTask: userId });
  return result;
}

const printAllTasksByLoginById = async (id, userId) => {
  const result = await Task.findOne({ _id: ObjectId(id), userTask: userId });
  return result;
}

const updateTaskById = async ( id, userId, { taskTitle, taskDescription, status }) => {
  const result = await Task.updateOne({ _id: ObjectId(id), userTask: userId }, 
  {
    $set: { taskTitle, taskDescription, status },
  })
  if (!result) {
    return { message: 'Task not found' }
  }
  const taskUpdate = await printAllTasksByLoginById(id, userId);
  return taskUpdate
}

const deleteTask = async (id, userId) => {
  const taskDeleted = await printAllTasksByLoginById(id, userId);
  if (!taskDeleted) {
    return {
      message: 'Task not found'
    }
  }
  await Task.deleteOne({ _id: ObjectId(id) });
  return {'Task deleted': taskDeleted };
}


module.exports = { 
  registerValidate, 
  printAllTasksByLogin, 
  printAllTasksByLoginById,
  updateTaskById,
  deleteTask, 
}