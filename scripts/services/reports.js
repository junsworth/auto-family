'use strict';

angular.module('familyCarsApp').
factory('ReportService', function(request){

	var service = {
		getSalesTotal: function() {
			var promise = request.get('/report/sales/total')
			.then(function(total) {
	      		return total;
	    	});
	    	return promise;
		},
		getPurchaseTotal: function() {
			var promise = request.get('/report/purchases/total')
			.then(function(total) {
	      		return total;
	    	});
	    	return promise;
		}
	};

	return service;

});