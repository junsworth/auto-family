exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['admin-user-add-service-spec.js', ],
  capabilities: {
    browserName: 'chrome'
  }
}