const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');

function styles() {
  return src('app/assets/style/style.scss')
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(dest('app/assets/css'))

    .pipe(browserSync.stream());
}

function scripts() {
  return src('app/js/main.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

function watching() {
  watch(['app/assets/style/style.scss'], styles);
  watch(['app/js/main.js'], scripts);
  watch(['app/**/*.html']).on('change', browserSync.reload);
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/',
    },
  });
}

function cleanDist() {
  return src('dist').pipe(clean());
}

function building() {
  return src(
    [
      'app/assets/css/style.min.css',
      'app/js/main.min.js',
      'app/**/*.html',
      'app/assets/img/imgmin/*',
      'app/assets/fonts/*',
      'app/assets/icons/*',
      'app/assets/localizations/*',
    ],
    {
      base: 'app',
    }
  ).pipe(dest('dist'));
}

function imagesmin() {
  return src('app/assets/img/*').pipe(imagemin()).pipe(dest('app/assets/img/imgmin'));
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.imagesmin = imagesmin;

exports.build = series(cleanDist, building);

exports.default = parallel(styles, scripts, imagesmin, watching, browsersync);
