const chai = require('chai');

const guid = require('./guid');
const uuidPattern = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;

describe('guid', () => {
    it('it should generate a valid uuid', () => {
        const actual = guid.generate();

        chai.expect(actual.match(uuidPattern)).to.not.be.null;
    });
});