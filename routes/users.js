const { Router } = require('express')
const router = Router()
const usersController = require('../controllers/usersController')
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')

// users
router.get('/', authMiddleware, usersController.getUsers);
// delete user
router.get('/:id/delete', authMiddleware, roleMiddleware(['admin']), usersController.deleteUser);
// set user role
router.post('/:id/update', authMiddleware, roleMiddleware(['admin']), usersController.setUserRole);

module.exports = router