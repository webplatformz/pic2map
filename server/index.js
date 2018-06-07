const express = require('express');
const path = require('path');
const mongoClient = require('./persistance/mongoClient');
const multer = require('multer');
const imageTransformer = require('./image_processor/imageTransformer');

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
    mongoClient.createTrip()
        .then((trip) => {
            res.json(trip);
        })
        .catch((error) => {
            console.error(error);
            res.sendStatus(500);
        });
});

app.get('/api/trips/:tripId', function (req, res) {
    const tripId = req.params.tripId;
    mongoClient.getTripById(tripId)
        .then(item => {
            console.log(item);
            res.send(item);
        })
        .catch((error) => {
            console.warn(error);
            res.sendStatus(400);
        });
    //mongoClient.insertMockData();
});

app.post('/api/trips/:tripId/images', upload.array('images'), async (req, res) => {
    await mongoClient.addImagesToTrip(req.params.tripId, req.files);
    res.sendStatus(204);
});

app.get('/api/trips/:tripId/images/:imageId', function (req, res) {
    const imageId = req.params.imageId;
    mongoClient.getImageById(imageId)
        .then(item => {
            if (item) {
                res.send(item.buffer);
            }
            else {
                res.sendStatus(404);
            }
        })
        .catch(() => {
            res.sendStatus(500);
        });
});

app.get('/api/trips/:tripId/images/:imageId/thumb', function (req, res) {
    const imageId = req.params.imageId;
    mongoClient.getImageById(imageId)
        .then(item => {
            if (item) {
                console.log("image found. ### TBD ### Processing Thumb");
                imageTransformer.generateThumb(item.buffer)
                    .then(thumb => {
                        res.send(thumb);
                    })
                    .catch(() => {
                        res.sendStatus(500);
                    });
            }
            else {
                res.sendStatus(404);
            }
        })
        .catch(() => {
            res.sendStatus(500);
        });
    res.send(req.params)
});

app.delete('/api/trips/:tripId/images/:imageId', function (req, res) {
    res.send(req.params)
});

app.delete('/api/trips/:tripId', (req, res) => {
    mongoClient.deleteTrip(req.params.tripId)
        .then(() => {
            res.sendStatus(204);
        })
        .catch(() => {
            res.sendStatus(400);
        });
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