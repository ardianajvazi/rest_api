const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
const server = require(__dirname + '/../server');//eslint-disable-line
const User = require(__dirname + '/../models/user');
const request = chai.request;


describe('the auth route', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should be able to generate a user', (done) => {
    request('localhost:3000/api')
      .post('/signup')
      .send({email: 'ardian', password: 'ardian123'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.token).to.exist;
        expect(res.body.token).to.have.length.above(0);
        done();
      });
  });
  describe('user already in database', () => {

    before((done) => {
      var user = new User();
      user.username = 'ardian';
      user.hash = user.hashPassword('ardian123');
      this.token = user.generateToken();
      user.save(() => {
        done();
      });
    });

    it('should be able to signin', (done) => {
      request('localhost:3000/api')
        .get('/signin')
        .auth('ardian', 'ardian123')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.token).to.exist;
          expect(res.body.token).to.have.length.above(0);
          done();
        });
    });
  });
});
