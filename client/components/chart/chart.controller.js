(function() {
angular
  .module('PortfolioApp')
  .controller('ChartCtrl', ChartCtrl)

  ChartCtrl.$inject = ["$scope","ChartFactory","spyHistory"];
  function ChartCtrl($scope,ChartFactory,spyHistory) {

    $scope.spyHistory=spyHistory;
    $scope.scrape=scrape;

    activate();

    function activate() {
      return ChartFactory.getEventData()
      .then(res => loadEventDataIntoChart(res))
    }

    function scrape() {
      clearEventDataFromChart()
      ChartFactory.scrapeData()
      .then(()=> activate())
    }

    function loadEventDataIntoChart(eventData) {
      //loading DB events into chart data
      eventData.forEach(el => {
        $scope.chartConfig.series[1].data.push({x: Date.parse(el.event_date), text:el.event_name, title: el.country})
      })
    }

    function clearEventDataFromChart() {
      if ($scope.chartConfig.series[1].data.length)
        $scope.chartConfig.series[1].data=[];
    }

    $scope.chartConfig = {
       options: {
           chart: { zoomType: 'x' },
           rangeSelector: { enabled: true },
           navigator: { enabled: true }
       },
       series: [ {
         id: 'spy',
         name: 'SPY',
         data: $scope.spyHistory
       },{
         type: 'flags',
         id: 'events',
         name: 'Events',
         color: '#333333',
         fillColor: 'rgba(255,255,255,0.8)',
         data: [],
         onSeries: 'spy',
         showInLegend: false
       }],
       xAxis: { title: { text: "Date" } },
       yAxis: { title: { text: "Price" } },
       title: { text: 'S&P 500 Prices and Economic Announcements' },
       useHighStocks: true,
       loading: false
     }
  }
})();
