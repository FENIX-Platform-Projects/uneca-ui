/*global define*/

define(function () {

    'use strict';

    return {

        "resume": {
            //data cube's uid
            uid: "FLUDE_TOPIC_1",

            //bridge configuration
            bridge: {

                type: "d3p"

            },

            /*
             * in case bridge is WDS this is the cube metadata.
             * if bridge is D3P this is ignored
             * */
            metadata: {},

            items: []


        },

        "education": {
            //data cube's uid
            uid: "UNECA_Education",

            //bridge configuration
            bridge: {

                type: "d3p"

            },

            /*
             * in case bridge is WDS this is the cube metadata.
             * if bridge is D3P this is ignored
             * */
            metadata: {},

            items: [
                {
                    //Time series
                    id: 'item-1',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#education-1",
                    config: {
                        container: "#education-1",
                        adapter: {
                            type: "timeserie",
                            xDimensions: 'time',
                            yDimensions: 'item',
                            valueDimensions: 'value',
                            seriesDimensions: []
                        },
                        template: {
                            //"title": "Top 25..."
                        },
                        creator: {}
                    },

                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "IndicatorCode": {
                                        "codes": [
                                            {
                                                "uid": "UNECA_ClassificationOfActivities",
                                                "codes": [
                                                    "010201"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    //Time series
                    id: 'item-2',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#education-2",
                    config: {
                        container: "#education-2",
                        adapter: {
                            type: "standard",
                            xDimensions: 'time',
                            yDimensions: 'item',
                            valueDimensions: 'value',
                            seriesDimensions: ['GenderCode']
                        },
                        template: {
                            //"title": "Top 25..."
                        },
                        creator: {}
                    },

                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "IndicatorCode": {
                                        "codes": [
                                            {
                                                "uid": "UNECA_ClassificationOfActivities",
                                                "codes": [
                                                    "01020301"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    id: 'item-3',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#education-3",
                    config: {
                        container: "#education-3",
                        adapter: {
                            type: "standard",
                            xDimensions: 'time',
                            yDimensions: 'item',
                            valueDimensions: 'value',
                            seriesDimensions: ['GenderCode']
                        },
                        template: {
                            //"title": "Top 25..."
                        },
                        creator: {
                            chartObj: {
                                chart: {
                                    type: "column"
                                }
                            }
                        }
                    },

                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "IndicatorCode": {
                                        "codes": [
                                            {
                                                "uid": "UNECA_ClassificationOfActivities",
                                                "codes": [
                                                    "01020401"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                }
            ]


        }
    }
});