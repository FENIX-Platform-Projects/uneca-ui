define([
    "jquery",
    "loglevel",
    "../config/config",
    "../config/data_management/shared",
    "../config/data_management/dsd",
    "../config/data_management/metadata_en",
    "../config/data_management/metadata_fr",
    "fenix-ui-data-management"
], function ($, log, C, SC, DsdConfig, MetadataConfigEn, MetadataConfigFr, DataManagement) {

    var s = {
        COUNTRY: 'data-country'
    };

    function DataMngPage() {

        console.clear();

        log.setLevel("trace");

        this._importThirdPartyCss();

        var c = {
            lang: C.forceLang || $("html").attr("lang") || C.LANG,
            country: $(document.body).attr(s.COUNTRY) || ""
        };

        // force to be string and uppercase
        c.lang = String(c.lang).toUpperCase();
        c.country = String(c.country).toUpperCase();

        this._initDataManagement(c);
    }

    DataMngPage.prototype._initDataManagement = function (opts) {

        log.warn("Parsed configuration:");
        log.warn(opts);

        var config,
            country = opts.country,
            metadata;

        if (!SC.hasOwnProperty(country)) {
            log.warn("Impossible to find configuration for country: " + opts.country);
            country = C.country;
            log.warn("Using default country instead: " + C.country);
        }

        metadata = opts.lang === "FR" ? MetadataConfigFr : MetadataConfigEn;

        config ={
            el: C.DATA_MNG_CONTENT,
            cache: C.CACHE,
            environment: C.environment,
            lang: opts.lang,
            metadataEditor: metadata,
            dsdEditor: $.extend(true, DsdConfig, { contextSystem: "cstat_" + country.toLowerCase()}),
            catalog: $.extend(true, SC[country].catalog, {hideCloseButton: true}),
            config: {
                contextSystem: "cstat_" + country.toLowerCase(),
                datasources : ["D3S"],
                resourceRepresentationType: "dataset"
            }
        };

        log.warn("Data management configuration: ");
        log.warn(config);

        this.dataMng = new DataManagement(config);
    };

    //style
    DataMngPage.prototype._importThirdPartyCss = function () {

        //dropdown selector
        require("../../node_modules/selectize/dist/css/selectize.bootstrap3.css");
        require("../../node_modules/bootstrap-table/dist/bootstrap-table.min.css");
        //tree selector
        require("../../node_modules/jstree/dist/themes/default/style.min.css");
        //range selector
        require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.css");
        require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinHTML5.css");
        //time selector
        require("../../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css");
        // fenix filter
        require("../../node_modules/fenix-ui-filter/dist/fenix-ui-filter.min.css");

        require("../../node_modules/fenix-ui-catalog/dist/fenix-ui-catalog.min.css");

        require("../../node_modules/fenix-ui-metadata-editor/dist/fenix-ui-metadata-editor.min.css");

        require("../../node_modules/fenix-ui-dropdown/dist/fenix-ui-dropdown.min.css");

        require("../../node_modules/fenix-ui-DataEditor/dist/fenix-ui-DataEditor.min.css");

        require("../../node_modules/fenix-ui-DSDEditor/dist/fenix-ui-DSDEditor.min.css");

        require("../../node_modules/fenix-ui-data-management/dist/fenix-ui-data-management.min.css");

        require("../../node_modules/toastr/build/toastr.min.css");

        require("../css/unified-style.css");
    };

    return new DataMngPage();
});