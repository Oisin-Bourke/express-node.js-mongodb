var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('aboutUs', {
        title: 'Craft Brew Club'
    });
});

module.exports = router;