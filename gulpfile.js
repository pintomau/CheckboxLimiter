var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');

// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src('checkboxlimiter.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('js', function () {
  return gulp.src('checkboxlimiter.js')
    .pipe($.uglify())
    .pipe($.rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('./'));
});

// Clean Output Directory
gulp.task('clean', function (cb) {
  del('dist', cb);
});

// Watch Files For Changes & Reload
gulp.task('serve', function () {
  gulp.watch(['checkboxlimiter.js'], ['jshint']);
});

// Build Production Files
gulp.task('build', function (cb) {
  runSequence('clean', 'jshint', 'js', cb);
});

// Default Task
gulp.task('default', ['clean'], function (cb) {
  gulp.start('build', cb);
});
