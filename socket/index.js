/**
 * Created by MrHant on 11.10.2015.
 */

var Log = require('libs/log')(module);
module.exports = function (server) {
    var io = require('socket.io').listen(server);
    io.set('origin', 'localhost:*');
    io.set('logger', Log);

    io.sockets.on('connection', function (socket) {



        socket.on('message', function (text, callback) {
            socket.broadcast.emit('message', text);
            callback();
        });
    });
};