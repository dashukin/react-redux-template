
/**
 * @name gulp
 * @property pipe
 * @property on
 */

/**
 * @name webpack3
 * @property DefinePlugin
 * @property DedupePlugin
 * @property UglifyJsPlugin
 * @property LoaderOptionsPlugin
 * @property AggressiveMergingPlugin
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
import webpack3 from 'webpack';
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config';
import runSequence from 'run-sequence';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';


const clientBuildPath = './dist';

// JS files
const clientJsSrcPath = './src/**/*.js';
// output directory will be additionally controlled by webpack configuration.
// so only root build category is required
const clientJsBuildPath = './dist';

// SCSS files
const clientScssSrcPath = './src/scss/**/*.scss';
const clientScssWatchPath = './src/**/*.scss';
const clientScssBuildPath = './dist/css';

// Clean all built files
gulp.task('clean', () => {
	return del(`${clientBuildPath}/*`);
});

// Javascript build tasks
gulp.task('build-js:dev', () => {
	let webpackDevBuildConfig = Object.create(webpackConfig);
	webpackDevBuildConfig.plugins = webpackDevBuildConfig.plugins.concat(
		new ProgressBarPlugin({
			clear: false
		})
	);

	return gulp.src(clientJsSrcPath)
		.pipe(webpackStream(webpackDevBuildConfig, webpack3))
		.pipe(gulp.dest(clientJsBuildPath))
});

gulp.task('watch-js:dev', () => {

	let webpackDevWatchConfig = Object.create(webpackConfig);
	webpackDevWatchConfig.watch = true;
	webpackDevWatchConfig.plugins = webpackDevWatchConfig.plugins.concat(
		new webpack3.HotModuleReplacementPlugin(),
		new ProgressBarPlugin({
			clear: false
		})
	);

	return gulp.src(clientJsSrcPath)
		.pipe(webpackStream(webpackDevWatchConfig, webpack3))
		.pipe(gulp.dest(clientJsBuildPath));
});

gulp.task('build-js:prod', () => {

	let prodConfig = Object.create(webpackConfig);

	prodConfig.plugins = prodConfig.plugins.concat(
		new webpack3.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new webpack3.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		new webpack3.optimize.AggressiveMergingPlugin(),
		new webpack3.optimize.UglifyJsPlugin({
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
				join_vars: true
			},
			output: {
				comments: false,
			},
		}),
		new ProgressBarPlugin({
			clear: false
		})
	);

	prodConfig.devtool = "#cheap-module-source-map";

	return gulp.src(clientJsSrcPath)
		.pipe(webpackStream(prodConfig, webpack3))
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
