const chai = require('chai');
const metadataExtractor = require('./metadataExtractor');
const Promise = require('bluebird');
const readFile = Promise.promisify(require('fs').readFile);
const path = require('path');

describe('metadataExtractor', () => {
    it('it should export gps coordinates and capture timestamp from image data buffer', () => {

        return readFile(path.resolve(__dirname, 'testImage.jpg'))
            .then((buffer) => {

                return metadataExtractor.extract(buffer)
                    .then((metadata) => {

                        /**
                         {
                             location:{
                              lat:45.354,
                              lng:8.433
                             },
                             timestamp:8726587256 // in seconds UNIX time
                         }

                         *
                         */
                        chai.expect(metadata.location.lat).to.equal(46.703611111111115);
                        chai.expect(metadata.location.lng).to.equal(10.538055555555555);
                        chai.expect(metadata.timestamp).to.equal(1527851981);

                    });


            });


    });
});