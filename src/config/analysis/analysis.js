/*global define*/

define(function () {

    'use strict';

    return {
            defaultSelectors : ['contextSystem', "dataDomain"],
            menuExcludedItems: ["resourceType"],
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
                },
                resourceType: {
                    selector : {
                        id : "dropdown",
                        source : [  {value : "dataset", label : "Dataset"} ],
                        hideSummary : true,
                        default : ['dataset'],
                        config : {
                            plugins: ['remove_button'],
                            mode: 'multi'
                        }
                    },
                    template : {
                        hideRemoveButton : false
                    },

                    format : {
                        output : "enumeration",
                        metadataAttribute: "meContent.resourceRepresentationType"
                    }
                }
            }
    }
});
