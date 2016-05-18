(function() {
  angular
    .module('PortfolioApp')
    .directive('footer', footer);

    function footer() {
      return {
          templateUrl: 'components/footer/footer.html'
        }
    }
})();
