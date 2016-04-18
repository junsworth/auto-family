'use strict';

angular.module('familyCarsApp').
factory('UtilityService', function(){

	var service = {

		formatDateTime: function(date) {
			return moment(date).format('DD/MM/YYYY, h:mm:ss a');
		},
		formatDate: function(date) {
			return moment(date).format('DD/MM/YYYY');
		}

	};
	return service;

});