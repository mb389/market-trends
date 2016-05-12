var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var yahooFinance = require('yahoo-finance');
var Events = mongoose.model('Events');

router.get('/get', (req, res, next) => {
  Events.find({})
  .then(events => res.json(events))
  .catch(next)
})

router.get('/history/:ticker', (req, res, next) => {
  yahooFinance.historical({
  symbol: req.params.ticker,
  from: '2012-01-01',
  to: '2016-05-01',
  period: 'w'
  })
  .then(raw => raw.map(el => [Date.parse(el.date),el.close]))
  .then(prices => res.json(prices))
  .catch(next)
})


router.post('/scrape', (req, res, next) => {
  Events.create(req.body)
  .then(events => res.json(events))
  .catch(next)
})
