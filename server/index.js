const express = require('express');
const path = require('path');
const guid = require('./util/guid');
const mongoClient = require('./persistance/mongoClient');
const {extract} = require('./metadata/metadataExtractor');
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

app.post('/api/workspace', (req, res) => {
    // TODO store it in DB.
    const workspace = {
        id: guid.generate()
    };
    res.json(workspace);
});

app.get('/api/workspace/:id', function (req, res) {
    var tripKey = req.params.id;
    mongoClient.getTripById(tripKey)
        .then(function (item) {
            console.log(item);
            if (item) {
                res.send(item);
            }
            else {
                res.sendStatus(404);
            }
        })
        .catch((err) => {
            res.sendStatus(400);
        });
    //mongoClient.insertMockData();
});

app.post('/api/workspace/:id/picture', upload.array('pictures'), function (req, res) {
    console.log('Workspace ID:', req.params.id);

    req.files.forEach((file, index) => {
        extract(file.buffer).then((metadata) => {
            console.log('Index:', index, 'filename:', file.originalname, 'mimetype', file.mimetype, 'meta', metadata, 'buffer:', file.buffer);
        });
    });

    res.sendStatus(201)
});

app.get('/api/workspace/:id/picture/:pictureId', function (req, res) {
    res.send(req.params)
});

app.get('/api/workspace/:id/picture/:pictureId/thumb', function (req, res) {
    res.send(req.params)
});

app.delete('/api/workspace/:id/picture/:pictureId', function (req, res) {
    res.send(req.params)
});

app.delete('/api/workspace/:id', (req, res) => {
    // TODO Delete workspace and pictures in DB.
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