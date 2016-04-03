'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('TestDriveDialogCtrl', function ($scope, $rootScope, request, $location, $uibModalInstance, $routeParams, carId, TestDriveService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.carId = carId;

	$scope.ok = function () {
		$uibModalInstance.close();
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

  $scope.add = function() {

    console.log('CarId - ' + $scope.carId);

    TestDriveService.create(
    $scope.name,
    $scope.email,
    $scope.phone,
    $scope.carId).then(function(testdrive){
      $uibModalInstance.close();
    });

  };

  });
