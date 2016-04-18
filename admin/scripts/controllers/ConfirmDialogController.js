'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('ConfirmDialogCtrl', function ($scope, $uibModalInstance, testDrive) {

    $scope.testDrive = testDrive;

    $scope.ok = function () {
      $uibModalInstance.close(true);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  });
