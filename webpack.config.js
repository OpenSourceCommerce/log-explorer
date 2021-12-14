const Encore = require('@symfony/webpack-encore');
const webpack = require('webpack');

const path = require("path");
require('dotenv').config( {
    path: path.join(__dirname, '.env')
});

// default build output to /public/assets
const APP_WEBPACK_FOLDER = process.env.APP_WEBPACK_FOLDER || 'assets';

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
// Directory where compiled assets will be stored
	.setOutputPath('public/' + APP_WEBPACK_FOLDER)
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
	.setPublicPath('/' + APP_WEBPACK_FOLDER)
// Only needed for CDN's or sub-directory deploy
// .setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
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
	.addEntry('user_list', './assets/js/pages/user/list.js')
	.addEntry('user_form', './assets/js/pages/user/form.js')
	.addEntry('user_confirmation', './assets/js/pages/user/confirmation.js')
	.addEntry('user_profile', './assets/js/pages/user/profile.js')
	.addEntry('navbar', './assets/js/components/_navbar.js')
	.addEntry('sidebar', './assets/js/components/_sidebar.js')
	.addEntry('js_grid', './assets/js/components/_js-grid-table.js')
	.addEntry('flot_chart', './assets/js/components/_flot-chart.js')
	.addEntry('content-header', './assets/js/components/_content-header.js')
	.addEntry('welcome-page', './assets/js/pages/index/welcome.js')
	.addEntry('page_login', './assets/js/pages/security/login.js')
	.addEntry('page_forgot', './assets/js/pages/security/forgot.js')
	.addEntry('page_reset', './assets/js/pages/security/reset-password.js')
	.addEntry('page_change_password', './assets/js/pages/user/change-password.js')
	.addEntry('dashboard_list', './assets/js/pages/dashboard/list.js')
	.addEntry('dashboard_form', './assets/js/pages/dashboard/form.js')
	.addEntry('widget_list', './assets/js/pages/widget/list.js')
	.addEntry('widget_form', './assets/js/pages/widget/form.js')
  .addEntry('dashboard-page', './assets/js/pages/index/dashboard.js')
  .addEntry('alerts_list', './assets/js/pages/alerts/list.js')
  .addEntry('alerts_form', './assets/js/pages/alerts/form.js')
  .addEntry('export_list', './assets/js/pages/export/list.js')
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
  .configureBabel(function(babelConfig) {
      babelConfig.plugins.push('@babel/plugin-proposal-class-properties');
  })
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
	}))
module.exports = Encore.getWebpackConfig();
