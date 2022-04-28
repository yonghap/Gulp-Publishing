const { series, parallel, src, dest } = require('gulp'),
	sass = require('gulp-sass')(require('sass')),
	ejs = require('gulp-ejs'),
	nodemon = require('gulp-nodemon');

/**
 * Config
 */
const CONFIG = {
	language : ['KO','EN'],
	workspace : {
		HTML_KO : './workspace/html/html_ko',
		HTML_EN : './workspace/html/html_en',
		ASSETS : {
			FONTS : './workspace/assets/fonts',
			IMAGES : './workspace/assets/images',
			STYLE : './workspace/assets/scss',
			SCRIPT : './workspace/assets/script',
			LIBRARY : './workspace/assets/lib'
		}
	},
	deploy : {
		HTML_KO: './dist/html_ko',
		HTML_EN: './dist/html_en',
		ASSETS: {
			FONTS: './dist/assets/fonts',
			IMAGES: './dist/assets/images',
			STYLE: './dist/assets/css',
			SCRIPT: './dist/assets/script',
			LIB: './dist/assets/lib'
		}
	}
}

/**
 * @task : Sass
 */
function CSS() {
	return new Promise(resolve => {
		src(CONFIG.workspace.ASSETS.STYLE + '/*.scss')
			.pipe(sass({
				outputStyle:  'compressed'
			}).on('error', sass.logError))
			.pipe(dest(CONFIG.deploy.ASSETS.STYLE))
		resolve();
	})
}

/**
 * @task : Nodemon
 */
function ServerStart(cb) {
	return new Promise(resolve => {
		nodemon({script: 'app.js', watch: 'app'});
		resolve();
	});
}

const defaultTasks = [
	CSS
]

exports.build = build;
exports.default = series(defaultTasks);