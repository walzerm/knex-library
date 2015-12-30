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

app.get('/', function(req, res) {
    res.send('Hello... its me');
})

app.listen(3000, function() {
    console.log('Server going at 3000...');
})
