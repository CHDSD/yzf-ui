'use strict';

var stamp = require('./build/stamp');
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var babel = require("gulp-babel");
var insert = require('gulp-insert');

gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function () {
	return gulp.src('./src/js/**/*.js')
		.pipe(concat('yzf.js'))
		.pipe(babel())
		.pipe(insert.wrap(stamp.stampTop, stamp.stampEnd))
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/scss/**/*.scss', ['sass']);
});

gulp.task('js:watch', function () {
  gulp.watch('./src/js/**/*.js', ['js']);
});