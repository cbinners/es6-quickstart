'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import sass from 'gulp-sass';
import webpack from 'webpack';
import nodemon from 'gulp-nodemon';
import webpackConfig from './webpack.config.js';
import browserSync from 'browser-sync';
let browserSyncInstance = browserSync.create();
let reload = browserSyncInstance.reload;

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = 'sourcemap';
myDevConfig.debug = true;


// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

let clientPaths = {
  public:         './public/client',
  scripts:        './web/client',
  assets:         './web/client/assets/**',
  styles:         './web/client/styles/**',
  stylesWatch:    ['./web/client/styles/**', './web/shared/styles/**']
};

// Client

gulp.task('client_sass', () => {
  gulp.src(`${clientPaths.styles}/app.scss`)
    .pipe(sass({errLogToConsole: true}))
    .pipe(gulp.dest(clientPaths.public))
    .pipe((reload({stream: true})));
});


gulp.task('client_assets', () => {
  gulp.src(clientPaths.assets)
    .pipe(gulp.dest(clientPaths.public));
});


gulp.task('client_watch', () => {
  gulp.watch(clientPaths.assets, ['client_assets']);
  gulp.watch(clientPaths.stylesWatch, ['client_sass']);
});


gulp.task('client_icons', ()=>{
  gulp.src('node_modules/font-awesome/fonts/**.*') .pipe(gulp.dest('./public/client/fonts'));
});



gulp.task('run:client', [
  'client_watch',
  'client_assets',
  'client_sass',
  'client_icons'
]);

gulp.task('build:client-production', [
  'webpack:build-dev',
  'client_assets',
  'client_sass',
  'client_icons'
]);

// Production build
gulp.task('build', ['webpack:build']);

gulp.task('webpack:build', (callback) => {
	// modify some webpack config options
	let myConfig = Object.create(webpackConfig);
	myConfig.plugins = myConfig.plugins.concat(
		new webpack.DefinePlugin({
			'process.env': {
				// This has effect on the react lib size
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	);

	// run webpack
	webpack(myConfig, (err, stats) => {
		if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }
		gutil.log('[webpack:build]', stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task('build-dev', ['webpack:build-dev'], () => {
	gulp.watch(['web/**/**.*'], ['webpack:build-dev']);
});

gulp.task('build-dev-sass', ['client_sass'], () => {
  gulp.watch(['web/client/styles/**.*'], ['client_sass']);
});

gulp.task('webpack:build-dev', function(callback) {
	// run webpack
	devCompiler.run(function(err, stats) {
		if (err) {
      throw new gutil.PluginError('webpack:build-dev', err);
    }
    gutil.log('[webpack:build]', stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task('browser-sync', () => {
  browserSyncInstance.init({
    proxy: 'localhost:3000',
    port: 3030,
    open: false
  });
});


gulp.task('server', ()=>{
  nodemon({ script: 'server/index.js'})
    .on('restart', ()=>{
      console.log('Server restarted');
    });
});

gulp.task('default', [
  'build-dev',
  'build-dev-sass',
  'run:client',
  'browser-sync',
  'server',
]);
