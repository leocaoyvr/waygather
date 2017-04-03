// Requirements
var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var runSequence  = require('run-sequence');
var csslint      = require('gulp-csslint');
var autoprefixer = require('gulp-autoprefixer');
var importCss    = require('gulp-import-css');
var rename       = require('gulp-rename');
var plumber      = require('gulp-plumber');

// Browser Sync Dev
gulp.task('browserSync', function() {
  browserSync.init({
    notify: false,
    port: 8080,
    ghostMode: false,
    server: {
      baseDir: './',
      index: '/view/index.html'
    }
  });

  var reloadBrowser = function() {
    browserSync.reload();
  };

  gulp.watch(['./view/*.html']).on('change', reloadBrowser);
  gulp.watch(['./script/*.js']).on('change', reloadBrowser);
  gulp.watch(['./img/*']).on('change', reloadBrowser);
  gulp.watch(['./font/*']).on('change', reloadBrowser);
  gulp.watch(['./style/**/*.css'], ['css']);
});

// css
gulp.task('css', function() {
  return gulp.src('./style/style.css')
    .pipe(plumber())
    .pipe(importCss())
    .pipe(rename({suffix: '.bundle'}))
    .pipe(csslint('csslintrc.json'))
    .pipe(csslint.formatter())
    .pipe(csslint.formatter('fail'))
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .on('error', function (error) {
      console.error(error);
      this.emit('end');
    })
    .pipe(gulp.dest('./style'))
    .pipe(browserSync.stream());
});

// Serve Dev
gulp.task('serve', function(done) {
  runSequence('browserSync', function() {});
});