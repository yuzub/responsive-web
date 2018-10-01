var gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  imagemin = require('gulp-imagemin'),
  browserSync = require('browser-sync').create();

gulp.task('default', function() {
  // place code for your default task here
  console.log('gulp default task start');
});

gulp.task('css', function() {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('images', function() {
  return gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

gulp.task('copy', function() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('browserSync', function() {
  browserSync.init({ server: { baseDir: 'dist' } });
});

gulp.task('watch', ['browserSync', 'css'], function() {
  gulp.watch('src/sass/**/*.scss', ['css']);
  gulp.watch('src/*.html', ['copy']);
});