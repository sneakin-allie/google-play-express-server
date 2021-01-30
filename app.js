const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

const apps = require('./playstore.js');

app.get('/apps', (req, res) => {
    const { genres = "", sort } = req.query;

    if (sort) {
        if (!['Rating', 'App'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be one of rating or app');
        }
    }

    let results = apps.filter(app => app.Genres.includes(genres));

    if (sort) {
        results
          .sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        });
    }

    res
        .json(results);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});