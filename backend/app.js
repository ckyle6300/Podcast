const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pocastRoutes = require('./routes/podcast');

const app = express();
const port = 5100;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

app.use(function (req, res, next) {
  const period = 60 * 30;

  if (req.method == 'GET') {
    res.set('Cache-control', `public, max-age=${period}`);
  } else {
    res.set('Cache-control', `no-store`);
  }

  next();
});

app.use('/podcast', pocastRoutes);

app.use('/', (req, res, next) => {
  res.status(404).json({ err: '404' });
});

app.listen(process.env.PORT || port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
