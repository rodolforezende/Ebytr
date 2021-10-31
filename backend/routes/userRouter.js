const router = require('express').Router();
const userController = require('../controllers/userController')

router.post('/users', userController.userRegister);
router.post('/login', userController.login)


module.exports = router;