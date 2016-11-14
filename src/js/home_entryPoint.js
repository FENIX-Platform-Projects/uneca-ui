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

        var view = new HomeView(conf);

        return view;
    };

    Home_EntryPoint.prototype._importThirdPartyCss = function () {
        //Bootstrap
        require('bootstrap/dist/css/bootstrap.css');

    };

    return new Home_EntryPoint();

});