/*global define, amplify*/
define([
    'jquery',
    'views/base/view',
    'fx-ds/start',
    'text!templates/domains/domains.hbs',
    'text!templates/domains/list.hbs',
    'text!templates/domains/dashboard.hbs',
    'text!templates/domains/bases.hbs',
    'i18n!nls/domain',
    'config/Events',
    'text!config/profile/lateral_menu.json',
    'text!config/profile/resume_countries.json',
    'config/domain/Config',
    'handlebars',
    'loglevel',
    'amplify',
    'bootstrap-list-filter',
    'jstree',
    'fenix-ui-map'
], function ($, View, Dashboard, template, listTemplate, dashboardTemplate, basesTemplate, i18nLabels, E, LateralMenuConfig, resumeInfo, PC, Handlebars, log) {

    'use strict';

    var s = {
        CONTENT: "#profile-content",
        SEARCH_FILTER_INPUT: "#searchinput",
        COUNTRY_LIST: '#list-countries',
        SEARCH_ITEM_CHILD: 'a',
        SEARCH_ITEM_EL: '.country-item',
        DASHBOARD_CONTENT: "#dashboard-content",
        LATERAL_MENU: '#lateral-menu',
        MAP_CONTAINER : "#country-map-container"
    };

    var DomainView = View.extend({

        initialize: function (params) {

            this.domains = params.domains;

            this.domain = params.domain;

            View.prototype.initialize.call(this, arguments);

        },

        // Automatically render after initialize
        autoRender: true,

        className: 'domains',

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
            amplify.publish(E.STATE_CHANGE, {menu: 'domains'});

            this._initVariables();

            this._printDomainDashboard();

        },

        _initVariables: function () {

            this.$content = this.$el.find(s.CONTENT);

        },

        _printDomainDashboard: function () {

            var self = this;
            var template = Handlebars.compile(dashboardTemplate),
                html = template({domain : this.id});

            this.$content.html(html);

            this.$lateralMenu = this.$el.find(s.LATERAL_MENU);

            //print jstree
            this.$lateralMenu.jstree(JSON.parse(LateralMenuConfig))

                //Limit selection e select only leafs for indicators
                .on("select_node.jstree", _.bind(function (e, data) {

                    if ( !data.instance.is_leaf(data.node) ) {

                        self.$lateralMenu.jstree(true).deselect_node(data.node, true);

                    } else {

                        //TODO remove me
                        self._onChangeDashboard(data.selected[0]);

                    }

                }, this));

            this._printDashboard(this.id);

            //this._printCountryMap();

            //bind events from tree click to dashboard refresh
            /*
             * - destroy current dashboard
             * - inject new template    this._printDashboardBase( jstree item selected );
             * - render new dashboard
             *
             * */

        },

        _printCountryMap : function () {

            try {
                 var m = new FM.Map(s.MAP_CONTAINER, {
                        plugins: {
                            disclaimerfao: false,
                            geosearch: false,
                            mouseposition: false,
                            controlloading : false,
                            zoomcontrol: 'bottomright'
                        },
                        guiController: {
                            overlay: false,
                            baselayer: true,
                            wmsLoader: false
                        }
                    });
            }
            catch(e) {
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

        _printDashboard : function ( item ) {

            this._printDashboardBase(item);

            var conf = this._getDashboardConfig(item);

            this._renderDashboard(conf);
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

            try{
                base = PC[id].dashboard;

            }catch (e) {
                alert("Impossible to load dashboard configuration for [" + id + "]");
            }

            conf = $.extend(true, {}, base);

            //conf.filter = [this._createCountryFilter()];

            return conf;
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

    return DomainView;
});
