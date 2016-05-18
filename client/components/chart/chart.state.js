(function() {
angular
  .module('PortfolioApp')
  .config(chartState)

  function chartState($stateProvider) {

  $stateProvider.state('chart', {
    url: '/',
      templateUrl: '/components/chart/chart.html',
      controller: 'ChartCtrl',
      resolve: {
        spyHistory: ChartFactory => ChartFactory.getTickerData('SPY')
        }
      })
  }
})();
