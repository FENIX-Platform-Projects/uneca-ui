/*global define, _:false, $, console, amplify, FM, THREE*/
define([
    'jquery',
    'underscore',
    '../config/config',
    '../config/events',
    '../config/home/config',
    'fenix-ui-dashboard',
    'fenix-ui-filter-utils',
    '../html/home/home.hbs',
    '../html/home/bases.hbs',
    '../nls/labels',
    '../nls/home',
    '../config/nodemodules/fenix-ui-chart-creator/highcharts_template'
], function ($, _, C, EVT, HC, Dashboard, FxUtils, template, basesTemplate, i18nLabels, i18nLabelsHome, HighchartsTemplate) {

    'use strict';

    var s = {
        CHART_TABS: '#home-charts-tab a[data-toggle="tab"]',
        DASHBOARD_CONTENT: "#dashboard-content",
        CHART: "chart"
    };

    function HomeView(params){

        this._dispose();

        this._parseInput(params);

        this._attach();

        this._initVariables();

        this._bindEventListeners();

        this._printHomeDashboard();

        return this;
    }

    HomeView.prototype._dispose = function () {

        if (this.$chartTabs && this.$chartTabs.length > 0) {
            this.$chartTabs.off();
        }

        this._disposeDashboards();

        this.currentDashboard = {};
        this.filterValues = {};

    };


    HomeView.prototype._disposeDashboards = function () {

        _.each(this.dashboards, _.bind(function (dashboard) {
            if (dashboard && $.isFunction(dashboard.dispose)) {
                dashboard.dispose();
            }
        }, this));

        this.dashboards = [];
    };


    HomeView.prototype._parseInput = function (params) {
        this.lang = params.lang;
        this.$el = $(params.el);
    };

    HomeView.prototype._attach = function () {
        this.template = template(i18nLabelsHome[this.lang]);
        this.$el.html(this.template);
    };

    HomeView.prototype._initVariables = function () {
        this.$chartTabs = this.$el.find(s.CHART_TABS);
        this.dashboards = [];
        this.environment = C.ENVIRONMENT;
    };


    HomeView.prototype._bindEventListeners = function () {
        var self = this;

        this.$chartTabs.on('shown.bs.tab', function (e) {
            e.preventDefault();
            self._onChangeDashboard($(e.target).attr('data-section'));
        });

    };

    HomeView.prototype._onChangeDashboard = function (item) {

        if (this.currentDashboard !== item) {
            this.currentDashboard = item;
            this._printDashboard(item);
        }

    };


    HomeView.prototype._printDashboardBase = function (id) {
        var html = basesTemplate($.extend(true, {}, i18nLabelsHome[this.lang]));
        //Inject HTML
        var source = $(html).find("[data-dashboard='" + id + "']");
        this.$el.find(s.DASHBOARD_CONTENT).html(source);
    };


    HomeView.prototype._printHomeDashboard = function () {
        this._printDashboard('gdp_ppp');
    };


    HomeView.prototype._printDashboard = function (item) {
        var conf = this._getDashboardConfig(item);

        this._printDashboardBase(item);

        if (conf && !_.isEmpty(conf)) {
            this._renderDashboard(conf);
        }

    };

    HomeView.prototype._renderDashboard = function (config) {

        this._disposeDashboards();

        _.each(config, _.bind(function (c) {

            this.dashboards.push(new Dashboard($.extend(true, {
                environment: this.environment
            }, c)));

        }, this));

    };


    HomeView.prototype._getDashboardConfig = function (id) {

        var conf = HC[id].dashboard;

        if (!Array.isArray(conf)) {
            conf = FxUtils.cleanArray([conf]);
        }

        // Sets Highchart config for each chart
        _.each(conf[0].items, _.bind(function (item) {
            if (!_.isEmpty(item)) {
                if (item.type == s.CHART) {
                    if (item.config.config) {
                        item.config.config = $.extend(true, {}, HighchartsTemplate, item.config.config);
                        item.config.config.title.text = i18nLabelsHome[this.lang][item.id+'_chart_title'];

                    } else {
                        item.config.config = $.extend(true, {}, HighchartsTemplate);
                        item.config.config.title.text = i18nLabelsHome[this.lang][item.id+'_chart_title'];

                    }
                }
            }

        }, this));

        return conf;

    };

    return HomeView;
});
