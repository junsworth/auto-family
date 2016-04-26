'use strict';

describe('Controller: ReportsCtrl', function () {

  var $scope = {};
  var ReportsCtrl;
  var $httpBackend;
  
  // load the controller's module
  beforeEach(module('familyCarsApp'));
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$httpBackend_) {
    
    $httpBackend = _$httpBackend_;

    // Get hold of a scope (i.e. the root scope)
    ReportsCtrl = $controller('ReportsCtrl', {
      $scope: $scope
      // place here mocked dependencies      
    });

  }));

  it('should do initialisation', function () {
    expect(ReportsCtrl).toBeDefined();
    expect($scope.reportType).toBeDefined();
    expect($scope.vatP).toEqual(0.14);
    expect($scope.commP).toEqual(0.10);
  });

  it('should do sales report', function() {

    var total = '56789';
    var vat = Math.round((total * $scope.vatP) * 100) / 100;;
    var commission = Math.round((total * $scope.commP) * 100) / 100;
    
    $httpBackend.expectGET('/report/sales/total').respond(total);

    $scope.doSalesReport();

    $httpBackend.flush();

    expect($scope.subTotal).toEqual(total);
    expect($scope.vat).toEqual(vat);
    expect($scope.commission).toEqual(commission);

  });

  it('should retrieve a list of cars', function(){

    var aCarList = [];

    aCarList.push(new Car(1, 'Audi A3', 'Audi A3 1.8L', 'Audi A3 description',
                  '23456', '2011', 12456, 15789, 
                  new Date(), null, null, 7, 3, null));
    aCarList.push(new Car(2, 'Audi A3', 'Audi A3 1.8L', 'Audi A3 description',
                  '23456', '2011', 12456, 15789, 
                  new Date(), null, null, 7, 3, null));
    aCarList.push(new Car(3, 'Audi A3', 'Audi A3 1.8L', 'Audi A3 description',
                  '23456', '2011', 12456, 15789, 
                  new Date(), null, null, 7, 3, null));
    // sold cars
    aCarList.push(new Car(4, 'Audi A3', 'Audi A3 1.8L', 'Audi A3 description',
                  '23456', '2011', 12456, 15789, 
                  new Date(), new Date(), 2, 7, 3, 2));
    aCarList.push(new Car(5, 'Audi A3', 'Audi A3 1.8L', 'Audi A3 description',
                  '23456', '2011', 12456, 15789, 
                  new Date(), new Date(), 2, 7, 3, 2));

    $httpBackend.expectGET('/cars/cars').respond(aCarList);

    $scope.getCars();

    $httpBackend.flush();

    expect($scope.cars).toBeDefined();
    expect($scope.cars).toEqual(aCarList);
    expect($scope.cars.length).toBe(aCarList.length);

  });

  it('should filter sold cars', function(){
    var aCarList = [];

    aCarList.push(new Car(1, 'Audi A3', 'Audi A3 1.8L', 'Audi A3 description',
                  '23456', '2011', 12456, 15789, 
                  new Date(), null, null, 7, 3, null));
    aCarList.push(new Car(2, 'Audi A3', 'Audi A3 1.8L', 'Audi A3 description',
                  '23456', '2011', 12456, 15789, 
                  new Date(), null, null, 7, 3, null));
    aCarList.push(new Car(3, 'Audi A3', 'Audi A3 1.8L', 'Audi A3 description',
                  '23456', '2011', 12456, 15789, 
                  new Date(), null, null, 7, 3, null));
    // sold cars
    aCarList.push(new Car(4, 'Audi A3', 'Audi A3 1.8L', 'Audi A3 description',
                  '23456', '2011', 12456, 15789, 
                  new Date(), new Date(), 2, 7, 3, 2));
    aCarList.push(new Car(5, 'Audi A3', 'Audi A3 1.8L', 'Audi A3 description',
                  '23456', '2011', 12456, 15789, 
                  new Date(), new Date(), 2, 7, 3, 2));

    var filterList = $scope.filterSoldCars(aCarList);

    expect(aCarList.length >= filterList.length).toBeTruthy();
    expect(filterList.length).toBe(2);

  })

  it('should do agent sales report', function(){
    
    var total = '34563';
    var comm = total * $scope.commP;
    var user = new User(2, 'jono@gmail.com', 'password', 2);

    $httpBackend.expectGET('/report/salesByAgent/' + user.id ).respond(total);

    $scope.getSalesForAgent(user);

    $httpBackend.flush();

    expect(user.salesTotal).toBeDefined();
    expect(user.salesTotal).toEqual(total);

    expect(user.commission).toBeDefined();
    expect(user.commission).toEqual(comm);

  });

  it('should filter sales agents', function(){

    var userList = [];
    var userType = 2;


    // mocked user list
    userList.push(new User(1, 'jono@gmail.com', 'password', 2));
    userList.push(new User(2, 'jon@gmail.com', 'password', 3));
    userList.push(new User(3, 'jane@gmail.com', 'password', 3));
    userList.push(new User(4, 'joan@gmail.com', 'password', 2));
    userList.push(new User(5, 'louise@gmail.com', 'password', 3));
    userList.push(new User(6, 'james@gmail.com', 'password', 2));
    userList.push(new User(7, 'jonathan@gmail.com', 'password', 1));
    userList.push(new User(8, 'gareth@gmail.com', 'password', 2));

    expect(userType > 0).toBeTruthy();
    expect(userType).toBeLessThan(4);

    var filteredList = $scope.filterUsersByType(userList, userType);

    expect(userList.length >= filteredList.length).toBeTruthy();
    expect(filteredList.length).toBe(4);

  });

  it('should do purchases report', function() {

    var total = '56789';
    var vat = Math.round((total * $scope.vatP) * 100) / 100;;
    
    $httpBackend.expectGET('/report/purchases/total').respond(total);

    $scope.doPurchasesReport();

    $httpBackend.flush();

    expect($scope.subTotal).toEqual(total);
    expect($scope.vat).toEqual(vat);

  });

  it('should list sales agents', function() {


    // var aUserList = [];

    // aUserList.push(new User(1, 'jono@gmail.com', 'password', 1));
    // aUserList.push(new User(2, 'jon@gmail.com', 'password', 2));
    // aUserList.push(new User(3, 'jane@gmail.com', 'password', 3));
    // aUserList.push(new User(4, 'jono@gmail.com', 'password', 2));
    // aUserList.push(new User(5, 'jono@gmail.com', 'password', 3));
    // aUserList.push(new User(6, 'jonny@gmail.com', 'password', 2));

    // var total = '56789';
    // var vat = Math.round((total * $scope.vatP) * 100) / 100;;
    // var commission = Math.round((total * $scope.commP) * 100) / 100;
    
    // $httpBackend.expectGET('/auth/users').respond(aUserList);

    // $scope.getUsers();

    // $httpBackend.flush();

    // expect($scope.users).toEqual(aUserList);
    // expect($scope.agents).toBeDefined();

    // expect($scope.users.length >= $scope.agents.length).toBeTruthy();
    // expect($scope.agents.length).toBeLessThan($scope.users.length);
    // expect($scope.agents.length).toBe(3);

  });

});
