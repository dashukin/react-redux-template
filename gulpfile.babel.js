
/**
 * @name gulp
 * @property pipe
 * @property on
 */

/**
 * @name webpack
 * @property DefinePlugin
 * @property DedupePlugin
 * @property UglifyJsPlugin
 */

/**
 * @name fsExtra
 * @type {Object}
 * @property readFileSync
 * @property writeFileSync
 */

import gulp from 'gulp';
import del from 'del';
import sass from 'gulp-sass';
import webpack from 'webpack';
import gulpWebpack from 'gulp-webpack';
import webpackConfig from './webpack.config';
import runSequence from 'run-sequence';
import yargs from 'yargs';

const {argv} = yargs;

const clientBuildPath = './build';

// JS files
const clientJsSrcPath = './src/**/*.js';
// output directory will be additionally controlled by webpack configuration. 
// so only root build category is required
const clientJsBuildPath = './build';

// SCSS files
const clientScssSrcPath = './src/scss/**/*.scss';
const clientScssWatchPath = './src/**/*.scss';
const clientScssBuildPath = './build/css';

// Clean all built files
gulp.task('clean', () => {
	return del(`${clientBuildPath}/*`);
});

// Javascript build tasks
gulp.task('build-js:dev', () => {
	return gulp.src(clientJsSrcPath)
		.pipe(gulpWebpack(webpackConfig))
		.pipe(gulp.dest(clientJsBuildPath))
});

gulp.task('watch-js:dev', () => {
	
	let webpackDevWatchConfig = Object.create(webpackConfig);
	webpackDevWatchConfig.watch = true;
	
	return gulp.src(clientJsSrcPath)
		.pipe(gulpWebpack(webpackDevWatchConfig))
		.pipe(gulp.dest(clientJsBuildPath));
});

gulp.task('build-js:prod', () => {
	
	let prodConfig = Object.create(webpackConfig);
	
	prodConfig.plugins = prodConfig.plugins.concat(
		new webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new webpack.optimize.UglifyJsPlugin()
	)

	prodConfig.devtool = "#cheap-module-source-map"

	return gulp.src(clientJsSrcPath)
		.pipe(gulpWebpack(prodConfig))
		.pipe(gulp.dest(clientJsBuildPath));
});

gulp.task('watch-js', () => {
	return gulp.watch(clientJsSrcPath, ['watch-js:dev']);
});


// SCSS build tasks
gulp.task('build-scss', () => {
	return gulp.src(clientScssSrcPath)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(clientScssBuildPath));
});

gulp.task('watch-scss', () => {
	return gulp.watch(clientScssWatchPath, ['build-scss']);
});


// Dev task 
gulp.task('start-dev', () => {
	runSequence(
		'clean',
		['build-js:dev', 'build-scss'],
		['watch-js', 'watch-scss']
	);
});


// Build task
gulp.task('build', () => {
	runSequence(
		'clean',
		['build-js:prod', 'build-scss']
	);
});
