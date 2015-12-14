/*global define, amplify*/
define([
    'jquery',
    'views/base/view',
    'fx-ds/start',
    'fx-filter/start',
    'text!templates/profile/profile.hbs',
    'text!templates/profile/list.hbs',
    'text!templates/profile/dashboard.hbs',
    'text!templates/profile/bases.hbs',
    'i18n!nls/profile',
    'config/Events',
    'text!config/profile/lateral_menu.json',
    'text!config/profile/resume_countries.json',
    'config/profile/Config',
    'handlebars',
    'fx-filter/Fx-filter-configuration-creator',
    'amplify',
    'bootstrap-list-filter',
    'jstree',
    'fenix-ui-map'
], function ($, View, Dashboard, Filter, template, listTemplate, dashboardTemplate, basesTemplate, i18nLabels, E, LateralMenuConfig, resumeInfo, PC, Handlebars, FilterConfCreator) {

    'use strict';

    var s = {
        CONTENT: "#profile-content",
        SEARCH_FILTER_INPUT: "#searchinput",
        COUNTRY_LIST: '#list-countries',
        SEARCH_ITEM_CHILD: 'a',
        SEARCH_ITEM_EL: '.country-item',
        DASHBOARD_CONTENT: "#dashboard-content",
        LATERAL_MENU: '#lateral-menu',
        MAP_CONTAINER: "#country-map-container",
        FILTER_CONTAINER : 'filter-container',
        FILTER_SUBMIT : '#filter-submit',
        FILTER_BLOCK : "#filter-block"

    };

    var ProfileView = View.extend({

        initialize: function (params) {

            this.countries = params.countries;

            this.country = params.country;

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

            console.log("Attach " + this.id)

            this.id ? this._printCountryDashboard() : this._printCountryList();

        },

        _initVariables: function () {

            this.$content = this.$el.find(s.CONTENT);

        },

        _printCountryList: function () {

            var template = Handlebars.compile(listTemplate),
                html = template({countries: this.countries});

            this.$content.html(html);

            //Init filter
            $(s.COUNTRY_LIST).btsListFilter(s.SEARCH_FILTER_INPUT, {
                itemEl: s.SEARCH_ITEM_EL,
                itemChild: s.SEARCH_ITEM_CHILD
            });

        },

        _initDashboardVariables: function () {

            this.$filterSubmit = this.$el.find(s.FILTER_SUBMIT);

        },

        _bindDashboardEventListeners: function () {

            var self = this;

            this.$filterSubmit.on('click', function (e, data) {

                var values = self.filter.getValues();
                                       //
                self.dashboard.filter([values]);
            });
        },

        _printCountryDashboard: function () {

            var self = this;
            var template = Handlebars.compile(dashboardTemplate),
                html = template({country: this.country.title.EN});

            this.$content.html(html);

            this._initDashboardVariables();

            this._bindDashboardEventListeners();

            this.$lateralMenu = this.$el.find(s.LATERAL_MENU);

            //print jstree
            this.$lateralMenu.jstree(JSON.parse(LateralMenuConfig))

                //Limit selection e select only leafs for indicators
                .on("select_node.jstree", _.bind(function (e, data) {

                    console.log("Select node profile")

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

        _printCountryMap: function () {

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

            m.zoomTo("country", "iso3", this.id);
        },

        _printDashboard: function (item) {

            this._printDashboardBase(item);

            var conf = this._getDashboardConfig(item),
                filterConfig = this._getFilterConfig(item);

            this._renderDashboard(conf);

            if (filterConfig && Array.isArray(filterConfig)) {

                this.$el.find(s.FILTER_BLOCK).show();

                this._renderFilter(filterConfig);

            } else {

                this.$el.find(s.FILTER_BLOCK).hide();

            }

        },

        _onChangeDashboard: function (item) {

            this._printDashboard(item);

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
            return {
                "name": "filter",
                "parameters": {
                    "rows": {
                        "CountryCode": {
                            "codes": [
                                {
                                    "uid": "ISO3",
                                    "codes": [
                                        this.id
                                    ]
                                }
                            ]
                        }
                    }
                }
            };
        },

        _getDashboardConfig: function (id) {

            //get from PC the 'id' conf

            var base,
                conf;

            try {
                base = PC[id].dashboard;

            } catch (e) {
                alert("Impossible to load dashboard configuration for [" + id + "]");
            }

            conf = $.extend(true, {}, base);

            conf.filter = [this._createCountryFilter()];

            return conf;
        },

        _getFilterConfig: function (id) {

            //get from PC the 'id' conf

            var conf;

            try {

                conf = PC[id].filter;

            } catch (e) {
                alert("Impossible to load filter configuration for [" + id + "]");
            }

            return conf;
        },

        _renderDashboard: function (config) {

            if (this.dashboard && this.dashboard.destroy) {
                this.dashboard.destroy();
            }

            this.dashboard = new Dashboard({
                layout: "injected"
            });

            this.dashboard.render(config);

        },

        _renderFilter: function (config) {

            var self = this;

            this.filterConfCreator = new FilterConfCreator();

            this.filterConfCreator.getConfiguration(config)
                .then(function (c) {

                    self.filter = new Filter();

                    self.filter.init({
                        container: s.FILTER_CONTAINER,
                        layout: 'fluidGrid'
                    });

                    var adapterMap = {};

                    self.filter.add(c, adapterMap);

                });

        },

        /* Disposition process */

/*
        dispose: function () {

            this.$lateralMenu.jstree("destroy");

            this._unbindDashboardEventListeners();

            View.prototype.dispose.call(this, arguments);

        },

        _unbindDashboardEventListeners: function () {

            this.$filterSubmit.off();

            console.log(this.$filterSubmit.length)

        }
*/


    });

    return ProfileView;
});
