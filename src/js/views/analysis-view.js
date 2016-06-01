/*global define, amplify*/
define([
    'jquery',
    'underscore',
    'views/base/view',
    'text!templates/analysis/analysis.hbs',
    'config/config',
    'config/events',
    'fx-analysis/start',
    'loglevel',
    'amplify'
], function ($, _, View, template, C, E, Analysis, log) {

    'use strict';

    var s = {
        ANALYSIS_CONTAINER: '#fx-analysis-container',
        CATALOG_CONTAINER: '#fx-catalog-container',
        MODULES_STACK_CONTAINER: '#fx-modules-stack-container',
        OVERLAY: "#overlay",
        OVERLAY_CONTENT: '.overlay-content',
        OVERLAY_OPEN: '.open-overlay',
        OVERLAY_CLOSE: '.close-overlay',
        PAGE_CONTENT: "#analysis-page-content",
        MODAL_METADATA: '#uneca-metadata-modal',
        MODAL_METADATAVIEWER_CONTAINER: '[data-content="metadata-viewer-container"]',

        BTN_EXPORT_METADATA : '.fx-md-report-btn'

    }

    var AnalysisView = View.extend({

        // Automatically render after initialize
        autoRender: true,

        className: 'analysis',

        // Save the template string in a prototype property.
        // This is overwritten with the compiled template function.
        // In the end you might want to used precompiled templates.
        template: template,

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //Init
            $(s.OVERLAY_CONTENT).hide();
            $(s.OVERLAY).hide();

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'analysis'});

            this.analysis = new Analysis({
                $el: document.querySelector(s.ANALYSIS_CONTAINER),
                environment : C.ENVIRONMENT,
                catalog_default_selectors : ['contextSystem', "dataDomain","resourceType" ],
                catalog_selectors_registry : {
                    contextSystem : {
                        selector : {
                            id : "dropdown",
                            source : [
                                {value : "uneca", label : "UNECA"},
                                {value : "FAOSTAT", label : "FAOSTAT"}
                            ],
                            default : ["uneca"],
                            hideSummary : true
                        },

                        template : {
                            hideRemoveButton : false
                        },

                        format : {
                            output : "enumeration",
                            metadataAttribute: "dsd.contextSystem"
                        }
                    }
                }
            });

        }

    });

    return AnalysisView;
});
