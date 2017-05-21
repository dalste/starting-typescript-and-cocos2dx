var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

var gulpTslint = require("gulp-tslint");
var tslint = require("tslint");
 
// NOTE: Ensure 'Linter.createProgram' is called inside the gulp task else the contents of the files will be cached 
// if this tasks is called again (eg. as part of a 'watch' task). 
gulp.task('lint', function() {
var program = tslint.Linter.createProgram("./tsconfig.json");
 
gulp.src('tssrc/**/*.ts', { base: '.' })
  .pipe(gulpTslint({ program }));
});

gulp.task("default", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("tsdist"));
});