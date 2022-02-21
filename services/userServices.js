const UserModel = require('../models/user.js')
const BookinstanceModel = require('../models/bookinstance')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const mailService = require('./mailService.js')
const tokenService = require('./tokenService.js')
const UserDto = require('../dtos/userDtos')
const ApiError = require('../exceptions/apiError')
const mongoose = require('mongoose')

class UserService {
    async registration(email, password, role) {
        const candidate = await UserModel.findOne({ email })
        if (candidate) {
            throw Error(`такой пользователь ${email} уже существует`)
        }
        const hashedPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        let user = null
        if (email === 'sheralievarstanbek@gmail.com') {
            user = await UserModel.create({ email, password: hashedPassword, activationLink, role: 'admin' })
        } else {
            user = await UserModel.create({ email, password: hashedPassword, activationLink, role: role })
        }
        await mailService.sendActivationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        console.log('UserService class', { ...tokens })

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink })

        if (!user) {
            throw new Error('error link')
        }

        user.isActivated = true
        await user.save()
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email })
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto }
    }

    async getAllUsers() {
        const data = await UserModel.find();
        const users = data.map(user => {
            const userDto = new UserDto(user)
            return { ...userDto }
        })
        return users;
    }

    async getViewerUsers() {
        const data = await UserModel.find({ role: 'viewer' });
        const users = data.map(user => {
            const userDto = new UserDto(user)
            return { ...userDto }
        })
        return users;
    }

    async deleteUser(username) {
        const user = await UserModel.findOne({ email: username })
        await UserModel.findByIdAndRemove(user._id)
        return { user: user.email, message: 'deleted' }
    }

    async setUserRole(username, role) {
        const user = await UserModel.findOne({ email: username })
        const updatedUser = new UserModel(
            {
                ...user,
                _id: user._id,
                role,
            }
        );
        console.log(updatedUser)
        await UserModel.findByIdAndUpdate(user._id, updatedUser)
        return { user: user.email, message: `role changed to ${role}` }
    }

    async setUserBookinstance(bookinstanceId, userId, due_back) {
        const user = await UserModel.findById(userId)
        const match = user.bookInstances.find(id => id.toString() === bookinstanceId)
        if (match) {
            throw 'error setUserBookinstance'
        }

        const bookinstance = await BookinstanceModel.findById(bookinstanceId)
        const updatedUser = new UserModel(
            {
                ...user,
                _id: user._id,
                bookInstances: [...user.bookInstances, bookinstanceId],
            }
        );
        await UserModel.findByIdAndUpdate(userId, updatedUser)


        const updatedBookinstance = new BookinstanceModel(
            {
                ...bookinstance,
                _id: bookinstance._id,
                due_back,
                status: 'Loaned',
                user: updatedUser
            }
        );
        await BookinstanceModel.findByIdAndUpdate(bookinstanceId, updatedBookinstance)
        // const bookinstance = await BookinstanceModel.find({
        //     '_id': { $in: updatedUser.bookInstances.map(bookInstanceId => mongoose.Types.ObjectId(bookInstanceId)) }
        // })
        return { user: updatedUser, message: `updated` }
    }

    async acceptBookinstance(bookinstanceId) {
        const bookinstance = await BookinstanceModel.findById(bookinstanceId)
        if (!bookinstance.user) {
            throw 'error setUserBookinstance'
        }
        const userId = bookinstance.user.toString()
        const user = await UserModel.findById(userId)
        console.log(user.bookInstances)
        const newUserBookInstances = user.bookInstances.filter(id => id.toString() !== bookinstanceId)

        const updatedUser = new UserModel(
            {
                ...user,
                _id: user._id,
                bookInstances: newUserBookInstances,
            }
        );
        await UserModel.findByIdAndUpdate(userId, updatedUser)


        const updatedBookinstance = new BookinstanceModel(
            {
                ...bookinstance,
                _id: bookinstance._id,
                due_back: null,
                status: 'Available',
                user: null
            }
        );
        await BookinstanceModel.findByIdAndUpdate(bookinstanceId, updatedBookinstance)
        return { user: updatedUser, message: `accepted` }
    }

    async checkRole(username, role) {
        const user = await UserModel.findOne({ email: username })

        return user.role === role ? true : false
    }
}

module.exports = new UserService()