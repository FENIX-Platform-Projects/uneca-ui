/*global define, amplify*/
define([
    'views/base/view',
    'text!templates/analysis/analysis.hbs',
    'config/config',
    'config/events',
    'fx-analysis/start',
    'loglevel',
    'amplify'
], function (View, template, C, E, Analysis, log) {

    'use strict';

    var s = {
        analysisContainer: '#fx-analysis-container',
    };

    var AnalysisView = View.extend({

        autoRender: true,

        className: 'analysis',

        template: template,

        attach: function () {

            log.info("Attach Analysis view");

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'analysis'});

            this.analysis = new Analysis(
                {
                    el: this.$el.find(s.analysisContainer),
                    cache : C.cache,
                    environment: C.ENVIRONMENT,
                    catalog: C.catalog,
                    box: C.box
                });
        }

    });

    return AnalysisView;
});
