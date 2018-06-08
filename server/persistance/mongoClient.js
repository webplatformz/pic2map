const mongoose = require('mongoose');
const Promise = require('bluebird');

const Trip = require('./Trip');
const guid = require('../util/guid');
const {extract} = require('../metadata/metadataExtractor');

console.log('Connecting to DB with ENV value from MONGODB_URI');

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('DB connected');
    // we're connected!
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
    return Trip.findOne({tripId: tripId})
        .then((res) => {
            if (res) {
                return res;
            }
            return Promise.reject(new Error(`Trip ${tripId} not found`));
        });
}

function addImagesToTrip(tripId, images) {
    const futureImageData = images.map(async file => {
        let metadata = {};
        try {
            metadata = await extract(file.buffer);
        } catch (error) {
            console.warn('Could not read metadata form file ' + file.originalname, error);
        }

        return {
            imageId: guid.generate(),
            location: metadata.location,
            filename: file.originalname,
            timestamp: metadata.timestamp,
            data: file.buffer
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

module.exports = {
    createTrip,
    getTripById,
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
