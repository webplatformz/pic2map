const mongoose = require('mongoose');

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
        timestamp: Number
    }]
});

module.exports = mongoose.model('Trip', TripSchema);