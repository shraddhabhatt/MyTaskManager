var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var port = process.env.PORT || 8080;

var app = express();

// Serve static content for the app from the 'public' directory
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Set Handlebars as the view engine
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.listen(port, function() {
  console.log("App listening on PORT: " + port);
});