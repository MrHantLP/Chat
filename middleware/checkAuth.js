/**
 * Created by MrHant on 11.10.2015.
 */
var HttpError = require('error').HttpError;

module.exports = function (req, res, next) {
    if(!req.session.user) {
        return next(new HttpError(401, "Вы не авторизированны"));
    }

    next();
};
