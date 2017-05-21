var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

var gulpTslint = require("gulp-tslint");
var tslint = require("tslint");
 

gulp.task('lint', function() {
var program = tslint.Linter.createProgram("./tsconfig.json");
 
gulp.src('tssrc/**/*.ts', { base: '.' })
  .pipe(gulpTslint({ program })).pipe(gulpTslint.report());
});

gulp.task("default", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("tsdist"));
});