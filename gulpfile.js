var gulp = require('gulp'),
	sass = require('gulp-sass'),
	nodemon = require('gulp-nodemon'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	imagemin = require('gulp-imagemin'),
	del = require('del'),
	browserSync = require('browser-sync').create();

/**
 * 작업 경로
 */
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
/**
 * 산출물 경로
 */
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
/**
 * @task : Sass
 */
gulp.task('sass', () => {
	return new Promise(resolve => {
		var options = {
			outputStyle: 'compact', // nested, expanded, compact, compressed
		}

		gulp.src(PATH.ASSETS.STYLE + '/*.scss')
			.pipe(sass(options))
			.pipe(gulp.dest(DEST_PATH.ASSETS.STYLE))
			.pipe(browserSync.reload({stream: true}));
		resolve();
	})
});
/**
 * @task : NodeMon
 */
gulp.task('nodemon:start', () => {
	return new Promise(resolve => {
		nodemon({script: 'app.js', watch: 'app'});
		resolve();
	});
});

/**
 * @task : Script 병합
 */
gulp.task('script:concat', () => {
	return new Promise(resolve => {
		gulp.src(PATH.ASSETS.SCRIPT + '/*.js')
			.pipe(concat('common.js'))
			.pipe(gulp.dest(DEST_PATH.ASSETS.SCRIPT))
			.pipe(browserSync.reload({stream: true}));
		resolve();
	})
});
/**
 * @task : Script 병합, 압축, 이름변경
 */
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
/**
 * @task : 이미지 최적화
 */
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
/**
 * @task : HTML 배포
 */
gulp.task('html', () => {
	return new Promise(resolve => {
		gulp.src(PATH.HTML + '/*.html')
			.pipe(gulp.dest(DEST_PATH.HTML))
			.pipe(browserSync.reload({stream: true}));

		resolve();
	});
});
/**
 * @task : 라이브러리 배포
 */
gulp.task('library', () => {
	return new Promise(resolve => {
		gulp.src(PATH.ASSETS.LIB + '/*')
			.pipe(gulp.dest(DEST_PATH.ASSETS.LIB));
		resolve();
	});
});
/**
 * @task : 폰트 배포
 */
gulp.task('fonts', () => {
	return new Promise(resolve => {
		gulp.src(PATH.ASSETS.FONTS + '/*')
			.pipe(gulp.dest(DEST_PATH.ASSETS.FONTS));
		resolve();
	});
});
/**
 * @task : 배포 폴더 삭제
 */
gulp.task('clean', () => {
	return new Promise(resolve => {
		del.sync(DEST_PATH.HTML);
		resolve();
	});
});
/**
 * @task : Watch
 */
gulp.task('watch', () => {
	return new Promise(resolve => {
		gulp.watch(PATH.HTML + "/**/*.html", gulp.series(['html']));
		gulp.watch(PATH.ASSETS.STYLE + "/**/*.scss", gulp.series(['sass']));
		gulp.watch(PATH.ASSETS.SCRIPT + "/**/*.js", gulp.series(['script:build']));
		gulp.watch(PATH.ASSETS.IMAGES + "/**/*.*", gulp.series(['imagemin']));
		resolve();
	});
});
/**
 * @task : Browser Sync
 */
gulp.task('browserSync', () => {
	return new Promise(resolve => {
		browserSync.init({proxy: 'http://localhost:8005', port: 8006});
		resolve();
	});
});
/**
 * Run Task
 */
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