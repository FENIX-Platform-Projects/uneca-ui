/*global define, amplify*/
define([
    'jquery',
    'loglevel',
    'underscore',
    '../config/events',
    '../config/config',
    '../config/profile/config',
    'fenix-ui-dashboard',
    'fenix-ui-filter',
    'fenix-ui-filter-utils',
    '../lib/utils',
    '../nls/labels',
    '../html/profile/profile.hbs',
    '../html/profile/dashboard.hbs',
    '../html/profile/bases.hbs',
    '../config/profile/lateral_menu',
    '../config/profile/countries_summary',
    '../config/nodemodules/fenix-ui-chart-creator/highcharts_template',
    'handlebars',
    'amplify-pubsub',
    'bootstrap-list-filter',
    'jstree'
], function ($, log, _, EVT, C, PC, Dashboard, Filter, FxUtils, Utils, i18nLabels, template, dashboardTemplate, basesTemplate, LateralMenuConfig, CountrySummary, HighchartsTemplate,  Handlebars) {

    'use strict';

    var s = {
        CONTENT: "#profile-content",
        SEARCH_FILTER_INPUT: "#searchinput",
        DASHBOARD_CONTENT: "#dashboard-content",
        LATERAL_MENU: '#lateral-menu',
        MAP_CONTAINER: "#country-map-container",
        FILTER_CONTAINER: '#filter-container',
        FILTER_SUBMIT: '#filter-submit',
        FILTER_BLOCK: "[data-role='filter-block']",
        BROWSE_BY_COUNTRY_BACK: "#browse-by-country-back",
        CHART_TYPE: "chart"
    };

    function CountryProfileView(params) {

        log.info("IN CountryProfileView ");

        //TO DO
        this.lang = params.lang;

        $.extend(true, this, params);

        this.country = params.country;
        this.id = params.country.code;
        this.channels = {};

        this.$el = $(params.el);

        this._attach();

        this._initVariables();

        this._printCountryDashboard();

        return this;
    }

    CountryProfileView.prototype._attach = function () {

        this.$el.html(template(i18nLabels[this.lang]));
    };

    CountryProfileView.prototype._initVariables = function () {
        this.$content = this.$el.find(s.CONTENT);
        this.filterValues = {};
        this.dashboards = [];
        this.environment = C.ENVIRONMENT;
    };

    CountryProfileView.prototype._printCountryDashboard = function () {

        var self = this,
            template = dashboardTemplate,
            html = template({country: this.country.title[this.lang]});

        this.$content.html(html);

        this._initDashboardVariables();

        this._bindDashboardEventListeners();

        //print lateral menu
        this.$lateralMenu.jstree(Utils.setI18nToJsTreeConfig(LateralMenuConfig, i18nLabels[this.lang]))

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

    };

    CountryProfileView.prototype._initDashboardVariables = function () {

        this.$filterSubmit = this.$el.find(s.FILTER_SUBMIT);

        this.$lateralMenu = this.$el.find(s.LATERAL_MENU);

    };

    CountryProfileView.prototype._bindDashboardEventListeners = function () {

        this.$filterSubmit.on('click', _.bind(this._onFilterClick, this));
    };


    CountryProfileView.prototype._onChangeDashboard = function (item) {

        if (this.currentDashboard !== item) {
            this.currentDashboard = item;
            this._printDashboard(item);
        }

    };

    CountryProfileView.prototype._onFilterClick = function () {

        var values = this.filter.getValues();

        this.filterValues[this.currentDashboard] = values;

        _.each(this.dashboards, _.bind(function (dashboard) {
            if (dashboard && $.isFunction(dashboard.refresh)) {
                dashboard.refresh(values);
            }
        }, this));

    };

    CountryProfileView.prototype._printDashboard = function (item) {

        this._printDashboardBase(item);

        var conf = this._getDashboardConfig(item),
            filterConfig = this._getFilterConfig(item);

        if (conf && !_.isEmpty(conf)) {
            this._renderDashboard(conf);
        }

        if (!_.isEmpty(filterConfig)) {
            this.$el.find(s.FILTER_BLOCK).show();
            this._renderFilter(filterConfig);
        } else {
            this.$el.find(s.FILTER_BLOCK).hide();
        }

    };

    CountryProfileView.prototype._getDashboardConfig = function (id) {

        var conf = PC[id].dashboard,
            filterValues = this.filterValues[this.currentDashboard] || {};

        if (!Array.isArray(conf)) {
            conf = FxUtils.cleanArray([conf]);
        }
        var self = this;

        _.each(conf, _.bind(function (c) {

            if (!_.isEmpty(c)) {
                c.filter = $.extend(c.filter, this._createCountryFilter());

                var countrySel = c.filter.CountryCode;

                _.each(c.items, _.bind(function (item) {
                    item.filter = $.extend(item.filter, filterValues.values);

                    if (item.id === 'country-map-container') {
                        item.config.fenix_ui_map.zoomToCountry = countrySel;
                        item.config.fenix_ui_map.highlightCountry = countrySel;
                    }

                    if (item.type == s.CHART_TYPE) {
                        if (item.config.config) {
                            item.config.config = $.extend(true, {}, HighchartsTemplate, item.config.config);
                            item.config.config.title.text = i18nLabels[self.lang][item.id+'_country_title'];
                        } else {
                            item.config.config = $.extend(true, {}, HighchartsTemplate);
                            item.config.config.title.text = i18nLabels[self.lang][item.id+'_country_title'];
                        }
                    }
                }))
            }

        }, this));

        return conf;

    };

    CountryProfileView.prototype._getFilterConfig = function (id) {

        var conf = $.extend(true, {}, PC[id].filter),
            values = this.filterValues[id] || {},
            result = FxUtils.mergeConfigurations(conf, values);

        _.each(result, _.bind(function (obj, key) {

            if (!obj.template) {
                obj.template = {};
            }
            //Add i18n label
            obj.template.title = Utils.getI18nLabel(key, i18nLabels[this.lang], "filter_");

        }, this));

        return result;
    };

    CountryProfileView.prototype._renderFilter = function (config) {

        if (this.filter && $.isFunction(this.filter.dispose)) {
            this.filter.dispose();
        }

        var $div = $("<div></div>");
        $(s.FILTER_CONTAINER).html($div);

        this.filter = new Filter({
            el: $div,
            environment: this.environment,
            selectors: config,
            common: {
                template: {
                    hideSwitch: true,
                    hideRemoveButton: true
                }
            }
        });

    };

    CountryProfileView.prototype._createCountryFilter = function () {

        //create country filter

        return {"CountryCode": [this.id]};
    };

    CountryProfileView.prototype._printDashboardBase = function (id) {

        var context = Utils.setI18nToCountriesSummary(CountrySummary, i18nLabels[this.lang]);
        var model = context && context[this.id] ? context[this.id] : {};
        var html = basesTemplate($.extend(true, {}, model, i18nLabels[this.lang]));

        //Inject HTML
        var source = $(html).find("[data-dashboard='" + id + "']");

        this.$el.find(s.DASHBOARD_CONTENT).html(source);
    };

    CountryProfileView.prototype._renderDashboard = function (config) {

        this._disposeDashboards();

        _.each(config, _.bind(function (c) {

            this.dashboards.push(new Dashboard($.extend(true, {
                environment: this.environment
            }, c)));

        }, this));

    };

    CountryProfileView.prototype._disposeDashboards = function () {

        _.each(this.dashboards, _.bind(function (dashboard) {
            if (dashboard && $.isFunction(dashboard.dispose)) {
                dashboard.dispose();
            }
        }, this));

        this.dashboards = [];
    };

    CountryProfileView.prototype._dispose = function () {

        if (this.$lateralMenu && this.$lateralMenu.length > 0) {
            this.$lateralMenu.jstree(true).destroy();
        }

        this._disposeDashboards();

        this._unbindDashboardEventListeners();

        this.currentDashboard = {};
        this.filterValues = {};

    };

    CountryProfileView.prototype.dispose = function () {

        return this._dispose();
    };

    CountryProfileView.prototype._unbindDashboardEventListeners = function () {

        if (this.$filterSubmit && this.$filterSubmit.length > 0) {
            this.$filterSubmit.off();
        }

        $(s.BROWSE_BY_COUNTRY_BACK).off();

    };

    CountryProfileView.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    CountryProfileView.prototype._trigger = function (channel) {

        if (!this.channels[channel]) {
            return false;
        }
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = this.channels[channel].length; i < l; i++) {
            var subscription = this.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }

        return this;
    };

    return CountryProfileView;
});
