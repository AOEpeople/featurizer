'use strict';

var browserify = require('browserify');
var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var gutil      = require('gulp-util');
var uglify     = require('gulp-uglify');
var globify    = require('require-globify');

gulp.task('default', function () {
  var b = browserify({
    entries: './src/featurizer.js',
    // defining transforms here will avoid crashing your stream
    transform: [globify]
  });

  return b.bundle()
    .pipe(source('featurizer.js'))
    .pipe(buffer())
    //.pipe(uglify())
    .on('error', gutil.log)
    .pipe(gulp.dest('./dist/'));
});
