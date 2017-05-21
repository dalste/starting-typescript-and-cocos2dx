
var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

var tsTestProject = ts.createProject("tsconfig.test.json");
const mocha = require('gulp-mocha');

var gulpTslint = require("gulp-tslint");
var tslint = require("tslint");
 
gulp.task('lint', function() {
var program = tslint.Linter.createProgram("./tsconfig.json");
 
gulp.src('tssrc/**/*.ts', { base: '.' })
  .pipe(gulpTslint({ program }));
});


gulp.task('test', function () {

    return gulp.src('./tstest/*.spec.ts',
        {
            base: '.'
        })
        /*transpile*/
        .pipe(tsTestProject())
        /*flush to disk*/
        .pipe(gulp.dest('.'))
        /*execute tests*/
        .pipe(mocha())
        .on("error", function(err) {
            console.log(err)
        });
});

gulp.task("default", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("tsdist"));
});