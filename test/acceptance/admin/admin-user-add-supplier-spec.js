describe('Auto Family Admin Add Supplier', function() {

  // local variables
  var nameToReg = 'Greece City Car Rentals - Airport Port Elizabeth';
  var addressToReg = '235 Walmer Drive';
  var addressTwoToReg = 'Walmer, 6001';
  var cityToReg = 'Port Elizabeth';
  var phoneToReg = '041 345 6788';
  var emailToReg = 'jonn@eurocar.com';

  // view elements
  // buttons
  var navBtn = element(by.id('Suppliers'));
  var addBtn = element(by.id('addBtn'));
  var submitBtn = element(by.id('submitBtn'));

  // supplier register form models
  var name = element(by.model('name'));
  var address = element(by.model('address'));
  var addresstwo = element(by.model('addresstwo'));
  var city = element(by.model('city'));
  var email_for_form = element(by.model('email'));
  var phone = element(by.model('phone'));

  it('should add supplier', function() {
    
    // click suppliers nav button
    navBtn.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/suppliers');
      });
    // click add supplier button
    addBtn.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/addsupplier');
      });
    // send values to form model elements
    name.sendKeys(nameToReg);
    address.sendKeys(addressToReg);
    addresstwo.sendKeys(addressTwoToReg);
    city.sendKeys(cityToReg);
    email_for_form.sendKeys(emailToReg);
    phone.sendKeys(phoneToReg);
    // click submit form
    submitBtn.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/suppliers');
      });

  });
});