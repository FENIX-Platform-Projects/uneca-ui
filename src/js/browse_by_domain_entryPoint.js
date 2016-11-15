/*global define*/
define([
    'loglevel',
    'jquery',
    'underscore',
    '../js/domain-view',
    '../config/config'
], function (log, $, _, BrowseByDomain, C) {

    'use strict';

    var s = {
        lang: ''
    };

    function BrowseByDomain_EntryPoint() {
        console.clear();




        this._importThirdPartyCss();

        log.setLevel('trace');

        this._createBrowseByDomainView();
    }

    BrowseByDomain_EntryPoint.prototype._createBrowseByDomainView = function () {
        if((s.lang!=null)&&(typeof s.lang!="undefined")){
            s.lang = $("html").attr("lang");
            s.lang = s.lang.toUpperCase();
        }
        else{
            s.lang = 'EN';
        }

        var conf = {
            el: $('#main'),
            lang: s.lang
        };

        var view = new BrowseByDomain(conf);

        return view;
    };

    BrowseByDomain_EntryPoint.prototype._importThirdPartyCss = function () {
        //Bootstrap
        require('bootstrap/dist/css/bootstrap.css');

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

    return new BrowseByDomain_EntryPoint();

});