'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('ConfirmSaleDialogCtrl', function ($scope, $uibModalInstance, car) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.car = car;

    $scope.ok = function () {
      $uibModalInstance.close(true);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  });
