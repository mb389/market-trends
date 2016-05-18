var http = require('http');
var cheerio = require('cheerio');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var STATUS_CODES = http.STATUS_CODES;

function Scraper (data) {
    this.url = data[0];
    this.year = data[1];
    this.month = data[2];
    this.init();
}

util.inherits(Scraper, EventEmitter);

Scraper.prototype.init = function () {
    var model;
    var self = this;
    self.on('loaded', function (html) {
        model = self.parsePage(html);
        self.emit('complete', model);
    });
    self.loadWebPage();
};

Scraper.prototype.loadWebPage = function () {
  var self = this;
  console.log('\n\nLoading ' );
  http.get(self.url, function (res) {
    var body = '';
    if(res.statusCode !== 200) {
      return self.emit('error', STATUS_CODES[res.statusCode]);
    }
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function () {
      self.emit('loaded', body);
    });
  })
  .on('error', function (err) {
    self.emit('error', err);
  });
};

Scraper.prototype.parsePage = function (html) {
  var $ = cheerio.load(html);
  var dates=[],navDates=[];
  var events = [];
  var year=this.year;
  var month=this.month;

  $('tr#day-row td.calnavday').each(function(i,el) { //dates from calendar nav
      dates.push({year: Number(year),month: Number(month),day: Number($(el).text())})
    });

  $('td.navwkday').each(function(i,el) { //dates from calendar headings
      navDates.push(Number($(el).text().replace(/[^0-9]/g, '')))
    });

    var k=0;
    while (navDates[k] > 22 && dates[k].day < 7) { //reconciling date arrays
      dates.splice(k,0,{year: month==1 ? Number(year)-1 : Number(year), month: month==1 ? 12 : month-1, day: navDates[k]})
      k++;
    }
    console.log(dates[dates.length-1])

    $('td.events').has('.econoevents').each(function(i,el) {

      var data=[];
        $(el).children().each(function(j,el2) {
          if ($(el2).text() !== "") {
            var event={};
            var eventText=$(el2).children().text();
            event.name=eventText.substr(eventText.indexOf(':')+1);
            event.country=eventText.substr(0,eventText.indexOf(':'));
            data.push(event);
          }
        })

        if (i%5===0 && dates[i]) {//only storing one day per workweek
          data.sort((a,b) => a.name > b.name ? 1 : -1);
          events.push({event_date: new Date(dates[i].year,dates[i].month-1,dates[i].day),event: data})
        }
    })

    return events.map(function(el,idx) {
        return {event_date: el.event_date, country: el.event[0].country, event_name: el.event[0].name}
    })
};
module.exports = Scraper;
