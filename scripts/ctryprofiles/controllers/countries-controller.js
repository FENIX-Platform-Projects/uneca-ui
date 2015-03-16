/*global amplify, define*/
define([
    'chaplin',
    'controllers/base/controller',
    'views/profiles-view',
    'models/profiles',
    'config/events'
], function (Chaplin, Controller, ProfilesView, ProfilesModel, Events) {

    'use strict';

    var CountryProfilesController = Controller.extend({

        beforeAction: function () {
            //Must be called as fist to let persist the shared resources
            Controller.prototype.beforeAction.call(this, arguments);
        },

        initialize: function () {
            Controller.prototype.initialize.apply(this, arguments);
        },

        show: function (params, route, options) {
            this.bindEventListeners();

            var model =  new ProfilesModel({url: 'scripts/ctryprofiles/config/widgets.json', params: params});

            this.view = new ProfilesView({
                model: model,
                region: 'main'
            });

        },

        bindEventListeners: function () {
           // Chaplin.mediator.subscribe(Events.COUNTRY_SELECTED);
        },

        unbindEventListeners: function () {
           // Chaplin.mediator.country.dispose();
            Chaplin.mediator.country = null;
            Chaplin.mediator.unsubscribe(Events.COUNTRY_SELECTED);
        },

        dispose: function () {
           this.unbindEventListeners();
           Controller.prototype.dispose.call(this, arguments);
        }
    });

    return CountryProfilesController;

});
