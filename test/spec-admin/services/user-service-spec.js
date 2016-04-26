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

  it('should have UserService defined', function(){
    expect(UserService).toBeDefined();
    expect(ServiceInterceptor).toBeDefined();
  });

  it('should have a handler for responseError', function () {
    expect(angular.isFunction(ServiceInterceptor.responseError)).toBe(true);
  });

  it('it should update a user with 500 response', function(){
    
    var result;
    var response = { status: 500, config: {} };
    var user = new User(-1, 'jonathan@bubbleworks.co.za', '654321', 'Walmer, 6756', 1);

    $httpBackend.expectPUT('/users/update/' + user.id, user).respond(response.status);

    UserService.update(user).then(function(status){
      result = status;
    });

    var promise = ServiceInterceptor.responseError(response);

    $httpBackend.expectGET('/common/views/dialogs/error-dialog.html').respond('');

    $httpBackend.flush();

    expect(result).toBeUndefined();

  });

  it('should login in user', function () {
    
    var principal;
    var user = new User(1, 'jonathan@bubbleworks.co.za', 'admin', 1);

    $httpBackend
    .expectPOST('/auth/login', {
      email: user.email,
      password: user.password
    })
    .respond(user);
    
    UserService.login(user.email, user.password).
    then(function(user){
      principal = user;
    });

    $httpBackend.flush();

    expect(principal).toBeDefined();
    expect(principal).toEqual(user);

  });

  it('should create a new user', function (){
    var principal;

    var user = new User(2, 'jono@gmail.co.za', 'password', 2);

    expect(user.UserTypeId > 0).toBeTruthy();
    expect(user.UserTypeId).toBeLessThan(4);

    $httpBackend
    .expectPOST('/auth/add', {
      email: user.email,
      password: user.password,
      UserTypeId: user.UserTypeId
    })
    .respond(user);

    UserService.create(user.email, user.password, user.UserTypeId)
    .then(function(user){
      principal = user;
    });

    $httpBackend.flush();

    expect(principal).toBeDefined();
    expect(principal).toEqual(user);

  });

  it('should return a list of users', function() {

    var userList;
    var aUserList = [];

    aUserList.push(new User(1, 'jonathan@bubbleworks.co.za', 'admin', 1));
    aUserList.push(new User(1, 'jono@bubbleworks.co.za', 'staff', 2));
    aUserList.push(new User(1, 'jono@gmail.co.za', 'user', 3));
    aUserList.push(new User(1, 'louise@bubbleworks.co.za', 'user', 3));
    aUserList.push(new User(1, 'gareth@bubbleworks.co.za', 'user', 3));
    aUserList.push(new User(1, 'zenna@bubbleworks.co.za', 'user', 3));
    aUserList.push(new User(1, 'lisa@bubbleworks.co.za', 'user', 3));

    $httpBackend.expectGET('/auth/users').respond(aUserList);

    UserService.users().then(function(users){
      userList = users;
    });

    $httpBackend.flush();

    expect(userList).toBeDefined();
    expect(userList).toEqual(aUserList);
    expect(userList.length).toBe(aUserList.length);

  });

  it('should return user by id', function() {
    
    var result;

    var user = new User(2, 'jono@gmail.co.za', 'password', 2);
    
    $httpBackend.expectGET('/users/get/' + user.id).respond(user);

    UserService.user(user.id).then(function(user){
      result = user;
    });

    $httpBackend.flush();
    
    expect(result).toEqual(user);

  });

  it('it should update a user', function() {

    var result;
    var user = new User(3, 'jonathan@bubbleworks.co.za', '654321', 'Walmer, 6756', 1);

    $httpBackend.expectPUT('/users/update/' + user.id, user).respond(200);

    UserService.update(user).then(function(status){
      result = status;
    });

    $httpBackend.flush();

    expect(result).toEqual(200);
    
  });

  it('it should delete a user', function(){

    var id = 2;
    var result;
    
    $httpBackend.expectDELETE('/users/delete/' + id).respond(200);

    UserService.delete(id).then(function(status){
      result = status;
    });

    $httpBackend.flush();
    
    expect(result).toEqual(200);
  });

//var rejection = {"status":401,"config":{"method":"PUT","transformRequest":[null],"transformResponse":[null],"id":-1,"url":"/users/update/-1","data":{"email":"jonathan@bubbleworks.co.za","password":"654321","UserTypeId":"Walmer, 6756"},"headers":{"Accept":"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"}},"statusText":""};

  //  var rejection = 'REJECTION{"status":500,"config":{"method":"PUT","transformRequest":[null],"transformResponse":[null],"id":-1,"url":"/users/update/-1","data":{"email":"jonathan@bubbleworks.co.za","password":"654321","UserTypeId":"Walmer, 6756"},"headers":{"Accept":"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"}},"statusText":""}';
  
});
