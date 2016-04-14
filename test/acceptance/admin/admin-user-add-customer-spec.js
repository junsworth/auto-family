describe('Auto Family Admin User Sign In', function() {

  var emailToSignIn = 'jonathan@bubbleworks.co.za';
  var passwordToSignIn = 'admin';

  var nameToReg = 'Mary Mattison';
  var addressToReg = '235 Marine Drive';
  var addressTwoToReg = 'Summerstrand, 6001';
  var cityToReg = 'Port Elizabeth';
  var phoneToReg = '041 345 6788';
  var emailToReg = 'mary@cust.com';

  // elements
  var navBrand = element(by.id('nav-brand'));

  var navButton = element(by.id('Customers'));
  var addBtn = element(by.id('addBtn'));
  var submitBtn = element(by.id('submitBtn'));
  
  var loginButton = element(by.id('loginButton'));
  var signInNavButton = element(by.id('signin-dropdown'));

  var principalEmail = element(by.binding('principal.email'));

  // sign in form models
  var email = element(by.model('email'));
  var password = element(by.model('password'));

  // register supplier form models
  var name = element(by.model('name'));
  var address = element(by.model('address'));
  var addresstwo = element(by.model('addresstwo'));
  var city = element(by.model('city'));
  var emailInput = element(by.model('email'));
  var phone = element(by.model('phone'));

  beforeEach(function() {
    browser.get('http://10.0.0.12:3000/admin');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Auto Family Admin');
  });

  it('should sign in admin user', function() {
    // click drop button
    signInNavButton.click();

    email.sendKeys(emailToSignIn);
    
    password.sendKeys(passwordToSignIn);

    loginButton.click();

    expect(browser.getTitle()).toEqual('Auto Family Admin');
    expect(navBrand.getText()).toEqual('Auto Family IMS');

    expect(principalEmail.getText()).toEqual(emailToSignIn);
    
    navButton.click();

    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/customers');
      });

    addBtn.click();

    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/addcustomer');
      });

    name.sendKeys(nameToReg);
    address.sendKeys(addressToReg);
    addresstwo.sendKeys(addressTwoToReg);
    city.sendKeys(cityToReg);
    emailInput.sendKeys(emailToReg);
    phone.sendKeys(phoneToReg);

    submitBtn.click();

    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/customers');
      });

  });

});