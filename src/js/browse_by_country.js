/*global define, amplify*/
define([
    'jquery',
    'loglevel',
    'underscore',
    '../config/events',
    '../config/profile/config',
    '../nls/labels',
    '../html/profile/profile.hbs',
    '../html/profile/list.hbs',
    'bootstrap-list-filter',
    'jstree'
], function ($, log, _, EVT, PC, i18nLabels, template, listTemplate) {

    'use strict';

    var s = {
        CONTENT: "#profile-content",
        SEARCH_FILTER_INPUT: "#searchinput",
        COUNTRY_LIST: '#list-countries',
        SEARCH_ITEM_CHILD: 'a',
        SEARCH_ITEM_EL: '.country-item',
        LATERAL_MENU: '#lateral-menu'
    };

    function ListView() {
        return this;
    }

    ListView.prototype.init = function (params) {
        //TO DO
        this.lang = params.lang;

        $.extend(true, this, params);
        this.template = template(i18nLabels[this.lang]);
        this.$el = $(params.el);

        this._attach();

        this._initVariables();

        this._printCountryList();

        return this;

    };

    ListView.prototype._attach = function () {

        this.$el.append(this.template);
    };

    ListView.prototype._initVariables = function () {
        this.$content = this.$el.find(s.CONTENT);

        this.channels = {};
    };

    ListView.prototype._printCountryList = function () {
        var html = listTemplate({data: {countries: this.countries, lang: this.lang}});

        this.$content.html(html);

        var self = this;

        //Creation of the onclick event
        var $divs = this.$content.find('.country-item');

        _.each($divs, function (item) {
            var div = $(item).find('div');
            _.each(div, function (x) {
                var country_code = $(x).attr("data-country_code");
                var country_title = $(x).attr("data-country_title");

                $(x).on('click', function () {
                    var countryObj = {};
                    countryObj.title = {};
                    countryObj.title[self.lang] = country_title;
                    countryObj.code = country_code;

                    self._trigger("profile.show", {country: countryObj})

                });
            })
        });

        //Init filter
        this.$el.find(s.COUNTRY_LIST).btsListFilter(s.SEARCH_FILTER_INPUT, {
            itemEl: s.SEARCH_ITEM_EL,
            itemChild: s.SEARCH_ITEM_CHILD
        });
    };

    ListView.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    ListView.prototype._trigger = function (channel) {

        if (!this.channels[channel]) {
            return false;
        }
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = this.channels[channel].length; i < l; i++) {
            var subscription = this.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }

        return this;
    };

    return ListView;
});
