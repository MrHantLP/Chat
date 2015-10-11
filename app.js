/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var config = require('config');
var log = require('libs/log')(module);
var mongoose = require(('libs/mongoose'));
var HttpError = require('error').HttpError;

var app = express();
app.engine('ejs', require('ejs-locals'));
app.set('port', config.get('port'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.favicon());

if (app.get('env') == 'development') {
    app.use(express.logger('dev'));
} else {
    app.use(express.logger('default'));
}

app.use(express.bodyParser());
app.use(express.cookieParser());

var MongoStore = require('connect-mongo')(express);

app.use(express.session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({mongooseConnection: mongoose.connection})

}));

/*app.use(function (req, res, next) {
    req.session.numberOfVisits=req.session.numberOfVisits+1 || 1;
    res.send("Visits: " + req.session.numberOfVisits);
});*/

app.use(require('middleware/sendHttpError'));

app.use(app.router);


require('routes')(app);


app.use(express.static(path.join(__dirname, 'public')));


//Обработчик ошибок
app.use(function (err, req, res, next) {
    if (typeof  err == 'number') {
        err = new HttpError(err);
    }

    if (err instanceof HttpError) {
        res.sendHttpError(err);
    } else {

        if (app.get('env') == 'development') {
            express.errorHandler()(err, req, res, next);
        } else {
            log.error(err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }

});

/*


 //Middleware

 app.use(function (req, res, next) {
 if (req.url == '/') {
 res.end("Hello");
 } else {
 next();
 }
 });

 app.use(function (req, res, next) {
 if (req.url == '/forbidden') {
 next(new Error("wops, denied"));
 } else {
 next();
 }
 });

 app.use(function (req, res) {
 res.send(404, "Page not found");
 });


 });*/



/*

 var routes = require('./routes');
 var user = require('./routes/user');

 // all environments


 // development only
 if ('development' == app.get('env')) {
 app.use(express.errorHandler());
 }

 app.get('/', routes.index);
 app.get('/users', user.list);

 */

http.createServer(app).listen(config.get('port'), function () {
    log.info('Express server listening on port ' + config.get('port'));
});
