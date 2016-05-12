app.factory('ChartFactory',function($http) {

  var obj={};

  obj.getTickerData = function(ticker) {
      return $http.get(`/data/history/${ticker}`)
      .then(res => res.data);
  }

  return obj;
})
