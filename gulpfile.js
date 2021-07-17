var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');

// origin source
var PATH = {
	HTML: './workspace/html',
	ASSETS: {
		FONTS: './workspace/assets/fonts',
		IMAGES: './workspace/assets/images',
		STYLE: './workspace/assets/scss'
	}
}

// dist
var DEST_PATH = {
	HTML: './dist',
	ASSETS: {
		FONTS: './dist/assets/fonts',
		IMAGES: './dist/assets/images',
		STYLE: './dist/assets/css',
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
			.pipe(gulp.dest(DEST_PATH.ASSETS.STYLE));

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
			.pipe(gulp.dest(DEST_PATH.HTML));
		resolve();
	});
});
// watch
gulp.task('watch', () => {
	return new Promise(resolve => {
		gulp.watch(PATH.HTML + "/**/*.html", gulp.series(['html']));
		gulp.watch(PATH.ASSETS.STYLE + "/**/*.scss", gulp.series(['scss']));
		resolve();
	});
});
// browser sync
gulp.task('browserSync', () => {
	return new Promise(resolve => {
		browserSync.init(null, {proxy: 'http://localhost:8005', port: 8006});
		resolve();
	});
});

gulp.task('default', gulp.series(['sass', 'html', 'nodemon:start','browserSync','watch']));