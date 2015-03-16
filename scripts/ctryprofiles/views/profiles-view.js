/*global define, amplify*/
define([
    'chaplin',
    'views/base/view',
    'text!templates/profiles.hbs',
    'fx-dashboard/start',
    'config/events',
    'amplify',
    'models/profiles'
], function (Chaplin, View, template, Dashboard, Events, ProfilesModel) {

    'use strict';

    var ProfilesView = View.extend({
        model: ProfilesModel,

        initialize: function (o) {
            $.extend(true, this, o);
            View.prototype.initialize.call(this, arguments);
        },

        // Automatically render after initialize
        autoRender: true,

        className: 'profiles-view',

        // Save the template string in a prototype property.
        // This is overwritten with the compiled template function.
        // In the end you might want to used precompiled templates.
        template: template,

        attach: function () {
            var _that = this;

            View.prototype.attach.call(this, arguments);

            this.bindEventListeners();


            this.model.fetch({
                    success: function(response){
                      //  console.log("============ RESPONSE DATA ======");
                      //  console.log(response.data);

                        var dashboard = new Dashboard(
                            {
                                config: response.data,
                                url: 'scripts/ctryprofiles/config/widgets.json',
                                container: '#dashboard-container',
                                title: _that.model.title
                            }
                        );
                        dashboard.init();
                    } }
            );

        },

        bindEventListeners : function () {
        },

        dispose : function () {
            View.prototype.dispose.call(this, arguments);
        }
    });

    return ProfilesView;
});
