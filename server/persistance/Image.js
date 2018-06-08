const gridfs = require('mongoose-gridfs')({
    collection: 'images',
    model: 'Image'
});

module.exports = gridfs.model;