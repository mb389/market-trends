app.controller('HomeCtrl', function ($scope,ChartFactory,spyHistory) {

$scope.spyHistory=spyHistory;

console.log($scope.spyHistory)

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
           text: 'S&P 500 Historical Closing Prices'
       },
       useHighStocks: true
   }

    // Add flags
    $scope.chartConfig.series.push({
        type: 'flags',
        name: 'Events',
        color: '#333333',
        fillColor: 'rgba(255,255,255,0.8)',
        data: [
            { x: Date.UTC(2012, 10, 1), text: 'Highsoft won "Entrepeneur of the Year" in Sogn og Fjordane, Norway', title: 'Award' },
            { x: Date.UTC(2012, 11, 25), text: 'Packt Publishing published <em>Learning Highcharts by Example</em>. Since then, many other books are written about Highcharts.', title: 'First book' },
            { x: Date.UTC(2013, 4, 25), text: 'Highsoft nominated Norway\'s Startup of the Year', title: 'Award' },
            { x: Date.UTC(2014, 4, 25), text: 'Highsoft nominated Best Startup in Nordic Startup Awards', title: 'Award' }
        ],
        onSeries: 'spy',
        showInLegend: false
    });




})
