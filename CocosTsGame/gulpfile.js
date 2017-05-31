'use strict'
var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

var tsTestProject = ts.createProject("tsconfig.test.json");
const mocha = require('gulp-mocha');

var gulpTslint = require("gulp-tslint");
var tslint = require("tslint");

gulp.task('lint', function () {
    var program = tslint.Linter.createProgram("./tsconfig.json");

    gulp.src('tssrc/**/*.ts', { base: '.' })
        .pipe(gulpTslint({ program })).pipe(gulpTslint.report());
});


gulp.task('test', function () {

    return gulp.src(['./tslib/**/*.ts','./tssrc/**/*.ts','./tstest/**/*.spec.ts'],
        {
            base: '.'
        })
        /*transpile*/
        .pipe(tsTestProject())
        /*flush to disk*/
        .pipe(gulp.dest('tsdist'))
        /*execute tests*/
        .pipe(mocha())
        .on("error", function (err) {
            console.log(err)
        });
});


var tsconfig = require(process.cwd() + '/tsconfig.json');

gulp.task('typescript', function() {
  var tsResult = tsProject.src() // instead of gulp.src(...) 
    .pipe(tsTestProject());
  
  return tsResult.js.pipe(gulp.dest(tsconfig.compilerOptions.outDir));
});

var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require(process.cwd() + '/webpack.config.js');
gulp.task('webpack', ['typescript'], function(callback) {
    // run webpack
    webpack(webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            // output options
        }));
        callback();
    });
});


//ES6
//import { Server } from 'karma';
 
// ES5
var karma = require('karma').Server; 
 

gulp.task('karma:watch', function(done) {
    karma.start({
        configFile: __dirname + '/karma.config.js',
        singleRun: false,
    autoWatch: true,
    }, function() {
        done();
    });
});
gulp.task('karma', function(done) {
    karma.start({
        configFile: __dirname + '/karma.config.js',
        singleRun: true
    }, function() {
        done();
    });
});