(function() {
angular
  .module('PortfolioApp')
  .directive('footer', footer);

  function footer() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'components/footer/footer.html'
      }
  }
})();
