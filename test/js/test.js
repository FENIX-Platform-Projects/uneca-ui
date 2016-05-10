/*global requirejs, define*/
define([
    'loglevel',
    'jquery',
    'fx-dashboard/start',
    'text!test/html/test.hbs',
    'test/models/dashboard'
], function (log, $, Dashboard, template, Model) {

    'use strict';

    var s = {
        CONTAINER: "#dashboard-container"
    };

    function Test() { }

    Test.prototype.start = function () {

        log.trace("Test started");

        this._attachTemplate();

        this._renderDashboard();

    };

    Test.prototype._attachTemplate = function () {

        $(s.CONTAINER).html(template);

        log.info("Template attached successfully");

    };

    Test.prototype._renderDashboard = function () {

        this.dashboard = new Dashboard(Model);

    };

    return new Test();
});
