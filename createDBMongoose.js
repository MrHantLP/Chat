/**
 * Created by MrHant on 06.10.2015.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var schema = mongoose.Schema({
    name: String
});

schema.methods.meow = function () {
    console.log(this.get('name'));
};

var Cat = mongoose.model('Cat', schema);

var kitty = new Cat({
    name: 'Zildjian'
});


kitty.save(function(er, kitty, affected) {
    kitty.meow();
});

