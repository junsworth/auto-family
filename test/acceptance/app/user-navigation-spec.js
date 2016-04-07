describe('Auto Family User Navigation', function() {

  var navBrand = element(by.id('nav-brand'));

  var carsButton = element(by.id('Cars'));
  var newsButton = element(by.id('News'));
  var eventsButton = element(by.id('Events'));
  var servicesButton = element(by.id('Services'));
  
  var loginButton = element(by.id('loginButton'));

  var signInDropdownButton = element(by.id('signin-dropdown'));

  beforeEach(function() {
    browser.get('http://10.0.0.9:3000/');
  });

  it('should redirect to home page', function() {
    browser.get('http://10.0.0.9:3000/');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/');
      });
    expect(browser.getTitle()).toEqual('Auto Family');
    expect(navBrand.getText()).toEqual('Auto Family');

    // navigate to cars
    carsButton.click();
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/cars');
      });

    // navigate to news
    newsButton.click();
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/news');
      });

    // navigate to events
    eventsButton.click();
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/events');
      });

    // navigate to services
    servicesButton.click();
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/services');
      });

  });


});