/*global require*/
// relative or absolute path of Components' main.js
require([
    '../../submodules/fenix-ui-common/js/Compiler',
    '../../submodules/fenix-ui-menu/js/paths',
    '../../submodules/fenix-ui-dashboard/src/js/paths',
    '../../submodules/fenix-ui-table-creator/src/js/paths',
    '../../submodules/fenix-ui-chart-creator/src/js/paths',
    '../../submodules/fenix-ui-filter/src/js/paths'
], function (Compiler, Menu, Dashboard, TableCreator, ChartCreator, Filter) {

    var menuConfig = Menu;
    menuConfig['baseUrl'] = '../../submodules/fenix-ui-menu/js';

    var dashboardConfig = Dashboard;
    dashboardConfig['baseUrl'] = '../../submodules/fenix-ui-dashboard/src/js/';

    var tableCreatorConfig = TableCreator;
    tableCreatorConfig['baseUrl'] = '../../submodules/fenix-ui-table-creator/src/js/';

    var chartCreatorConfig = ChartCreator;
    chartCreatorConfig['baseUrl'] = '../../submodules/fenix-ui-chart-creator/src/js/';

    var filterConfig = Filter;
    filterConfig['baseUrl'] = '../../submodules/fenix-ui-filter/';

    Compiler.resolve([ menuConfig, dashboardConfig, tableCreatorConfig, chartCreatorConfig, filterConfig],
        {
            placeholders:  {"FENIX_CDN": "//fenixapps.fao.org/repository"},
            config: {

                locale: 'en',

                // The path where your JavaScripts are located
                baseUrl: './scripts/ctryprofiles',

                // Specify the paths of vendor libraries
                 paths: {
                    'jquery': '{FENIX_CDN}/js/jquery/2.1.1/jquery.min',
                    'amplify': '{FENIX_CDN}/js/amplify/1.1.2/amplify.min',
                    'underscore': '{FENIX_CDN}/js/underscore/1.7.0/underscore.min',
                     //'underscore': '{FENIX_CDN}/js/lodash/2.4.1/lodash',
                   // 'backbone': "{FENIX_CDN}/js/backbone/1.1.2/backbone.min",
                     'backbone': "../../submodules/fenix-ui-dashboard/src/lib/backbone/backbone",
                     handlebars: "{FENIX_CDN}/js/handlebars/2.0.0/handlebars",
                     chaplin: "{FENIX_CDN}/js/chaplin/1.0.1/chaplin.min"
                },

                // Underscore and Backbone are not AMD-capable per default,
                // so we need to use the AMD wrapping of RequireJS
                shim: {
                    underscore: {
                        exports: '_'
                    },
                    backbone: {
                        deps: ['underscore', 'jquery'],
                        exports: 'Backbone'
                    },
                    handlebars: {
                        exports: 'Handlebars'
                    },
                    amplify: {
                        deps: ['jquery'],
                        exports: 'amplify'
                    }
                }
                // For easier development, disable browser caching
                // Of course, this should be removed in a production environment
                //, urlArgs: 'bust=' +  (new Date()).getTime()
            }
        });

    // Bootstrap the application
    require([
        'application',
        'routes',
        'domReady!'
    ], function (Application, routes) {

        new Application({
            routes: routes,
            controllerSuffix: '-controller',
            root: '/uae/',
            pushState: false
        });
    });
});