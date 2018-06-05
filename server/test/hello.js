//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

/*
  * Test the /GET route
  */
describe('/GET api/hello', () => {
    it('it should GET the hello answer', (done) => {
        chai.request(server)
            .get('/api/hello')
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body.msg).to.equal('Hello World!!');
                //res.body.length.should.be.eql(0);
                done();
            });
    });
});