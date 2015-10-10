/**
 * Created by mrhan on 10.10.2015.
 */
var path = require('path');
var util = require('util');
var http = require('http');

//Выдаём ошибку поситителю
function HttpError(status, message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, HttpError);

    this.status = status;
    this.message = message || http.STATUS_CODES[status] || "Error";
}

util.inherits(HttpError, Error);

HttpError.prototype.name = 'HttpError';

exports.HttpError = HttpError;