define([
    "jquery",
    "loglevel",
    "../config/config",
    "../config/analysis/analysis",
    "fenix-ui-analysis"
], function ($, log, Config, AnalysisConfig, FenixAnalysis) {

    var s = {
        CONTAINER : Config.ANALYSIS_CONTENT,
        cache : Config.CACHE,
        environment : Config.ENVIRONMENT
    };

    function Analysis_Download(){

        this._importThirdPartyCss();

        s.lang = Config.forceLang || $("html").attr("lang") || Config.LANG;

        // force to be string and uppercase
        s.lang = String(s.lang).toUpperCase();

        this._analysis_downloadInit();
    }

    Analysis_Download.prototype._analysis_downloadInit = function () {

        console.log(AnalysisConfig)

        var analysis = new FenixAnalysis($.extend(true, {
            el : s.CONTAINER,
            cache : s.cache,
            environment : s.environment,
            lang : s.lang,
            catalog: AnalysisConfig

        }));
    };

    //style
    Analysis_Download.prototype._importThirdPartyCss = function () {

        //Bootstrap
        require('bootstrap/dist/css/bootstrap.css');

        //dropdown selector
        require("../../node_modules/selectize/dist/css/selectize.bootstrap3.css");
        //tree selector
        require("../../node_modules/jstree/dist/themes/default/style.min.css");
        // fenix-ui-filter
        require("../../node_modules/fenix-ui-filter/dist/fenix-ui-filter.min.css");

        // fenix-ui-dropdown
        require("../../node_modules/fenix-ui-dropdown/dist/fenix-ui-dropdown.min.css");

        //map
        require("../../node_modules/leaflet/dist/leaflet.css");
        require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.css");
        require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinNice.css");
        require("../../node_modules/fenix-ui-map-creator/src/css/fenix-ui-leaflet.css");
        require("../../node_modules/fenix-ui-map-creator/src/css/fenix-ui-map-creator.css");


        // fenix-ui-table-creator
        require("../../node_modules/fenix-ui-table-creator/dist/fenix-ui-table-creator.min.css");

        // jquery-grid for fenix-ui-metadata-viewer
        require("../../node_modules/jquery-treegrid-webpack/css/jquery.treegrid.css");

        // bootstrap-table
        require("../../node_modules/bootstrap-table/dist/bootstrap-table.min.css");
        // fenix-ui-catalog
        require("../../node_modules/fenix-ui-catalog/dist/fenix-ui-catalog.min.css");

        //fenix-ui-analysis
        require("../../node_modules/fenix-ui-analysis/dist/fenix-ui-analysis.min.css");

        // iDangerous swiper
        require("../../node_modules/swiper/dist/css/swiper.min.css");
        // fenix-ui-visualization-box
        require("../../node_modules/fenix-ui-visualization-box/dist/fenix-ui-visualization-box.min.css");

        require("../css/unified-style.css");

    };

    return new Analysis_Download();
});