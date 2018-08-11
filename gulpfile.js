var gulp           = require('gulp'),
    sass           = require('gulp-sass'),
    rename         = require('gulp-rename'),
    cssmin         = require('gulp-minify-css'),
    concat         = require('gulp-concat'),
    uglify         = require('gulp-uglify'),
    jshint         = require('gulp-jshint'),
    scsslint       = require('gulp-sass-lint'),
    cache          = require('gulp-cached'),
    prefix         = require('gulp-autoprefixer'),
    browserSync    = require('browser-sync'),
    reload         = browserSync.reload,
    minifyHTML     = require('gulp-minify-html'),
    size           = require('gulp-size'),
    imagemin       = require('gulp-imagemin'),
    pngquant       = require('imagemin-pngquant'),
    plumber        = require('gulp-plumber'),
    deploy         = require('gulp-gh-pages'),
    notify         = require('gulp-notify'),
    injectPartials = require('gulp-inject-partials'),
    clean          = require('gulp-clean'),
    sourcemaps     = require('gulp-sourcemaps');




gulp.task('scss', function() {
    var onError = function(err) {
      notify.onError({
          title:    "Gulp",
          subtitle: "Failure!",
          message:  "Error: <%= error.message %>",
          sound:    "Beep"
      })(err);
      this.emit('end');
  };

  return gulp.src(['scss/index.scss'])
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass())
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(prefix())
    .pipe(cssmin())
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(rename('index.min.css'))
    .pipe(gulp.dest('tmp/css'))
});

gulp.task('index', function () {
  return gulp.src('./index.html')
           .pipe(injectPartials())
           .pipe(gulp.dest('./tmp/html'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "dist/"
        }
    });
});

gulp.task('deploy', function () {
    return gulp.src('dist/**/*')
        .pipe(deploy());
});

gulp.task('js', function() {
  gulp.src('js/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('tmp/js'))
});

gulp.task('scss-lint', function() {
  gulp.src('scss/**/*.scss')
    .pipe(cache('scsslint'))
    .pipe(scsslint());
});

gulp.task('minify-html', ['index'], function() {
    var opts = {
      comments:true,
      spare:true
    };

  gulp.src('tmp/html/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('dist/'))
    .pipe(reload({stream:true}));
});

gulp.task('jshint', function() {
  gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('prepare-css', ['scss'], function() {
  gulp.src(['tmp/css/normalize.min.css', 'tmp/css/**.min.css', 'vendor/css/**.min.css'])
      .pipe(concat('main.min.css'))
      .pipe(gulp.dest('./dist/assets'))
      .pipe(reload({stream:true}));
;
});

gulp.task('prepare-js', ['js'], function() {
  gulp.src(['vendor/js/**.min.js', 'tmp/js/**.min.js'])
      .pipe(concat('main.min.js'))
      .pipe(gulp.dest('./dist/assets'))
      .pipe(reload({stream:true}));
;
});

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['prepare-css']);
  gulp.watch('js/*.js', ['jshint', 'prepare-js']);
  gulp.watch(['./*.html', 'partials/*.html'], ['minify-html']);
  gulp.watch('img/*', ['imgmin']);
});

gulp.task('imgmin', function () {
    return gulp.src('img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/assets/img'));
});

gulp.task('clean', function() {
  return gulp.src(['tmp', 'dist'], {read: false})
    .pipe(clean());
});

gulp.task('default', ['browser-sync', 'imgmin', 'minify-html', 'prepare-css', 'prepare-js','watch']);
