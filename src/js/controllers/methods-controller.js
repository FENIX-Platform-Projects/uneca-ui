/*global define*/
define([
    'controllers/base/controller',
    'views/methods-view'
], function (Controller, View) {

    'use strict';

    var MethodsController = Controller.extend({

        show: function (params) {

            this.view = new View({
                region: 'main'
            });
        }
    });

    return MethodsController;
});
