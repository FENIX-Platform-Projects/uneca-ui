/*global define*/
define([
    'loglevel',
    'jquery',
    'underscore',
    '../js/home-view',
    '../config/config'
], function (log, $, _, HomeView, C) {

    'use strict';

    var s = {
        lang: ''
    };

    function Home_EntryPoint() {
        console.clear();

        this._importThirdPartyCss();

        log.setLevel('trace');

        this._createHomeView();
    }

    Home_EntryPoint.prototype._createHomeView = function () {

        s.lang= C.forceLang || $("html").attr("lang") || C.LANG,

        // force to be string and uppercase
        s.lang = String(s.lang).toUpperCase();

        var conf = {
            el: $('#main'),
            lang: s.lang
        };

        var view = new HomeView(conf);

        return view;
    };

    Home_EntryPoint.prototype._importThirdPartyCss = function () {

        require("../css/unified-style.css");
    };

    return new Home_EntryPoint();

});