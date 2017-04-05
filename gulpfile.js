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
      baseDir: './dev',
      index: '/view/index.html'
    }
  });

  var reloadBrowser = function() {
    browserSync.reload();
  };

  gulp.watch(['dev/view/*.html']).on('change', reloadBrowser);
  gulp.watch(['dev/script/*.js']).on('change', reloadBrowser);
  gulp.watch(['dev/img/*']).on('change', reloadBrowser);
  gulp.watch(['dev/font/*']).on('change', reloadBrowser);
  gulp.watch(['dev/style/**/*.css'], ['css']);
});

// css
gulp.task('css', function() {
  return gulp.src('dev/style/style.css')
    .pipe(plumber())
    .pipe(importCss())
    .pipe(rename({suffix: '.bundle'}))
    .pipe(csslint('csslintrc.json'))
    .pipe(csslint.formatter())
    .pipe(csslint.formatter('fail'))
    .pipe(autoprefixer({ browsers: ['last 2 versions', 'ie 8-11'] }))
    .on('error', function (error) {
      console.error(error);
      this.emit('end');
    })
    .pipe(gulp.dest('dev/style'))
    .pipe(browserSync.stream());
});

// Serve Dev
gulp.task('serve', function(done) {
  runSequence('browserSync', function() {});
});