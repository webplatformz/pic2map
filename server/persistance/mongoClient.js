const mongoose = require('mongoose');
const guid = require('../util/guid');
const {extract} = require('../metadata/metadataExtractor');
const Promise = require('bluebird');

console.log('Connecting to DB with ENV value from MONGODB_URI');

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('DB connected');
    // we're connected!
});

const TripSchema = mongoose.Schema({
    name: String,
    tripId: String,
    tripViewId: String,
    images: [{
        imageId: String,
        location: {
            lat: Number,
            lng: Number
        },
        filename: String,
        timestamp: Number,
        data: Buffer
    }]
});

const Trip = db.model('Trip', TripSchema);

function getTripById(tripId) {
    const Trip = db.model('Trip', TripSchema);
    return Trip.findOne({tripId: tripId}).catch(console.warn);
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
        const tripToUpdate = trip || new Trip({
            name: 'New trip',
            tripId: tripId,
            images: []
        });

        return Promise.all(futureImageData)
            .then(imageData => {
                tripToUpdate.images = tripToUpdate.images.concat(imageData);

                return Promise.fromCallback(cb => Trip.update({tripId: tripToUpdate.tripId}, tripToUpdate, {upsert: true}, cb));
            });
    });
}


module.exports = {
    getTripById,
    addImagesToTrip,
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
