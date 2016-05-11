/*global define, amplify*/
define([
    'jquery',
    'underscore',
    'views/base/view',
    'config/events',
    'config/profile/config',
    'fx-dashboard/start',
    'fx-filter/start',
    'fx-common/utils',
    'i18n!nls/profile',
    'text!templates/profile/profile.hbs',
    'text!templates/profile/dashboard.hbs',
    'text!templates/profile/bases.hbs',
    'text!config/profile/lateral_menu.json',
    'text!config/profile/resume_countries.json',
    'handlebars',
    'amplify',
    'bootstrap-list-filter',
    'jstree',
    'fenix-ui-map'
], function ($, _, View, EVT, PC, Dashboard, Filter, Utils, i18nLabels, template, dashboardTemplate, basesTemplate, LateralMenuConfig, resumeInfo, Handlebars) {

    'use strict';

    var s = {
        CONTENT: "#profile-content",
        SEARCH_FILTER_INPUT: "#searchinput",
        DASHBOARD_CONTENT: "#dashboard-content",
        LATERAL_MENU: '#lateral-menu',
        MAP_CONTAINER: "#country-map-container",
        FILTER_CONTAINER: '#filter-container',
        FILTER_SUBMIT: '#filter-submit',
        FILTER_BLOCK: "#filter-block"
    };

    var ProfileView = View.extend({

        initialize: function (params) {

            this.countries = params.countries;

            this.country = params.country;

            View.prototype.initialize.call(this, arguments);
        },

        autoRender: true,

        className: 'profiles',

        template: template,

        getTemplateData: function () {

            return i18nLabels;
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(EVT.STATE_CHANGE, {menu: 'profile'});

            this._initVariables();

            this._printCountryDashboard();

        },

        _initVariables: function () {

            this.$content = this.$el.find(s.CONTENT);

            this.filterValues = {};

        },

        //country dashboard

        _printCountryDashboard: function () {

            var self = this,
                template = Handlebars.compile(dashboardTemplate),
                html = template({country: this.country.title.EN});

            this.$content.html(html);

            this._initDashboardVariables();

            this._bindDashboardEventListeners();

            //print lateral menu
            this.$lateralMenu.jstree(JSON.parse(LateralMenuConfig))

                //Limit selection e select only leafs for indicators
                .on("select_node.jstree", _.bind(function (e, data) {

                    if (!data.instance.is_leaf(data.node)) {

                        self.$lateralMenu.jstree(true).deselect_node(data.node, true);

                        self.$lateralMenu.jstree(true).open_node(data.node, true);

                    } else {

                        self._onChangeDashboard(data.selected[0]);

                    }

                }, this));

            this._printDashboard('resume');

            this._printCountryMap();

            //bind events from tree click to dashboard refresh
            /*
             * - destroy current dashboard
             * - inject new template    this._printDashboardBase( jstree item selected );
             * - render new dashboard
             *
             * */

        },

        _bindDashboardEventListeners: function () {

            this.$filterSubmit.on('click', _.bind(this._onFilterClick, this));
        },

        _initDashboardVariables: function () {

            this.$filterSubmit = this.$el.find(s.FILTER_SUBMIT);

            this.$lateralMenu = this.$el.find(s.LATERAL_MENU);

        },

        _printCountryMap: function () {

            /* TODO


             try {
             var m = new FM.Map(s.MAP_CONTAINER, {
             plugins: {
             disclaimerfao: false,
             geosearch: false,
             mouseposition: false,
             controlloading: false,
             zoomcontrol: 'bottomright'
             },
             guiController: {
             overlay: false,
             baselayer: true,
             wmsLoader: false
             }
             });
             }
             catch (e) {
             console.log(e)
             }

             m.createMap();

             m.addLayer(new FM.layer({
             layers: 'fenix:gaul0_line_3857',
             layertitle: 'Country Boundaries',
             urlWMS: 'http://fenix.fao.org/geoserver',
             opacity: '0.9',
             zindex: '500',
             lang: 'en'
             }));

             m.addLayer(new FM.layer({
             layers: 'fenix:gaul0_faostat_3857',
             layertitle: '',
             urlWMS: 'http://fenix.fao.org/geoserver',
             style: 'highlight_polygon',
             cql_filter: "iso3 IN ('" + this.id + "')",
             hideLayerInControllerList: true,
             lang: 'en'
             }));

             m.zoomTo("country", "iso3", this.id);*/
        },

        _printDashboard: function (item) {

            this._printDashboardBase(item);

            var conf = this._getDashboardConfig(item),
                filterConfig = this._getFilterConfig(item);

            if (conf) {

                this._renderDashboard(conf);
            }

            if (filterConfig) {

                this.$el.find(s.FILTER_BLOCK).show();
                this._renderFilter(filterConfig);

            } else {
                this.$el.find(s.FILTER_BLOCK).hide();
            }

        },

        _onChangeDashboard: function (item) {

            if (this.currentDashboard !== item) {
                this.currentDashboard = item;
                this._printDashboard(item);
            }

        },

        _onFilterClick: function () {

            var values = this.filter.getValues();

            this.filterValues[this.currentDashboard] = values;

            this.dashboard.refresh(values);
        },

        _printDashboardBase: function (id) {

            //Inject HTML
            var source = $(basesTemplate).find("[data-dashboard='" + id + "']"),
                template = Handlebars.compile(source.prop('outerHTML')),
                context = JSON.parse(resumeInfo),
                html = template(context && context[this.id] ? context[this.id] : {});

            this.$el.find(s.DASHBOARD_CONTENT).html(html);
        },

        _createCountryFilter: function () {

            //create country filter

            return {"CountryCode": [this.id]};
        },

        _getDashboardConfig: function (id) {

            var conf = $.extend(true, {}, PC[id].dashboard);

            if (conf) {
                var filterValues = this.filterValues[this.currentDashboard] || {};
                conf.filter = $.extend(conf.filter, this._createCountryFilter());

                _.each(conf.items, _.bind(function (item) {
                    item.filter = $.extend(item.filter, filterValues.values);
                }))
            }

            return conf;

        },

        _getFilterConfig: function (id) {

            var conf = $.extend(true, {}, PC[id].filter),
                values = this.filterValues[id] || {};

            return Utils.mergeConfigurations(conf, values);
        },

        _renderDashboard: function (config) {

            if (this.dashboard && $.isFunction(this.dashboard.dispose)) {
                this.dashboard.dispose();
            }

            this.dashboard = new Dashboard(config);

        },

        _renderFilter: function (config) {

            if (this.filter && $.isFunction(this.dashboard.dispose)) {
                this.filter.dispose();
            }

            this.filter = new Filter({
                el: s.FILTER_CONTAINER,
                items: config,
                common: {
                    template: {
                        hideSwitch: true,
                        hideRemoveButton: true
                    }
                }
            });

        },

        //Disposition process

        dispose: function () {

            if (this.$lateralMenu && this.$lateralMenu.length > 0) {
                this.$lateralMenu.jstree(true).destroy();
            }

            this._unbindDashboardEventListeners();

            this.currentDashboard = {};
            this.filterValues = {};

            View.prototype.dispose.call(this, arguments);

        },

        _unbindDashboardEventListeners: function () {

            if (this.$filterSubmit && this.$filterSubmit.length > 0) {
                this.$filterSubmit.off();
            }
        }

    });

    return ProfileView;
});
