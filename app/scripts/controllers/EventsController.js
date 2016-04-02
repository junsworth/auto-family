'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('EventsCtrl', function ($scope, $rootScope, $location, request, $routeParams, EventService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    getEvents();

    function getEvents() {
      EventService.events().then(function(events) {

		$scope.events = events;

		$scope.viewby = 4;

		$scope.totalItems = $scope.events.length;

		$scope.currentPage = 1;

		$scope.itemsPerPage = $scope.viewby;

		$scope.maxSize = 5; //Number of pager buttons to show

      });
    };

  });
