'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('OffersCtrl', function ($scope, $rootScope, $location, request, $routeParams, OffersService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    getOffers();

    function getOffers() {
      OffersService.offers().then(function(offers) {

		$scope.offers = offers;

		$scope.viewby = 4;

		$scope.totalItems = $scope.offers.length;

		$scope.currentPage = 1;

		$scope.itemsPerPage = $scope.viewby;

		$scope.maxSize = 5; //Number of pager buttons to show

      });
    };

  });
