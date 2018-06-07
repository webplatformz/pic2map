const express = require('express');
const path = require('path');
const guid = require('./util/guid');
const mongoClient = require('./persistance/mongoClient');
const multer = require('multer');

const app = express();

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client')));

// Put all API endpoints under '/api'
app.get('/api/hello', (req, res) => {
    const helloWorld = {
        msg: 'Hello World!!'
    };

    // Return them as json
    res.json(helloWorld);
});

app.post('/api/trips', (req, res) => {
    // TODO store it in DB.
    res.json({tripId: guid.generate()});
});

app.get('/api/trips/:tripId', function (req, res) {
    const tripId = req.params.tripId;
    mongoClient.getTripById(tripId)
        .then(item => {
            console.log(item);

            res.send(item || {
                tripId:tripId,
                images: []
            });
        })
        .catch(() => {
            res.sendStatus(400);
        });
    //mongoClient.insertMockData();
});

app.post('/api/trips/:tripId/images', upload.array('images'), async (req, res) => {
    await mongoClient.addImagesToTrip(req.params.tripId, req.files);
    res.sendStatus(200);
});

app.get('/api/trips/:tripId/images/:imageId', function (req, res) {
    res.send(req.params)
});

app.get('/api/trips/:tripId/images/:imageId/thumb', function (req, res) {
    res.send(req.params)
});

app.delete('/api/trips/:tripId/images/:imageId', function (req, res) {
    res.send(req.params)
});

app.delete('/api/trips/:tripId', (req, res) => {
    // TODO Delete trip and images in DB.
    res.sendStatus(204);
});

app.delete('/api/clear-all-data', (req, res) => {
    // TODO Just for dev use -> to be deleted afterwards

});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log(`Pic2Map listening on ${port}`);
module.exports = app; // for testing