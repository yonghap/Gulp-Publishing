var gulp = require('gulp');
var sass = require('gulp-sass');

// origin source
var PATH = {
	ASSETS : {
		FONTS : './html/assets/fonts',
		IMAGES : './html/assets/images',
		STYLE : './html/assets/css'
	}
}

// dist
var DEST_PATH = {
	ASSETS : {
		FONTS : './dist/assets/fonts',
		IMAGES : './dist/assets/images',
		STYLE : './dist/assets/css',
	}
}

// sass
gulp.task('sass', () => {
	return new Promise( resolve => {
		var options = {
			outputStyle : 'expanded', // nested, expanded, compact, compressed
			indentType : 'tab',
			indentSize : 4
		}

		gulp.src(PATH.ASSETS.STYLE + '/*.scss')
			.pipe( sass(options) )
			.pipe( gulp.dest( DEST_PATH.ASSETS.STYLE) );

		resolve();
	})
});

gulp.task('default', gulp.series(['sass']));