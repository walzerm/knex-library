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
    knex('authors').where('id', '=', req.body.hiddenName).first().del().then(function() {
        res.redirect('/authors');
    })
})

router.get('/authors/:id', function(req, res) {
    var authorID = parseInt(req.params.id);
    var bookObj = {};
    knex('authors').where('id', authorID).then(function(authors) {
        bookObj.author = authors[0].name;
        bookObj.authorID = authors[0].id;
    })

    knex('books').where('authorID', authorID).then(function(books) {
        bookObj.books = books;
        console.log(bookObj);
        res.render('../views/books', {bookObj: bookObj});
    })
})

router.post('/authors/books/new/:id', function(req, res) {
    knex('books').insert({name: req.body.new, authorID: req.params.id, catagory: req.body.catagory}).then(function() {
        var redirect = '/authors/' + req.params.id;
        res.redirect(redirect);
    })
})

router.delete('/authors/books/:id', function(req, res) {
    knex('books').where('id', '=', req.body.hiddenName).first().del().then(function() {
        res.redirect('/authors/' + req.params.id);
    })
})

router.post('/authors/books/edit/:id', function(req, res) {
    knex('books').where('id', req.params.id).then(function(book) {
        console.log(book);
        res.render('../views/edit', {book: book});
    })
})

router.post('/authors/books/update', function(req, res) {
    knex('books').where('id', req.body.id).update({name: req.body.name, catagory: req.body.catagory}).then(function(){
        res.redirect('/authors/' + req.body.authorID);
    })
})


module.exports = router;
