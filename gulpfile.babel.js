import autoprefixer from 'autoprefixer';
import babelify     from 'babelify';
import browser      from 'browser-sync';
import browserify   from 'browserify';
import cssnano      from 'cssnano';
import del          from 'del';
import exorcist     from 'exorcist';
import gulp         from 'gulp';
import plugins      from 'gulp-load-plugins';
import source       from 'vinyl-source-stream';
import watchify     from 'watchify';
import pkg          from './package.json';

const $ = plugins();
const arg = process.argv[2];
const prod = (arg === 'prod');

gulp.task('build',
  gulp.parallel(move, bowerMove, scripts, styles));

gulp.task('default',
  gulp.series('build', browsersync, watch));

gulp.task('prod',
  gulp.series('build', favicons));

// Move files to build dir
const filesToMove = [
  'src/images/**/*',
];
function move(done) {
  gulp.src(filesToMove, { base: './src' })
  .pipe($.if(prod, $.imagemin()))
  .pipe(gulp.dest('public'));
  done();
}

function bowerMove(done) {
  gulp.src('bower_components/**/*.{js,map}')
  .pipe($.flatten())
  .pipe(gulp.dest('public/lib'));
  done();
}

// Move favicons to build dir
function favicons(done) {
  gulp.src('src/favicons/**/*')
  .pipe($.imagemin())
  .pipe(gulp.dest('public'));
  done();
}

// Compile ES6, ES7 into JS
function buildScript(file, jswatch) {
  const props = {
    entries: [`src/scripts/${file}`],
    debug: true,
    cache: {},
    packageCache: {},
    transform: [babelify.configure({
      presets: ['es2015', 'react', 'stage-0'],
      plugins: ['transform-decorators-legacy'],
    })],
  };

  // watchify() if watch requested, otherwise run browserify() once
  const bundler = jswatch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    const stream = bundler.bundle();
    return stream
      .pipe(exorcist('public/jolt.js.map'))
      .pipe(source(file))
      .pipe($.if(prod, $.streamify($.uglify())))
      .pipe(gulp.dest('public'))
      .pipe(browser.reload({ stream: true }));
  }

  // listen for an update and run rebundle
  bundler.on('update', () => {
    rebundle();
    $.util.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}

function scripts(done) {
  buildScript('jolt.js', false);
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
  .pipe(gulp.dest('public'))
  .pipe(browser.stream({ match: '**/*.css' })); // Filters out map from stream
  done();
}

// Proxy the server with browsersync
function browsersync(done) {
  browser.init({ proxy: `http://${pkg.name}.dev` }, done());
}

// Browsersync-less browser navigation
function browse(done) {
  gulp.src(__filename)
  .pipe($.open({ uri: `http://${pkg.name}.dev` }));
  done();
}

// Generate API documentation
function apidoc(done) {
  $.apidoc({
    src: 'routes/',
    dest: 'docs/',
  }, done);
}

// Watch for file changes
function watch(done) {
  gulp.watch(filesToMove).on('change', gulp.series(move, browser.reload));
  gulp.watch('src/styles/**/*.scss').on('change', gulp.series(styles));
  buildScript('jolt.js', true);
  done();
}
