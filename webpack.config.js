const Encore = require('@symfony/webpack-encore');
const webpack = require('webpack');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
	Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
// Directory where compiled assets will be stored
	.setOutputPath('public/build/')
	.copyFiles({
		from: './assets/images',
		to: 'images/[path][name].[ext]',
		pattern: /logo\.svg$/
	})
/* .copyFiles({
        from: './node_modules/admin-lte/dist/img',
        to: '/theme/images/[path][name].[ext]'
    }) */
	.copyFiles({
		from: './node_modules/admin-lte',
		to: '/theme/js/[path][name].[ext]',
		pattern: /\.(js)$/
	})
// Public path used by the web server to access the output path
	.setPublicPath('/build')
// Only needed for CDN's or sub-directory deploy
// .setManifestKeyPrefix('build/')

/*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
	.addEntry('app', './assets/app.js')
	.addEntry('page_index', './assets/js/pages/index/index.js')
	.addEntry('database_tables', './assets/js/pages/database/tables.js')
	.addEntry('database_form', './assets/js/pages/database/form.js')
	.addEntry('graph_form', './assets/js/pages/graph/form.js')
	.addEntry('graph_list', './assets/js/pages/graph/list.js')
	.addEntry('logview_form', './assets/js/pages/logview/form.js')
	.addEntry('navbar', './assets/js/components/_navbar.js')
	.addEntry('sidebar', './assets/js/components/_sidebar.js')
	.addEntry('js_grid', './assets/js/components/_js-grid-table.js')
	.addEntry('flot_chart', './assets/js/components/_flot-chart.js')
	.addEntry('content-header', './assets/js/components/_content-header.js')
// .addEntry('page1', './assets/page1.js')
// .addEntry('page2', './assets/page2.js')

// When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
	.splitEntryChunks()

// Will require an extra script tag for runtime.js
// but, you probably want this, unless you're building a single-page app
	.disableSingleRuntimeChunk()

/*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
	.cleanupOutputBeforeBuild()
	.enableBuildNotifications()
	.enableSourceMaps(!Encore.isProduction())
// Enables hashed filenames (e.g. app.abc123.css)
	.enableVersioning(Encore.isProduction())

// Enables @babel/preset-env polyfills
	.configureBabelPresetEnv(config => {
		config.useBuiltIns = 'usage';
		config.corejs = 3;
	})

// Enables Sass/SCSS support
	.enableSassLoader()

// Uncomment if you use TypeScript
// .enableTypeScriptLoader()

// uncomment to get integrity="..." attributes on your script & link tags
// requires WebpackEncoreBundle 1.4 or higher
// .enableIntegrityHashes(Encore.isProduction())

// uncomment if you're having problems with a jQuery plugin
	.autoProvidejQuery()

// Uncomment if you use API Platform Admin (composer req api-admin)
	.enableReactPreset()
// .addEntry('admin', './assets/admin.js')
	.addPlugin(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
// Make these plugins globally
	.addPlugin(new webpack.ProvidePlugin({
		moment: 'moment',
		daterangepicker: 'daterangepicker',
		sparkline: 'Sparkline'
	}));
module.exports = Encore.getWebpackConfig();
