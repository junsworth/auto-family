'use strict';

describe('Service Unit Test: UserService', function () {

  var aUser;
  var aUserList = [];
  // load the service's module
  beforeEach(module('familyCarsApp'));
  beforeEach(inject(function (_UserService_, _$httpBackend_) {

    UserService = _UserService_;
    $httpBackend = _$httpBackend_;

    // place here mocked dependencies
    aUser = new User(1, 'jonathan@bubbleworks.co.za', 'admin', 5);

    aUserList.push(new User(1, 'jonathan@bubbleworks.co.za', 'admin', 1));
    aUserList.push(new User(1, 'jono@bubbleworks.co.za', 'staff', 2));
    aUserList.push(new User(1, 'jono@gmail.co.za', 'user', 3));
    aUserList.push(new User(1, 'louise@bubbleworks.co.za', 'user', 3));
    aUserList.push(new User(1, 'gareth@bubbleworks.co.za', 'user', 3));
    aUserList.push(new User(1, 'zenna@bubbleworks.co.za', 'user', 3));
    aUserList.push(new User(1, 'lisa@bubbleworks.co.za', 'user', 3));
    
  }));

  var UserService, $httpBackend;

  it('should have UserService be defined', function(){
    expect(UserService).toBeDefined();
  });

  it('should login in user', function () {
    
    var principal;

    $httpBackend
    .expectPOST('/auth/login', {
      email: aUser.email,
      password: aUser.password
    })
    .respond(aUser);
    
    UserService.login(aUser.email, aUser.password).
    then(function(user){
      principal = user;
    });

    $httpBackend.flush();

    expect(principal).toEqual(aUser);

  });

  it('should create a new user', function (){
    var principal;

    expect(aUser.UserTypeId > 0).toBeTruthy();
    expect(aUser.UserTypeId).toBeLessThan(4);

    $httpBackend
    .expectPOST('/auth/add', {
      email: aUser.email,
      password: aUser.password,
      UserTypeId: aUser.UserTypeId
    })
    .respond(aUser);

    UserService.create(aUser.email, aUser.password, aUser.UserTypeId)
    .then(function(user){
      principal = user;
    });

    $httpBackend.flush();

    expect(principal).toEqual(aUser);

  });

  it('should return a list of users', function() {

    var userList;

    $httpBackend.expectGET('/auth/users').respond(aUserList);

    UserService.users().then(function(users){
      userList = users;
    });

    $httpBackend.flush();

    expect(userList).toEqual(aUserList);

  });

  it('should return user by id', function() {
    
    var result;
    
    $httpBackend.expectGET('/users/get/' + aUser.id).respond(aUser);

    UserService.user(aUser.id).then(function(user){
      result = user;
    });

    $httpBackend.flush();
    
    expect(result).toEqual(aUser);

  });

  it('it should update a user', function(){
    
    var result;
    var userToUpdate = new User(1, 'jonathan@bubbleworks.co.za', '654321', 'Walmer, 6756', 1);

    $httpBackend.expectPUT('/users/update/' + userToUpdate.id, userToUpdate).respond(200);

    UserService.update(userToUpdate).then(function(status){
      result = status;
    });

    $httpBackend.flush();

    expect(result).toEqual(200);

  });

  it('it should delete a user', function(){

    var result;
    
    $httpBackend.expectDELETE('/users/delete/' + 1).respond(200);

    UserService.delete(aUser.id).then(function(status){
      result = status;
    });

    $httpBackend.flush();
    
    expect(result).toEqual(200);
  });


});
