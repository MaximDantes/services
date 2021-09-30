const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const csso = require('gulp-csso')
const htmlmin = require('gulp-htmlmin')
const webp = require('gulp-webp')
const webpackStream = require('webpack-stream')
const webpack = require('webpack')
const include = require('gulp-file-include')
const sync = require('browser-sync').create()
const del = require('del')
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
// const ts = require('gulp-typescript')
// const tsProject = ts.createProject('tsconfig.json')
const changed = require('gulp-changed')
// const imagemin = require('gulp-imagemin')
const recompress = require('imagemin-jpeg-recompress')
const pngquant = require('imagemin-pngquant')
// const bs = require('browser-sync')
const plumber = require('gulp-plumber')

const html = () => {
    return src('src/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        // .pipe(htmlmin({
        //     collapseWhitespace: true
        // }))
        .pipe(dest('dist'))
}

const scss = () => {
    return src('src/scss/**.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(csso())
        // .pipe(concat('index.css'))
        .pipe(dest('dist/css'))
}

const js = () => {
    return src('src/js/**.js')
        // .pipe(webpackStream({}), webpack)
        //.pipe(concat('index.js'))
        .pipe(dest('dist/js'))
}

const images = () => {
    return src('src/img/**/*.+(png|jpg|jpeg|gif|svg|ico)')
        .pipe(plumber())
        .pipe(webp())
        .pipe(changed('dist/img'))
        .pipe(dest('dist/img'))
}

const serve = () => {
    sync.init({
        server: './dist'
    })
    watch('src/**.html', series(html)).on('change', sync.reload)
    watch('src/html/**.html', series(html)).on('change', sync.reload)
    watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
    watch('src/js/**.js', series(js)).on('change', sync.reload)
}

const clear = () => del(['dist'])

exports.start = series(clear, images, scss, js, html)
exports.default = series(clear,  images, scss, html, js, serve)