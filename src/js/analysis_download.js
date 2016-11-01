define([
    "jquery",
    "../parser"
], function ($, Parser) {

    var s = {
        //url : ''
        url : 'http://example.com:3000/pathname/?country=COG'
        //url : 'http://example.com:3000/pathname/?country=MDG'
    };

    function Analysis_Download(){
        //var COUNTRY_CODE = 'MDG'; //Congo implement controller

        this._importThirdPartyCss();
        //s.url = window.location.href;
        console.log(s.url)
        console.log("///////////////////////////////////////////////////////////////")
        console.log($("html").attr("lang"))

        if((s.lang!=null)&&(typeof s.lang!="undefined")){
            s.lang = $("html").attr("lang");
            s.lang = s.lang.toUpperCase();
        }
        else{
            s.lang = 'EN';
        }

        var obj = {url : s.url};
        var parsedUrl = new Parser(obj)._parseURL();
        var COUNTRY_CODE = parsedUrl.searchObject.country;
        this._analysis_downloadInit(COUNTRY_CODE);
    }

    Analysis_Download.prototype._analysis_downloadInit = function (COUNTRY_CODE) {

        console.log(COUNTRY_CODE)
        var config = AnalysisConfig[COUNTRY_CODE];

        console.log(config)
        // var analysis = new FenixAnalysis($.extend(true, {
        //     el : s.CONTAINER,
        //     cache : s.cache,
        //     environment : s.environment,
        //     lang : s.lang
        // }, config));

        console.log($.extend(true, {
            el : s.CONTAINER,
            cache : s.cache,
            environment : s.environment,
            lang : s.lang
        }, config))
    };

    //style
    Analysis_Download.prototype._importThirdPartyCss = function () {

        //Bootstrap
        require("bootstrap-loader");

        //dropdown selector
        require("../../node_modules/selectize/dist/css/selectize.bootstrap3.css");

        // fenix-ui-filter
        require("../../node_modules/fenix-ui-filter/dist/fenix-ui-filter.min.css");
        // fenix-ui-dropdown
        require("../../node_modules/fenix-ui-dropdown/dist/fenix-ui-dropdown.min.css");

        // bootstrap-table
        require("../../node_modules/bootstrap-table/dist/bootstrap-table.min.css");

        //tree selector
        require("../../node_modules/jstree/dist/themes/default/style.min.css");

        // fenix-ui-table-creator
        require("../../node_modules/fenix-ui-table-creator/dist/fenix-ui-table-creator.min.css");

        // jquery-grid for fenix-ui-metadata-viewer
        require("../../node_modules/jquery-treegrid-webpack/css/jquery.treegrid.css");

        // iDangerous swiper
        require("../../node_modules/swiper/dist/css/swiper.min.css");

        // fenix-ui-visualization-box
        require("../../node_modules/fenix-ui-visualization-box/dist/fenix-ui-visualization-box.min.css");

        // fenix-ui-catalog
        require("../../node_modules/fenix-ui-catalog/dist/fenix-ui-catalog.min.css");

        //fenix-ui-analisys
        require("../../node_modules/fenix-ui-analysis/dist/fenix-ui-analysis.min.css");

    };

    return new Analysis_Download();
});