const ApiError = require('../exceptions/apiError');

module.exports = function (role) {
    return function (req, res, next) {
        try {
            const user = req.user
            if (!user) {
                return next(ApiError.UnauthorizedError());
            }

            const access = role.find(item => item == user.role)

            if (!access) {
                return next(ApiError.UnauthorizedError());
            }
            next();
        } catch (e) {
            return next(ApiError.UnauthorizedError());
        }
    };
};
