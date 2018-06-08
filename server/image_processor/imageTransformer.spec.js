const chai = require('chai');
const imageTransformer = require('./imageTransformer');
const Promise = require('bluebird');
const readFile = Promise.promisify(require('fs').readFile);
const saveFile = Promise.promisify(require('fs').writeFile);
const existFile = require('fs').existsSync;
const deleteFile = require('fs').unlinkSync;
const path = require('path');

describe('imageTransformer', () => {
    it('it should transform image to a thumbnail and write file ', () => {

        return readFile(path.resolve(__dirname, 'Sunstar_test.jpg'))
            .then((buffer) => {
                return imageTransformer.generateThumb(buffer)
                    .then((bufferData) => {
                        saveFile("testImage_thumb.jpg", bufferData,  "binary",function(err) {
                            if(err) {
                                fail("Something went wrong while processing image to thumb: " + err);
                            } else {
                                console.log("The file was saved!");
                                // check if file written
                                chai.expect(existFile('testImage_thumb.jpg')).to.equal(true);
                                if (existFile('testImage_thumb.jpg')) {
                                    //delete file after test...
                                    deleteFile('testImage_thumb.jpg');
                                }
                            }
                        });
                    });
            });
    });
});