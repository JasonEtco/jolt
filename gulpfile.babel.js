/**
 *  Flow base
 */

// 'use strict';

import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import gulp from 'gulp';
import del from 'del';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import pkg from './package.json';


const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const arg = process.argv[2];
const prod = (arg === 'prod');

// Optimize images
function images(done) {
  gulp.src('src/images/**/*')
    .pipe($.imagemin({
      progressive: true,
      interlaced: true,
    }))
    .pipe(gulp.dest('public/images'))
    .pipe($.size({ title: 'images' }));
  done();
}

// Compile Sass into CSS
function styles(done) {
  const processors = [
    autoprefixer,
    cssnano,
  ];
  gulp.src('src/styles/styles.scss')
  .pipe($.wait(500))
  .pipe($.sourcemaps.init())
  .pipe($.sass().on('error', $.sass.logError))
  .pipe($.if(prod, $.postcss(processors)))
  .pipe($.sourcemaps.write('.'))
  .pipe(gulp.dest('public/styles'))
  .pipe(browserSync.stream({ match: '**/*.css' })); // Filters out map from stream
  done();
}

// Concatenate and minify JavaScript. Optionally transpiles ES2015 code to ES5.
// to enable ES2015 support remove the line `"only": "gulpfile.babel.js",` in the
// `.babelrc` file.
function scripts(done) {
  gulp.src([
    './src/scripts/**/*.js',
  ])
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write())
    .pipe($.concat('main.min.js'))
    .pipe($.uglify())
    // Output files
    .pipe($.size({ title: 'scripts' }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('public/scripts'));
  done();
}

// Clean output directory
function clean(done) {
  del(['public/styles', 'public/scripts'], { dot: true });
  done();
}

// Watch files for changes & reload
function serve(done) {
  browserSync({
    notify: false,
    // Customize the Browsersync console logging prefix
    logPrefix: 'Flow',
    // https: true,
    proxy: `http://${pkg.name}.dev`,
  });

  gulp.watch('craft/templates/**/*.twig')
    .on('change', gulp.series(reload));

  gulp.watch('src/styles/**/*.{scss,css}')
    .on('change', gulp.series(styles));

  gulp.watch('src/scripts/**/*.js')
    .on('change', gulp.series(scripts, reload));

  gulp.watch('src/images/**/*.{png, jpg, jpeg}')
    .on('change', gulp.series(images, reload));

  done();
}

// Build production files, the default task
gulp.task('default',
  gulp.series(clean, styles,
    gulp.parallel(scripts, images), serve));

// need to add css source map then wont need prod
gulp.task('prod',
  gulp.series(clean, styles,
    gulp.parallel(scripts, images)));