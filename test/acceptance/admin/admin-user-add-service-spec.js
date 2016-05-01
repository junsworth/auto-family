var path = require('path');

describe('Auto Family Add Service', function() {

  // local variables
  var titleToReg = 'Financing at Auto-Family';
  var headerToReg = 'Finance the friendly way at 34.9% APR';
  var descriptionToReg = 'Ready to buy? Car Financing at CarMax is convenient and easy. Learn more about the CarMax financing process and how to get started today.';

  // view elements
  var navBtn = element(by.id('Services'));
  var addBtn = element(by.id('addBtn'));
  var submitBtn = element(by.id('submitBtn'));

  // register service form models
  var title = element(by.model('title'));
  var header = element(by.model('header'));
  var description = element(by.model('description'));

  var fileToUpload = '../../../stock/approve.png',
    absolutePath = path.resolve(__dirname, fileToUpload);
  
  it('should create service', function() {
    // click services nav button
    navBtn.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/services');
      });
    browser.sleep(1500);
    // click add service button
    addBtn.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/addservice');
      });
    browser.sleep(1500);
    // send values to form model elements
    title.sendKeys(titleToReg);
    header.sendKeys(headerToReg);
    description.sendKeys(descriptionToReg);
    // pass the form element the file's absolute path
    $('input[type="file"]').sendKeys(absolutePath);

    // let browser sleep
    browser.sleep(1500);
    // click submit form
    submitBtn.click();
    // get current url and confirm it's the expected url
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/services');
      });
    browser.sleep(1500);
  });

});