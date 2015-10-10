var User = require('models/user').User;
var HttpError = require('error').HttpError;
var ObjectId = require('mongodb').ObjectID;

module.exports = function (app) {
    app.get('/', function (req, res, next) {
        res.render("index");
    });

    var User = require('models/user').User;
    app.get('/users', function (req, res, next) {
        User.find({}, function (err, users) {
            if (err) return next(err);
            res.json(users);
        });
    });

    app.get('/users/:id', function (req, res, next) {
        try{
            var id = new ObjectId(req.params.id);
        } catch(e){
            next(404);
            return;
        }

        User.findById(req.params.id, function (err, user) {
            if (err) return next(err);
            debugger;
            if (!user) {
                next(new HttpError(404, "User not found"));
            }
            res.json(user);
        });
    });
};