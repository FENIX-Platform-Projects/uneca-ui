define([
    'require',
    'models/base/model',
    'chaplin',
    'fx-dashboard/utils/Fx-dashboard-utils'
], function(require, Model, Chaplin, DashboardUtils) {
    'use strict';

    var Profiles = Model.extend({
        url: '',
        defaults : {

        },
        lang :  (requirejs.s.contexts._.config.locale).toUpperCase(),

        initialize: function(attributes, options) {
            this.options = _.extend(this.defaults, attributes);
            Model.prototype.initialize.apply(this, arguments);

            this.url = this.options.url;
            this.params =  this.options.params;
            this.dashboardUtils = new DashboardUtils();
            this.title = "";
            if(Chaplin.mediator.country != null){
                this.title = Chaplin.mediator.country.label;
            }
        },

        parse : function(response){
            this.data = response
            var _that = this;

            this.data.country = this.title;

            // Find and replace heading text in RESPONSE
            var updatedHeading = _that.dashboardUtils.findAndReplaceProperty(this.data, 'heading', 'text', '{{COUNTRY_NAME}}', this.title, _that.lang);

            // Find and replace title text in RESPONSE
            _.each(this.data.widgets, function(widget) {
                var updatedWidget = _that.dashboardUtils.findAndReplaceProperty(widget, 'config.options.title', 'text', '{{COUNTRY_NAME}}', _that.title, _that.lang);
            });

            // Set Filters in RESPONSE
            _.each(this.data.widgets, function(widget) {
                var updatedWidget = _that.dashboardUtils.setQueryFilters(widget, _that.params);
            });

            return response;
        }

});

    return Profiles;
});
