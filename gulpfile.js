var gulp = require('gulp'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    iife = require("gulp-iife"),
    sass = require('gulp-sass');

gulp.task('concat-fb', function() {
  return gulp.src('./src/fb/**/*.js')
    .pipe(iife())
    .pipe(concat('fb.js'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('concat-events', function() {
  return gulp.src('./src/events/**/*.js')
    .pipe(iife())
    .pipe(concat('events.js'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('sass', function () {
  gulp.src('./src/sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*.js', ['concat-fb', 'concat-events']);
  gulp.watch('./src/sass/**/*.sass', ['sass']);
});

gulp.task('default',
  [
    'concat-fb',
    'concat-events',
    'sass',
    'watch'
  ]
);