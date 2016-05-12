window.app = angular.module('PortfolioApp', ['ui.router','ui.bootstrap', 'highcharts-ng']);

app.config(function ($urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
});
