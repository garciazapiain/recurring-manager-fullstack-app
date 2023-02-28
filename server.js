const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// An API endpoint that returns a greeting
app.get('/api/greeting', (req, res) => {
  res.send('Hello from the server!');
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);

app.use(express.static(path.join(__dirname, 'frontend/build'), { 'Content-Type': 'text/javascript' }));
