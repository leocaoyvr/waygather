// Requirements
var browserSync  = require('browser-sync').create();
var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat       = require('gulp-concat');
var csslint      = require('gulp-csslint');
var csso         = require('gulp-csso');
var plumber      = require('gulp-plumber');
var sourcemaps   = require('gulp-sourcemaps');
var runSequence  = require('run-sequence');

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
  return gulp.src([
      'dev/style/vend/*',
      'dev/style/base/*',
      'dev/style/util/responsive.css',
      'dev/style/util/shadow.css',
      'dev/style/util/transition.css',
      'dev/style/mod/button.css',
      'dev/style/mod/form-elem.css',
      'dev/style/mod/form-custom.css',
      'dev/style/mod/modal.css',
      'dev/style/mod/link.css',
      'dev/style/mod/title.css',
      'dev/style/mod/js-active.css',
      'dev/style/layout/block.css',
      'dev/style/layout/form.css',
      'dev/style/layout/header.css',
      'dev/style/layout/topbar.css',
      'dev/style/layout/navbar.css',
      'dev/style/layout/navbar-mobile.css',
      'dev/style/layout/footer.css',
      'dev/style/layout/default.css',
      'dev/style/page/*',
      'dev/style/util/atom.css',
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('style.bundle.css'))
    .pipe(csslint('csslintrc.json'))
    .pipe(csslint.formatter())
    .pipe(csslint.formatter('fail'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 8', 'ie 9']
    }))
    // only for deployment
    // .pipe(csso({
    //   restructure: true,
    //   sourceMap: true,
    //   debug: true
    // }))
    .pipe(sourcemaps.write())
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