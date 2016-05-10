/*global define*/
define([
    'jquery',
    'backbone',
    'underscore',
    'chaplin',
    'config/Config',
    'controllers/base/controller',
    'views/countries-view',
    'fx-common/bridge',
    'amplify'
], function ($, Backbone, _, Chaplin, C, Controller, View, Bridge) {

    'use strict';

    var CountriesController = Controller.extend({

        beforeAction: function (params) {

            this.currentCountryId = params.id;

            Controller.prototype.beforeAction.call(this, arguments);

            return this.performAccessControlChecks(params).then(_.bind(this.onSuccess, this), _.bind(this.onError, this));
        },

        onError: function () {

            alert("Impossible to load country list")
        },

        onSuccess: function (countries) {

            this.countries = countries.sort(function (a, b) {
                var textA = a.title.EN.toUpperCase();
                var textB = b.title.EN.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });

            var country = _.findWhere(this.countries, {code: this.currentCountryId});

            this.validCountrydId = !!country;

            this.country = country;

        },

        performAccessControlChecks: function (params) {

            return Bridge.getCodeList({
                body: {
                    uid : "UNECA_ISO3",
                    level : 2
                }
            });
        },

        show: function (params) {

            var conf = {
                region: 'main',
                countries: this.countries
            };

            //Pass the valid id to view if valid
            if (this.validCountrydId === true) {
                conf.id = params.id;
                conf.country = this.country;
            } else {
                Backbone.history.navigate('#profile/', {trigger: false});
            }

            this.view = new View(conf);
        }

    });

    return CountriesController;
});
