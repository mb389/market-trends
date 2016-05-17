// var request = require("request");
// var cheerio = require("cheerio");
//
// var day="1";
// var month="1";
// var year="2015";
// var monthlyUrl = "http://global-premium.econoday.com/bymonth.asp?day="+day+"&month="+month+"&year="+year+"&cust=global-premium&lid=0";
// var weeklyUrl = "http://global-premium.econoday.com/byweek.asp?day="+day+"&month="+month+"&year="+year+"&cust=global-premium&lid=0";
//
// module.exports=request(monthlyUrl, function (error, response, body) {
//   if (!error) {
//     var $ = cheerio.load(body);
//     var dates=[],navDates=[];
//     var events = [];
//
//     $('tr#day-row td.calnavday').each(function(i,el) { //dates from calendar nav
//         dates.push({year: Number(year),month: Number(month),day: Number($(el).text())})
//       });
//
//       $('td.navwkday').each(function(i,el) { //dates from calendar headings
//           navDates.push(Number($(el).text().replace(/[^0-9]/g, '')))
//         });
//
//         var k=0;
//         while (navDates[k] > 22 && dates[k].day < 7) { //reconciling date arrays
//
//           dates.splice(k,0,{year: month==1 ? Number(year)-1 : Number(year), month: month==1 ? 12 : month-1, day: navDates[k]})
//           k++;
//         }
//
//       $('td.events').has('.econoevents').each(function(i,el) {
//           var data=[];
//           $(el).children().each(function(j,el2) {
//             if ($(el2).text() !== "")
//               data.push($(el2).children().text())
//           })
//
//           events.push({date: new Date(dates[i].year,dates[i].month-1,dates[i].day),data })
//
//       })
//       console.log("inside scraper")
//       return events;
//     // console.log(dates,dates2,dates.length,events.length);
//   } else {
//     console.log("We’ve encountered an error: " + error);
//   }
// });
