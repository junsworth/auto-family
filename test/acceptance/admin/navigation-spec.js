describe('Auto Family Aministration Navigation', function() {

  var navBrand = element(by.id('nav-brand'));

  it('should redirect to admin home page', function() {
    browser.get('http://10.0.0.9:3000/admin');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/');
      });
    expect(browser.getTitle()).toEqual('Auto Family Admin');
    expect(navBrand.getText()).toEqual('Auto Family Admin');
  });

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

});