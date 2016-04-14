'use strict';

angular.module('familyCarsApp').
factory('ServiceInterceptor', function($q, $injector){

	var service = {

		// optional method
	    'request': function(config) {
	      // do something on success
	      return config;
	    },

	    // optional method
	   'requestError': function(rejection) {
	      // do something on error
	      if (canRecover(rejection)) {
	        return responseOrNewPromise
	      }
	      return $q.reject(rejection);
	    },



	    // optional method
	    'response': function(response) {
	      // do something on success
	      return response;
	    },

	    // optional method
	   'responseError': function(rejection) {
	      // do something on error
	      // if (canRecover(rejection)) {
	      //   return responseOrNewPromise
	      // }

	      $injector.invoke(function($uibModal) {
            $uibModal.open({
              templateUrl: '/common/views/dialogs/error-dialog.html',
              controller: 'ErrorDialogController',
              resolve: {
                error: function() {
                  
                  console.log('REJECTION' + JSON.stringify(rejection));

                  return rejection.data;
                }
              }
            });
          });

	      return $q.reject(rejection);
	    }

	};
	return service;

});