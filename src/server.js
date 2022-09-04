const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DIST_DIR = 'dist';

app.use(express.static(DIST_DIR));

app.get(/(.*?)/, (req, res) => {
    res.sendFile(path.join(__dirname, '../', DIST_DIR + '/index.html'));
});

app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`);
});
