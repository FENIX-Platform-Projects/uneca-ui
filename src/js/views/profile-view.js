/*global define, amplify*/
define([
    'jquery',
    'views/base/view',
    'fx-ds/start',
    'text!templates/profile/profile.hbs',
    'text!templates/profile/list.hbs',
    'text!templates/profile/dashboard.hbs',
    'text!templates/profile/bases.hbs',
    'i18n!nls/profile',
    'config/Events',
    'text!config/profile/lateral_menu.json',
    'config/profile/config',
    'handlebars',
    'amplify',
    'bootstrap-list-filter',
    'jstree'
], function ($, View, Dashboard, template, listTemplate, dashboardTemplate, basesTemplate,i18nLabels, E, LateralMenuConfig,PC,  Handlebars) {

    'use strict';

    var s = {
        CONTENT : "#profile-content",
        SEARCH_FILTER_INPUT : "#searchinput",
        COUNTRY_LIST : '#list-countries',
        SEARCH_ITEM_CHILD : 'a',
        SEARCH_ITEM_EL : '.country-item',
        DASHBOARD_CONTENT : "#dashboard-content",
        LATERAL_MENU: '#lateral-menu'
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

            var self= this;


            this.$content.html(dashboardTemplate);
            this.$lateralMenu = this.$el.find(s.LATERAL_MENU);



            //print jstree
            this.$lateralMenu.jstree(JSON.parse(LateralMenuConfig))
                //select first node
                .on("ready.jstree", function () {
                    self.$lateralMenu.jstree(true).select_node('ul > li:first');
                    self._bindEventListener();
                });


            this._printDashboardBase('resume');

            //dashboard configuration
            var conf = this._getDashboardConfig('resume');

            this._renderDashboard(conf['resume']);



            //bind events from tree click to dashboard refresh
            /*
            * - destroy current dashboard
            * - inject new template    this._printDashboardBase( jstree item selected );
            * - render new dashboard
            *
            * */

        },

        _bindEventListener: function() {
            var self = this;
            this.$lateralMenu.on('changed.jstree', function (e, data) {
                self._onChangeDashboard(data.selected[0]);
            });

        },


        _onChangeDashboard: function (itemSelected) {

            this._printDashboardBase( 'resume' );
            var conf = this._getDashboardConfig('resume');
            this._renderDashboard(conf[itemSelected]);
        },

        _printDashboardBase : function ( id ) {

            //Inject HTML
            var source = $(basesTemplate).find("[data-dashboard='" + id + "']"),
                template = Handlebars.compile(source.prop('outerHTML')),
                html = template();

            this.$el.find(s.DASHBOARD_CONTENT).html(html);
        },

        _createCountryFilter : function () {

            //create country filter
            return [];
        },

        _getDashboardConfig : function (id) {

            //get from PC the 'id' conf

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
