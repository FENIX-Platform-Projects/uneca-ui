/*global define, amplify*/
define([
    'jquery',
    'views/base/view',
    'fx-dashboard/start',
    'fx-filter/start',
    'text!templates/domains/domains.hbs',
    'text!templates/domains/list.hbs',
    'text!templates/domains/bases.hbs',
    'i18n!nls/domain',
    'config/events',
    'text!config/domain/lateral_menu.json',
    'text!config/profile/resume_countries.json',
    'config/domain/config',
    'handlebars',
    'loglevel',
    'fx-filter/componentcreator',
    'amplify',
    'bootstrap-list-filter',
    'jstree',
    'fenix-ui-map'
], function ($, View, Dashboard, Filter, template, listTemplate, basesTemplate, i18nLabels, E, LateralMenuConfig, resumeInfo, PC, Handlebars, log, FilterConfCreator) {

    'use strict';

    var s = {
        CONTENT: "#domain-content",
        DASHBOARD_CONTENT: "#domain-dashboard-content",
        LATERAL_MENU: '#domain-lateral-menu',
        FILTER_CONTAINER : 'domain-filter-container',
        FILTER_SUBMIT : '#domain-filter-submit',
        FILTER_BLOCK : "#domain-filter-block"
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

            this._bindEventListeners();

            this._printDomainDashboard();

        },

        _initVariables: function () {

            this.$content = this.$el.find(s.CONTENT);

            this.$lateralMenu = this.$el.find(s.LATERAL_MENU);

            this.$filterSubmit = this.$el.find(s.FILTER_SUBMIT);

        },

        _bindEventListeners: function () {

            var self = this;

            this.$filterSubmit.on('click', function (e, data) {
                var values = self.filter.getValues();
                self.dashboard.filter([values]);
            });
        },

        _printDomainDashboard: function () {

            var self = this;

            //print jstree
            this.$lateralMenu.jstree(JSON.parse(LateralMenuConfig))

                .on("ready.jstree", _.bind(function (e, data) {

                    if (this.id) {

                        self.$lateralMenu.jstree(true).select_node(this.id, true);

                    } else {

                        self.$lateralMenu.jstree(true).select_node('population', true);

                    }

                }, this))

                //Limit selection e select only leafs for indicators
                .on("select_node.jstree", _.bind(function (e, data) {

                    if ( !data.instance.is_leaf(data.node) ) {

                        self.$lateralMenu.jstree(true).deselect_node(data.node, true);

                        self.$lateralMenu.jstree(true).open_node(data.node, true);

                    } else {

                        //TODO remove me
                        self._onChangeDashboard(data.selected[0]);
                    }

                }, this));
        },

        _printDashboard : function ( item ) {

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

            console.log(item)

            this._printDashboard(item);

        },

        _printDashboardBase: function (id) {

            //Inject HTML
            var source = $(basesTemplate).find("[data-dashboard='" + id + "']"),
                template = Handlebars.compile(source.prop('outerHTML')),
                html = template();

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

        }

    });

    return DomainView;
});
