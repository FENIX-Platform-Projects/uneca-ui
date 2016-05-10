/*global define, amplify*/
define([
    'jquery',
    'require',
    'underscore',
    'loglevel',
    'config/errors',
    'config/events',
    'config/config',
    'amplify'
], function ($, require, _, log, ERR, EVT, C) {

    'use strict';

    function DashboardCreator(o) {
        log.info("FENIX DashboardCreator");
        log.info(o);

        $.extend(true, this, CD, C, {initial: o});

        this._parseInput(o);

        var valid = this._validateInput();

        if (valid === true) {

            this._initVariables();

            this._bindEventListeners();

            this._preloadPluginScript();

            return this;

        } else {
            log.error("Impossible to create DashboardCreator");
            log.error(valid)
        }

    }

    // API

    /**
     * pub/sub
     * @return {Object} DashboardCreator instance
     */
    DashboardCreator.prototype.on = function (channel, fn) {
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: this, callback: fn});
        return this;
    };

    DashboardCreator.prototype._trigger = function (channel) {

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

    // end API

    DashboardCreator.prototype._parseInput = function () {

        this.id = this.initial.id;
        this.$el = this.initial.$el;
        this.type = this.initial.type;

        //pivotator config

    };

    DashboardCreator.prototype._validateInput = function () {

        var valid = true,
            errors = [];

        //set DashboardCreator id
        if (!this.id) {

            window.fx_chart_id >= 0 ? window.fx_chart_id++ : window.fx_chart_id = 0;
            this.id = String(window.fx_chart_id);
            log.warn("Impossible to find DashboardCreator id. Set auto id to: " + this.id);
        }

        if (!this.$el) {
            errors.push({code: ERR.MISSING_CONTAINER});
            log.warn("Impossible to find DashboardCreator container");
        }

        this.$el = $(this.$el);

        //Check if $el exist
        if (this.$el.length === 0) {
            errors.push({code: ERR.MISSING_CONTAINER});
            log.warn("Impossible to find box container");
        }



        return errors.length > 0 ? errors : valid;

    };

    DashboardCreator.prototype._initVariables = function () {

        //pub/sub
        this.channels = {};

    };

    DashboardCreator.prototype._bindEventListeners = function () {

        //amplify.subscribe(this._getEventName(EVT.SELECTOR_READY), this, this._onSelectorReady);

    };

    // Preload scripts

    DashboardCreator.prototype._getPluginPath = function (name) {

        var registeredSelectors = $.extend(true, {}, this.plugin_registry),
            path;

        var conf = registeredSelectors[name];

        if (!conf) {
            log.error('Registration not found for "' + name + ' plugin".');
        }

        if (conf.path) {
            path = conf.path;
        } else {
            log.error('Impossible to find path configuration for "' + name + ' plugin".');
        }

        return path;

    };

    DashboardCreator.prototype._preloadPluginScript = function () {

        var paths = [];

        paths.push(this._getPluginPath(this.type));

        log.info("DashboardCreator path to load");
        log.info(paths);

        //Async load of plugin js source
        require(paths, _.bind(this._preloadPluginScriptSuccess, this));

    };

    DashboardCreator.prototype._preloadPluginScriptSuccess = function () {
        log.info('Plugin script loaded successfully');

        this._renderChart();

    };

    DashboardCreator.prototype._renderChart = function () {

        var Renderer = this._getRenderer(this.type);

        //process model and pass it

        this.chart = new Renderer( .. ..);

        this._trigger("ready");

    };

    DashboardCreator.prototype._getEventName = function (evt) {

        return this.id.concat(evt);

    };

    DashboardCreator.prototype._getRenderer = function (name) {

        return require(this._getPluginPath(name));
    };

    //disposition
    DashboardCreator.prototype._unbindEventListeners = function () {

        //amplify.unsubscribe(this._getEventName(EVT.SELECTOR_READY), this._onSelectorReady);

    };

    DashboardCreator.prototype.dispose = function () {

        this.chart.dispose();

        //unbind event listeners
        this._unbindEventListeners();

    };

    // utils

    DashboardCreator.prototype._getChartInstance = function (name) {

        var instance = this.instances[name];

        if (!instance) {

            log.warn("Impossible to find chart instance for " + name);
        }

        return instance;

    };

    DashboardCreator.prototype._callSelectorInstanceMethod = function (name, method, opts1, opts2) {

        var Instance = this._getChartInstance(name);

        if ($.isFunction(Instance[method])) {

            return Instance[method](opts1, opts2);

        } else {
            log.error(name + " selector does not implement the mandatory " + method + "() fn");
        }

    };

    return DashboardCreator;
});