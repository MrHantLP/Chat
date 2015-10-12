/**
 * Created by MrHant on 11.10.2015.
 */
var mongoose = require('mongoose');
var express = require('express');
var MongoStore = require('connect-mongo')(express);

var sessionStore = new MongoStore({mongooseConnection: mongoose.connection});

module.exports = sessionStore;