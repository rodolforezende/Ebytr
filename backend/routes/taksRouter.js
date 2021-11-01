const router = require('express').Router();
const taskController = require('../controllers/taskController');
const { validateAuth } = require('../middlewares/validations')

router.post('/task', validateAuth, taskController.taskRegister);
router.get('/task', validateAuth, taskController.showTaskByLogin);
router.get('/task/:id', validateAuth, taskController.showTaskByLoginById);
router.post('/task/:id', validateAuth, taskController.updateTaskById);
router.delete('/task/:id', validateAuth, taskController.deleteTaskById);

module.exports = router;