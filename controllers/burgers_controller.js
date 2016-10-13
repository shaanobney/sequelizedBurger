var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var models = require('../models');
var methodOverride = require('method-override');

router.get('/', function(req, res) {
    res.redirect('/index');
});

router.get('/index', function(req, res) {
    models.burgers.findAll()
        .then(function(data) {
            res.render('index', {
                burgers: data
            });
        });
});

router.post('/index/create', function(req, res) {
    models.burgers.create({
            burger_name: req.body.burger_name,

            devoured: req.body.devoured
        })
        .then(function() {
            res.redirect('/index');
        });
});

router.put('/index/update/:id', function(req, res) {
    var newId = req.params.id;
    models.burgers.update({
        devoured: req.body.devoured
    }, {
        where: {
            id: newId
        }
    }).then(function() {
        res.redirect('/index');
    });

});

module.exports = router;
