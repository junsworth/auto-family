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

  it('it should get a sales total', function() {

    var total = '65400';
		var result;

		$httpBackend.expectGET('/report/sales/total')
    .respond(total);

		ReportService.getSalesTotal()
    .then(function(total){
			result = total;
		});

		$httpBackend.flush();

		expect(result).toEqual(total);

	});

    it('it should get a sales total', function() {

    var total = '65400';
    var result;

    $httpBackend.expectGET('/report/purchases/total')
    .respond(total);

    ReportService.getPurchaseTotal()
    .then(function(total){
      result = total;
    });

    $httpBackend.flush();

    expect(result).toEqual(total);

  });

});