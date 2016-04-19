'use strict';

/**
 * @ngdoc function
 * @name familyCarsApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the familyCarsApp
 */
angular.module('familyCarsApp')
  .controller('SettingsCtrl', function ($scope, $rootScope, UserType, UserService) {
  	$scope.UserType = UserType;

    $scope.id = $rootScope.principal.id;
    $scope.email = $rootScope.principal.email;
    $scope.data = $rootScope.principal.data;

    $scope.oldPassword = '';
    $scope.newPassword = '';

    $scope.style = $scope.data.style;

    $scope.updateSettings = function() {
    	$rootScope.isStyle = $scope.style;
    }

    $scope.submit = function() {
      var saveObj = {};

      $scope.data.style = $scope.style;

      console.log('USER SAVE ' + JSON.stringify(saveObj));

      if($scope.oldPassword.length > 0 && $scope.newPassword.length > 4) {

        saveObj.id = $scope.id;
        saveObj.email = $scope.email;
        saveObj.oldPassword = $scope.oldPassword;
        saveObj.newPassword = $scope.newPassword;
        saveObj.data = JSON.stringify($scope.data);

        UserService.reset(saveObj).then(function(status) {
          addAlert('success', 'Success! reset password.');
        });
        
      } else {

        saveObj.id = $scope.id;
        saveObj.email = $scope.email;
        saveObj.data = JSON.stringify($scope.data);

        UserService.update(saveObj).then(function(status) {
          addAlert('success', 'Success! saved profile.');
          $rootScope.principal.data.style = $scope.data.style;
          $rootScope.isStyle = $rootScope.principal.data.style;
        });
      }
      

    }

    // alerts
    function addAlert(type, message) {
      $scope.alerts = [];
      $scope.alerts.push({type: type, msg: message});
    }

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

  });
