const chai = require('chai');
const dirtyChai = require('dirty-chai');
const User = require('../../../server/models/user.model');
const bcrypt = require('bcrypt');

const { expect } = chai;
chai.use(dirtyChai);

const user = {
  email: 'test@test.com',
  password: 'test'
};

describe('User Model', () => {
  let testUser;

  before(() => {
    testUser = new User(user);
  });

  it('hashPassword(): should return salted and hashed password', (done) => {
    testUser.hashPassword(testUser)
      .then((data) => {
        const compare = bcrypt.compareSync('test', data.get('password'));
        expect(compare).to.be.true();
        done();
      });
  });
});
