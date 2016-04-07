describe('Auto Family User Sign In', function() {

  var emailToSignIn = 'jon@gmail.com';
  var passwordToSignIn = 'admin';

  // elements
  var email = element(by.model('email'));
  var password = element(by.model('password'));

  var carsButton = element(by.id('Cars'));
  var newsButton = element(by.id('News'));
  var eventsButton = element(by.id('Events'));
  var servicesButton = element(by.id('Services'));
  var offersButton = element(by.id('Offers'));
  
  var loginButton = element(by.id('loginButton'));

  var signInDropdownButton = element(by.id('signin-dropdown'));

  var principalEmail = element(by.binding('principal.email'));

  beforeEach(function() {
    browser.get('http://10.0.0.9:3000/');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Auto Family');
  });

  it('should sign in user', function() {
    // click drop button
    signInDropdownButton.click();

    email.sendKeys(emailToSignIn);
    
    password.sendKeys(passwordToSignIn);

    loginButton.click();

    expect(browser.getTitle()).toEqual('Auto Family');

    expect(principalEmail.getText()).toEqual(emailToSignIn);
    
    carsButton.click();

    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/cars');
      });

    newsButton.click();

    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/news');
      });

    eventsButton.click();

    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/events');
      });

    servicesButton.click();

    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/services');
      });

    offersButton.click();

    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/offers');
      });

  });

});