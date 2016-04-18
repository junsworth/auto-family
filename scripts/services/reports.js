'use strict';

angular.module('familyCarsApp').
factory('ReportService', function(request){

	var service = {
		getSalesTotal: function() {
			var promise = request.get('/report/sales/total')
			.then(function(total) {

				console.log('Total Response ' + total);
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
		},
		getSalesByAgent: function(id) {
			var promise = request.get('/report/salesByAgent/:id', {
				id: id
			}).then(function(total) {
	      		return total;
	    	});
	    	return promise;
		}
	};

	return service;

});