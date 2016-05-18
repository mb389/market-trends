(function() {
  angular
    .module('PortfolioApp')
    .factory('ChartFactory',ChartFactory)

    ChartFactory.$inject = ['$http'];
    function ChartFactory($http) {

    return {
      getTickerData,
      scrapeData,
      getEventData
    }

    function getTickerData(ticker) {
        return $http.get(`/data/history/${ticker}`)
        .then(res => res.data)
        .catch(err => console.log(err))
    }

    function scrapeData() {
      return $http.post(`/data/scrape/`)
      .then(res => res)
      .catch(err => console.log(err))
    }

    function getEventData() {
      return $http.get(`/data/get/`)
      .then(res => {
        if(res.data.length!==0) return res.data;
        else {
          return this.scrapeData()
          .then(() => this.getEventData())
          .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
    }
  }
})();
