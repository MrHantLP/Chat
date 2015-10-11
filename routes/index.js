var User = require('models/user').User;
var chekAuth = require('middleware/checkAuth');


module.exports = function (app) {

    app.get('/', require('./frontpage').get);
    app.get('/login', require('./login').get);
    app.post('/login', require('./login').post);

    app.post('/logout', require('./logout').post);
    app.get('/chat', chekAuth, require('./chat').get);

};
/*
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
            return next(new HttpError(404, "User not found"));

        }

        User.findById(req.params.id, function (err, user) {
            if (err) return next(err);
            if (!user) {
                return next(new HttpError(404, "User not found"));

            }
            res.json(user);
        });
    });*/
