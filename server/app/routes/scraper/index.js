var mongoose = require('mongoose');
var Events = mongoose.model('Events')
var Scraper = require('./scraper');
var Pages = [];

function generateUrls(currentYear,currentMonth) {

  var datesForUrl = [];
  var numMonths=(currentYear-2015)*12+currentMonth;

  for (var x=1; x<=numMonths; x++) {
  	datesForUrl.push({year: 2015 + Math.floor((x-1)/12), month: x%12===0 ? 12 : x%12})
  }

  return datesForUrl.map(el => {
    return [`http://global-premium.econoday.com/bymonth.asp?day=1&month=${el.month}&year=${el.year}&cust=global-premium&lid=0`,el.year,el.month]
  })
}

var runScraper = function() {
  var currentDate = new Date();
  Pages = generateUrls(currentDate.getFullYear(),currentDate.getMonth()+1);
  var completeCount=0;
  var totalCount=Pages.length;
  var p = new Promise(function(resolve,reject){
    while(Pages.length) {
      var nextUrl = Pages.pop();
      var scraper = new Scraper(nextUrl);
      var model;
      console.log('Requests Left: ' + Pages.length);

      // if error, go to next request
      scraper.on('error', function (error) {
        console.log(error);
        completeCount++;
      });

    //store in DB once complete
      scraper.on('complete', function (listing) {
        listing.forEach(function(el) {
          model = new Events(el);
          model.save(function(err) {
            if (err)
              console.log('Database err saving: ' + nextUrl[0]);
          });
        })
        completeCount++;
        if (completeCount===totalCount) {
          console.log("Done!")
          resolve('success')
        }
      });
    }
  })
  return p;
}

module.exports=runScraper;
