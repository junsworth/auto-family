'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('NewsCtrl', function ($scope, $rootScope, $location, request, $routeParams, NewsService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    getNews();

    function getNews() {
      NewsService.articles().then(function(news) {

		$scope.news = news;

		$scope.viewby = 4;

		$scope.totalItems = $scope.news.length;

		$scope.currentPage = 1;

		$scope.itemsPerPage = $scope.viewby;

		$scope.maxSize = 5; //Number of pager buttons to show

      });
    };
  });
