var gulp = require('gulp'); //default
var sass = require('gulp-sass');//sass complie
var concat = require('gulp-concat'); //compile js plugins into one file
var concatCss = require('gulp-concat-css');//compile css plugins into one file
var watch = require('gulp-watch'); //sass compile to css

gulp.task('sass', function () {
    return gulp.src('html/scss/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('html/css/'));
});
gulp.task('watch', function () {
    gulp.watch('html/scss/**/*.scss', ['sass']);
});

gulp.task('concat', function () {
    return gulp.src(
            [
                'html/plugins/jquery/dist/jquery.min.js',
                'html/plugins/bootstrap/dist/js/bootstrap.bundle.min.js',
                'html/plugins/magnific-popup/dist/jquery.magnific-popup.min.js',
                'html/plugins/owl-carousel/owl.carousel.min.js',
                'html/js/typed.min.js',
                'html/js/smooth-scroll.min.js',
                'html/js/wow.min.js',
                'html/plugins/pushy/js/pushy.min.js',
                'html/js/jquery.backstretch.min.js'
            ])
            .pipe(concat('bundle.js'))
            .pipe(gulp.dest('html/js/bundle/'));
});

gulp.task('concatCss', function () {
    return gulp.src([
       
        'html/plugins/font-awesome/css/font-awesome.min.css',
        'html/css/animate.css',
        'html/plugins/magnific-popup/dist/magnific-popup.css',
        'html/plugins/owl-carousel/assets/owl.carousel.min.css',
        'html/plugins/owl-carousel/assets/owl.theme.default.min.css',
        'html/plugins/et-line-font/et-line.css',
        'html/plugins/pushy/css/pushy.css',
        'html/plugins/bootstrap/dist/css/bootstrap.min.css',
    ])
            .pipe(concatCss("plugins/plugins.css"))
            .pipe(gulp.dest('html/css/'));
});