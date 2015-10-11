/**
 * Created by MrHant on 06.10.2015.
 */
var mongoose = require('libs/mongoose');
var async = require('async');


/*
 console.log(mongoose.connection.readyState); //Проверка соединения
 */
async.series([
    open,
    dropDatabase,
    requireModels,
    //createUsers
], function (err, result) {
    //console.log(arguments);
    mongoose.disconnect();

    process.exit(err ? 255 : 0);
});

//Открываем базу
function open(callback) {
    mongoose.connection.on('open', callback);
}

//Дропаем базу (только после открытия!!!)
function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback) {
    require('models/user.js');
    async.each(Object.keys(mongoose.models), function (modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

//Создаём пользователей (только после открытия!!!)
function createUsers(callback) {
    var users = [
        {username: 'Дима', password: 'superpuper'},
        {username: 'Вова', password: 'puper'},
        {username: 'Гоша', password: 'todo'},
        {username: 'admin', password: 'admin'}
    ];

    async.each(users, function (userData, callback) {
        var user = new mongoose.models.User(userData);
        user.save(callback);
    }, callback);
}


/*
 var user = new User({
 username: "Tester3",
 password: "secret"
 });

 user.save(function (err, user, affected) {
 if (err) throw err;

 User.findOne({username:"Tester3"}, function (err, tester) {
 console.log(tester);
 })
 });*/
