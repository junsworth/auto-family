exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['navigation-spec.js', 'sign-in-spec.js'],
  capabilities: {
    browserName: 'firefox'
  }
}