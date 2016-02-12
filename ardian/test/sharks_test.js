const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
const server = require(__dirname + '/../server');//eslint-disable-line
const Shark = require(__dirname + '/../models/sharks');
const request = chai.request;
const origin = 'localhost:3000';
const url = '/api/sharks';

describe('the sharks api', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to retrieve all our sharks', (done) => {
    request(origin)
      .get(url)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should create a shark with a POST', (done) => {
    request(origin)
      .post(url)
      .send({name: 'test shark'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('test shark');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('rest requests that require a shark already in db', () => {
    beforeEach((done) => {
      Shark.create({ name: 'test shark' }, (err, data) => {
        this.testShark = data;
        done();
      });
    });

    it('should be able to update a shark', (done) => {
      request(origin)
        .put('/api/sharks/' + this.testShark._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

    it('should be able to delete a shark', (done) => {
      request(origin)
        .delete('/api/sharks/' + this.testShark._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });
  });
});
