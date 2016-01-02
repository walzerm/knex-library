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
app.use(express.static('public'));

var routes = require('./controllers/routes');
app.use(routes);

app.listen(3000, function() {
    console.log('Server going at 3000...');
})
