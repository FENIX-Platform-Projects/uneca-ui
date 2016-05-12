/*global define, amplify*/
define([
    'jquery',
    'underscore',
    'views/base/view',
    'config/events',
    'config/profile/config',
    'i18n!nls/profile',
    'text!templates/profile/profile.hbs',
    'text!templates/profile/list.hbs',
    'handlebars',
    'lib/utils',
    'amplify',
    'bootstrap-list-filter',
    'jstree'
], function ($, _, View, EVT, PC, i18nLabels, template, listTemplate, Handlebars) {

    'use strict';

    var s = {
        CONTENT: "#profile-content",
        SEARCH_FILTER_INPUT: "#searchinput",
        COUNTRY_LIST: '#list-countries',
        SEARCH_ITEM_CHILD: 'a',
        SEARCH_ITEM_EL: '.country-item',
        LATERAL_MENU: '#lateral-menu'
    };

    var ProfileView = View.extend({

        initialize: function (params) {

            this.countries = params.countries;

            View.prototype.initialize.call(this, arguments);
        },

        autoRender: true,

        className: 'countries',

        template: template,

        getTemplateData: function () {

            return i18nLabels;
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(EVT.STATE_CHANGE, {menu: 'profile'});

            this._initVariables();

            this._printCountryList();

        },

        _initVariables: function () {

            this.$content = this.$el.find(s.CONTENT);
        },

        _printCountryList: function () {

            var tmpl = Handlebars.compile(listTemplate),
                html = tmpl({countries: this.countries});

            this.$content.html(html);

            //Init filter
            $(s.COUNTRY_LIST).btsListFilter(s.SEARCH_FILTER_INPUT, {
                itemEl: s.SEARCH_ITEM_EL,
                itemChild: s.SEARCH_ITEM_CHILD
            });

        }

    });

    return ProfileView;
});
