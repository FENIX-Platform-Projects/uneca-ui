/*global define, amplify*/
define([
    'views/base/view',
    'text!templates/modules/modules.hbs',
    'text!templates/modules/modules_item.hbs',
    'i18n!nls/modules',
    'handlebars',
    'text!json/modules/modules.json',
    'config/Events',
    'amplify'
], function (View, template,itemTemplate, i18nLabels, Handlebars, Modules,E) {

    'use strict';

    var s = {
        MODULE_LIST: "#modules-list"
    };

    var ModulesView = View.extend({

        // Automatically render after initialize
        autoRender: true,

        className: 'modules',

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
            amplify.publish(E.STATE_CHANGE, {menu: 'modules'});

            this.initVariables();

            this.initComponents();



        },
        initVariables: function () {

            this.$modulesList = this.$el.find(s.MODULE_LIST);
        },

        initComponents: function() {
            this.initModulesList();
        },

        initModulesList: function() {
            _.each(JSON.parse(Modules), _.bind(this.printDownloads, this));

        },
        printDownloads: function (d) {

            var template = Handlebars.compile(itemTemplate);
            this.$modulesList.append(template(d));
        },
        unbindEventListeners: function () {

        },

        dispose: function () {

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        }


    });

    return ModulesView;
});
