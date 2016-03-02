'use strict';

/**
 * @ngdoc function
 * @name contentManagementGatewayApp.controller:ErrorDialogController
 * @description
 * # ErrorDialogController
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('ErrorDialogController', function($scope, $uibModalInstance, error) {
    $scope.error = error;

    $scope.cancel = function() {
      $uibModalInstance.dismiss('canceled');
    };
  });
