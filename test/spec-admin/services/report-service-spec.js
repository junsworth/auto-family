'use strict'

describe('Service: ReportService', function() {

  var $httpBackend, ReportService;
  
	// load the service's module
  beforeEach(module('familyCarsApp'));
  beforeEach(inject(function (_ReportService_, _$httpBackend_) {

    ReportService = _ReportService_;
    $httpBackend = _$httpBackend_;

    // place here mocked dependencies
    
  }));

  it('should get sale', function(){

  });

  it('it should get a sales total', function() {

		var result;

		$httpBackend.expectGET('/report/sales/total').respond(23500);

		ReportService.getSalesTotal().then(function(total){
			result = sales;
		});

		$httpBackend.flush();

		expect(result).toEqual(23500);

	});

});