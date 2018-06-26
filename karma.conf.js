module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: [
      'jasmine'
    ],
    logLevel: config.LOG_DISABLE,
    files: [
      'dist/**/spec.js'
    ],
    plugins : [
      'karma-webpack',
      'karma-jasmine', 
        'karma-phantomjs-launcher',
        'karma-spec-reporter'
    ],
    preprocessors: {
      'dist/**/spec.js': ['webpack']
    },
    reporters: [ 'spec' ] 
  })
}
