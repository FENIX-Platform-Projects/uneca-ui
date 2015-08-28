/*global define, amplify*/
define([
    'jquery',
    'views/base/view',
    'fx-ds/start',
    'text!templates/profile/profile.hbs',
    'text!templates/profile/list.hbs',
    'text!templates/profile/dashboard.hbs',
    'i18n!nls/profile',
    'config/Events',
    'config/profile/config',
    'handlebars',
    'amplify',
    'bootstrap-list-filter'
], function ($, View, Dashboard, template, listTemplate, dashboardTemplate, i18nLabels, E, PC, Handlebars) {

    'use strict';

    var s = {
        CONTENT : "#profile-content",
        SEARCH_FILTER_INPUT : "#searchinput",
        COUNTRY_LIST : '#list-countries',
        SEARCH_ITEM_CHILD : 'a',
        SEARCH_ITEM_EL : '.country-item'
    };

    var ProfileView = View.extend({

        initialize: function (params) {

            this.countries = params.countries;

            View.prototype.initialize.call(this, arguments);

        },

        // Automatically render after initialize
        autoRender: true,

        className: 'profiles',

        // Save the template string in a prototype property.
        // This is overwritten with the compiled template function.
        // In the end you might want to used precompiled templates.
        template: template,

        getTemplateData: function () {
            return i18nLabels;
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'profile'});

            this._initVariables();

            this.id ? this._printCountryDashboard() : this._printCountryList();

        },

        _initVariables: function () {

            this.$content = this.$el.find(s.CONTENT);
        },

        _printCountryList: function () {

            var template = Handlebars.compile(listTemplate),
                html    = template({countries : this.countries});

            this.$content.html(html);

            //Init filter
            $(s.COUNTRY_LIST).btsListFilter(s.SEARCH_FILTER_INPUT, {
                itemEl: s.SEARCH_ITEM_EL,
                itemChild: s.SEARCH_ITEM_CHILD
            });

        },

        _printCountryDashboard: function () {

            this.$content.html(dashboardTemplate);

            //dashboard configuration
            var conf = this._getDashboardConfig();

            this._renderDashboard(conf);

        },

        _createCountryFilter : function () {

            //create country filter
            return [];
        },

        _getDashboardConfig : function () {

            var conf = $.extend(true, {}, PC);

            conf.filter = this._createCountryFilter();

            return PC;
        },

        _renderDashboard: function (config) {

            if (this.unecaDashboard && this.unecaDashboard.destroy) {
                this.unecaDashboard.destroy();
            }

            this.unecaDashboard = new Dashboard({
                layout: "injected"
            });

            this.unecaDashboard.render(config);

        }

    });

    return ProfileView;
});
