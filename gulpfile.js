const outdir = './build',
    del = require('del'),
    {src, dest, series, parallel} = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    webpackConfig = require('./webpack.config.js');

function clean() {
    return del(outdir);
}

function copyRepoFiles() {
    return src([
        'LICENSE',
        'README.md',
    ]).pipe(dest(outdir));
}

function copyRootfiles() {
    return src([
        'public/browserconfig.xml',
        'public/CNAME',
        'public/keybase.txt',
        'public/manifest.json',
        'public/favicon.ico'
    ], {base: './public'})
    .pipe(dest(outdir));
}

function copyIcons() {
    return src('public/icons/*', {base:'./public'})
        .pipe(dest(outdir + '/static'))
}

function copyImages() {
    return src('public/img/*', {base:'./public'})
        .pipe(dest(outdir + '/static'))
}

function bundleCSS() {
    return src('src/styles/*.css')
        .pipe(cleanCSS())
        .pipe(concat('style.css'))
        .pipe(dest(outdir + '/static'))
}

function buildProd() {
    webpackConfig.mode = "production";
    webpackConfig.watch = false;
    return webpackStream(webpackConfig, webpack)
        .pipe(dest(outdir));
}

function buildStart() {
    webpackConfig.mode = "development";
    webpackConfig.watch = true;
    return webpackStream(webpackConfig, webpack)
        .pipe(dest(outdir));
}

const copy = parallel(
    copyRepoFiles,
    copyRootfiles,
    copyIcons,
    copyImages,
    bundleCSS
);

const start = series(
    clean,
    parallel(
        copy,
        buildStart,
    )
)

const build = series(
    clean,
    parallel(
        copy,
        buildProd,
    )
);

exports.clean = clean
exports.start = start
exports.build = build
exports.default = build