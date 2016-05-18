(function() {
angular
  .module('PortfolioApp')
  .config(Router)

    function Router($urlRouterProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/');
    }
})();
