
/**
 * @name gulp
 * @property pipe
 * @property on
 */

/**
 * @name webpack2
 * @property DefinePlugin
 * @property DedupePlugin
 * @property UglifyJsPlugin
 * @property LoaderOptionsPlugin
 * @property HotModuleReplacementPlugin
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
import webpack2 from 'webpack';
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
		.pipe(gulpWebpack(webpackConfig, webpack2))
		.pipe(gulp.dest(clientJsBuildPath))
});

gulp.task('watch-js:dev', () => {
	
	let webpackDevWatchConfig = Object.create(webpackConfig);
	webpackDevWatchConfig.watch = true;
	webpackDevWatchConfig.plugins.concat(
		new webpack.HotModuleReplacementPlugin()
	);

	return gulp.src(clientJsSrcPath)
		.pipe(gulpWebpack(webpackDevWatchConfig), webpack2)
		.pipe(gulp.dest(clientJsBuildPath));
});

gulp.task('build-js:prod', () => {
	
	let prodConfig = Object.create(require('./webpack.config'));
	
	prodConfig.plugins = prodConfig.plugins.concat(
		new webpack2.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new webpack2.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		new webpack2.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				conditionals: true,
				unused: true,
				comparisons: true,
				sequences: true,
				dead_code: true,
				evaluate: true,
				if_return: true,
				join_vars: true,
			},
			output: {
				comments: false,
			},
		})
	);

	prodConfig.devtool = "#source-map";

	return gulp.src(clientJsSrcPath)
		.pipe(gulpWebpack(prodConfig, webpack2))
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
