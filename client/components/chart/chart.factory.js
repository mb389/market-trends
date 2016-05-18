(function() {
angular
  .module('PortfolioApp')
  .factory('ChartFactory',ChartFactory)

  function ChartFactory($http) {

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
      .then(res => {
        if(res.data.length!==0) return res.data;
        else {
          return this.scrapeData()
          .then(() => this.getEventData())
        }
      })
    }

  return obj;
}
})();
