/**
 * Created by tcstory on 1/15/16.
 */

var gulp = require('gulp');
var del = require('del');
var path = require('path');

var sourceDir = 'src';
gulp.task('prepare', function () {
    gulp.src('node_modules/vue/dist/*.js')
        .pipe(gulp.dest(path.join(sourceDir, 'js/vendor/vue/')));
    gulp.src('node_modules/font-awesome/css/*')
        .pipe(gulp.dest(path.join(sourceDir, 'css/font-awesome/css')));
    gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest(path.join(sourceDir, 'css/font-awesome/fonts/')));
    gulp.src('node_modules/socket.io-client/*')
        .pipe(gulp.dest(path.join(sourceDir, 'js/vendor/socket.io-client/')))
});

gulp.task('clean', function () {
    return del(['dist/**','!dist','!dist/assets/**']);
});