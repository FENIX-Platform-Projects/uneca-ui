/*global define*/
define([
    'loglevel',
    'jquery',
    'underscore',
    '../js/domain-view',
    '../config/config',
    './parser'
], function (log, $, _, BrowseByDomain, C, Parser) {

    'use strict';

    var s = {
        lang: ''
        // url: 'http://www-test.fao.org/uneca/browse-by-domain/en/',
       // url: 'http://www-test.fao.org/uneca/browse-by-domain/en?domain=health'
    };

    function BrowseByDomain_EntryPoint() {
        console.clear();

        log.setLevel('silent');

        this._importThirdPartyCss();

        s.url = window.location.href;

        // client parameters
        var params = this.getRequestParameters(),
            lang,
            domain;

        s.lang= C.forceLang || $("html").attr("lang") || C.LANG,
        s.domain = C.DOMAIN;

        lang = s.lang;

        if(params && params.searchObject) {
            domain = params.searchObject.domain || s.domain;
        }

        var params = {lang: lang.toUpperCase(), domain: domain};
        log.info("Validated Request Params ", params);

        this._createBrowseByDomainView(params);
    }


    BrowseByDomain_EntryPoint.prototype.getRequestParameters = function () {
        var parser = new Parser();
        return parser.parseURL(s.url);
    };

    BrowseByDomain_EntryPoint.prototype._createBrowseByDomainView = function (params) {

        var conf = {
            el: $('#main'),
            lang: params.lang,
            domain: params.domain
        };

        var view = new BrowseByDomain(conf);

        return view;
    };

    BrowseByDomain_EntryPoint.prototype._importThirdPartyCss = function () {

        require("../../node_modules/leaflet/dist/leaflet.css");
        require("../../node_modules/fenix-ui-map/dist/fenix-ui-map.min.css");
        //dropdown selector
        require("../../node_modules/selectize/dist/css/selectize.bootstrap3.css");
        // INDEX
        //require("dist/css/index.css");
        require("../../node_modules/jstree/dist/themes/default/style.min.css");
        // fenix-ui-filter
        require("../../node_modules/fenix-ui-filter/dist/fenix-ui-filter.min.css");
        // BROWSE BY COUNTRY CSS
        require("../css/browseByDomain.css");
        require("../css/unified-style.css");
    };

    return new BrowseByDomain_EntryPoint();

});