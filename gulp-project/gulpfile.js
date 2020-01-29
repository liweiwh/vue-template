const { task, src, dest, lastRun, watch, series, parallel } = require('gulp')
const rm = require('rimraf')
const pump = require('pump')
const browserSync = require('browser-sync')
const reload = browserSync.reload
const $ = require('gulp-load-plugins')()

// 参见 gulp-uglify-es
const uglify = $.uglifyEs.default
// const imageMin = require('gulp-imagemin')

// 删除dist目录
const delTask = (cb) => {
  rm('dist', cb)
}

// 处理图片
const imgTask = (cb) => {
  pump([
    src('src/img/**', { since: lastRun(imgTask) }),
    $.imagemin(),
    dest('dist/img'),
    reload({
      stream: true
    })
  ], cb)
}

// 处理js
const jsTask = (cb) => {
  pump([
    src('src/js/**/*.js', { since: lastRun(jsTask) }),
    uglify(),
    dest('dist/js'),
    reload({
      stream: true
    })
  ], cb)
}

// 处理css
const cssTask = (cb) => {
  pump([
    src('src/css/**/*.scss', { since: lastRun(cssTask) }),
    $.sass(),
    $.autoprefixer({
      cascade: false
    }),
    dest('dist/css'),
    reload({
      stream: true
    })
  ], cb)
}
// 监听文件的变化 watch
const watchTask = () => {
  watch('src/js/**/*.js', jsTask)
  watch('src/css/**/*.scss', cssTask)
  watch('src/img/**', imgTask)
  watch('src/*.html', copyTask)
}

// 拷贝html文件
const copyTask = (cb) => {
  pump([
    src('src/*.html'),
    dest('dist'),
    reload({
      stream: true
    })
  ], cb)
}

// 启动server
const serveTask = (cb) => {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
  cb()
}

task('clean', delTask)
task('image', imgTask)
task('scripts', jsTask)
task('style', cssTask)
task('watch', watchTask)
task('serve', serveTask)
task('copy', copyTask)

exports.default = series([
  'clean',
  'image',
  parallel(['scripts', 'style']),
  'copy',
  'serve',
  'watch'
])

exports.build = series([
  'clean',
  'image',
  parallel(['scripts', 'style']),
  'copy',
])