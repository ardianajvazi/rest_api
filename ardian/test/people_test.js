const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
const server = require(__dirname + '/../server');//eslint-disable-line
const People = require(__dirname + '/../models/people');
const request = chai.request;
const origin = 'localhost:3000';
const url = '/api/people';

describe('the peoples api', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to retrieve all our people', (done) => {
    request(origin)
      .get(url)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should create a person with a POST', (done) => {
    request(origin)
      .post(url)
      .send({name: 'test ardian'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('test ardian');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('rest requests that require a person already in db', () => {
    beforeEach((done) => {
      People.create({ name: 'test ardian' }, (err, data) => {
        this.testPerson = data;
        done();
      });
    });

    it('should be able to update a shark', (done) => {
      request(origin)
        .put('/api/people/' + this.testPerson._id)
        .send({ name: 'new persons name' })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.name).to.eql('new persons name');
          done();
        });
    });

    it('should be able to delete a person', (done) => {
      request(origin)
        .delete('/api/people/' + this.testPerson._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('Person has been killed');
          done();
        });
    });
  });
});
