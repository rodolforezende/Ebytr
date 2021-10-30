const router = require('express').Router();
const userController = require('../controllers/userController')

router.post('/users', userController.userRegister);
router.post('/login')

module.exports = router;