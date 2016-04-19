var path = require('path');

describe('Auto Family Add Service', function() {

  // local variables
  var titleToReg = 'Finance 10% - May 2016';
  var headerToReg = 'Finance offered at 10% less during May.';
  var descriptionToReg = 'Finance offered at 10% less during May.';

  // view elements
  var navBtn = element(by.id('Services'));
  var addBtn = element(by.id('addBtn'));
  var submitBtn = element(by.id('submitBtn'));

  // register service form models
  var title = element(by.model('title'));
  var header = element(by.model('header'));
  var description = element(by.model('description'));

  var fileToUpload = '../../../stock/poster_970x250.jpg',
    absolutePath = path.resolve(__dirname, fileToUpload);
  
  it('should create service', function() {
    // click services nav button
    navBtn.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/services');
      });
    // click add service button
    addBtn.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/addservice');
      });

    // send values to form model elements
    title.sendKeys(titleToReg);
    header.sendKeys(headerToReg);
    description.sendKeys(descriptionToReg);
    // pass the form element the file's absolute path
    $('input[type="file"]').sendKeys(absolutePath);

    // let browser sleep
    browser.sleep(1000);
    // click submit form
    submitBtn.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/services');
      });

  });

});