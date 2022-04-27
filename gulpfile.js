const { series, parallel, src, dest } = require('gulp'),
	sass = require('gulp-sass')(require('sass'));


/**
 * 환경설정
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

function complieCSS(cb) {
	cb();
}

function build(cb) {
	cb();
}

const defaultTasks = [
	complieCSS
]

exports.build = build;
exports.default = series(defaultTasks);