// including plugins
var gulp = require('gulp')
, jshint = require("gulp-jshint");
 
// task

gulp.task('jsLint', function () {
    gulp.src('server.js')
    gulp.src('test.js') // path to your files
    .pipe(jshint())
    .pipe(jshint.reporter()); // Dump results
});

/*gulp.task('watch', function() {
    gulp.watch("server.js", ["lint"]);
});*/
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');

gulp.task('useref', function(){
  return gulp.src('server.js')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('server1.js'))
});
var pump = require('pump');
gulp.task('compress', function (cb) {
  pump([
        gulp.src('server.js'),
        uglify(),
        gulp.dest('server1.js')
    ],
    cb
  );
});