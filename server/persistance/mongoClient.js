const mongoose = require('mongoose');

console.log('Connecting to DB with ENV value from MONGODB_URI');

mongoose.connect(process.env.MONGODB_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('DB connected');
    // we're connected!
});



var TripSchema = mongoose.Schema({
    name : String,
    key : String,
    images : [{
        key : String,
        location: {
            lat: Number,
            lng: Number
        },
        filename: String,
        timestamp : Number
    }]
});

module.exports = {
    getTripById : function (key) {
        var Trip = db.model('Trip', TripSchema);
        return Trip
            .findOne({key: key})
            .then(function(trip) {
                return trip;
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    deleteTestTrip: function() {
    },
    insertMockData: function() {
        var tripSchema = db.model('Trip', TripSchema);
        var tripItem = new tripSchema({
            name:'Test Trip',
            key:'123456abcuuid',
            images: [
            {
                location: {
                    lat: 47.366667,
                    lng: 8.55
                },
                filename: "Elephant.jpg",
                timestamp: 1198520460,
                key:'424242imgeuuid'
            }
        ]});

        tripItem.save(function (err, item) {
            if (err) return console.error(err);
            console.log('saved to DB: ' + item.name);
        });
    }
};
