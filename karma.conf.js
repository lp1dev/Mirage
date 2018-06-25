const JasmineConsoleReporter = require('jasmine-console-reporter');
const reporter = new JasmineConsoleReporter({
    colors: 1,           // (0|false)|(1|true)|2
    cleanStack: 1,       // (0|false)|(1|true)|2|3
    verbosity: 4,        // (0|false)|1|2|(3|true)|4
    listStyle: 'indent', // "flat"|"indent"
    activity: true,
    emoji: true,         // boolean or emoji-map object
});

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: [
      'jasmine'
    ],
    files: [
      'dist/**/*.spec.js'
    ],
    plugins : [
      'karma-webpack',
      'karma-jasmine', 
      'karma-phantomjs-launcher'
    ],
    preprocessors: {
      'dist/**/*.spec.js': ['webpack']
    },
    reporter: reporter
  })
}
