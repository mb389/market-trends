var mongoose = require('mongoose');
var Events = mongoose.model('Events')
var Scraper = require('./scraper');
var Pages = [];

function generateUrls() {

  var urls = [];
  var datesForUrl = [
    {year: 2014, month: 1},
    {year: 2014, month: 2},
    {year: 2014, month: 3},
    {year: 2014, month: 4},
    {year: 2014, month: 5},
    {year: 2014, month: 6},
    {year: 2014, month: 7},
    {year: 2014, month: 8},
    {year: 2014, month: 9},
    {year: 2014, month: 10},
    {year: 2014, month: 11},
    {year: 2014, month: 12},
    {year: 2015, month: 1},
    {year: 2015, month: 2},
    {year: 2015, month: 3},
    {year: 2015, month: 4},
    {year: 2015, month: 5},
    {year: 2015, month: 6},
    {year: 2015, month: 7},
    {year: 2015, month: 8},
    {year: 2015, month: 9},
    {year: 2015, month: 10},
    {year: 2015, month: 11},
    {year: 2015, month: 12},
    {year: 2016, month: 1},
    {year: 2016, month: 2},
    {year: 2016, month: 3},
    {year: 2016, month: 4},
    {year: 2016, month: 5}
  ]
  datesForUrl.forEach(el => {
    urls.push([`http://global-premium.econoday.com/bymonth.asp?day=1&month=${el.month}&year=${el.year}&cust=global-premium&lid=0`,el.year,el.month]);
  })


  return urls;

}

// store all urls in a global variable
Pages = generateUrls();

function wizard() {
  // if the Pages array is empty, we are Done!!
  if (!Pages.length) {
    return console.log('Done!');
  }
  var nextUrl = Pages.pop();
  var scraper = new Scraper(nextUrl);
  var model;
  console.log('Requests Left: ' + Pages.length);


  // if error, go to next request
  scraper.on('error', function (error) {
    console.log(error);
    wizard();
  });

//store in DB once complete
  scraper.on('complete', function (listing) {

    listing.forEach(function(el) {
      model = new Events(el);
      model.save(function(err) {
        if (err) {
          console.log('Database err saving: ' + nextUrl[0]);
        }
      });
    })

    wizard();
  });
}

module.exports=wizard;
