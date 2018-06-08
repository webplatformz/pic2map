const mongoose = require('mongoose');
const Promise = require('bluebird');

const Trip = require('./Trip');
let Image;
const guid = require('../util/guid');

const {extract} = require('../metadata/metadataExtractor');

console.log('Connecting to DB with ENV value from MONGODB_URI');
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected');
    Image = require('./Image');
});

function createTrip() {
    const trip = new Trip({
        name: 'New trip',
        tripId: guid.generate(),
        images: []
    });
    return Trip.create(trip);
}

function getTripById(tripId) {
    return Trip.findOne({tripId: tripId});
}

function getImageById(tripId, imageId) {
    return Image.findById(imageId)
        .then(loadedImage => {
            if (!loadedImage) {
                return Promise.reject({status: 404, msg: `Image with id ${imageId} could not be found!`});
            }

            if (loadedImage.metadata.tripId !== tripId) {
                return Promise.reject({status: 403, msg: `Image with id ${imageId} does not belong to trip with id ${tripId}!`});
            }

            return loadedImage._id;
        })
        .then(objectId => Image.readById(objectId));
}

function addImagesToTrip(tripId, images) {
    const futureImageData = images.map(async file => {
        let metadata = {};
        try {
            metadata = await extract(file.buffer);
        } catch (error) {
            console.warn('Could not read metadata form file', file.originalname, error);
        }

        const savedImage = await storeImageToGridFs(file, tripId);

        return {
            imageId: savedImage._id.toString(),
            location: metadata.location,
            filename: file.originalname,
            timestamp: metadata.timestamp
        };
    });

    return getTripById(tripId).then(trip => {
        return Promise.all(futureImageData)
            .then(imageData => {
                trip.images = trip.images.concat(imageData);
                return Promise.fromCallback(cb => Trip.update({tripId: trip.tripId}, trip, {upsert: true}, cb));
            });
    });
}

function deleteTrip(tripId) {
    return Trip.findOne({tripId: tripId}).remove().exec();
}

function deleteImage(tripId, imageId) {
    return Trip.update(
        {tripId: tripId},
        {$pull: {images: {imageId: imageId}}}
    );
}

function storeImageToGridFs(file, tripId) {
    const imageStream = new require('stream').Duplex();
    imageStream.push(file.buffer);
    imageStream.push(null);

    return Promise.fromCallback(cb => Image.write({
        filename: file.originalname,
        contentType: file.mimetype,
        metadata: {
            tripId: tripId
        }
    }, imageStream, cb));
}

module.exports = {
    createTrip,
    getTripById,
    getImageById,
    addImagesToTrip,
    deleteTrip,
    deleteImage,
    deleteTestTrip: function () {
    },
    insertMockData: function () {
        const trip = new Trip({
            name: 'Test Trip',
            tripId: '1234',
            tripViewId: '5678',
            images: [
                {
                    location: {
                        lat: 47.366667,
                        lng: 8.55
                    },
                    filename: 'Elephant.jpg',
                    timestamp: 1198520460,
                    imageId: '424242imgeuuid'
                }
            ]
        });

        trip.save(function (err, item) {
            if (err) return console.error(err);
            console.log('saved to DB: ' + item.name);
        });
    }
};
