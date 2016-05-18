(function() {
angular
  .module('PortfolioApp')
  .config(chartState)

  chartState.$inject = ['$stateProvider'];
  function chartState($stateProvider) {
    $stateProvider.state('chart', {
      url: '/',
        templateUrl: '/components/chart/chart.html',
        controller: 'ChartCtrl',
        resolve: {
          spyHistory: spyHistory
          }
        })
    }

    spyHistory.$inject = ['ChartFactory'];
    function spyHistory(ChartFactory) {
      return ChartFactory.getTickerData('SPY');
    }
})();
