const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

const allowedOrigins = [
    'http://localhost:4200',
    'http://localhost:3000',
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/questions', require('./routes/questions'));

const db = process.env.DB_ACCESS;

mongoose.connect(db)
    .then(() => console.log('Connected!'))
    .catch((error) => console.error(error));

app.use((req, res, next) => {
    const apiKey = req.headers['apikey'];
    if (apiKey === process.env.API_KEY) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
});

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid token');
    }
});

module.exports = app