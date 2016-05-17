app.config(function ($stateProvider) {

  $stateProvider.state('chart', {
    url: '/',
      templateUrl: '/components/chart/chart.html',
      controller: 'ChartCtrl',
      resolve: {
        spyHistory: function(ChartFactory) {
          return ChartFactory.getTickerData('SPY');
        }
      }
  });

});
