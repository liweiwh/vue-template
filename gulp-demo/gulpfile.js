const { task, watch, series, src, dest, symlink } = require('gulp');
const uglify = require('gulp-uglify');
// var browserSync = require('browser-sync').create();

// // Static server
// gulp.task('browser-sync', function () {
//   browserSync.init({
//     server: {
//       baseDir: "./src"
//     }
//   });

//   gulp.watch('src/*.html', function (cb) {
//     browserSync.reload()
//     cb()
//   })
// });

// 使用uglify处理scripts文件
const scripts = (cb) => {
  src('src/**/*.js')
    .pipe(uglify())
    .pipe(dest('dist/'))
  cb()
}

// sass autoprefixer
// images
const link = (cb) => {
  src('src/js/*.js')
    .pipe(symlink('dist/js'))
  cb()
}

const watchTask = () => {
  watch('src/*.html', scripts)
}

task('task-name', scripts)
task('link', link)

task('default', series(['task-name', watchTask]))