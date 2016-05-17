app.controller('HomeCtrl', function ($scope,ChartFactory,spyHistory, eventData) {

$scope.spyHistory=spyHistory;
$scope.eventData=eventData;



$scope.chartConfig = {
       options: {
           chart: {
               zoomType: 'x'
           },
           rangeSelector: {
               enabled: true
           },
           navigator: {
               enabled: true
           }
       },
       series: [{id: 'spy', name: 'SPY', data: $scope.spyHistory}],
       xAxis: {title:{text:"Date"}},
       yAxis: {title:{text:"Price"}},
       title: {
           text: 'S&P 500 Prices and Economic Announcements'
       },
       useHighStocks: true
   }

    // Add flags
    $scope.chartConfig.series.push({
        type: 'flags',
        id: 'events',
        name: 'Events',
        color: '#333333',
        fillColor: 'rgba(255,255,255,0.8)',
        data: [
            { x: Date.UTC(2014, 4, 25), text: 'Highsoft nominated Best Startup in Nordic Startup Awards', title: 'Award' }
        ],
        onSeries: 'spy',
        showInLegend: false
    });


    //loading DB events into chart data
    $scope.eventData.forEach(el => {
      $scope.chartConfig.series[1].data.push({x: Date.parse(el.event_date), text:el.event_name, title: el.country})
    })

console.log($scope.chartConfig.series[1].data)



})
