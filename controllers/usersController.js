const userService = require('../services/userServices.js')
const ApiError = require('../exceptions/apiError')
const { validationResult } = require('express-validator')

class UsersController {

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async getViewerUsers(req, res, next) {
        try {
            const users = await userService.getViewerUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const user = await userService.deleteUser(req.params.id);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async setUserRole(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const { role } = req.body;
            console.log(role)
            const user = await userService.setUserRole(req.params.id, role);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async setUserBookinstance(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const { userId, due_back } = req.body;
            const data = await userService.setUserBookinstance(req.params.id, userId, due_back);
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }


    async acceptBookinstance(req, res, next) {
        try {
            const data = await userService.acceptBookinstance(req.params.id);
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new UsersController();