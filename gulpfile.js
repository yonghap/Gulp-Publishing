const {series, parallel, watch, src, dest} = require('gulp'),
	sass = require('gulp-sass')(require('sass')),
	ejs = require('gulp-ejs'),
	imagemin = require('gulp-imagemin'),
	del = require('del'),
	nodemon = require('gulp-nodemon'),
	browserSync = require('browser-sync').create();

/**
 * Config
 */
const CONFIG = {
	workspace: {
		HTML: './workspace/html',
		ASSETS: {
			FONTS: './workspace/assets/fonts',
			IMAGES: './workspace/assets/images',
			STYLE: './workspace/assets/scss',
			SCRIPT: './workspace/assets/script',
			LIBRARY: './workspace/assets/library'
		}
	},
	deploy: {
		HTML: './dist/html',
		ASSETS: {
			FONTS: './dist/assets/fonts',
			IMAGES: './dist/assets/images',
			STYLE: './dist/assets/css',
			SCRIPT: './dist/assets/script',
			LIBRARY: './dist/assets/library'
		}
	}
}

/**
 * @task : EJS
 */
function EJS() {
	return new Promise(resolve => {
		src([CONFIG.workspace.HTML + '/**/*.html', '!'+CONFIG.workspace.HTML + '/**/include/*.html'],)
			.pipe(ejs())
			.pipe(dest(CONFIG.deploy.HTML));
		resolve();
	});
}

/**
 * @task : Sass
 */
function CompileCSS() {
	return new Promise(resolve => {
		src(CONFIG.workspace.ASSETS.STYLE + '/*.scss')
			.pipe(sass({
				outputStyle: 'compressed'
			}).on('error', sass.logError))
			.pipe(dest(CONFIG.deploy.ASSETS.STYLE))
		resolve();
	})
}

/**
 * @task : Imagemin
 */
function Imagemin() {
	return new Promise(resolve => {
		src(CONFIG.workspace.ASSETS.IMAGES + '/*.*')
			.pipe(imagemin([
				imagemin.gifsicle({interlaced: false}),
				imagemin.mozjpeg({quality: 95, progressive: false}),
				imagemin.optipng({optimizationLevel: 5}),
				imagemin.svgo({plugins: [{removeViewBox: true}, {cleanupIDs: false}]})]))
			.pipe(dest(CONFIG.deploy.ASSETS.IMAGES));
		resolve();
	});
}

/**
 * @task : Copy - Library
 */
function Library() {
	return new Promise(resolve => {
		src(CONFIG.workspace.ASSETS.LIBRARY + '/**/*')
			.pipe(dest(CONFIG.deploy.ASSETS.LIBRARY));
		resolve();
	});
}

/**
 * @task : Copy - Javascript
 */
function Script() {
	return new Promise(resolve => {
		src(CONFIG.workspace.ASSETS.SCRIPT + '/**/*')
			.pipe(dest(CONFIG.deploy.ASSETS.SCRIPT));
		resolve();
	});
}

/**
 * @task : Copy - Fonts
 */
function Font() {
	return new Promise(resolve => {
		src(CONFIG.workspace.ASSETS.FONTS + '/**/*')
			.pipe(dest(CONFIG.deploy.ASSETS.FONTS));
		resolve();
	});
}

/**
 * @task : Clean
 */
function Clean() {
	return new Promise(resolve => {
		del.sync('./dist');
		resolve();
	});
}

/**
 * @task : Watch
 */
function Watch() {
	watch(CONFIG.workspace.HTML + '/**/*.html', EJS);
	watch(CONFIG.workspace.ASSETS.STYLE + '/**/*.scss', CompileCSS);
	watch(CONFIG.workspace.ASSETS.IMAGES + "/*.*", Imagemin);
	watch(CONFIG.workspace.ASSETS.SCRIPT + "/*.*", Script);
}

/**
 * @task : Browser Sync
 */
function BrowserSync() {
	return new Promise(resolve => {
		browserSync.init({proxy: 'http://localhost:8005', port: 8006});
		resolve();
	});
}

/**
 * @task : Nodemon
 */
function ServerStart() {
	return new Promise(resolve => {
		nodemon({script: 'app.js', watch: 'app'});
		resolve();
	});
}

const defaultTasks = [
	CompileCSS,
	EJS,
	Script,
	Library,
	Font,
	Imagemin,
	ServerStart,
	BrowserSync,
	Watch
]

module.exports = {
	default : series(defaultTasks),
	clean : series(Clean)
}
