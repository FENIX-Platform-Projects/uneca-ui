/*global require*/
// relative or absolute path of Components' main.js
require([
    './submodules/fenix-ui-common-dm/js/Compiler',
    './submodules/fenix-ui-common-dm/js/paths',
    './submodules/fenix-ui-datamanagement-commons/js/paths',
    './submodules/fenix-ui-DataEditor/js/paths',
    './submodules/fenix-ui-DSDEditor/js/paths',
    './submodules/fenix-ui-metadata-editor/js/paths',
    './submodules/fenix-ui-catalog-dm/js/paths',
    './submodules/fenix-ui-menu/src/js/paths',
    './submodules/fenix-ui-data-management/src/js/paths'
], function (Compiler, FenixCommons, DataMngCommons, DataEditor, DSDEditor, MetadataEditor, Catalog, Menu, DataMng) {

    'use strict';

    var dataEditorConfig = DataEditor;
    dataEditorConfig.baseUrl = './submodules/fenix-ui-DataEditor/js';

    var dataMngCommonsConfig = DataMngCommons;
    dataMngCommonsConfig['baseUrl'] = './submodules/fenix-ui-datamanagement-commons/js';

    var dsdEditorConfig = DSDEditor;
    dsdEditorConfig.baseUrl = './submodules/fenix-ui-DSDEditor/js';

    var metadataEditorConfig = MetadataEditor;
    metadataEditorConfig.baseUrl = './submodules/fenix-ui-metadata-editor/js/';

    var catalogConfig = Catalog;
    catalogConfig.baseUrl = './submodules/fenix-ui-catalog-dm/js/';

    var menuConfig = Menu;
    menuConfig.baseUrl = './submodules/fenix-ui-menu/src/js';

    var dataMngConfig = DataMng;
    dataMngConfig.baseUrl = './submodules/fenix-ui-data-management/src/js';

    var fenixCommonConfig = FenixCommons;
    fenixCommonConfig.baseUrl = './submodules/fenix-ui-common-dm/js';

    Compiler.resolve([dataEditorConfig, dataMngCommonsConfig, dsdEditorConfig, metadataEditorConfig, catalogConfig, menuConfig, dataMngConfig, fenixCommonConfig],
        {
            placeholders: {"FENIX_CDN": "//fenixrepo.fao.org/cdn"},
            config: {

                locale: 'en',

                // Specify the paths of vendor libraries
                paths: {
                    underscore: "{FENIX_CDN}/js/underscore/1.7.0/underscore.min",
                    backbone: "{FENIX_CDN}/js/backbone/1.1.2/backbone.min",
                    handlebars: "{FENIX_CDN}/js/handlebars/4.0.5/handlebars.min",
                    chaplin: "{FENIX_CDN}/js/chaplin/1.0.1/chaplin.min",
                    amplify: '{FENIX_CDN}/js/amplify/1.1.2/amplify.min',
                    rsvp: '{FENIX_CDN}/js/rsvp/3.0.17/rsvp',
                    i18n: "{FENIX_CDN}/js/requirejs/plugins/i18n/2.0.4/i18n",
                    pnotify: '{FENIX_CDN}/js/pnotify/2.0.1/pnotify.custom.min',
                    'bootstrap-datetimepicker': "{FENIX_CDN}/js/bootstrap-datetimepicker/3.1.3/bootstrap-datetimepicker",

                    'fx-d-m/templates/site' : "./src/js/templates/site.hbs",
                    'fx-d-m/config/config' : "./config/submodules/fx-data-mng/Config",
                    'fx-d-m/i18n/nls/site' : "./i18n/site",
                    'fx-cat-br/config/config': './config/submodules/fx-catalog/config',

                    //'fx-menu/config/config': './config/submodules/fx-catalog/config',

                    'fx-submodules/config/baseConfig': './config/submodules/config_base'

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
                        exports: 'amplifyjs'
                    }
                }
                // For easier development, disable browser caching
                // Of course, this should be removed in a production environment
                //, urlArgs: 'bust=' +  (new Date()).getTime()
            }
        });

    // Bootstrap the application
    require([
        'fx-d-m/start',
        'fx-d-m/routes',
        'fx-common/AuthManager'
    ], function (Application, routes, AuthManager) {


        var authMAnager = new AuthManager();
        if(authMAnager.isLogged()) {


            var app = new Application({
                routes: routes,
                controllerSuffix: '-controller',
                controllerPath: './submodules/fenix-ui-data-management/src/js/controllers/',
                root: '/uneca/',
                pushState: false
            });
        }else{
            window.location.replace("./index.html");
        }
    });
});