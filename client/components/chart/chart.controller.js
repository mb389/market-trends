(function() {
angular
  .module('PortfolioApp')
  .controller('ChartCtrl', ChartCtrl)

  function ChartCtrl($scope,ChartFactory,spyHistory) {

    $scope.spyHistory=spyHistory;

    activate();

    function activate() {
      return ChartFactory.getEventData()
      .then(res => loadEventDataIntoChart(res))
    }

    $scope.scrape = function() {
      clearEventDataFromChart()
      ChartFactory.scrapeData()
      .then(()=> activate())
    }

    $scope.chartConfig = {
           options: {
               chart: { zoomType: 'x' },
               rangeSelector: { enabled: true },
               navigator: { enabled: true }
           },
           series: [ {id: 'spy', name: 'SPY', data: $scope.spyHistory} ],
           xAxis: { title: { text: "Date" } },
           yAxis: { title: { text: "Price" } },
           title: { text: 'S&P 500 Prices and Economic Announcements' },
           useHighStocks: true,
           loading: false
       }

        // Add flags
        $scope.chartConfig.series.push({
            type: 'flags',
            id: 'events',
            name: 'Events',
            color: '#333333',
            fillColor: 'rgba(255,255,255,0.8)',
            data: [],
            onSeries: 'spy',
            showInLegend: false
        });

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
    }
})();
