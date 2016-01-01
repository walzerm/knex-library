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


app.post('/authors/new', function(req, res) {
    knex('authors').insert({name: req.body.new}).then(function() {
        res.redirect('/authors');
    })
})

app.delete('/authors', function(req, res) {
    console.log(req.body.name[0]);
    knex('authors').where('id', '=', req.body.name[0]).first().del().then(function() {
        res.redirect('/authors');
    })
})

app.listen(3000, function() {
    console.log('Server going at 3000...');
})
