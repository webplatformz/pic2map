const express = require('express');
const path = require('path');

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
        id: guid()
    };
    res.json(workspace);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + 'client/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log(`Pic2Map listening on ${port}`);
module.exports = app; // for testing

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}