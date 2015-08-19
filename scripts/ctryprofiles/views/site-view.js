define([
    'chaplin',
    'views/base/view',
    'text!templates/site.hbs',
    'fx-menu/start'
], function (Chaplin, View, template, Menu) {

    'use strict';

    var s = {
        SEC_MENU : '#uae-profiles-menu-container'
    };

    var SiteView = View.extend({

        container: 'body',

        id: 'site-container',

        regions: {
            main: '#main-container'
        },

        template: template,

        attach: function () {

            View.prototype.attach.call(this, arguments);

            this.bindEventListeners();

            //Top Menu
            this.topMenu = new Menu({
                url: 'config/submodules/fx-menu/fenix-ui-topmenu_config.json',
                active: "profiles",
                logo: true
            });

            //Secondary Menu
            this.secondaryMenu = new Menu({
                container : s.SEC_MENU,
                url: 'config/submodules/fx-menu/uneca-profiles_config.json',
                logo: false
            });

        },

        bindEventListeners : function () {

        },

        dispose : function () {
            View.prototype.dispose.call(this, arguments);

        }
    });

    return SiteView;
});
