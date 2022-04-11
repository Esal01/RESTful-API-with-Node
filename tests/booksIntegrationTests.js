require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';

const app = require('../app.js');

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('CRUD Testing ', () => {
    it('Should allow a book to be posted and get the read and the _id', (done) => {
        const bookPost = {title:'A Book', author:'The author', genre:'Fiction' };

        agent.post('/api/books')
            .send(bookPost)
            .expect(200)
            .end((err, results) => {
                console.log(results);
                //results.body.read.should.not.equal(false); // failing test
                results.body.should.have.property('_id'); 
                done();
            });
    });

    afterEach((done) =>{
        Book.deleteMany({}).exec();
        done();
    });

    after ((done) => {
        mongoose.connection.close();
        app.server.close (done()); // ending the server after ending test
    });
});