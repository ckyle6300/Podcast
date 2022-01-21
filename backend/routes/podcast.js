const express = require('express');
const PodcastIndexClient = require('podcastdx-client');
const fetch = require('node-fetch');

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
  const episodes = await client.episodesByFeedId(podcastId, { max: 1000 });
  res.json({ podcast, episodes });
});

router.post('/chapters', async (req, res) => {
  const chapterUrl = req.body.chapterUrl;
  if (chapterUrl) {
    const data = await fetch(chapterUrl);
    const chap = await data.json();
    return res.send(chap.chapters);
  }
  return res.json([]);
});

module.exports = router;
