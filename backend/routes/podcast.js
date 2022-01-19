const express = require('express');
const PodcastIndexClient = require('podcastdx-client');

const router = express.Router();

const client = new PodcastIndexClient({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET,
  // opt-out of analytics collection
  disableAnalytics: true,
});

router.post('/search', async (req, res) => {
  console.log('hello');
  const { search } = req.body;
  const podcast = await client.search(search);
  res.json(podcast);
});

module.exports = router;
