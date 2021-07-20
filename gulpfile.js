var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var del = require('del');

// origin source
var PATH = {
	HTML: './workspace/html',
	ASSETS: {
		FONTS: './workspace/assets/fonts',
		IMAGES: './workspace/assets/images',
		STYLE: './workspace/assets/scss',
		SCRIPT: './workspace/assets/script',
		LIB: './workspace/assets/lib'
	}
}

// dist
var DEST_PATH = {
	HTML: './dist',
	ASSETS: {
		FONTS: './dist/assets/fonts',
		IMAGES: './dist/assets/images',
		STYLE: './dist/assets/css',
		SCRIPT: './dist/assets/script',
		LIB: './dist/assets/lib'
	}
}

// sass
gulp.task('sass', () => {
	return new Promise(resolve => {
		var options = {
			outputStyle: 'expanded', // nested, expanded, compact, compressed
			indentType: 'tab',
			indentSize: 4
		}

		gulp.src(PATH.ASSETS.STYLE + '/*.scss')
			.pipe(sass(options))
			.pipe(gulp.dest(DEST_PATH.ASSETS.STYLE))
			.pipe(browserSync.reload({stream: true}));
		resolve();
	})
});
// nodemon
gulp.task('nodemon:start', () => {
	return new Promise(resolve => {
		nodemon({script: 'app.js', watch: 'app'});
		resolve();
	});
});
// html
gulp.task('html', () => {
	return new Promise(resolve => {
		gulp.src(PATH.HTML + '/*.html')
			.pipe(gulp.dest(DEST_PATH.HTML))
			.pipe(browserSync.reload({stream: true}));

		resolve();
	});
});
gulp.task('script:concat', () => {
	return new Promise(resolve => {
		gulp.src(PATH.ASSETS.SCRIPT + '/*.js')
			.pipe(concat('common.js'))
			.pipe(gulp.dest(DEST_PATH.ASSETS.SCRIPT))
			.pipe(browserSync.reload({stream: true}));
		resolve();
	})
});
gulp.task('script:build', () => {
	return new Promise(resolve => {
		gulp.src(PATH.ASSETS.SCRIPT + '/*.js')
			.pipe(concat('common.js'))
			.pipe(gulp.dest(DEST_PATH.ASSETS.SCRIPT))
			.pipe(uglify({mangle: true}))
			.pipe(rename('common.min.js'))
			.pipe(gulp.dest(DEST_PATH.ASSETS.SCRIPT))
			.pipe(browserSync.reload({stream: true}));
		resolve();
	})
});
// library
gulp.task('library', () => {
	return new Promise(resolve => {
		gulp.src(PATH.ASSETS.LIB + '/*')
			.pipe(gulp.dest(DEST_PATH.ASSETS.LIB));
		resolve();
	});
});
// fonts
gulp.task('fonts', () => {
	return new Promise(resolve => {
		gulp.src(PATH.ASSETS.FONTS + '/*')
			.pipe(gulp.dest(DEST_PATH.ASSETS.FONTS));
		resolve();
	});
});
gulp.task('imagemin', () => {
	return new Promise(resolve => {
		gulp.src(PATH.ASSETS.IMAGES + '/*.*')
			.pipe(imagemin([
				imagemin.gifsicle({interlaced: false}),
				imagemin.mozjpeg({quality: 75, progressive: false}),
				imagemin.optipng({optimizationLevel: 5}),
				imagemin.svgo({plugins: [{removeViewBox: true}, {cleanupIDs: false}]})]))
			.pipe(gulp.dest(DEST_PATH.ASSETS.IMAGES))
			.pipe(browserSync.reload({stream: true}));
		resolve();
	});
});
gulp.task('clean', () => {
	return new Promise(resolve => {
		del.sync(DEST_PATH.HTML);
		resolve();
	});
});

// watch
gulp.task('watch', () => {
	return new Promise(resolve => {
		gulp.watch(PATH.HTML + "/**/*.html", gulp.series(['html']));
		gulp.watch(PATH.ASSETS.STYLE + "/**/*.scss", gulp.series(['sass']));
		gulp.watch(PATH.ASSETS.SCRIPT + "/**/*.js", gulp.series(['script:build']));
		gulp.watch(PATH.ASSETS.IMAGES + "/**/*.*", gulp.series(['imagemin']));
		resolve();
	});
});
// browser sync
gulp.task('browserSync', () => {
	return new Promise(resolve => {
		browserSync.init({proxy: 'http://localhost:8005', port: 8006});
		resolve();
	});
});

var allSeries = gulp.series([
	'clean',
	'sass',
	'html',
	'script:build',
	'imagemin',
	'library',
	'fonts',
	'nodemon:start',
	'browserSync',
	'watch'
]);

gulp.task('default', allSeries);