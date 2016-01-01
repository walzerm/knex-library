var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var knex = require('./db/knex');
require('locus');
var methodOverride = require('method-override');

//middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.get('/authors', function(req, res) {
    knex('authors').then(function(authors) {
        res.render('index', {authors: authors});
    })
})

app.get('/authors/new', function(req, res) {
    res.render('new');
})

app.post('/authors', function(req, res) {
    knex('authors').insert({name: req.body.new}).then(function() {
        res.redirect('/authors');
    })
})

app.listen(3000, function() {
    console.log('Server going at 3000...');
})
