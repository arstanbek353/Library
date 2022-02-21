const { Router } = require('express')
const router = Router()
const authController = require('../controllers/authController')
const { body } = require('express-validator')

// /auth/registration
router.post(
    '/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    authController.registration
)

// /auth/login
router.post('/login', authController.login)

// /auth/logout
router.post('/logout', authController.logout);

// /auth/activate
router.get('/activate/:link', authController.activate)

// /auth/refresh
router.get('/refresh', authController.refresh);

module.exports = router
