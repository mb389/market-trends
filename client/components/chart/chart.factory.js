app.factory('ChartFactory',function($http) {

  var obj={};

  obj.getTickerData = function(ticker) {
      return $http.get(`/data/history/${ticker}`)
      .then(res => res.data);
  }

  obj.scrapeData = function() {
    return $http.post(`/data/scrape/`)
    .then(res => res)
  }

  obj.getEventData = function() {
      return $http.get(`/data/get/`)
      .then(res => res.data)
    }

  return obj;
})
