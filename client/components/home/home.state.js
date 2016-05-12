app.config(function ($stateProvider) {

  $stateProvider.state('home', {
    url: '/',
      templateUrl: '/components/home/home.html',
      controller: 'HomeCtrl',
      resolve: {
        spyHistory: function(ChartFactory) {
          return ChartFactory.getTickerData('SPY');
        }
      }
  });

});
