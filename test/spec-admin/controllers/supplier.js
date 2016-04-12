'use strict';

describe('Controller: SupplierManagerCtrl', function () {

  var $httpBackend;

  var aSupplier;
  var aSupplierList = [];
  
  var SupplierManagerCtrl, scope;

  // load the controller's module
  beforeEach(module('familyCarsApp'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;

    aSupplier = new Supplier(1, 'Hertz Rentals', '235 Marine Drive', 'Summerstrand, 6001', 'Port Elizabeth', 'info@hertz.co.za', '011 234 6789');

    aSupplierList.push(new Supplier(1, 'Hertz Rentals', '235 Marine Drive', 'Summerstrand, 6001', 'Port Elizabeth', 'info@hertz.co.za', '011 234 6789'));
    aSupplierList.push(new Supplier(2, 'Cheap Rentals', '235 Marine Drive', 'Summerstrand, 6001', 'Port Elizabeth', 'info@hertz.co.za', '011 234 6789'));
    aSupplierList.push(new Supplier(3, 'Expensive Rentals', '235 Marine Drive', 'Summerstrand, 6001', 'Port Elizabeth', 'info@hertz.co.za', '011 234 6789'));
    aSupplierList.push(new Supplier(4, 'Classic Rentals', '235 Marine Drive', 'Summerstrand, 6001', 'Port Elizabeth', 'info@hertz.co.za', '011 234 6789'));

    SupplierManagerCtrl = $controller('SupplierManagerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  afterEach(function() {
    // $httpBackend.verifyNoOutstandingExpectation();
    // $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have empty array list', function () {
    expect(scope.suppliers.length).toBe(0);

  });

  it('should attach a list of suppliers to the scope', function () {

    var userList;

    $httpBackend.whenGET("/suppliers/suppliers").respond(aSupplierList);

    $httpBackend.expectGET('/suppliers/suppliers');

    scope.suppliers();

    $httpBackend.flush();

    expect(scope.suppliers).toEqual(aSupplierList);

  });

  it('should add supplier', function(){
    
    var supplier = new Supplier(3, 'Hertz Rental', '235 Marine Drive', 'Summerstrand, 6001', 'Port Elizabeth', 'info@hertz.co.za', '011 234 6789');
    scope.name = supplier.name;
    scope.address = supplier.address;
    scope.addresstwo = supplier.addresstwo;
    scope.city = supplier.city;
    scope.email = supplier.email;
    scope.phone = supplier.phone;

    // $httpBackend.whenPOST("/suppliers/add").respond(supplier);

    // $httpBackend.expectPOST('/suppliers/add');

    // scope.add();

    // $httpBackend.flush();

  });

});
