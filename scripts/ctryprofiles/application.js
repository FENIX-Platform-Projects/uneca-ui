/*global define*/

define([
    'chaplin',
    'config/events'
], function (Chaplin, Events) {

    'use strict';

    // The application object
    // Choose a meaningful name for your application
    var Application = Chaplin.Application.extend({

        initialize : function () {
            var args = [].slice.call(arguments);

            //the coordinates (x, y) you want to scroll to on view replacement. Set to false to deactivate it.
            this.initLayout({scrollTo: false});

            Chaplin.Application.prototype.initialize.apply(this, args);
        },

        initMediator: function() {
            // Create a country property
            Chaplin.mediator.country = null;
            // Seal the mediator
            return Chaplin.mediator.seal();
        },

    // Set your application name here so the document title is set to
        // “Controller title – Site title” (see Layout#adjustTitle)
        title: 'UNECA - Country Profiles',

        start: function () {

            var args = [].slice.call(arguments);

            // You can fetch some data here and start app
            // (by calling super-method) after that.
            Chaplin.Application.prototype.start.apply(this, args);
        }


    });

    return Application;
});
