define([
    'jquery',
    'views/base/view',
    'text!templates/landing.hbs',
    'chaplin',
    'config/events'
], function ($, View, template, Chaplin, Events) {
    'use strict';

    var LandingView = View.extend({
        defaults: {
             css: {
                'COUNTRY_ITEM': '.list-group-item'
            }
        },

        // Automatically render after initialize
        autoRender: true,

        className: 'landing-view',

        // Save the template string in a prototype property.
        // This is overwritten with the compiled template function.
        // In the end you might want to used precompiled templates.
        template: template,

        initialize: function(attributes, options) {
            this.options = _.extend(this.defaults, attributes);
            View.prototype.initialize.call(this, arguments);

            this.template = this.getTemplateFunction();
       },

        render: function() {
            var data = {
                countries: [
                    {
                        code: "45",
                        label: "Cameroon"
                    },
                    {
                        code: "94",
                        label: "Ghana"
                    }
                ]
            }


            $(this.el).append(this.template(data));

            this.countrySelected = this.delegate('click', this.options.css.COUNTRY_ITEM, this.clicked);
        },

        clicked: function(e){
            e.preventDefault();

            var code = $(e.currentTarget).data("id");
            var label = $(e.currentTarget).data("label");

            Chaplin.mediator.country = {code: code, 'label': label};
            Chaplin.mediator.publish(Events.COUNTRY_SELECTED, {code: code, label: label});
        },

        destroy: function(){
            this.$el.empty();
            this.unbind();
           // this.undelegate('click', this.options.css.COUNTRY_ITEM, this.countrySelected);
        }

    });


    return LandingView;
});
