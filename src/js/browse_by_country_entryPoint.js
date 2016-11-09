/*global define*/
define([
    'loglevel',
    'jquery',
    'underscore',
    '../js/browse_by_country',
    'fenix-ui-bridge',
    '../config/config'
], function (log, $, _, BrowseByCountry, Bridge, C) {

    'use strict';

    var s = {
      lang: ''
    };

    function BrowseByCountry_EntryPoint() {
        console.clear();

        this._importThirdPartyCss();

        log.setLevel('trace');

        this.start();
    }

    BrowseByCountry_EntryPoint.prototype.performAccessControlChecks= function () {

        return new Bridge({
            environment : C.ENVIRONMENT
        }).getCodeList({
            body: {
                uid: "UNECA_ISO3",
                level: 2
            }
        });
    };

    BrowseByCountry_EntryPoint.prototype.start = function () {
        return this.performAccessControlChecks().then(_.bind(this.onSuccess, this), _.bind(this.onError, this));

    };

    BrowseByCountry_EntryPoint.prototype.onError = function () {

        alert("Impossible to load country list")
    };

    BrowseByCountry_EntryPoint.prototype.onSuccess = function (countries) {

        this.countries = countries.sort(function (a, b) {
            var textA = a.title.EN.toUpperCase();
            var textB = b.title.EN.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });

        return this._createBrowseByView();

    },

    BrowseByCountry_EntryPoint.prototype._createBrowseByView = function () {
        if((s.lang!=null)&&(typeof s.lang!="undefined")){
            s.lang = $("html").attr("lang");
            s.lang = s.lang.toUpperCase();
        }
        else{
            s.lang = 'EN';
        }

        var conf = {
            el: $('#main'),
            countries: this.countries,
            lang: s.lang
        };

        //var view = new BrowseByCountry(conf);

        console.log(BrowseByCountry)
        return new BrowseByCountry().init(conf);
        //return view;
    };

    BrowseByCountry_EntryPoint.prototype._importThirdPartyCss = function () {
        //Bootstrap
        require("bootstrap-loader");

        require("../../node_modules/leaflet/dist/leaflet.css");
        require("../../node_modules/fenix-ui-map/dist/fenix-ui-map.min.css");
        //dropdown selector
        require("../../node_modules/selectize/dist/css/selectize.bootstrap3.css");
        // fenix-ui-filter
        require("../../node_modules/fenix-ui-filter/dist/fenix-ui-filter.min.css");

        // INDEX
        //require("dist/css/index.css");
        require("../../node_modules/jstree/dist/themes/default/style.min.css");

    };

    return new BrowseByCountry_EntryPoint();

});