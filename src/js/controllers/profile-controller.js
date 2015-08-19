/*global define*/
define([
    'controllers/base/controller',
    'views/profile-view'
], function (Controller, View) {
    'use strict';

    var ProfileController = Controller.extend({

        show: function (params) {

            this.view = new View({
                region: 'main'
            });
        }
    });

    return ProfileController;
});
