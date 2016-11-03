/*global define, amplify*/
define([
    'jquery',
    'loglevel',
    'underscore',
    'config/events',
    'config/profile/config',
    'nls/labels',
    'html/profile/profile.hbs',
    'html/profile/list.hbs',
    'js/country_profile_view',
    'bootstrap-list-filter',
    'jstree'
], function ($, log, _, EVT, PC, i18nLabels, template, listTemplate, CountryProfileView) {

    'use strict';

    var s = {
        CONTENT: "#profile-content",
        SEARCH_FILTER_INPUT: "#searchinput",
        COUNTRY_LIST: '#list-countries',
        SEARCH_ITEM_CHILD: 'a',
        SEARCH_ITEM_EL: '.country-item',
        LATERAL_MENU: '#lateral-menu'
    };

    function ProfileView() {
        return this;
    }

    ProfileView.prototype.init = function (params) {
        //TO DO
        this.lang = params.lang;

        $.extend(true, this, params);
        this.template = template(i18nLabels[this.lang]);
        this.$el = params.el;

        this._attach();

        this._initVariables();

        this._printCountryList();

        return this;

    }

    ProfileView.prototype._attach = function () {
        this.$el.append(this.template);
    };

    ProfileView.prototype._initVariables = function () {
        this.$content = this.$el.find(s.CONTENT);
    };

    ProfileView.prototype._printCountryList = function () {
        var tmpl = listTemplate,
                        html = tmpl({data:{countries: this.countries, lang : this.lang}});
            this.$content.html(html);

        var self = this;

        //Creation of the onclick event
        var divs = this.$content.find('.country-item');
        _.each(divs, function(item){
            var div = $(item).find('div');
            _.each(div, function(x){
                var country_code = $(x).attr("data-country_code");
                var country_title = $(x).attr("data-country_title");

               $(x).on('click', function(){
                   var countryObj = {};
                   countryObj.title = {};
                   countryObj.title[self.lang] = country_title;
                   countryObj.code = country_code;

                   return new CountryProfileView({ lang: self.lang, el: '#main', country: countryObj});
                });
            })
        })
        //Init filter
        $(s.COUNTRY_LIST).btsListFilter(s.SEARCH_FILTER_INPUT, {
            itemEl: s.SEARCH_ITEM_EL,
            itemChild: s.SEARCH_ITEM_CHILD
        });
    };

    return new ProfileView;
});
