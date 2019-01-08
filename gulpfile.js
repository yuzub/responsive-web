var gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  imagemin = require('gulp-imagemin'),
  wait = require('gulp-wait'),
  browserSync = require('browser-sync').create();

gulp.task('default', function() {
  // place code for your default task here
  console.log('gulp default task start');
});

gulp.task('css', function() {
  return gulp.src('src/sass/**/*.scss')
    .pipe(wait(1500))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
    // .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
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
  return gulp.src('src/**/*.+(html|js)')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('browserSync', function() {
  browserSync.init({ server: { baseDir: 'dist' } });
});

gulp.task('watch', ['browserSync', 'css'], function() {
  gulp.watch('src/sass/**/*.scss', ['css']);
  gulp.watch('src/**/*.+(html|js)', ['copy']);
});


// Static Server + watching scss/html files
gulp.task('serve', function() {

  browserSync.init({
      server: "./dist"
  });

  gulp.watch("src/sass/**/*.scss", ['sass']);
  // gulp.watch("src/*.html").on('change', browserSync.reload);
  gulp.watch('src/*.html', ['copy']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("src/sass/**/*.scss")
    .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task('watch2', ['sass', 'serve']);