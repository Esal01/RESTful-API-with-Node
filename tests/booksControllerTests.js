const should = require('should');
const sinon = require('sinon');
const booksController = require('../controllers/booksController');

describe('Testing book controller functions: ', () => {
    describe('Testing POST', () => {
        it('Should not allow an empty title on post', () => {
            const Book = function (book) { this.save = () => {}};

            const req = {
                body:{
                    author:'Essam'
                }
            };

            const res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json: sinon.spy()
            };

            const controller = booksController(Book);
            controller.post(req, res);

            res.status.calledWith(400).should.equal(true, `Bad status ${res.status.args[0][0]}`);
            res.send.calledWith('Title is required').should.equal(true);
        });
    });
});

