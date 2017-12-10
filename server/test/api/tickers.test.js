const chai = require('chai');
const dirtyChai = require('dirty-chai');
const chaiHttp = require('chai-http');
const server = require('../../index');
const helpers = require('../helpers');

const { expect } = chai;
chai.use(chaiHttp);
chai.use(dirtyChai);

describe('Auth Routes', () => {
  before((done) => {
    helpers.dbUp(server, done);
  });

  after((done) => {
    helpers.dbDown(server, done);
  });

  describe('/auth/login', () => {
    it('POST: should return user data on successful login', (done) => {
      chai.request(server)
        .post('/api/auth/login')
        .send({ email: 'ludovoquito@peluche.com', password: 'p@ssw0rd' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json();
          expect(res.body.user).to.exist();
          expect(res.body.user.email).to.equal('ludovoquito@peluche.com');
          expect(res.body.user.password).to.not.exist();
          done();
        });
    });

    it('POST: should return token on successful login', (done) => {
      chai.request(server)
        .post('/api/auth/login')
        .send({ email: 'ludovoquito@peluche.com', password: 'p@ssw0rd' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json();
          expect(res.body.token).to.exist();
          done();
        });
    });

    it('POST: should return 401 unauthorized on incorrect password', (done) => {
      chai.request(server)
        .post('/api/auth/login')
        .send({ email: 'ludovoquito@peluche.com', password: 'wrong!' })
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });
});
