const path = require('path');
const outdir = path.resolve(__dirname, 'dist');
const del = require('del');
const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require(path.resolve(__dirname, 'webpack.config.js'));

function clean() {
  return del(outdir);
}

function copyRepoFiles() {
  return gulp.src([
    path.resolve(__dirname, 'LICENSE'),
    path.resolve(__dirname, 'README.md')
  ]).pipe(gulp.dest(outdir));
}

function copyRootFiles() {
  return gulp.src(
    [
      path.resolve(__dirname, 'public', 'browserconfig.xml'),
      path.resolve(__dirname, 'public', 'CNAME'),
      path.resolve(__dirname, 'public', 'keybase.txt'),
      path.resolve(__dirname, 'public', 'pgp_pubkey.asc'),
      path.resolve(__dirname, 'public', 'site.webmanifest')
    ],{base: path.resolve(__dirname, 'public')}
  ).pipe(gulp.dest(outdir));
}

function copyIcons() {
  return gulp.src(
    [
      path.resolve(__dirname, 'public', 'icons', '*'),
      path.resolve(__dirname, 'public', 'image', '*'),
    ],{base: path.resolve(__dirname, 'public')}
  ).pipe(gulp.dest(
    path.resolve(outdir, 'static')
  ));
}

const copy = (done) => gulp.parallel(
  copyRepoFiles,
  copyRootFiles,
  copyIcons
)(done);

function webpackDev() {
  webpackConfig.mode = 'development';
  webpackConfig.watch = false;
  return webpackStream(webpackConfig, webpack).pipe(gulp.dest(outdir));
}

function webpackDevWatch() {
  webpackConfig.mode = 'development';
  webpackConfig.watch = true;
  return webpackStream(webpackConfig, webpack).pipe(gulp.dest(outdir));
}

function webpackProd() {
  webpackConfig.mode = 'production';
  webpackConfig.watch = false;
  return webpackStream(webpackConfig, webpack).pipe(gulp.dest(outdir));
}

exports.start = gulp.series(
  clean,
  gulp.series(
    copy,
    webpackDevWatch
  )
);

exports.builddev =  gulp.series(
  clean,
  gulp.series(
    copy,
    webpackDev
  )
);

exports.buildprod = gulp.series(
  clean,
  gulp.parallel(
    copy,
    webpackProd
  )
);

exports.default = this.builddev;