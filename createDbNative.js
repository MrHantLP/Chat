/**
 * Created by MrHant on 06.10.2015.
 */
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;


// Use connect method to connect to the Server
MongoClient.connect('mongodb://localhost:27017/chat', function (err, db) {
    if (err) throw err;
    var collection = db.collection('test_insert');
    collection.remove({}, function (err, affected) {
        if (err) throw err;
        collection.insert({a: 2}, function (err, docs) {

            collection.find({a: 2}).toArray(function (err, results) {
                console.dir(results);
                db.close();
            });
        });


    });
});