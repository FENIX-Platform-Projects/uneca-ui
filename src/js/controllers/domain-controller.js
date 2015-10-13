/*global define*/
define([
    'jquery',
    'backbone',
    'chaplin',
    'config/Config',
    'controllers/base/controller',
    'views/domain-view',
    'text!json/methods/models.json',
    'q',
    'amplify'
], function ($, Backbone, Chaplin, C, Controller, View, MethodsCollection, Q) {

    'use strict';

    var DomainController = Controller.extend({

        beforeAction: function (params) {

            this.currentDomainId  =  params.id;

            Controller.prototype.beforeAction.call(this, arguments);

            //TODO cache codelist

            return this.performAccessControlChecks(params).then( _.bind(this.onSuccess, this), _.bind(this.onError, this));
        },

        onError: function ( ) {

            alert("Impossible to load country list")
        },

        onSuccess: function ( domains ) {

            this.domains = domains;

            //var domain = _.findWhere(this.domains, { code : this.currentDomainId});

            //this.domain = domain;

            //this.validDomaindId = !!domain;

            this.validDomaindId = true;
            this.domain = "population";

        },

        performAccessControlChecks: function (parmas) {

            return new Q.Promise(function (fulfilled, rejected) {

                fulfilled();

            });

        },

        show: function (params) {

            var conf = {
                region: 'main',
                domains: this.domains
            };

            //Pass the valid id to view if valid
            if (this.validDomaindId === true) {
                conf.id = params.id;
                //TODO temp
                conf.id = "population";

                conf.domain = this.domain;
            } else {
                Backbone.history.navigate('#domains/' , {trigger: false});
            }

            this.view = new View(conf);
        }

    });

    return DomainController;
});
