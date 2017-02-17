// Importing libraries
var path = require('path')
var express = require('express')
var exphbs = require('express-handlebars')
var bodyParser = require('body-parser')

// Launching the app
var app = express()

// Setting REST encoding
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// Setting public files pool folder
app.use(express.static('./public'))

// Setting options for Handlebars
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

// Importing routes for express
require('./app/routes.js')(app)

// Listening on port 3000
app.listen(3000, function () {
  console.log('Application listening on port 3000')
})
