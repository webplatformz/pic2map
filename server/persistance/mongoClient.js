const mongoose = require('mongoose');

console.log('Connecting to DB with ENV value from MONGODB_URI');

mongoose.connect(process.env.MONGODB_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('DB connected');
    // we're connected!
});



/*
Example GEOJSON
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "name": "Dinagat Islands"
  }
}
*/

var TripSchema = mongoose.Schema({
    name : String,
    key : String,
    images : [{
        geo : {
            geoType : String,
            geometry : {
                coordType : String,
                coordinates: [Number]
            },
            properties : {
                name:String
            }
        },
        key : String,
        dateIso : String,
        dateTicks : String
    }]
});

module.exports = {
    getTripById : function () {
        var Trip = db.model('Trip', TripSchema);
        return Trip
            .findOne({key: '123456abcuuid'})
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
                geo:{
                    geoType: 'Feature',
                    geometry: {
                        coordType: 'Point',
                        coordinates: [125.6, 10.1]
                    },
                    properties: {
                        name: 'Bora Bora'
                    }
                },
                key:'424242imgeuuid',
                dateIso:'2007-12-24T18:21Z',
                dateTicks:'1198520460'
            }
        ]});

        tripItem.save(function (err, item) {
            if (err) return console.error(err);
            console.log('saved to DB: ' + item.name);
        });
    }
};
