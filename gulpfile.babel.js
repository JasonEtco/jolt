/**
 *  Flow base
 */

// 'use strict';

import gulp from 'gulp';
import del from 'del';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import { output as pagespeed } from 'psi';
import pkg from './package.json';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

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

// Compile and automatically prefix stylesheets
function styles(done) {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10',
  ];

  // For best performance, don't add Sass partials to `gulp.src`
  gulp.src([
    'src/styles/styles.scss',
  ])
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10,
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    // Concatenate and minify styles
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.size({ title: 'styles' }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('public/styles'))
    .pipe(browserSync.stream({ match: '**/*.css' }));
  done();
}

// Lint scripts
function lint(done) {
  gulp.src('src/scripts/**/*.js')
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failOnError()));
  done();
}

// Concatenate and minify JavaScript. Optionally transpiles ES2015 code to ES5.
// to enable ES2015 support remove the line `"only": "gulpfile.babel.js",` in the
// `.babelrc` file.
function scripts(done) {
  gulp.src([
    './src/scripts/*.js',
    './src/scripts/scripts.js',
    './src/scripts/smoothstate_init.js',
    // Other scripts
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

// Lint twig - Rules https://github.com/yaniswang/HTMLHint/wiki/Rules
function htmlhint(done) {
  gulp.src('craft/templates/**/*.twig')
    .pipe($.htmlhint({
      'doctype-first': false,
      'tag-self-close': false,
      'tagname-lowercase': true,
      'id-unique': true,
      'attr-lowercase': ['viewBox', 'test'],
    }))
    .pipe($.htmlhint.reporter());
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
    .on('change', gulp.series(htmlhint, reload));

  gulp.watch('src/styles/**/*.{scss,css}')
    .on('change', gulp.series(styles));

  gulp.watch('src/scripts/**/*.js')
    .on('change', gulp.series(scripts, reload));

  gulp.watch('src/images/**/*')
    .on('change', gulp.series(images, reload));

  done();
}

// Build production files, the default task
gulp.task('default',
  gulp.series(clean, styles,
    gulp.parallel(scripts, images), serve));

// need to add css source map then wont need dist
gulp.task('dist',
  gulp.series(clean, styles,
    gulp.parallel(scripts, images)));

// Run PageSpeed Insights
gulp.task('pagespeed', cb =>
  pagespeed(pkg.domain, {
    strategy: 'mobile',
  }, cb)
);

const realFavicon = require('gulp-real-favicon');
const fs = require('fs');

const FAVICON_DATA_FILE = 'faviconData.json';

gulp.task('generate-favicon', (done) => {
  realFavicon.generateFavicon({
    masterPicture: './public/images/logo.png',
    dest: './public/favicon',
    iconsPath: '/favicon',
    design: {
      ios: {
        pictureAspect: 'noChange',
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'noChange',
        backgroundColor: '#da532c',
        onConflict: 'override',
      },
      androidChrome: {
        pictureAspect: 'noChange',
        themeColor: '#ffffff',
        manifest: {
          name: 'Craft CMS',
          display: 'browser',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true,
        },
      },
      safariPinnedTab: {
        pictureAspect: 'silhouette',
        themeColor: '#5bbad5',
      },
    },
    settings: {
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false,
    },
    markupFile: FAVICON_DATA_FILE,
  }, () => done());
});

gulp.task('inject-favicon-markups', () => {
  gulp.src(['./craft/templates/_layout.twig'])
    .pipe(realFavicon
      .injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
    .pipe(gulp.dest('./craft/templates/'));
});

gulp.task('check-for-favicon-update', () => {
  const currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  realFavicon.checkForUpdates(currentVersion, (err) => {
    if (err) {
      throw err;
    }
  });
});
