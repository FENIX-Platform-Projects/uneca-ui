/*global define, amplify*/
define([
    'views/base/view',
    'text!templates/profile/profile.hbs',
    'text!templates/profile/list.hbs',
    'text!templates/profile/dashboard.hbs',
    'i18n!nls/profile',
    'config/Events',
    'handlebars',
    'amplify'
], function (View, template, listTemplate, dashboardTemplate, i18nLabels, E, Handlebars) {

    'use strict';

    var s = {
        CONTENT : "#profile-content"
    };

    var ProfileView = View.extend({

        initialize: function (params) {

            this.countries = params.countries;

            View.prototype.initialize.call(this, arguments);

        },

        // Automatically render after initialize
        autoRender: true,

        className: 'profiles',

        // Save the template string in a prototype property.
        // This is overwritten with the compiled template function.
        // In the end you might want to used precompiled templates.
        template: template,

        getTemplateData: function () {
            return i18nLabels;
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'profile'});

            this._initVariables();

            this.id ? this._printCountryDashboard() : this._printCountryList();

        },

        _initVariables: function () {

            this.$content = this.$el.find(s.CONTENT);
        },

        _printCountryList: function () {

            var index = 0;
            this.countriesReady = [];

            var template = Handlebars.compile(listTemplate),
                html    = template({countries : this.countries});

            this.$content.html(html)

        },


        _printCountryDashboard: function () {

            this.$content.html(dashboardTemplate)

            console.log("_printCountryDashboard")
        }



    });

    return ProfileView;
});
