describe('Auto Family Admin Sign In', function() {

  var email = element(by.model('email'));
  var password = element(by.model('password'));

  var navBrand = element(by.id('nav-brand'));

  var loginButton = element(by.id('loginButton'));
  var signInDropdownButton = element(by.id('signin-dropdown'));

  beforeEach(function() {
    browser.get('http://10.0.0.9:3000/admin');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Auto Family Admin');
  });

  it('should sign in as admin user and navigate', function() {
    // click drop button
    signInDropdownButton.click();

    email.sendKeys('jonathan@bubbleworks.co.za');
    
    password.sendKeys('admin');

    loginButton.click();

    expect(browser.getTitle()).toEqual('Auto Family Admin');
    expect(navBrand.getText()).toEqual('Auto Family IMS');

    it('should redirect index.html to index.html/#/about', function() {
    browser.get('http://10.0.0.9:3000/admin/#/about');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/about');
        });
      expect(browser.getTitle()).toEqual('About');
    });

    it('should redirect index.html to index.html/#/contact', function() {
      browser.get('http://10.0.0.9:3000/admin/#/contact');
      browser.getLocationAbsUrl().then(function(url) {
          expect(url).toEqual('/contact');
        });
      expect(browser.getTitle()).toEqual('Contact');
    });

    browser.get('http://10.0.0.9:3000/admin/#/users');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/users');
      });

    browser.get('http://10.0.0.9:3000/admin/#/customers');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/customers');
      });

    browser.get('http://10.0.0.9:3000/admin/#/suppliers');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/suppliers');
      });

    browser.get('http://10.0.0.9:3000/admin/#/events');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/events');
      });

    browser.get('http://10.0.0.9:3000/admin/#/services');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/services');
      });

    browser.get('http://10.0.0.9:3000/admin/#/reports');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/reports');
      });

  });

});