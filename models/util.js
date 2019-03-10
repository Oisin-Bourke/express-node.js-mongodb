//Module that connects to my MongoDB ===> must be included in every module that uses that connection

var myMongoose = require("mongoose");//getting mongoose API

//using mongoose to make db connection
var myConnection = myMongoose.connect("mongodb://mongodb4508bo:ku2tyc@danu7:8717/mongodb4508",{ useNewUrlParser:true});

exports.connection = myConnection;//establish connection

