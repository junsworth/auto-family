describe('Auto Family Navigation', function() {

  it('should have a title', function() {

    browser.get('http://10.0.0.9:3000/');

    expect(browser.getTitle()).toEqual('Auto Family');

  });

});