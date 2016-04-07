angular.module('UserServiceMock', [])
  .provider('UserService', function() {
    this.$get = function() {
      return {
        syncCall: function() {},
        asyncCall: function() {}
      };
    };
  });