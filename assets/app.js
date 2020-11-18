/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.scss';

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
import 'admin-lte/plugins/jquery/jquery';
import 'admin-lte/plugins/jquery-ui/jquery-ui';

$.widget.bridge('uibutton', $.ui.button);

import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js';
// import "admin-lte/plugins/chart.js/Chart.min.js";
// import Sparkline from "admin-lte/plugins/sparklines/sparkline";
// window.Sparkline = Sparkline;
// import "admin-lte/plugins/jqvmap/jquery.vmap.min.js";
// import "admin-lte/plugins/jqvmap/maps/jquery.vmap.usa.js";
// import "admin-lte/plugins/jquery-knob/jquery.knob.min.js";
// import "admin-lte/plugins/moment/moment.min.js";
// import "admin-lte/plugins/daterangepicker/daterangepicker.js";
// import "admin-lte/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js";
// import "admin-lte/plugins/summernote/summernote-bs4.min.js";
import "admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js";
import 'admin-lte/dist/js/adminlte.js';
// import "admin-lte/dist/js/pages/dashboard.js";
import 'admin-lte/dist/js/demo.js';

// console.log("Hello Webpack Encore! Edit me in assets/app.js");
