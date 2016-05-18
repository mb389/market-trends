var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var yahooFinance = require('../resources/yahoofinance');
var Events = mongoose.model('Events');
var runScraper = require('../resources/scraper')

router.get('/get', (req, res, next) => {
  Events.find({})
  .sort({event_date: 'asc'})
  .then(events => res.json(events))
  .catch(next)
})

router.get('/history/:ticker', (req, res, next) => {
  yahooFinance.historical({
    symbol: req.params.ticker,
    from: '2015-01-01',
    period: 'w'
    })
  .then(raw => raw.map(el => [Date.parse(el.date),el.close]))
  .then(prices => res.json(prices))
  .catch(next)
})


router.post('/scrape', (req, res, next) => {
  Events.remove({})
  .then(() => runScraper())
  .then(complete => res.send(complete))
  .catch(next)
})
