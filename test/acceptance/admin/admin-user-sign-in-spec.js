describe('Auto Family Admin User Sign In', function() {

  var navBrand = element(by.id('nav-brand'));

  var emailToSignIn = 'jonathan@bubbleworks.co.za';
  var passwordToSignIn = 'admin';

  // elements
  var email = element(by.model('email'));
  var password = element(by.model('password'));

  var suppliersButton = element(by.id('Suppliers'));
  var customersButton = element(by.id('Customers'));
  var eventsButton = element(by.id('Events'));
  var servicesButton = element(by.id('Services'));
  var reportsButton = element(by.id('Reports'));
  
  var loginButton = element(by.id('loginButton'));

  var signInDropdownButton = element(by.id('signin-dropdown'));

  var principalEmail = element(by.binding('principal.email'));

  beforeEach(function() {
    browser.get('http://10.0.0.9:3000/admin');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Auto Family Admin');
  });

  it('should sign in admin user', function() {
    // click drop button
    signInDropdownButton.click();

    email.sendKeys(emailToSignIn);
    
    password.sendKeys(passwordToSignIn);

    loginButton.click();

    expect(browser.getTitle()).toEqual('Auto Family Admin');
    expect(navBrand.getText()).toEqual('Auto Family IMS');

    expect(principalEmail.getText()).toEqual(emailToSignIn);
    
    suppliersButton.click();

    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/suppliers');
      });

    customersButton.click();

    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/customers');
      });

    eventsButton.click();

    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/events');
      });

    servicesButton.click();

    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/services');
      });

    reportsButton.click();

    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/reports');
      });

  });

});