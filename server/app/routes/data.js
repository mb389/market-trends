var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Events = mongoose.model('Events');

router.get('/get', (req, res, next) => {
  Events.find({})
  .then(events => res.json(events))
  .catch(next)
})

router.post('/scrape', (req, res, next) => {
  Events.create(req.body)
  .then(events => res.json(events))
  .catch(next)
})
