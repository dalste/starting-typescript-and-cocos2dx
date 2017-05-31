var webpackConfig = require('./webpack.config.js');
webpackConfig.entry ={};
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'publish/html5/game.min.js',
      'tstest/*.ts'
    ],
    exclude: [
    ],
    preprocessors: {
      'tstest/**/*.ts': ['webpack']
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}