const express = require('express');
const booksController = require('../controllers/booksController');

function routes(Book) {
    const bookRouter = express.Router();
    const controller = booksController(Book);
    
    bookRouter.route('/books')
        .post(controller.post)
        .get(controller.get);

    bookRouter.use('/books/:bookId', (req, res, next) => {
        console.log(req.params);
        Book.findById(req.params.bookId, (err, book) => {
            if (err) {
                return res.send(err);
            }
            if (book) {
                req.book = book;
                return next();
            }
            return res.sendStatus(404);
        });
    });
    bookRouter.route('/books/:bookId')
        .get(controller.getBookById)
        .put(controller.createBook)
        .patch(controller.updateBook)
        .delete(controller.deleteBook);
    return bookRouter;
};

module.exports = routes;