'use strict';

describe('Controller: LoginCtrl', function () {

  var LoginCtrl, scope, user;
  var $httpBackend;

  // load the controller's module
  beforeEach(module('familyCarsApp'));
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
    
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;

    user = new User(1, 'jono@gmail.co.za', '654321', 2);
    // Get hold of a scope (i.e. the root scope)
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
      // place here mocked dependencies      
    });

  }));

  it('should have empty email and password', function () {
    expect(scope.email).toEqual('');
    expect(scope.password).toEqual('');
  });

  it('should sign in principal user', function() {

    $httpBackend.expectPOST('/auth/login').respond(user);
    
    scope.login();

    $httpBackend.flush();

    expect(scope.principal.email).toEqual(user.email);
    expect(scope.principal.UserTypeId).toBe(1);

  });

});
