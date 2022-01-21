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
  const { search } = req.body;
  const podcast = await client.search(search);
  res.json(podcast);
});

router.get('/:podcastId', async (req, res) => {
  const podcastId = req.params.podcastId;
  const podcast = await client.podcastById(podcastId);
  res.json(podcast);
});

module.exports = router;
