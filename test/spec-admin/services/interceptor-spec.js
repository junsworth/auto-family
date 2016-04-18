'use strict';

describe('Service Unit Test: UserService', function () {

  // load the service's module
  beforeEach(module('familyCarsApp'));
  beforeEach(inject(function (_UserService_, _ServiceInterceptor_, _$httpBackend_) {

    UserService = _UserService_;
    $httpBackend = _$httpBackend_;
    ServiceInterceptor = _ServiceInterceptor_;

    // place here mocked dependencies
    
  }));

  var UserService, $httpBackend, ServiceInterceptor;

  it('should have UserService be defined', function(){
    expect(UserService).toBeDefined();
    expect(ServiceInterceptor).toBeDefined();
  });

  it('should have a handler for responseError', function () {
    expect(angular.isFunction(ServiceInterceptor.responseError)).toBe(true);
  });

  it('it should update a user', function() {
    
    var result;

    var userToUpdate = new User(-1, 'jonathan@bubbleworks.co.za', '654321', 'Walmer, 6756', 1);

    $httpBackend.expectPUT('/users/update/' + userToUpdate.id, userToUpdate).respond(500);

    UserService.update(userToUpdate).then(function(status){
      result = status;
    });

    $httpBackend.expectGET('/common/views/dialogs/error-dialog.html').respond('');

    $httpBackend.flush();

  });

});
