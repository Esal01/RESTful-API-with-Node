var mongoose = require('mongoose');

var {Schema} = mongoose;

var bookModel = new Schema(
    {
        title: {type: String },
        author: {type: String },
        genre: {type: String },
        year: {type: Number },
        read: {type: Boolean, default: false },
    }
);

module.exports = mongoose.model('Book', bookModel)