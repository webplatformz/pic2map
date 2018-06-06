const express = require('express');
const path = require('path');
const guid = require('./util/guid');

const app = express();

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