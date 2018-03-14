const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require ('gulp-concat');
const babel = require('gulp-babel');
// const imagemin = require('gulp-imagemin');

gulp.task('reload', function(){
  browserSync.reload();
});

gulp.task('serve', ['sass'], function(){
  browserSync({
    server: 'docs'
  });
  gulp.watch('src/*.html', ['reload']);
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/css/**/*.css', ['css']);
});

gulp.task('sass', function(){
  return gulp.src('src/scss/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.stream());
});

gulp.task('css', function(){
    return gulp.src('src/css/**/*.css')
    .pipe(concat('style.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('docs/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function(){
    return gulp.src('src/js/**/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('docs/js'))
    .pipe(browserSync.stream());
});

// gulp.task('img', function(){
//   return gulp.src('src/img/**/*.{jpg,jpeg,png,gif}')
//   .pipe(imagemin())
//   .pipe(gulp.dest('docs/img'))
// });

gulp.task('default', ['serve','js','sass']);
