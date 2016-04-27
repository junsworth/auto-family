var path = require('path');

describe('Auto Family Add BMW Car', function(){

  	var navBtn = element(by.id('Cars'));
  	var addBtn = element(by.id('addBtn'));
  	var submitBtn = element(by.id('submitBtn'));

  	var select = element(by.model('modelSelect'));
  	var supplierSelect = element(by.model('supplierSelect'));
  	var editGalleryButton = element(by.id('editGallery'));

  	var uploadImageBtn = element(by.id('uploadBtn'));

	var header = ' BMW 3 SERIES 1.9 318Ci 2dr';
	var subHeader = '2013 Saloon 36,910 miles Manual 2.0L Diesel ';
	var description = 'Leather Seats, Bluetooth, Parking Sensors, Alloy Wheels, Air Conditioning. 5 seats, White, your next car\'s already waiting for you at CarShop. And as the UK\'s leading used car supermarket, our customers can be confident they\'re buying a quality car at the most competitive price. We\'re so sure we\'re the best that we offer Price Match Promise, 7-Day Money-Back Guarantee and a 3-Month Guarantee. Don\'t just take our word for it though, we\'ve been given a 5* rating on Feefo by thousands of happy customers. So, get in touch today or visit one of our 5 stores nationwide!, Open 7 Days, Mon-Fri 9am - 9pm, Sat 9am - 7pm and Sun 10.30am - 5pm, £15,000';

	it('should add a car', function(){

		var fileToUploadOne = '../../../stock/bmw/series3/black/bmw_black.jpeg',
		absolutePathOne = path.resolve(__dirname, fileToUploadOne);
		var fileToUploadTwo = '../../../stock/bmw/series3/black/bmw_black2.jpeg',
		absolutePathTwo = path.resolve(__dirname, fileToUploadTwo);
		var fileToUploadThree = '../../../stock/bmw/series3/black/bmw_black3.jpeg',
		absolutePathThree = path.resolve(__dirname, fileToUploadThree);
		var fileToUploadFour = '../../../stock/bmw/series3/black/bmw_black4.jpeg',
		absolutePathFour = path.resolve(__dirname, fileToUploadFour);
		var fileToUploadFive = '../../../stock/bmw/series3/black/bmw_black5.jpeg',
		absolutePathFive = path.resolve(__dirname, fileToUploadFive);
		var fileToUploadSix = '../../../stock/bmw/series3/black/bmw_black6.jpeg',
		absolutePathSix = path.resolve(__dirname, fileToUploadSix);
		var fileToUploadSeven = '../../../stock/bmw/series3/white/bmw_white7.jpeg',
		absolutePathSeven = path.resolve(__dirname, fileToUploadSeven);
		var fileToUploadEight = '../../../stock/bmw/series3/white/bmw_white8.jpeg',
		absolutePathEight = path.resolve(__dirname, fileToUploadEight);

		// var fileToUploadOne = '../../../stock/bmw/series3/white/bmw_white.jpeg',
		// absolutePathOne = path.resolve(__dirname, fileToUploadOne);
		// var fileToUploadTwo = '../../../stock/bmw/series3/white/bmw_white2.jpeg',
		// absolutePathTwo = path.resolve(__dirname, fileToUploadTwo);
		// var fileToUploadThree = '../../../stock/bmw/series3/white/bmw_white3.jpeg',
		// absolutePathThree = path.resolve(__dirname, fileToUploadThree);
		// var fileToUploadFour = '../../../stock/bmw/series3/white/bmw_white4.jpeg',
		// absolutePathFour = path.resolve(__dirname, fileToUploadFour);
		// var fileToUploadFive = '../../../stock/bmw/series3/white/bmw_white5.jpeg',
		// absolutePathFive = path.resolve(__dirname, fileToUploadFive);
		// var fileToUploadSix = '../../../stock/bmw/series3/white/bmw_white6.jpeg',
		// absolutePathSix = path.resolve(__dirname, fileToUploadSix);
		// var fileToUploadSeven = '../../../stock/bmw/series3/white/bmw_white7.jpeg',
		// absolutePathSeven = path.resolve(__dirname, fileToUploadSeven);
		// var fileToUploadEight = '../../../stock/bmw/series3/white/bmw_white8.jpeg',
		// absolutePathEight = path.resolve(__dirname, fileToUploadEight);

		
		// click cars nav button
		navBtn.click();
		// get current url and confirm it's the expected url
		browser.getLocationAbsUrl().then(function(url) {
			expect(url).toEqual('/cars');
		});
		// click add car button
		addBtn.click();
		// get current url and confirm it's the expected url
		browser.getLocationAbsUrl().then(function(url) {
			expect(url).toEqual('/addcar');
		});
		
		// click edit image gallery
		editGalleryButton.click();
		$('input[type="file"]').sendKeys(absolutePathOne);
		browser.sleep(2000);
		$('input[type="file"]').sendKeys(absolutePathTwo); 
		browser.sleep(2000);   
		$('input[type="file"]').sendKeys(absolutePathThree); 
		browser.sleep(2000);   
		$('input[type="file"]').sendKeys(absolutePathFour);
		browser.sleep(2000);
		$('input[type="file"]').sendKeys(absolutePathFive);
		browser.sleep(2000);
		$('input[type="file"]').sendKeys(absolutePathSix);
		browser.sleep(2000);
		$('input[type="file"]').sendKeys(absolutePathSeven);
		browser.sleep(2000);
		$('input[type="file"]').sendKeys(absolutePathEight);
		browser.sleep(2000);

  		//$('#uploadBtn').click();
  		browser.sleep(1000);
  		editGalleryButton.click();
		// uploadImageBtn.click();

		element(by.cssContainingText('option', 'BMW')).click();
		//select.$('[label="A3"]').click();
		element(by.cssContainingText('option', '3 SERIES')).click();
		
		// send values to form model elements
		element(by.model('header')).sendKeys(header);
		element(by.model('subHeader')).sendKeys(subHeader);
		element(by.model('description')).sendKeys(description);
		element(by.model('mileage')).sendKeys('45789');
		element(by.model('year')).sendKeys('2008');
		element(by.model('purchasePrice')).sendKeys('23589');
		element(by.model('salePrice')).sendKeys('28795');
		supplierSelect.$('[label="Hennie Motors"]').click();

		// click submit form
		submitBtn.click();
		// get current url and confirm it's the expected url
		browser.getLocationAbsUrl().then(function(url) {
			expect(url).toEqual('/cars');
		});

	});

});
