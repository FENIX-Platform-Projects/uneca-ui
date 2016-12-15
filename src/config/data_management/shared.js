/*global define*/

define(function () {

    'use strict';

    return {

        catalog : {
            defaultSelectors : ['contextSystem', "dataDomain","resourceType" ],
            pluginRegistry : {
                contextSystem : {
                    selector : {
                        id : "dropdown",
                        source : [
                            {value : "uneca", label : "UNECA"}
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
            },
        }
    }
});
