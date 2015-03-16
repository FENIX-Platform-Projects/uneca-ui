define([
    'controllers/base/controller',
    'models/landing',
    'views/landing-view',
    'config/events',
    'chaplin'
], function (Controller, LandingModel, LandingView, Events, Chaplin) {

    'use strict';

    var LandingController = Controller.extend({

        beforeAction: function () {
            //Must be called as fist to let persist the shared resources
            Controller.prototype.beforeAction.call(this, arguments);
       },

        show: function (params, route, options) {
            this.model = new LandingModel();

            this.bindEventListeners();

            this.view = new LandingView({
                model: this.model,
                region: 'main'
            });

        },

        bindEventListeners : function () {
            Chaplin.mediator.subscribe(Events.COUNTRY_SELECTED, this.redirectToCountries);
        },

        unbindEventListeners: function () {
            Chaplin.mediator.unsubscribe(Events.COUNTRY_SELECTED);
        },

        dispose: function () {
            this.unbindEventListeners();
            Controller.prototype.dispose.call(this, arguments);

        },

        redirectToCountries : function (params) {
            var url =  'countries/'+params.code+'/'+params.label;
            Chaplin.utils.redirectTo({url: url, controller: 'countries', action: 'show'});
        }

    });

    return LandingController;

});
