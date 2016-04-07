'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('familyCarsApp'));

  var LoginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
      // place here mocked dependencies
      
    });
  }));

  it('should attach empty email and password to the scope', function () {
    expect(scope.email).toEqual('');
    expect(scope.password).toEqual('');
  });
});
