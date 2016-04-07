'use strict';

describe('Service: UserService', function () {

  var aUser;
  var aUserList = [];
  // load the service's module
  beforeEach(module('UserServiceMock'));
  beforeEach(inject(function (_UserService_, _$httpBackend_) {

    aUser = new User(1, 'jonathan@bubbleworks.co.za', 'admin', 1);

    aUserList.push(new User(1, 'jonathan@bubbleworks.co.za', 'admin', 1));
    aUserList.push(new User(1, 'jono@bubbleworks.co.za', 'staff', 2));
    aUserList.push(new User(1, 'jono@gmail.co.za', 'user', 3));
    aUserList.push(new User(1, 'louise@bubbleworks.co.za', 'user', 3));
    aUserList.push(new User(1, 'gareth@bubbleworks.co.za', 'user', 3));
    aUserList.push(new User(1, 'zenna@bubbleworks.co.za', 'user', 3));
    aUserList.push(new User(1, 'lisa@bubbleworks.co.za', 'user', 3));
    
    UserService = _UserService_;
    $httpBackend = _$httpBackend_;

  }));

  var UserService, $httpBackend;

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
      console.log(JSON.stringify(principal));
    });

    $httpBackend.flush();

  });

  it('should return a list of users', function() {

    var userList;

    $httpBackend.expectGET('/auth/users').respond(aUserList);

    UserService.users().then(function(users){
      userList = users;
    });

    $httpBackend.flush();
    expect(userList).toBe([]);

  });


});
