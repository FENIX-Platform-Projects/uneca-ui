/*global define, amplify*/
define([
    'jquery',
    'loglevel',
    'underscore',
    '../config/events',
    '../config/config',
    '../config/domain/config',
    'fenix-ui-dashboard',
    'fenix-ui-filter',
    'fenix-ui-filter-utils',
    '../lib/utils',
    '../nls/labels',
    '../html/domain/domain.hbs',
    '../html/domain/dashboard.hbs',
    '../html/domain/bases.hbs',
    '../config/domain/lateral_menu',
    'jstree'
], function ($, log, _, EVT, C, PC, Dashboard, Filter, FxUtils, Utils, i18nLabels, template, dashboardTemplate, basesTemplate, LateralMenuConfig) {

    'use strict';

    var s = {
        CONTENT: "#domain-content",
        SEARCH_FILTER_INPUT: "#searchinput",
        DASHBOARD_CONTENT: "#dashboard-content",
        LATERAL_MENU: '#lateral-menu',
        MAP_CONTAINER: "#country-map-container",
        FILTER_CONTAINER: '#filter-container',
        FILTER_SUBMIT: '#filter-submit',
        FILTER_BLOCK: "[data-role='filter-block']"
    };

    function DomainView(params){
       // log.info("DomainView Start");

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

        this._printDashboard('population');
        //this._printDashboard('tourism');

    };

    DomainView.prototype._initDashboardVariables = function () {

        this.$filterSubmit = this.$el.find(s.FILTER_SUBMIT);

        this.$lateralMenu = this.$el.find(s.LATERAL_MENU);

    };

    DomainView.prototype._bindDashboardEventListeners = function () {


        console.log(" ================= _bindDashboardEventListeners: ");
        this.$filterSubmit.on('click', _.bind(this._onFilterClick, this));
    };

    DomainView.prototype._onChangeDashboard = function (item) {

        if (this.currentDashboard !== item) {
            this.currentDashboard = item;
            this._printDashboard(item);
        }

    };

    DomainView.prototype._onFilterClick = function () {


        console.log(" ================= _onFilterClick: "+values);

        var values = this.filter.getValues();

        console.log(" ================= ",values);


        this.filterValues[this.currentDashboard] = values;

        console.log(this.currentDashboard);
        console.log(this.dashboards);
        _.each(this.dashboards, _.bind(function (dashboard) {
            console.log(dashboard);
            if (dashboard && $.isFunction(dashboard.refresh)) {
                dashboard.refresh(values);
            }
        }, this));

    };

    DomainView.prototype._printDashboard = function (item) {

        var conf = this._getDashboardConfig(item),
            filterConfig = this._getFilterConfig(item);

        if (!_.isEmpty(filterConfig)) {
            this.$el.find(s.FILTER_BLOCK).show();
            this._renderFilter(filterConfig);
        } else {
            this.$el.find(s.FILTER_BLOCK).hide();
        }

        this._printDashboardBase(item);

        if (conf && !_.isEmpty(conf)) {
           this._renderDashboard(conf);
        }

    };


    DomainView.prototype._renderDashboard = function (config) {

        this._disposeDashboards();

        _.each(config, _.bind(function (c) {

            this.dashboards.push(new Dashboard($.extend(true, {
                environment : this.environment
            }, c)));

        }, this));

    };

    DomainView.prototype._printDashboardBase = function (id) {

        var html = basesTemplate(i18nLabels[this.lang]);

        //Inject HTML
        var source = $(html).find("[data-dashboard='" + id + "']");

        this.$el.find(s.DASHBOARD_CONTENT).html(source);
    };

    DomainView.prototype._getDashboardConfig = function (id) {

        var conf = PC[id].dashboard,
            filterValues = this.filterValues[this.currentDashboard] || {};

        if (!Array.isArray(conf)) {
            conf = FxUtils.cleanArray([conf]);
        }

        return conf;

    };

    DomainView.prototype._getFilterConfig = function (id) {

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

    DomainView.prototype._renderFilter = function (config) {

        if (this.filter && $.isFunction(this.filter.dispose)) {
            this.filter.dispose();
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

    };

    //Disposition process

    DomainView.prototype._dispose = function () {

        if (this.$lateralMenu && this.$lateralMenu.length > 0) {
            this.$lateralMenu.jstree(true).destroy();
        }

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

    DomainView.prototype._disposeDashboards = function () {

        _.each(this.dashboards, _.bind(function (dashboard) {
            if (dashboard && $.isFunction(dashboard.dispose)) {
                dashboard.dispose();
            }
        }, this));

        this.dashboards = [];
    };


    /*  var DomainView = View.extend({

          initialize: function (params) {

              this.lang = Utils.getLang().toUpperCase();

              View.prototype.initialize.call(this, arguments);
          },

          autoRender: true,

          className: 'domain',

          template: template,

          getTemplateData: function () {

              return i18nLabels;
          },

          attach: function () {

              View.prototype.attach.call(this, arguments);

              //update State
              amplify.publish(EVT.STATE_CHANGE, {menu: 'domain'});

              this._initVariables();

              this._printDomainDashboard();

          },

          _printDomainDashboard: function () {

              var self = this,
                  template = Handlebars.compile(dashboardTemplate),
                  html = template();

              this.$content.html(html);

              this._initDashboardVariables();

              this._bindDashboardEventListeners();

              //print lateral menu
              this.$lateralMenu.jstree(Utils.setI18nToJsTreeConfig(LateralMenuConfig, i18nLabels))

              //Limit selection e select only leafs for indicators
                  .on("select_node.jstree", _.bind(function (e, data) {

                      if (!data.instance.is_leaf(data.node)) {

                          self.$lateralMenu.jstree(true).deselect_node(data.node, true);

                          self.$lateralMenu.jstree(true).open_node(data.node, true);

                      } else {
                          self._onChangeDashboard(data.selected[0]);
                      }

                  }, this));

              this._printDashboard('population');

          },

          _initVariables: function () {

              this.$content = this.$el.find(s.CONTENT);

              this.filterValues = {};

              this.dashboards = [];

              this.environment = C.ENVIRONMENT;

          },

          //country dashboard

          _bindDashboardEventListeners: function () {

              this.$filterSubmit.on('click', _.bind(this._onFilterClick, this));
          },

          _initDashboardVariables: function () {

              this.$filterSubmit = this.$el.find(s.FILTER_SUBMIT);

              this.$lateralMenu = this.$el.find(s.LATERAL_MENU);

          },

          _printDashboard: function (item) {

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

          },

          _printDashboardBase: function (id) {

              //Inject HTML
              var source = $(basesTemplate).find("[data-dashboard='" + id + "']"),
                  template = Handlebars.compile(source.prop('outerHTML')),
                  html = template(i18nLabels);

              this.$el.find(s.DASHBOARD_CONTENT).html(html);
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

              _.each(this.dashboards, _.bind(function (dashboard) {
                  if (dashboard && $.isFunction(dashboard.refresh)) {
                      dashboard.refresh(values);
                  }
              }, this));

          },

          _createCountryFilter: function () {

              //create country filter

              return {"CountryCode": [this.id]};
          },

          _getDashboardConfig: function (id) {

              var conf = PC[id].dashboard,
                  filterValues = this.filterValues[this.currentDashboard] || {};

              if (!Array.isArray(conf)) {
                  conf = FxUtils.cleanArray([conf]);
              }

              return conf;

          },

          _getFilterConfig: function (id) {

              var conf = $.extend(true, {}, PC[id].filter),
                  values = this.filterValues[id] || {},
                  result = FxUtils.mergeConfigurations(conf, values);

              _.each(result, _.bind(function (obj, key) {

                  if (!obj.template) {
                      obj.template = {};
                  }
                  //Add i18n label
                  obj.template.title = Utils.getI18nLabel(key, i18nLabels, "filter_");

              }, this));

              return result;
          },

          _renderDashboard: function (config) {

              this._disposeDashboards();

              _.each(config, _.bind(function (c) {

                  this.dashboards.push(new Dashboard($.extend(true, {
                      environment : this.environment
                  }, c)));

              }, this));

          },

          _disposeDashboards: function () {

              _.each(this.dashboards, _.bind(function (dashboard) {
                  if (dashboard && $.isFunction(dashboard.dispose)) {
                      dashboard.dispose();
                  }
              }, this));

              this.dashboards = [];
          },

          _renderFilter: function (config) {

              if (this.filter && $.isFunction(this.filter.dispose)) {
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

              this._disposeDashboards();

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

      });*/

    return DomainView;
});
