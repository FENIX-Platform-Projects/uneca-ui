/*global define, amplify*/
define([
    'jquery',
    'loglevel',
    'underscore',
    '../config/events',
    '../config/config',
    '../config/domain/config',
    'fenix-ui-dashboard',
    //'fenix-ui-filter',
    'filter',
    'fenix-ui-filter-utils',
    '../lib/utils',
    '../nls/labels',
    '../html/domain/domain.hbs',
    '../html/domain/dashboard.hbs',
    '../html/domain/bases.hbs',
    '../config/domain/lateral_menu',
    '../config/nodemodules/fenix-ui-chart-creator/highcharts_template',
    'jstree'
], function ($, log, _, EVT, C, PC, Dashboard, Filter, FxUtils, Utils, i18nLabels, template, dashboardTemplate, basesTemplate, LateralMenuConfig, HighchartsTemplate) {

    'use strict';

    // font: normal normal 300 16px/normal "Roboto";
    // color: #567794;

    var s = {
        DEFAULT_DOMAIN: 'population',
        CONTENT: "#domain-content",
        SEARCH_FILTER_INPUT: "#searchinput",
        DASHBOARD_CONTENT: "#dashboard-content",
        LATERAL_MENU: '#lateral-menu',
        MAP_CONTAINER: "#country-map-container",
        FILTER_CONTAINER: '#filter-container',
        FILTER_CONTAINER_DOMAIN: '#domain-filter-holder',
        FILTER_SUBMIT: '#filter-submit',
        FILTER_BLOCK: "[data-role='filter-block']",
        CHART_TYPE: "chart"
    };

    function DomainView(params){
        // log.info("DomainView Start");

       // console.log(PC)
        this._dispose();

        this._parseInput(params);

        this._attach();

        this._initVariables();

        this._printDomainDashboard();

        return this;
    }

    DomainView.prototype._parseInput = function (params) {
        this.lang = params.lang;
        this.$el = $(params.el);
        this.domain = params.domain;
    };

    DomainView.prototype._attach = function () {
        this.template = template(i18nLabels[this.lang]);
        this.$el.html(this.template);
    };

    DomainView.prototype._initVariables = function () {
        this.$content = this.$el.find(s.CONTENT);
        this.filterValues = {};
        this.dashboards = [];
        this.environment = C.ENVIRONMENT;

    };

    DomainView.prototype._printDomainDashboard = function () {

        var self = this,
            template = dashboardTemplate,
            html = template();

        this.$content.html(html);

        this._initDashboardVariables();

        this._bindDashboardEventListeners();

        //print lateral menu
        this.$lateralMenu
            .jstree(Utils.setI18nToJsTreeConfig(LateralMenuConfig, i18nLabels[this.lang]))

            //Limit selection e select only leafs for indicators
            .on("select_node.jstree", _.bind(function (e, data) {

                if (!data.instance.is_leaf(data.node)) {

                    self.$lateralMenu.jstree(true).deselect_node(data.node, true);

                    self.$lateralMenu.jstree(true).open_node(data.node, true);

                } else {
                    self._onChangeDashboard(data.selected[0]);
                }

            }, this));

        // var id = s.DEFAULT_DOMAIN;
        var id = this.domain;
        this.$lateralMenu.bind("loaded.jstree", function (e, data) {
            self.$lateralMenu.jstree("select_node", id, true);
        })
        this.currentDashboard = id;
        this._printDashboard(id);
    };

    DomainView.prototype._initDashboardVariables = function () {

        this.$filterSubmit = this.$el.find(s.FILTER_SUBMIT);

        this.$lateralMenu = this.$el.find(s.LATERAL_MENU);

        this.dashboardConfig = {};

    };

    DomainView.prototype._bindDashboardEventListeners = function () {

        this.$filterSubmit.on('click', _.bind(this._onFilterClick, this));
    };

    DomainView.prototype._onChangeDashboard = function (item) {

        if (this.currentDashboard !== item) {
            this.currentDashboard = item;
            this._printDashboard(item);
        }
    };

    DomainView.prototype._onFilterClick = function () {

        var values = this.filter.getValues();
        //console.log("_onFilterClick ====================");
        //console.log(values);

        this.filterValues[this.currentDashboard] = values;

        var conf = this.dashboardConfig[this.currentDashboard];

        //If the dashboard contains a map return it
        var map = _.find(conf.dashboard.items, function(it){
            return it.type == 'map'});

        var um = values.values.um;

        if(map){
            var updatedconf = this._updateDashboardConfig(conf, values);
            this.dashboardConfig[this.currentDashboard] = updatedconf;
            this._renderDashboard(updatedconf.dashboard);
        } else if(um) {
            var updatedconf = this._updateChartTitles(conf, values);
            updatedconf = this._updateDashboardConfig(updatedconf, values);
            this.dashboardConfig[this.currentDashboard] = updatedconf;
            this._renderDashboard(updatedconf.dashboard);
        }
        else{
            _.each(this.dashboards, _.bind(function (dashboard) {
                if (dashboard && $.isFunction(dashboard.refresh)) {
                    dashboard.refresh(values);
                }
            }, this));
        }
    };


    DomainView.prototype._updateDashboardConfig = function (conf, filterValues) {

        var c= conf.dashboard;

        if (!_.isEmpty(c)) {
            c.filter = $.extend(c.filter, filterValues);

            var countrySel = c.filter.values.CountryCode;
            _.each(c.items, _.bind(function (item) {

                if (item.type === 'map') {
                    item.config.fenix_ui_map.zoomToCountry = countrySel;
                    //item.config.fenix_ui_map.highlightCountry = countrySel;
                }
            }))
        }

        return conf;
    };

    DomainView.prototype._updateChartTitles = function (conf, filterValues) {

        var c= conf.dashboard;
        var self = this;

        if (!_.isEmpty(c)) {
            _.each(c.items, _.bind(function (item) {
                if (item.type == s.CHART_TYPE) {
                    if (item.config.config) {
                        item.config.config = $.extend(true, {}, HighchartsTemplate, item.config.config);
                        item.config.config.title.text = i18nLabels[self.lang][item.id+'_title'] + ", " +  filterValues.values.um;
                    }
                }
            }))
        }


        return conf;
    };




    DomainView.prototype._printDashboard = function (item) {

        var self = this,
            filterConfig = this._getFilterConfig(item);

        this.dashboardConfig[item] = PC[item];

        if (!_.isEmpty(filterConfig)) {
            this.$el.find(s.FILTER_BLOCK).show();
            this._renderFilter(filterConfig, item);
        } else {
            this.$el.find(s.FILTER_BLOCK).hide();
        }
    };


    DomainView.prototype._renderDashboard = function (config) {

        this._disposeDashboards();

        this.dashboards.push(new Dashboard($.extend(true, {
            environment : this.environment
        }, config)));

    };

    DomainView.prototype._printDashboardBase = function (id, filterConfig) {

       /* var maxYear = '';

        if(filterConfig["Year"]){
            var yearSelector = filterConfig["Year"].selector.source;
            maxYear = Math.max.apply(Math,yearSelector.map(function(o){return o.value;}));
        } else {
           // find map items and get the first max value
        }

        var data = $.extend(true, {maxYear: maxYear}, i18nLabels[this.lang]);*/

        var html = basesTemplate(i18nLabels[this.lang]);

        //Inject HTML
        var source = $(html).find("[data-dashboard='" + id + "']");

        console.log("8888888888888888888888888888888888888888888888888")
        console.log(source)
        this.$el.find(s.DASHBOARD_CONTENT).html(source);
    };

    DomainView.prototype._getDashboardConfig = function (id) {

        var conf = PC[id].dashboard,
            filterValues = this.filter.getValues(),
            um = filterValues.values.um;//this.filterValues[this.currentDashboard] || {};
        if (!Array.isArray(conf)) {
            conf = FxUtils.cleanArray([conf]);
            conf = conf[0];
        }
        var self = this;

        if (!_.isEmpty(conf)) {

            _.each(conf.items, _.bind(function (item) {

                if (item.type == s.CHART_TYPE) {

                    if (item.config.config) {
                        item.config.config = $.extend(true, {}, HighchartsTemplate, item.config.config);
                    } else {
                        item.config.config = $.extend(true, {}, HighchartsTemplate);
                    }

                     item.config.config.title.text = i18nLabels[self.lang][item.id+'_title'];
                     if(um)
                        item.config.config.title.text = item.config.config.title.text + ", " +  filterValues.values.um;
                }
            }))
        }

        return conf;

    };

    DomainView.prototype._getFilterConfig = function (id) {

        var conf = $.extend(true, {}, PC[id].filter);

        var    values = this.filterValues[id] || {},
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

    DomainView.prototype._renderFilter = function (config, item) {

        var self = this;

        this._disposeFilter();


        var $cointainerContent = $('<div id="filter-container"><div class="row"><div class="col-xs-6"><div data-selector="CountryCode"></div></div><div class="col-xs-6"><div data-selector="Year"></div></div></div></div>');

        if($(s.FILTER_CONTAINER).length === 0){
            $(s.FILTER_CONTAINER_DOMAIN).html($cointainerContent);
        }

        this.filter = new Filter({
            el: s.FILTER_CONTAINER,
            selectors: config,
            common: {
                template: {
                    hideSwitch: true,
                    hideRemoveButton: true
                }
            }
        });

        this.filter.on('ready', function (payload) {

            console.log("///////////")
            var country_filter = "[data-selector='CountryCode']";
           console.log($(s.FILTER_CONTAINER).find(country_filter))
            var id = 'CountryCode';
            var source = $(self.$el).find("[data-selector='" + id + "']");
            source.jstree("select_node", "AMU_anchor", true);
            source.jstree("select_node", "LBY", true);
            source.bind("loaded.jstree", function (e, data) {
                console.log("///////////IN!!!")
                source.jstree("select_node", "LBY", true);
            })
            // source.jstree();
            // source.jstree(true).open_node(data.node, true);
            //source.jstree("select_node","AMU_anchor", true)
            // ("select_node", id, true);
            console.log(source)
            var conf = self._getDashboardConfig(item);

            self._printDashboardBase(item, config);

            if (conf && !_.isEmpty(conf)) {
                this._renderDashboard(conf);
            }

        }, this);

    };

    DomainView.prototype._createCountryFilter = function () {

        //create country filter
        return {"CountryCode": [this.id]};
    };

    //Disposition process

    DomainView.prototype._dispose = function () {

        if (this.$lateralMenu && this.$lateralMenu.length > 0) {
            this.$lateralMenu.jstree(true).destroy();
        }

        this._disposeFilter();

        this._disposeDashboards();

        this._unbindDashboardEventListeners();

        this.currentDashboard = {};
        this.filterValues = {};

    };

    DomainView.prototype._unbindDashboardEventListeners = function () {

        if (this.$filterSubmit && this.$filterSubmit.length > 0) {
            this.$filterSubmit.off();
        }

    };


    DomainView.prototype._disposeFilter = function () {
        if (this.filter && $.isFunction(this.filter.dispose)) {
            this.filter.dispose();
        }
    };


    DomainView.prototype._disposeDashboards = function () {

        _.each(this.dashboards, _.bind(function (dashboard) {
            if (dashboard && $.isFunction(dashboard.dispose)) {
                dashboard.dispose();
            }
        }, this));

        this.dashboards = [];
    };

    return DomainView;
});
