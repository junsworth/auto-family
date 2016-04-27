exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['staff-user-sign-in-spec.js',  'staff-user-add-car-bmw-spec.js', 'staff-user-add-car-spec.js'],
  capabilities: {
    browserName: 'chrome'
  }
}