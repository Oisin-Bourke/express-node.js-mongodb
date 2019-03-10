//this module sets up our Mongoose Schema model and exports to MongoDB

var myMongoose = require("mongoose");//get access to mongoose API

var mySchema = myMongoose.Schema;//use variable to get mongoose Schema object and assign to variable

require("./util");//get access to my MongoDB connection

//create a structured mongoose type Schema:

var commentsSchema = new mySchema ({

    user_name : { type : String },
    comment : { type : String },
    date_created : {type : Date, default : new Date()},
    up_votes : {type : Number, default : 0 },
    down_votes : {type : Number, default : 0 },

});

/*
    The first argument is the singular name of the collection your model is for.
    Mongoose automatically looks for the plural version of your model name.
    Thus, for the example above, the model Tank is for the tanks collection in
    the database. The .model() function makes a copy of schema.
    Make sure that you've added everything you want to schema before calling .model()!
 */

//this exports the Schema object with the assigned name 'comment' that is made plural lol!!!

module.exports = myMongoose.model("comment",commentsSchema);//export mongoose scheme to DB