/*global define*/
define([
    'loglevel',
    'jquery',
    'underscore',
    '../html/domain/template.hbs',
    '../js/browse_by_country',
    '../js/country_profile_view',
    'fenix-ui-bridge',
    '../config/config'
], function (log, $, _, template, ListView, ProfileView, Bridge, C) {

    'use strict';

    var s = {
        EL: "#main",
        lang: '',
        BACK : "[data-role='back']",
        LIST_EL : "#list-container",
        PROFILE_EL : "#profile-container"
    };

    function BrowseByCountry_EntryPoint() {
        console.clear();

        log.setLevel('silent');

        this.$el = $(s.EL);

        this._importThirdPartyCss();

        this._attach();

        this._initComponents();

        this._preloadResource()
            .then(_.bind(this.onSuccess, this), _.bind(this.onError, this));
    }

    BrowseByCountry_EntryPoint.prototype._preloadResource = function () {
        return this.bridge.getCodeList({
            body: {
                uid: "UNECA_ISO3",
                level: 2
            }
        });
    };

    BrowseByCountry_EntryPoint.prototype._initComponents = function () {

        this.$back = this.$el.find(s.BACK);

        this.bridge = new Bridge({
            environment: C.ENVIRONMENT
        });
        
        s.lang= C.forceLang || $("html").attr("lang") || C.LANG,

        // force to be string and uppercase
        s.lang = String(s.lang).toUpperCase();

        this.lang = s.lang;
    };

    BrowseByCountry_EntryPoint.prototype._attach = function () {
        this.$el.html(template()); //pass i18n
    };

    BrowseByCountry_EntryPoint.prototype._bindEventListeners = function () {
        this.$back.on("click", _.bind(this._onBackClick, this));

        this.listView.on("profile.show", _.bind(this._onProfileShowEvent, this));
    };

    BrowseByCountry_EntryPoint.prototype._onProfileShowEvent = function(param) {
        this.$back.show();

        this._showSection("profile");

        this._disposeProfileView();

        this._createProfileView(param)

    };

    BrowseByCountry_EntryPoint.prototype._onBackClick = function() {
        this.$back.hide();
        this._showSection("list");
    };

    BrowseByCountry_EntryPoint.prototype._showSection = function( section ) {

        this.$el.find("[data-section]").hide();
        this.$el.find("[data-section='"+section+"']").show();
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

        this._createViews();

        this._bindEventListeners();

        this._showSection("list");

    };

    BrowseByCountry_EntryPoint.prototype._createViews = function () {

      this._createListView();

    };

    BrowseByCountry_EntryPoint.prototype._createListView = function () {

        var conf = {
            el: s.LIST_EL,
            countries: this.countries,
            lang: this.lang
        };

        this.listView = new ListView().init(conf);
    };

    BrowseByCountry_EntryPoint.prototype._createProfileView = function (param) {

        var conf = {
            el: s.PROFILE_EL,
            country: param.country,
            lang: this.lang
        };

        this.profileView = new ProfileView(conf);
    };

    BrowseByCountry_EntryPoint.prototype._disposeProfileView = function () {

        if (this.profileView && $.isFunction(this.profileView.dispose)) {
            this.profileView.dispose();
        }
    };

    BrowseByCountry_EntryPoint.prototype._importThirdPartyCss = function () {

        //Bootstrap
        require('bootstrap/dist/css/bootstrap.css');

        require("../../node_modules/leaflet/dist/leaflet.css");
        require("../../node_modules/fenix-ui-map/dist/fenix-ui-map.min.css");

        //require("dist/css/index.css");
        require("../../node_modules/jstree/dist/themes/default/style.min.css");

        // fenix-ui-filter
        require("../../node_modules/fenix-ui-filter/dist/fenix-ui-filter.min.css");

        // INDEX
        //require("dist/css/index.css");
        require("../css/browseByCountry.css");

    };

    return new BrowseByCountry_EntryPoint();

});