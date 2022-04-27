const { series, parallel, src, dest } = require('gulp'),
	sass = require('gulp-sass')(require('sass'));

const CONFIG = {
	language : ['ko'],
	workspace : {

	},
	deploy : {

	}
}

function sass(cb) {
	cb();
}

function build(cb) {
	cb();
}

const defaultTasks = {
	sass
}

exports.build = build;
exports.default = series(defaultTasks);