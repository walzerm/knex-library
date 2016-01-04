var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var knex = require('../db/knex');
var methodOverride = require('method-override');

router.get('/authors', function(req, res) {
    knex('authors').then(function(authors) {
        res.render('../views/index', {authors: authors});
    })
})

router.post('/authors/new', function(req, res) {
    knex('authors').insert({name: req.body.new}).then(function() {
        res.redirect('/authors');
    })
})

router.delete('/authors', function(req, res) {
    console.log(req.body.hiddenName);
    knex('authors').where('id', '=', req.body.hiddenName).first().del().then(function() {
        res.redirect('/authors');
    })
})

router.get('/books/:id', function(req, res) {
    console.log('here');
    //eval(locus);
    var authorID = parseInt(req.params.id);
    console.log(authorID);
    knex('authors').where('id', authorID).then(function(authors) {
        //console.log({author: author});

        res.render('../views/books', {authors: authors});
    })

})


module.exports = router;
