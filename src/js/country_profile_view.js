/*global define, amplify*/
define([
    'jquery',
    'loglevel',
    'underscore',
    'config/events',
    'config/config',
    'config/profile/config',
    'fenix-ui-dashboard',
    'fenix-ui-filter',
    'fenix-ui-filter-utils',
    'js/browse_by_country',
    'lib/utils',
    'nls/labels',
    'html/profile/profile.hbs',
    'html/profile/dashboard.hbs',
    'html/profile/bases.hbs',
    'config/profile/lateral_menu',
    'config/profile/countries_summary',
    'handlebars',
    'amplify-pubsub',
    'bootstrap-list-filter',
    'jstree'
], function ($, log, _, EVT, C, PC, Dashboard, Filter, FxUtils, BrowseByCountry, Utils, i18nLabels, template, dashboardTemplate, basesTemplate, LateralMenuConfig, CountrySummary, Handlebars) {

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
        BROWSE_BY_COUNTRY_BACK: "#browse-by-country-back"
    };

    function CountryProfileView(params){
        this._dispose();

        log.info("IN CountryProfileView ");

        //TO DO
        this.lang = params.lang;

        $.extend(true, this, params);

        this.country = params.country;
        this.id = params.country.code;

        this.template = template(i18nLabels[this.lang]);
        this.$el = $(params.el);

        this.browseCountry = new BrowseByCountry();

        log.info("this.browseByCountry ");
        log.info(this.browseCountry)

        this._attach();

        this._initVariables();

        this._printCountryDashboard();

        return this;
    }

    CountryProfileView.prototype._attach = function () {
        this.$el.html(this.template);
    };

    CountryProfileView.prototype._initVariables = function () {
        $(s.BROWSE_BY_COUNTRY_BACK).removeClass('collapse');
        this.$content = this.$el.find(s.CONTENT);
        this.filterValues = {};
        this.dashboards = [];
        this.environment = C.ENVIRONMENT;
        var self = this;

        $(s.BROWSE_BY_COUNTRY_BACK).on('click', function(){
            console.log("HERE ONCLICK in Profile ");
            //$(s.BROWSE_BY_COUNTRY_BACK).addClass('collapse');

            var conf = {
                el: $(self.el),
                countries: this.countries,
                lang: self.lang
            };
            //return CountryProfileView.init({ lang: self.lang, el: '#main', country: countryObj});

            this.browseCountry.init();
            //BrowseByCountry.init(conf);
            // log.trace(BrowseByCountry, conf)
            // var view = new BrowseByCountry(conf);
            // return view;

            //return BrowseByCountryEntryPoint()._createBrowseByView();
        });
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


    CountryProfileView.prototype._onChangeDashboard =function (item) {

        if (this.currentDashboard !== item) {
            this.currentDashboard = item;
            this._printDashboard(item);
        }

    };

    CountryProfileView.prototype._onFilterClick = function () {

        var values = this.filter.getValues();

        this.filterValues[this.currentDashboard] = values;

        _.each( this.dashboards, _.bind(function (dashboard) {
            if (dashboard && $.isFunction(dashboard.refresh)) {
                dashboard.refresh(values);
            }
        }, this));

    };

    CountryProfileView.prototype._printDashboard = function (item) {

        this._printDashboardBase(item);

        var conf = this._getDashboardConfig(item),
            filterConfig = this._getFilterConfig(item);

        if (conf && !_.isEmpty(conf) ) {
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

        if (!Array.isArray(conf)){
            conf = FxUtils.cleanArray([conf]);
        }

        _.each(conf, _.bind(function ( c ) {

            if (!_.isEmpty(c)) {
                c.filter = $.extend(c.filter, this._createCountryFilter());

                var countrySel = c.filter.CountryCode;

                _.each(c.items, _.bind(function (item) {
                    item.filter = $.extend(item.filter, filterValues.values);

                    if(item.id === 'country-map-container') {
                        item.config.fenix_ui_map.zoomToCountry = countrySel;
                        item.config.fenix_ui_map.highlightCountry = countrySel;
                    }
                }))
            }

        }, this));

        return conf;

    };

    CountryProfileView.prototype._getFilterConfig =function (id) {

        var conf = $.extend(true, {}, PC[id].filter),
            values = this.filterValues[id] || {},
            result = FxUtils.mergeConfigurations(conf, values);

        _.each(result, _.bind(function (obj, key) {

            if (!obj.template) {
                obj.template = {};
            }
            //Add i18n label
            obj.template.title = Utils.getI18nLabel( key, i18nLabels[this.lang], "filter_");

        }, this));

        return result;
    };

    CountryProfileView.prototype._renderFilter= function (config) {

        if (this.filter && $.isFunction(this.filter.dispose)) {
            this.filter.dispose();
        }

        this.filter = new Filter({
            el: s.FILTER_CONTAINER,
            environment : this.environment,
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

    CountryProfileView.prototype._renderDashboard= function (config) {

        this._disposeDashboards();

        _.each(config, _.bind(function (c) {

            this.dashboards.push(new Dashboard($.extend(true, {
                environment: this.environment
            }, c)));

        }, this));

    };

    CountryProfileView.prototype._disposeDashboards = function () {

        _.each( this.dashboards, _.bind(function (dashboard) {
            if (dashboard && $.isFunction(dashboard.dispose)) {
                dashboard.dispose();
            }
        }, this));

        this.dashboards = [];
    };

    CountryProfileView.prototype._dispose= function () {

        if (this.$lateralMenu && this.$lateralMenu.length > 0) {
            this.$lateralMenu.jstree(true).destroy();
        }

        this._disposeDashboards();

        this._unbindDashboardEventListeners();

        this.currentDashboard = {};
        this.filterValues = {};

    };

    CountryProfileView.prototype._unbindDashboardEventListeners= function () {

        if (this.$filterSubmit && this.$filterSubmit.length > 0) {
            this.$filterSubmit.off();
        }

        $(s.BROWSE_BY_COUNTRY_BACK).off();

    };

    return CountryProfileView;
});
