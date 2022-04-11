var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

if(process.env.ENV === 'Test'){
    console.log('Running on TEST')
    var db = mongoose.connect('mongodb://localhost/bookAPI_Test');
}else{    
    console.log('Running on PROD')
    var db = mongoose.connect('mongodb://localhost/bookAPI');
}
var port = process.env.PORT || 3000;

var Book = require('./models/bookModel')
var bookRouter = require('./routes/bookRouter')(Book)
//var authorRouter = require('./routes/authorRouter')(Author)


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
    res.send('Welcome to my first API !!!')
});

app.server = app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

module.exports = app;