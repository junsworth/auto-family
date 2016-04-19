describe('Auto Family Admin Site Navigation', function() {

  // buttons
  var suppliersButton = element(by.id('Suppliers'));
  var customersButton = element(by.id('Customers'));
  var eventsButton = element(by.id('Events'));
  var servicesButton = element(by.id('Services'));
  var reportsButton = element(by.id('Reports'));  
  
  it('should navigate admin site', function() {    
    // click suppliers nav button
    suppliersButton.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/suppliers');
      });
    // click customers nav button
    customersButton.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/customers');
      });
    // click events nav button
    eventsButton.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/events');
      });
    // click services nav button
    servicesButton.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/services');
      });
    // click reports nav button
    reportsButton.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/reports');
      });

  });

});