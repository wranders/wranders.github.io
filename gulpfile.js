/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const del = require('del');
const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require(path.resolve(__dirname, 'webpack.config.js'));

const outDir = path.resolve(__dirname, 'dist');

function clean() {
  return del(outDir);
}

function copyRepoFiles() {
  return gulp
    .src([
      path.resolve(__dirname, 'LICENSE'),
      path.resolve(__dirname, 'README.md'),
    ])
    .pipe(gulp.dest(outDir));
}

function copyRootFiles() {
  return gulp
    .src(
      [
        path.resolve(__dirname, 'public', 'browserconfig.xml'),
        path.resolve(__dirname, 'public', 'CNAME'),
        path.resolve(__dirname, 'public', 'keybase.txt'),
        path.resolve(__dirname, 'public', 'pgp_pubkey.asc'),
        path.resolve(__dirname, 'public', 'site.webmanifest'),
      ],
      { base: path.resolve(__dirname, 'public') },
    )
    .pipe(gulp.dest(outDir));
}

function copyIcons() {
  return gulp
    .src(
      [
        path.resolve(__dirname, 'public', 'icons', '*'),
        path.resolve(__dirname, 'public', 'image', '*'),
      ],
      { base: path.resolve(__dirname, 'public') },
    )
    .pipe(gulp.dest(path.resolve(outDir, 'static')));
}

function copy(done) {
  return gulp.parallel(copyRepoFiles, copyRootFiles, copyIcons)(done);
}

function runWebpack(isDev, watch) {
  webpackConfig.mode = isDev ? 'development' : 'production';
  webpackConfig.watch = watch;
  return webpackStream(webpackConfig, webpack).pipe(gulp.dest(outDir));
}

function webpackDev() {
  return runWebpack(true, false);
}

function webpackDevWatch() {
  return runWebpack(true, true);
}

function webpackProd() {
  return runWebpack(false, false);
}

exports.clean = clean;

exports.start = gulp.series(clean, copy, webpackDevWatch);

exports.builddev = gulp.series(clean, copy, webpackDev);

exports.buildprod = gulp.series(clean, gulp.parallel(copy, webpackProd));

exports.default = this.builddev;
