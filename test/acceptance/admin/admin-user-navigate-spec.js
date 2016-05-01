describe('Auto Family Admin Site Navigation', function() {

  // buttons
  var usersButton = element(by.id('Users'));
  var suppliersButton = element(by.id('Suppliers'));
  var customersButton = element(by.id('Customers'));
  var eventsButton = element(by.id('Events'));
  var servicesButton = element(by.id('Services'));
  var reportsButton = element(by.id('Reports'));  
  
  it('should navigate admin site', function() {    
    
    // click customers nav button
    usersButton.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/users');
      });
    browser.sleep(1500);

    // click customers nav button
    customersButton.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/customers');
      });
    browser.sleep(1500);

    // click suppliers nav button
    suppliersButton.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/suppliers');
      });
    expect(browser.getTitle()).toEqual('Suppliers');
    browser.sleep(1500);
    // click events nav button
    eventsButton.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/events');
      });
    browser.sleep(1500);
    // click services nav button
    servicesButton.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/services');
      });
    browser.sleep(1500);
    // click reports nav button
    reportsButton.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/reports');
      });
    browser.sleep(1500);
  });

});