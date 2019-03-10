var express = require('express');//like import, get module express, access to all express code and assign to express
var router = express.Router();// allows routing pages

module.exports = router;

//================================== *** Index PAGE *** ================================================================>

/* GET index page. */
//get(folder path, function(requests object, response object ) ======> this called by express!!
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Craft Brew Club'
    });
});

//Each web page has have their own routes js page and then added to app.js

//================================== *** MONGO DB CONNECTION *** ======================================================>

/*
    get everything from module models/comments and assign to the schema collection object,
    this in turn includes the util DB connection!
*/
var myCommentsCollection = require("../models/comments");

//================================== *** ASSIGNMENT 3 *** =============================================================>

//ALL PROJECT API ARE INCLUDED IN THIS FILE:

/* A)
    A simple REST API must be created which when invoked returns version
    information for the backend system. Accessible at the path “/version”,
    it should respond to get requests and return JSON data indicating the version of the app.
    You can specify any version number you wish i.e. {version: “0.0.1”}
 */

router.get("/version", function (req,res,next) {

    var jsonObject = require('../package.json');//get full package and assign to object

    var versionString = jsonObject.version;//use object to access version's : value (name : value)

    res.json({version : versionString});//pass string into response

});

/* B)
    A second REST API which accepts POST requests should be created.
    This API should be able to save comments passed in through the
    request body to the MongoDB database. You can test this works by
    using the Postman client and following the example in the notes.
    If a comment is successfully saved, a JSON response is returned
    containing the comment message and the id of the comment.
 */

router.post("/AddCommentTo", function (req, res, next) {

    /*
        Use a new myCommentsCollection() object,
        with a request for all values (body) passed in ===> a 'document',
        and assign array to variable
    */
    var inputCommentsDocument = new myCommentsCollection(req.body);

    //Use the new document entry to call the save function for those values
    inputCommentsDocument.save(function (err, savedDocument) {

        if (err)
            throw err;

        //else respond with saved Objects _id value and comment value (name : value)
        res.json({
            "id": savedDocument._id,"comment":savedDocument.comment
        });

    });

});

/* C)
    A third REST API which retrieves comments from the database sorted by
    the date they were submitted. The number of documents returned should
    be limited to 10 documents. This API should support GET requests.
*/

//direct terminal code: db.comments.find().sort({"date_created":1}).limit(10)

router.get("/GetCommentSortDate", function (req,res,next) {

    //Use my Collection to find all documents
    myCommentsCollection.find({ }, function (err, collection) {
        if(err)
            res.send(err);

        //else then sort the Collection by name date created in ascending order with value :1
        var sortedCollection = collection.sort({date_created:1});

        res.json(sortedCollection);//response returns an array of sorted document objects

    }).limit(10);//then limit documents to 10

});

//===================================== *** MONGOOSE -> MONGODB APIs *** ==========================================>

//POST or add comments targets "AddComment" page:
router.post("/AddComment", function (req, res, next) {

    var commentCapture = new myCommentsCollection(req.body);

    commentCapture.save(function (err, savedComment) {

        if (err)
            throw err;

        res.json({
            "id": savedComment._id//sends back auto unique _id of json serialized object if successful
        });

    });
    
});

//Get all comments target "GetComments" page:
router.get("/GetComments", function (req,res,next) {

    myCommentsCollection.find({}, function (err, comments) {
        if(err)
            res.send(err);

        res.json(comments);//response returns an array of objects
        
    }).sort({date_created:-1});

});

//Update comment from DB by id:
router.put("/UpdateComment/:id", function (req, res, next) {

    var id = req.params.id;

    myCommentsCollection.update({_id:id}, req.body, function (err) {
        if(err)
            res.send(err);

        res.json({status: "Document update successful"});
        
    });

});


//UpVote API by Object ID:
router.put("/UpVote/:id", function (req, res, next) {

    var id = req.params.id;

    myCommentsCollection.findOneAndUpdate({_id :id}, {$inc : {'up_votes' : 1}}).exec();


});

//DownVote API by Object ID:
router.put("/DownVote/:id", function (req, res, next) {

    var id = req.params.id;

    myCommentsCollection.findOneAndUpdate({_id :id}, {$inc : {'down_votes' : 1}}).exec();


});


//Delete comment from DB by id:
router.delete("/DeleteComment/:id", function (req, res, next) {

    var id = req.params.id;

    myCommentsCollection.deleteOne({_id:id}, function (err) {
        if(err)
            res.send(err);

        res.json({status: "Deleted record"});
        
    });

});

//Retrieve comment from DB based by username:
router.get("/GetCommentName", function(req,res,next){

    myCommentsCollection.find({user_name:req.query.user_name}, function (err, comments) {
        if(err)
            res.send(err);

        res.json(comments);

    })

});

//================================== *** TEST POST MODULE *** =========================================================>

//Getting NodeJS module:
var multiply = require('./multiply');

//Using NodeJS module multiply to create an API that responds to POST requests through page "/multiply":
router.post('/multiply', function (req, res, next) {
    var sum = multiply (req.body.number1, req.body.number2);
    res.json({Sum : sum })
})