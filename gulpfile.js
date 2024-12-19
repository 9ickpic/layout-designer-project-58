const gulp = require('gulp');
const pug = require('gulp-pug'); // плагин для работы с Pug
const sass = require('gulp-sass')(require('sass')); // плагин для работы с SASS
const plumber = require('gulp-plumber'); // для обработки ошибок
const notify = require('gulp-notify'); // для вывода уведомлений в терминал

// Задача для компиляции Pug в HTML
function compilePug() {
    return gulp.src('./src/*.pug')
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(pug({
            pretty: true // форматированный HTML
        }))
        .pipe(gulp.dest('./dist'));
}

// Задача для компиляции SASS в CSS
function compileSass() {
    return gulp.src('./src/styles/scss/input.scss')
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/styles/'));
}

// Задача для отслеживания изменений в файлах Pug и SASS
function watchFiles() {
    gulp.watch('./src/*.pug', compilePug); // следить за всеми файлами Pug в папке src
    gulp.watch('./src/styles/scss/*.scss', compileSass); // следить за всеми файлами SASS в папке scss
}

// Основной таск, включающий компиляцию и наблюдение
exports.default = gulp.series(compilePug, compileSass, watchFiles);