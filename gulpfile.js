// including plugins
var gulp = require('gulp')
, jshint = require("gulp-jshint");
var uglify = require("gulp-uglify"); 

//Performing jsLinting
gulp.task('jsLint', function () {
gulp.src('server.js')
    gulp.src('test.js') // path to your files
    .pipe(jshint())
    .pipe(jshint.reporter()); // Dump results
});

 
// task
/*gulp.task('minify-js', function () {
    gulp.src('server.js') // path to your files
    .pipe(uglify())
    .pipe(gulp.dest('servermini.js'));
})*/


//Performing js minification

var uglify = require('gulp-uglify-es').default;

gulp.task("uglify", function () {
   return gulp.src("server.js")
       .pipe(uglify(/* options */))
       .pipe(gulp.dest("gulpminification"));
});
gulp.task("uglifyy", function () {
    return gulp.src("test.js")
        .pipe(uglify(/* options */))
        .pipe(gulp.dest("gulpminification"));
 });