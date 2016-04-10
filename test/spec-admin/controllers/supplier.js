'use strict';

describe('Controller: SupplierCtrl', function () {

  var aSupplier;
  var aSupplierList = [];
  var SupplierService, $httpBackend;

  // load the controller's module
  beforeEach(module('familyCarsApp'));

  var SupplierManagerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    SupplierManagerCtrl = $controller('SupplierManagerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of suppliers to the scope', function () {
    
  });

});
