const taskService = require('../services/taksService')

const taskRegister = async (req, res) => {
  try {
    const result = await taskService.registerValidate(req.body, req.userId);

    if (result.message) {
      return res.status(400).json(result)
    }

    res.status(201).json(result)
  } catch (error) {
    return res.status(400).json({ message: 'Something is wrong' });
  }
}

const showTaskByLogin = async (req, res) => {
  try {
    const result = await taskService.printAllTasksByLogin(req.userId);
    res.status(201).json(result)
  } catch (error) {
    return res.status(400).json({ message: 'Something is wrong' });
  }
}

const showTaskByLoginById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await taskService.printAllTasksByLoginById(id, req.userId);
    res.status(201).json(result)
  } catch (error) {
    return res.status(400).json({ message: 'Something is wrong' });
  }
}

const updateTaskById = async (req, res) => {
  try {
    const { taskTitle, taskDescription, status } = req.body;
    const { id } = req.params;
    const result = await taskService.updateTaskById(id, req.userId, { taskTitle, taskDescription, status });
    res.status(200).json(result)
  } catch (error) {
    return res.status(400).json({ message: 'Something is wrong' });
  }
}

const deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await taskService.deleteTask(id, req.userId);
    res.status(200).json(result)
  } catch (error) {
    return res.status(400).json({ message: 'Something is wrong' });
  }
}

module.exports = { 
  taskRegister, 
  showTaskByLogin, 
  showTaskByLoginById, 
  updateTaskById,
  deleteTaskById, 
};