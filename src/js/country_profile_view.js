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

    function ProfileView(params) {

        log.trace("In ProfileView")
        log.trace(BrowseByCountry)
        log.trace(Utils)
        this._dispose();

        //TO DO
        this.lang = params.lang;

        $.extend(true, this, params);

        this.country = params.country;
        this.id = params.country.code;

        this.template = template(i18nLabels[this.lang]);
        this.$el = $(params.el);
        this._attach();

        this._initVariables();

        this._printCountryDashboard();

        return this;
    }

    ProfileView.prototype._attach = function () {
        log.trace(this.$el)
        this.$el.html(this.template);
    };

    ProfileView.prototype._initVariables = function () {
        $(s.BROWSE_BY_COUNTRY_BACK).removeClass('collapse');
        this.$content = this.$el.find(s.CONTENT);

        console.log(this.$content)
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

            log.trace(BrowseByCountry, conf)
            var view = new BrowseByCountry(conf);
            return view;

            //return BrowseByCountryEntryPoint()._createBrowseByView();
        });
    };

    ProfileView.prototype._printCountryDashboard = function () {

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

    ProfileView.prototype._initDashboardVariables = function () {

        this.$filterSubmit = this.$el.find(s.FILTER_SUBMIT);

        this.$lateralMenu = this.$el.find(s.LATERAL_MENU);

    };

    ProfileView.prototype._bindDashboardEventListeners = function () {

        this.$filterSubmit.on('click', _.bind(this._onFilterClick, this));
    };


    ProfileView.prototype._onChangeDashboard =function (item) {

        if (this.currentDashboard !== item) {
            this.currentDashboard = item;
            this._printDashboard(item);
        }

    };

    ProfileView.prototype._onFilterClick = function () {

        var values = this.filter.getValues();

        this.filterValues[this.currentDashboard] = values;

        _.each( this.dashboards, _.bind(function (dashboard) {
            if (dashboard && $.isFunction(dashboard.refresh)) {
                dashboard.refresh(values);
            }
        }, this));

    };

    ProfileView.prototype._printDashboard = function (item) {

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

    ProfileView.prototype._getDashboardConfig = function (id) {

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

     ProfileView.prototype._getFilterConfig =function (id) {

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

    ProfileView.prototype._renderFilter= function (config) {

        if (this.filter && $.isFunction(this.filter.dispose)) {
            this.filter.dispose();
        }

        this.filter = new Filter({
            el: s.FILTER_CONTAINER,
            environment : this.environment,
            items: config,
            common: {
                template: {
                    hideSwitch: true,
                    hideRemoveButton: true
                }
            }
        });

    };

    ProfileView.prototype._createCountryFilter = function () {

        //create country filter

        return {"CountryCode": [this.id]};
    };

    ProfileView.prototype._printDashboardBase = function (id) {

        var context = Utils.setI18nToCountriesSummary(CountrySummary, i18nLabels[this.lang]);
        console.log(context)
        console.log(this.id, id)
        var model = context && context[this.id] ? context[this.id] : {};
        console.log(model)
        var html = basesTemplate($.extend(true, {}, model, i18nLabels[this.lang]));


        console.log(" ====================== HTML ==============");
        console.log(html);

        //Inject HTML
        var source = $(html).find("[data-dashboard='" + id + "']");

        console.log(" ====================== SOURCE ==============");
        console.log(source);

       /* var    template = Handlebars.compile(source.prop('outerHTML')),
            context = Utils.setI18nToCountriesSummary(CountrySummary, i18nLabels[this.lang]),
            model = context && context[this.id] ? context[this.id] : {},
            html = template($.extend(true, {}, model, i18nLabels[this.lang]));
*/
        this.$el.find(s.DASHBOARD_CONTENT).html(source);
    };

    ProfileView.prototype._renderDashboard= function (config) {

        this._disposeDashboards();

        _.each(config, _.bind(function (c) {

            this.dashboards.push(new Dashboard($.extend(true, {
                environment: this.environment
            }, c)));

        }, this));

    };

    ProfileView.prototype._disposeDashboards = function () {

        _.each( this.dashboards, _.bind(function (dashboard) {
            if (dashboard && $.isFunction(dashboard.dispose)) {
                dashboard.dispose();
            }
        }, this));

        this.dashboards = [];
    };

    ProfileView.prototype._dispose= function () {

        if (this.$lateralMenu && this.$lateralMenu.length > 0) {
            this.$lateralMenu.jstree(true).destroy();
        }

        this._disposeDashboards();

        this._unbindDashboardEventListeners();

        this.currentDashboard = {};
        this.filterValues = {};

    };

    ProfileView.prototype._unbindDashboardEventListeners= function () {

        if (this.$filterSubmit && this.$filterSubmit.length > 0) {
            this.$filterSubmit.off();
        }

        $(s.BROWSE_BY_COUNTRY_BACK).off();

    };


    // var ProfileView = View.extend({
    //
    //     initialize: function (params) {
    //
    //         this.lang = Utils.getLang().toUpperCase();
    //
    //         this.countries = params.countries;
    //
    //         this.country = params.country;
    //
    //         View.prototype.initialize.call(this, arguments);
    //     },
    //
    //     autoRender: true,
    //
    //     className: 'profiles',
    //
    //     template: template,
    //
    //     getTemplateData: function () {
    //
    //         return i18nLabels;
    //     },
    //
    //     attach: function () {
    //
    //         View.prototype.attach.call(this, arguments);
    //
    //         //update State
    //         amplify.publish(EVT.STATE_CHANGE, {menu: 'profile'});
    //
    //         this._initVariables();
    //
    //         this._printCountryDashboard();
    //
    //     },
    //
    //     _initVariables: function () {
    //
    //         this.$content = this.$el.find(s.CONTENT);
    //
    //         this.filterValues = {};
    //
    //         this.dashboards = [];
    //
    //         this.environment = C.ENVIRONMENT;
    //
    //     },
    //
    //     //country dashboard
    //
    //     _printCountryDashboard: function () {
    //
    //         var self = this,
    //             template = Handlebars.compile(dashboardTemplate),
    //             html = template({country: this.country.title[this.lang]});
    //
    //         this.$content.html(html);
    //
    //         this._initDashboardVariables();
    //
    //         this._bindDashboardEventListeners();
    //
    //         //print lateral menu
    //         this.$lateralMenu.jstree(Utils.setI18nToJsTreeConfig(LateralMenuConfig, i18nLabels))
    //
    //         //Limit selection e select only leafs for indicators
    //             .on("select_node.jstree", _.bind(function (e, data) {
    //
    //                 if (!data.instance.is_leaf(data.node)) {
    //
    //                     self.$lateralMenu.jstree(true).deselect_node(data.node, true);
    //
    //                     self.$lateralMenu.jstree(true).open_node(data.node, true);
    //
    //                 } else {
    //                     self._onChangeDashboard(data.selected[0]);
    //                 }
    //
    //             }, this));
    //
    //         this._printDashboard('resume');
    //
    //     },
    //
    //     _bindDashboardEventListeners: function () {
    //
    //         this.$filterSubmit.on('click', _.bind(this._onFilterClick, this));
    //     },
    //
    //     _initDashboardVariables: function () {
    //
    //         this.$filterSubmit = this.$el.find(s.FILTER_SUBMIT);
    //
    //         this.$lateralMenu = this.$el.find(s.LATERAL_MENU);
    //
    //     },
    //
    //     _printDashboard: function (item) {
    //
    //         this._printDashboardBase(item);
    //
    //         var conf = this._getDashboardConfig(item),
    //             filterConfig = this._getFilterConfig(item);
    //
    //         if (conf && !_.isEmpty(conf) ) {
    //             this._renderDashboard(conf);
    //         }
    //
    //         if (!_.isEmpty(filterConfig)) {
    //             this.$el.find(s.FILTER_BLOCK).show();
    //             this._renderFilter(filterConfig);
    //         } else {
    //             this.$el.find(s.FILTER_BLOCK).hide();
    //         }
    //
    //     },
    //
    //     _onChangeDashboard: function (item) {
    //
    //         if (this.currentDashboard !== item) {
    //             this.currentDashboard = item;
    //             this._printDashboard(item);
    //         }
    //
    //     },
    //
    //     _onFilterClick: function () {
    //
    //         var values = this.filter.getValues();
    //
    //         this.filterValues[this.currentDashboard] = values;
    //
    //         _.each( this.dashboards, _.bind(function (dashboard) {
    //             if (dashboard && $.isFunction(dashboard.refresh)) {
    //                 dashboard.refresh(values);
    //             }
    //         }, this));
    //
    //     },
    //
    //     _printDashboardBase: function (id) {
    //
    //         //Inject HTML
    //         var source = $(basesTemplate).find("[data-dashboard='" + id + "']"),
    //             template = Handlebars.compile(source.prop('outerHTML')),
    //             context = Utils.setI18nToCountriesSummary(CountrySummary, i18nLabels),
    //             model = context && context[this.id] ? context[this.id] : {},
    //             html = template($.extend(true, {}, model, i18nLabels));
    //
    //         this.$el.find(s.DASHBOARD_CONTENT).html(html);
    //     },
    //
    //     _createCountryFilter: function () {
    //
    //         //create country filter
    //
    //         return {"CountryCode": [this.id]};
    //     },
    //
    //     _getDashboardConfig: function (id) {
    //
    //         var conf = PC[id].dashboard,
    //             filterValues = this.filterValues[this.currentDashboard] || {};
    //
    //         if (!Array.isArray(conf)){
    //             conf = FxUtils.cleanArray([conf]);
    //         }
    //
    //         _.each(conf, _.bind(function ( c ) {
    //
    //             if (!_.isEmpty(c)) {
    //                 c.filter = $.extend(c.filter, this._createCountryFilter());
    //
    //                 var countrySel = c.filter.CountryCode;
    //
    //                 _.each(c.items, _.bind(function (item) {
    //                     item.filter = $.extend(item.filter, filterValues.values);
    //
    //                     if(item.id === 'country-map-container') {
    //                         item.config.fenix_ui_map.zoomToCountry = countrySel;
    //                         item.config.fenix_ui_map.highlightCountry = countrySel;
    //                     }
    //                 }))
    //             }
    //
    //         }, this));
    //
    //         return conf;
    //
    //     },
    //
    //     _getFilterConfig: function (id) {
    //
    //         var conf = $.extend(true, {}, PC[id].filter),
    //             values = this.filterValues[id] || {},
    //             result = FxUtils.mergeConfigurations(conf, values);
    //
    //         _.each(result, _.bind(function (obj, key) {
    //
    //             if (!obj.template) {
    //                 obj.template = {};
    //             }
    //             //Add i18n label
    //             obj.template.title = Utils.getI18nLabel( key, i18nLabels, "filter_");
    //
    //         }, this));
    //
    //         return result;
    //     },
    //
    //     _renderDashboard: function (config) {
    //
    //         this._disposeDashboards();
    //
    //         _.each(config, _.bind(function (c) {
    //
    //             this.dashboards.push(new Dashboard($.extend(true, {
    //                 environment: this.environment
    //             }, c)));
    //
    //         }, this));
    //
    //     },
    //
    //     _disposeDashboards : function () {
    //
    //         _.each( this.dashboards, _.bind(function (dashboard) {
    //             if (dashboard && $.isFunction(dashboard.dispose)) {
    //                 dashboard.dispose();
    //             }
    //         }, this));
    //
    //         this.dashboards = [];
    //     },
    //
    //     _renderFilter: function (config) {
    //
    //         if (this.filter && $.isFunction(this.filter.dispose)) {
    //             this.filter.dispose();
    //         }
    //
    //         this.filter = new Filter({
    //             el: s.FILTER_CONTAINER,
    //             environment : this.environment,
    //             items: config,
    //             common: {
    //                 template: {
    //                     hideSwitch: true,
    //                     hideRemoveButton: true
    //                 }
    //             }
    //         });
    //
    //     },
    //
    //     //Disposition process
    //
    //     dispose: function () {
    //
    //         if (this.$lateralMenu && this.$lateralMenu.length > 0) {
    //             this.$lateralMenu.jstree(true).destroy();
    //         }
    //
    //         this._disposeDashboards();
    //
    //         this._unbindDashboardEventListeners();
    //
    //         this.currentDashboard = {};
    //         this.filterValues = {};
    //
    //         View.prototype.dispose.call(this, arguments);
    //     },
    //
    //     _unbindDashboardEventListeners: function () {
    //
    //         if (this.$filterSubmit && this.$filterSubmit.length > 0) {
    //             this.$filterSubmit.off();
    //         }
    //
    //     }
    //
    // });

    return ProfileView;
});
