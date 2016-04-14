var path = require('path');

describe('Auto Family staff user add a car', function(){

	var emailToSignIn = 'jono@gmail.com';
  	var passwordToSignIn = 'admin';

  	// sign in form models
	var email = element(by.model('email'));
	var password = element(by.model('password'));

	var navBrand = element(by.id('nav-brand-cms'));
  	var loginButton = element(by.id('loginButton'));
  	var signInNavButton = element(by.id('signin-dropdown'));

  	var navBtn = element(by.id('Cars'));
  	var addBtn = element(by.id('addBtn'));
  	var submitBtn = element(by.id('submitBtn'));

  	var principalEmail = element(by.binding('principal.email'));

  	var select = element(by.model('modelSelect'));
  	var supplierSelect = element(by.model('supplierSelect'));
  	var editGalleryButton = element(by.id('editGallery'));

  	var uploadImageBtn = element(by.id('uploadBtn'));

	beforeEach(function() {
		browser.get('http://10.0.0.12:3000/admin');
	});

	it('should add a car', function(){

		// browser.executeAsyncScript(function(callback) {
		//   // You can use any other selector
		//   document.querySelectorAll('#input-file-element')[0]
		//       .style.display = 'inline';
		//   callback();
		// });

		// var fileToUploadOne = '../../../stock/bmw/series3/black/bmw_black.jpeg',
		// absolutePathOne = path.resolve(__dirname, fileToUploadOne);
		// var fileToUploadTwo = '../../../stock/bmw/series3/black/bmw_black2.jpeg',
		// absolutePathTwo = path.resolve(__dirname, fileToUploadTwo);
		// var fileToUploadThree = '../../../stock/bmw/series3/black/bmw_black3.jpeg',
		// absolutePathThree = path.resolve(__dirname, fileToUploadThree);
		// var fileToUploadFour = '../../../stock/bmw/series3/black/bmw_black4.jpeg',
		// absolutePathFour = path.resolve(__dirname, fileToUploadFour);
		// var fileToUploadFive = '../../../stock/bmw/series3/black/bmw_black5.jpeg',
		// absolutePathFive = path.resolve(__dirname, fileToUploadFive);
		// var fileToUploadSix = '../../../stock/bmw/series3/black/bmw_black6.jpeg',
		// absolutePathSix = path.resolve(__dirname, fileToUploadSix);
		

		var fileToUploadOne = '../../../stock/bmw/series3/white/bmw_white.jpeg',
		absolutePathOne = path.resolve(__dirname, fileToUploadOne);
		var fileToUploadTwo = '../../../stock/bmw/series3/white/bmw_white2.jpeg',
		absolutePathTwo = path.resolve(__dirname, fileToUploadTwo);
		var fileToUploadThree = '../../../stock/bmw/series3/white/bmw_white3.jpeg',
		absolutePathThree = path.resolve(__dirname, fileToUploadThree);
		var fileToUploadFour = '../../../stock/bmw/series3/white/bmw_white4.jpeg',
		absolutePathFour = path.resolve(__dirname, fileToUploadFour);
		var fileToUploadFive = '../../../stock/bmw/series3/white/bmw_white5.jpeg',
		absolutePathFive = path.resolve(__dirname, fileToUploadFive);
		var fileToUploadSix = '../../../stock/bmw/series3/white/bmw_white6.jpeg',
		absolutePathSix = path.resolve(__dirname, fileToUploadSix);
		var fileToUploadSeven = '../../../stock/bmw/series3/white/bmw_white7.jpeg',
		absolutePathSeven = path.resolve(__dirname, fileToUploadSeven);
		var fileToUploadEight = '../../../stock/bmw/series3/white/bmw_white8.jpeg',
		absolutePathEight = path.resolve(__dirname, fileToUploadEight);

		// click drop button
	    signInNavButton.click();

	    email.sendKeys(emailToSignIn);
	    
	    password.sendKeys(passwordToSignIn);

	    loginButton.click();

	    expect(browser.getTitle()).toEqual('Auto Family Admin');
	    expect(navBrand.getText()).toEqual('Auto Family CMS');

	    expect(principalEmail.getText()).toEqual(emailToSignIn);

		navBtn.click();

		browser.getLocationAbsUrl().then(function(url) {
			expect(url).toEqual('/cars');
		});

		addBtn.click();

		browser.getLocationAbsUrl().then(function(url) {
			expect(url).toEqual('/addcar');
		});

		
		// add image
		editGalleryButton.click();
		$('input[type="file"]').sendKeys(absolutePathOne);
		$('input[type="file"]').sendKeys(absolutePathTwo);    
		$('input[type="file"]').sendKeys(absolutePathThree);    
		$('input[type="file"]').sendKeys(absolutePathFour);
		$('input[type="file"]').sendKeys(absolutePathFive);
		$('input[type="file"]').sendKeys(absolutePathSix);
		$('input[type="file"]').sendKeys(absolutePathSeven);
		$('input[type="file"]').sendKeys(absolutePathEight);

  		//$('#uploadBtn').click();
  		browser.sleep(1000);
  		editGalleryButton.click();
		// uploadImageBtn.click();

		element(by.cssContainingText('option', 'BMW')).click();
		//select.$('[label="A3"]').click();
		element(by.cssContainingText('option', '3 SERIES')).click();

		var header = ' BMW 3 SERIES 1.9 318Ci 2dr';
		var subHeader = '2013 Saloon 36,910 miles Manual 2.0L Diesel ';
		var description = 'Leather Seats, Bluetooth, Parking Sensors, Alloy Wheels, Air Conditioning. 5 seats, White, your next car\'s already waiting for you at CarShop. And as the UK\'s leading used car supermarket, our customers can be confident they\'re buying a quality car at the most competitive price. We\'re so sure we\'re the best that we offer Price Match Promise, 7-Day Money-Back Guarantee and a 3-Month Guarantee. Don\'t just take our word for it though, we\'ve been given a 5* rating on Feefo by thousands of happy customers. So, get in touch today or visit one of our 5 stores nationwide!, Open 7 Days, Mon-Fri 9am - 9pm, Sat 9am - 7pm and Sun 10.30am - 5pm, £15,000';
		
		element(by.model('header')).sendKeys(header);
		element(by.model('subHeader')).sendKeys(subHeader);
		element(by.model('description')).sendKeys(description);
		element(by.model('mileage')).sendKeys('36567');
		element(by.model('year')).sendKeys('2013');
		element(by.model('purchasePrice')).sendKeys('13500');
		element(by.model('salePrice')).sendKeys('15560');
		supplierSelect.$('[label="Hertz Rentals"]').click();

		submitBtn.click();

		browser.getLocationAbsUrl().then(function(url) {
			expect(url).toEqual('/cars');
		});

	});

});