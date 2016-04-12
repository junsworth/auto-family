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
		browser.get('http://10.0.0.11:3000/admin');
	});

	it('should add a car', function(){

		// browser.executeAsyncScript(function(callback) {
		//   // You can use any other selector
		//   document.querySelectorAll('#input-file-element')[0]
		//       .style.display = 'inline';
		//   callback();
		// });

		// var fileToUploadOne = '../../../stock/audia3/grey/audi_grey.jpeg',
		// absolutePathOne = path.resolve(__dirname, fileToUploadOne);
		// var fileToUploadTwo = '../../../stock/audia3/grey/audi_grey2.jpeg',
		// absolutePathTwo = path.resolve(__dirname, fileToUploadTwo);
		// var fileToUploadThree = '../../../stock/audia3/grey/audi_grey3.jpeg',
		// absolutePathThree = path.resolve(__dirname, fileToUploadThree);
		// var fileToUploadFour = '../../../stock/audia3/grey/audi_grey4.jpeg',
		// absolutePathFour = path.resolve(__dirname, fileToUploadFour);
		// var fileToUploadFive = '../../../stock/audia3/grey/audi_grey5.jpeg',
		// absolutePathFive = path.resolve(__dirname, fileToUploadFive);
		// var fileToUploadSix = '../../../stock/audia3/grey/audi_grey6.jpeg',
		// absolutePathSix = path.resolve(__dirname, fileToUploadSix);
		// var fileToUploadSeven = '../../../stock/audia3/grey/audi_grey7.jpeg',
		// absolutePathSeven = path.resolve(__dirname, fileToUploadSeven);
		// var fileToUploadEight = '../../../stock/audia3/grey/audi_grey8.jpeg',
		// absolutePathEight = path.resolve(__dirname, fileToUploadEight);

		var fileToUploadOne = '../../../stock/audia3/red/audi_red.jpeg',
		absolutePathOne = path.resolve(__dirname, fileToUploadOne);
		var fileToUploadTwo = '../../../stock/audia3/red/audi_red2.jpeg',
		absolutePathTwo = path.resolve(__dirname, fileToUploadTwo);
		var fileToUploadThree = '../../../stock/audia3/red/audi_red3.jpeg',
		absolutePathThree = path.resolve(__dirname, fileToUploadThree);
		var fileToUploadFour = '../../../stock/audia3/red/audi_red4.jpeg',
		absolutePathFour = path.resolve(__dirname, fileToUploadFour);
		var fileToUploadFive = '../../../stock/audia3/red/audi_red5.jpeg',
		absolutePathFive = path.resolve(__dirname, fileToUploadFive);
		var fileToUploadSix = '../../../stock/audia3/red/audi_red6.jpeg',
		absolutePathSix = path.resolve(__dirname, fileToUploadSix);
		var fileToUploadSeven = '../../../stock/audia3/red/audi_red7.jpeg',
		absolutePathSeven = path.resolve(__dirname, fileToUploadSeven);
		var fileToUploadEight = '../../../stock/audia3/red/audi_red8.jpeg',
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

		element(by.cssContainingText('option', 'AUDI')).click();
		//select.$('[label="A3"]').click();
		element(by.cssContainingText('option', 'A3')).click();

		var header = 'Audi A3 1.6 TDI 3dr';
		var subHeader = '2011 (61 reg) Hatchback 63,000 miles Manual 1.6L Diesel';
		var description = 'Bluetooth, Voice Control, Multi-function Steering Wheel, Climate Control, Front Fog Lamps, Curtain Airbags, Sports Seats, Isofix, ABS, Air Bag, Alarm, Side Air Bags, Immobiliser, Traction Control, Central Locking, Electric Front Windows, Adjustable Steering Column, Rear Headrests, Automatic Electric Windows, Anti-Theft System, Power Steering, Electric Mirrors, Radio, Stereo, Colour Coded Body, Remote Alarm, Remote Central Locking, Head Restraints, Height Adjustable Seat, Air Conditioning, 17\'\' Alloys. 5 seats, Brilliant Black, 3 adjustable rear headrests, 3 point seatbelts on all seats, 3 spoke leather multifunction sports steering wheel, 4 lashing points to secure luggage, 60/40 split folding rear seat, Active bonnet, Active front headrests, Adjustable front armrest, Aluminium air vent surrounds, Aluminium door sill trims, Aluminium side window trim, Aluminium trim elements, Anti-lock Brake System and Electronic Brakeforce Distribution, Anti-slip regulation, Anti-theft wheel bolts, Audi drive select, Audi music interface, Body colour bumpers, Body colour door mirrors with integral indicators, Body colour roof spoiler, Chrome exhaust tailpipes, Chrome fog light surround, Coat hooks on both sides, Colour driver\'s information system display, Curtain airbags, Diesel particulate filter,'
		
		element(by.model('header')).sendKeys(header);
		element(by.model('subHeader')).sendKeys(subHeader);
		element(by.model('description')).sendKeys(description);
		element(by.model('mileage')).sendKeys('12567');
		element(by.model('year')).sendKeys('2011');
		element(by.model('purchasePrice')).sendKeys('13500');
		element(by.model('salePrice')).sendKeys('14560');
		supplierSelect.$('[label="Hello Motors"]').click();

		submitBtn.click();

		browser.getLocationAbsUrl().then(function(url) {
			expect(url).toEqual('/cars');
		});

	});

});