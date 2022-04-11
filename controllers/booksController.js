const express = require('express');

function booksController(Book) {
    function post(req, res) {
        var book = new Book(req.body);
        if(!req.body.title){
            res.status(400);
            return res.send('Title is required');
        }
        book.save();
        res.status(201);
        return res.json(book);
    }
    function get(req, res) {
        var query = {}; //empty object
        if (req.query.genre) {
            query.genre = req.query.genre;
        } if (req.query.year) {
            query.year = req.query.year;
        }
        Book.find(query, (err, books) => {
            if (err) {
                return res.send(err);
            }
            const returnBooks = books.map((book) => {
                const newBook = book.toJSON();
                newBook.links = {};
                newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
                return newBook;
            })
            return res.json(returnBooks);
        });
    }
    function getBookById(req, res){
            const returnBooks = req.book.toJSON();
            returnBooks.links = {};
            const genre = req.book.genre.replace(' ', '%20%');
            returnBooks.links.FilterByGenre = `http://${req.headers.host}/api/books/?genre=${genre}`;
            return res.json(returnBooks);
    }
    function createBook(req, res) {
        var { book } = req; // getting the book object from the request
        book.title = req.body.title;
        book.author = req.body.author;
        book.genre = req.body.genre;
        book.year = req.body.year;
        book.read = req.body.read;
        console.log(book);
        req.book.save((err) => {
            if (err) {
                return res.send(err);
            }
            return res.json(book);
        });
    }
    function updateBook(req, res) {
        var { book } = req;
        // esline-disable-next-line no-underscore-dangle
        if (req.body._id) {
            // esline-disable-next-line no-underscore-dangle
            delete req.body._id;
        }
        Object.entries(req.body).forEach((item) => {
            var key = item[0];
            var value = item[1];
            console.log(value, key);
            book[key] = value;
        });
        req.book.save((err) => {
            if (err) {
                return res.send(err);
            }
            return res.json(book);
        });
    }
    function deleteBook(req, res) {
        req.book.remove((err) => {
            if (err) {
                return res.send(err);
            }
            return res.sendStatus(204);
        });
    }
    return {post, get, getBookById, createBook, updateBook, deleteBook};
}

module.exports = booksController;