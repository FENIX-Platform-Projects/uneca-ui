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
], function ($, log, _, EVT, PC, i18nLabels, template, listTemplate, countryProfileView) {

    'use strict';

    var s = {
        CONTENT: "#profile-content",
        SEARCH_FILTER_INPUT: "#searchinput",
        COUNTRY_LIST: '#list-countries',
        SEARCH_ITEM_CHILD: 'a',
        SEARCH_ITEM_EL: '.country-item',
        LATERAL_MENU: '#lateral-menu'
    };

    function ProfileView(params) {

    log.trace("In ProfileView")
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

        log.trace(this.$el)
        this.$el.append(this.template);
    };

    ProfileView.prototype._initVariables = function () {
        this.$content = this.$el.find(s.CONTENT);
    };

    ProfileView.prototype._printCountryList = function () {
        var tmpl = listTemplate,
                        html = tmpl({countries: this.countries});
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
                   console.log("HERE ONCLICK ");

                   var countryObj = {};
                   countryObj.title = {};
                   countryObj.title[self.lang] = country_title;
                   countryObj.code = country_code;

                   return new countryProfileView({ lang: self.lang, el: '#main', country: countryObj});
                });
            })

            /*$(item).find('div').click(function(){
                alert("test!!!")
            });*/
        })

        //$('#myLink').click(function(){ MyFunction(); return false; });

            //Init filter
            $(s.COUNTRY_LIST).btsListFilter(s.SEARCH_FILTER_INPUT, {
                itemEl: s.SEARCH_ITEM_EL,
                itemChild: s.SEARCH_ITEM_CHILD
            });
    };



    // var ProfileView = View.extend({
    //
    //     initialize: function (params) {
    //
    //         this.countries = params.countries;
    //
    //         View.prototype.initialize.call(this, arguments);
    //     },
    //
    //     autoRender: true,
    //
    //     className: 'countries',
    //
    //     template: template,
    //
    //     getTemplateData: function () {
    //
    //         return i18nLabels;
    //     },
    //
    //     attach: function () {
    //
    //         View.prototype.attach.call(this, arguments);
    //
    //         //update State
    //         amplify.publish(EVT.STATE_CHANGE, {menu: 'profile'});
    //
    //         this._initVariables();
    //
    //         this._printCountryList();
    //
    //     },
    //
    //     _initVariables: function () {
    //
    //         this.$content = this.$el.find(s.CONTENT);
    //     },
    //
    //     _printCountryList: function () {
    //
    //         var tmpl = Handlebars.compile(listTemplate),
    //             html = tmpl({countries: this.countries});
    //
    //         this.$content.html(html);
    //
    //         //Init filter
    //         $(s.COUNTRY_LIST).btsListFilter(s.SEARCH_FILTER_INPUT, {
    //             itemEl: s.SEARCH_ITEM_EL,
    //             itemChild: s.SEARCH_ITEM_CHILD
    //         });
    //
    //     }
    //
    // });

    return ProfileView;
});
