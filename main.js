/*global require*/

require([
    './submodules/fenix-ui-common/js/Compiler',
    './submodules/fenix-ui-common/js/paths',
    './submodules/fenix-ui-menu/js/paths',
    './submodules/fenix-ui-analysis/js/paths',
    './submodules/fenix-ui-catalog/js/paths',
    './submodules/fenix-ui-DataEditor/js/paths',
    './submodules/fenix-ui-DSDEditor/js/paths',
/*
    './submodules/fenix-ui-dataUpload/js/paths',
*/
    './submodules/fenix-ui-metadata-editor/js/paths',
    './submodules/fenix-ui-metadata-viewer/src/js/paths',
    './submodules/fenix-ui-map-creator/src/js/paths',
    './submodules/fenix-ui-chart-creator/src/js/paths',
    './submodules/fenix-ui-table-creator/src/js/paths',
    './submodules/fenix-ui-reports/src/js/paths',
    './submodules/fenix-ui-dashboard/src/js/paths',
    './submodules/fenix-ui-filter/src/js/paths',
    './submodules/fenix-ui-olap/js/paths',

], function (Compiler, Common, Menu, Analysis, Catalog,
             DataEditor, DSDEditor, /*DataUpload,*/MetadataEditor, MetadataViewer,
             MapCreator,ChartCreator, TableCreator, FenixReport, Dashboard, Filter, Olap  ) {

    'use strict';

    var submodules_path = '../../submodules/';

    var commonConfig = Common;
    commonConfig.baseUrl = submodules_path + 'fenix-ui-common/js';

    var menuConfig = Menu;
    menuConfig.baseUrl = submodules_path + '/fenix-ui-menu/js';

    var analysisConfig = Analysis;
    analysisConfig.baseUrl = submodules_path +'fenix-ui-analysis/js/';

    var catalogConfig = Catalog;
    catalogConfig.baseUrl = submodules_path +'fenix-ui-catalog/js/';

    var dataEditorConfig = DataEditor;
    dataEditorConfig.baseUrl = submodules_path +'fenix-ui-DataEditor/js/';

    var dsdEditorConfig = DSDEditor;
    dsdEditorConfig.baseUrl = submodules_path +'fenix-ui-DSDEditor/js/';

    var metadataEditorConfig = MetadataEditor;
    metadataEditorConfig.baseUrl = submodules_path +'fenix-ui-metadata-editor/js/';

    var metadataViewerConfig = MetadataViewer;
    metadataViewerConfig.baseUrl= submodules_path +'fenix-ui-metadata-viewer/src/js/';

    var mapCreatorConfig = MapCreator;
    mapCreatorConfig.baseUrl= submodules_path +'fenix-ui-map-creator/src/js/';

    var chartCreatorConfig = ChartCreator;
    chartCreatorConfig.baseUrl= submodules_path +'fenix-ui-chart-creator/src/js/';

    var tableCreatorConfig = TableCreator;
    tableCreatorConfig.baseUrl= submodules_path +'fenix-ui-table-creator/src/js/';

    var fenixReportConfig = FenixReport;
    fenixReportConfig.baseUrl= submodules_path +'fenix-ui-reports/src/js/';

    var dashboardConfig = Dashboard;
    dashboardConfig.baseUrl= submodules_path +'fenix-ui-dashboard/src/js/';

    var filterConfig = Filter;
    filterConfig.baseUrl =  submodules_path +'fenix-ui-filter/';

    var olapConfig = Olap;
    olapConfig.baseUrl =  submodules_path +'fenix-ui-olap/js';

    Compiler.resolve([commonConfig, menuConfig, analysisConfig,catalogConfig,
            dataEditorConfig,dsdEditorConfig,/*dataUploadConfig,*/metadataEditorConfig,metadataViewerConfig,/*faostatThemeConfig,*/
            mapCreatorConfig,chartCreatorConfig,tableCreatorConfig,fenixReportConfig,filterConfig, dashboardConfig, olapConfig],
        {
            placeholders: {"FENIX_CDN": "http://fenixrepo.fao.org/cdn"},

            config: {

                //Set the config for the i18n
                i18n: {
                    locale: 'en'
                },

                // The path where your JavaScripts are located
                baseUrl: './src/js',

                // Specify the paths of vendor libraries
                paths: {
                    bootstrap: "{FENIX_CDN}/js/bootstrap/3.3.4/js/bootstrap.min",
                    underscore: "{FENIX_CDN}/js/underscore/1.7.0/underscore.min",
                    backbone: "{FENIX_CDN}/js/backbone/1.1.2/backbone.min",
                    handlebars: "{FENIX_CDN}/js/handlebars/2.0.0/handlebars",
                    chaplin: "{FENIX_CDN}/js/chaplin/1.0.1/chaplin.min",
                    domReady: "{FENIX_CDN}/js/requirejs/plugins/domready/2.0.1/domReady",
                    i18n: "{FENIX_CDN}/js/requirejs/plugins/i18n/2.0.4/i18n",
                    text: '{FENIX_CDN}/js/requirejs/plugins/text/2.0.12/text',
                    rsvp: '{FENIX_CDN}/js/rsvp/3.0.17/rsvp',
                    "bootstrap-list-filter" :'{FENIX_CDN}/js/bootstrap-list-filter/0.2.1/bootstrap-list-filter.min',

                    //Threejs
                    copyShader : "{FENIX_CDN}/js/threejs/4.4/CopyShader",
                    effectComposer : "{FENIX_CDN}/js/threejs/4.4/EffectComposer",
                    maskPass : "{FENIX_CDN}/js/threejs/4.4/MaskPass",
                    orbitControls : "{FENIX_CDN}/js/threejs/4.4/OrbitControls",
                    projector : "{FENIX_CDN}/js/threejs/4.4/Projector",
                    renderPass : "{FENIX_CDN}/js/threejs/4.4/RenderPass",
                    shaderPass : "{FENIX_CDN}/js/threejs/4.4/ShaderPass",
                    canvasRender: "{FENIX_CDN}/js/threejs/4.4/CanvasRenderer", // TO BE REVIEWED
                    detector: "{FENIX_CDN}/js/threejs/4.4/Detector", // TO BE REVIEWED
                    tweenMax: "{FENIX_CDN}/js/tweenmax/1.18.0/tweenmax.min", // TO BE REVIEWED
                    threejs : "{FENIX_CDN}/js/threejs/4.4/three.min",
                    loglevel : "{FENIX_CDN}/js/loglevel/1.4.0/loglevel",

                    'highcharts': '{FENIX_CDN}/js/highcharts/4.1.6/js/highcharts',

                    amplify: '{FENIX_CDN}/js/amplify/1.1.2/amplify.min',

                    nls: "../../i18n",
                    config: "../../config",
                    json: "../../json",

                    'webix' : 'http://fenixrepo.fao.org/cdn/js/webix/2.2.1/js/webix',

                    'fx-common/config/auth_users' : '../../config/auth_users.json',

                    "fx-cat-br/config/fx-catalog-blank-filter": '../../config/submodules/fx-catalog/blankFilter',
                    "fx-cat-br/config/fx-catalog-collapsible-menu-config": '../../config/submodules/fx-catalog/fx-catalog-collapsible-menu-config',
                    "fx-cat-br/config/fx-catalog-filter-mapping": '../../config/submodules/fx-catalog/fx-catalog-filter-mapping',
                    "fx-cat-br/config/fx-catalog-modular-form-config": '../../config/submodules/fx-catalog/fx-catalog-modular-form-config',

                    'fx-ana/config/services' : '../../config/submodules/fx-analysis/Config',

                    'fx-filter/config/config' : '../../config/submodules/fx-filter/Config',

                    'fx-cat-br/config/config': '../../config/submodules/fx-catalog/configAnalisi',

                    'fx-report/config/md-export/config' : '../../config/submodules/fx-report/md-export/config',

                    'fx-ds/config/config' : '../../config/submodules/fx-dashboard/config',

                    // METADATA VIEWER
                    'fx-md-v/config/config': '../../config/submodules/fx-md-viewer/config'


                },

                // Underscore and Backbone are not AMD-capable per default,
                // so we need to use the AMD wrapping of RequireJS
                shim: {
                    canvasRender: {
                        deps: ["threejs"]
                    },
                    detector: {
                        deps: ["threejs"]
                    },
                    projector:{
                        deps: ["threejs"]
                    },
                    copyShader: {
                        deps: ["threejs"]
                    },
                    effectComposer: {
                        deps: ["threejs"]
                    },
                    maskPass: {
                        deps: ["threejs"]
                    },
                    orbitControls: {
                        deps: ["threejs"]
                    },
                    renderPass: {
                        deps: ["threejs"]
                    },
                    shaderPass: {
                        deps: ["threejs"]
                    },

                    "highcharts": {
                        "exports": "Highcharts",
                        "deps": ["jquery"]
                    },
                    bootstrap: {
                        deps: ["jquery"]
                    },
                    underscore: {
                        exports: '_'
                    },
                    backbone: {
                        deps: ['underscore', 'jquery'],
                        exports: 'Backbone'
                    },
                    handlebars: {
                        exports: 'Handlebars'
                    }
                },
                waitSeconds : 15
                // For easier development, disable browser caching
                // Of course, this should be removed in a production environment
                //, urlArgs: 'bust=' +  (new Date()).getTime()
            }
        });

    /*
    var paths = requirejs.s.contexts._.config.paths,
        keys = Object.keys(paths),
        rs = "";

    for (var i = 0 ; i < keys.length ; i++) {
        if (paths[keys[i]].indexOf("http://fenixrepo") === 0) {
            rs = rs +(paths[keys[i]]) + '.js' + '\n';
        }
    }

    console.log(rs)

    */


    // Bootstrap the application
    require([
        'application',
        'routes',
        'config/Config',
        'domReady!',
        'highcharts',
        'highcharts-export'
    ], function (Application, routes, C) {

        var app = new Application({
            routes: routes,
            controllerSuffix: C.CHAPLINJS_CONTROLLER_SUFFIX,
            root: C.CHAPLINJS_PROJECT_ROOT,
            pushState: C.CHAPLINJS_PUSH_STATE,
            scrollTo: C.CHAPLINJS_SCROLL_TO
        });
    });
});