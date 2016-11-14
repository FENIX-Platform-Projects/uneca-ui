/*global define*/

define(function () {

    'use strict';

    return {

        "gdp_ppp": {
            dashboard: [{
                uid: "UNECA_hp_indicators",
                items: [
                    {
                        id: "chart1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["year"], //x axis and series
                            series: ["indicator"], //Y dimension
                            y: ["value"],
                            aggregationFn: {"value": "sum"},
                            useDimensionLabelsIfExist: true// || default raw else fenixtool
                        }, // :type-creator config

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [ { "uid": "UNECA_hp_indicators" } ],
                                "parameters": {
                                    "columns": [
                                        "year",
                                        "value",
                                        "indicator"
                                    ],
                                    "rows": {
                                        "indicator": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_Indicators",
                                                    "codes": [ "gdp_ppp" ]
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ]
            }]
        },
        "gdp_capita": {
            dashboard: [{
                uid: "UNECA_hp_indicators",
                items: [
                    {
                        id: "chart1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["year"], //x axis and series
                            series: ["indicator"], //Y dimension
                            y: ["value"],
                            aggregationFn: {"value": "sum"},
                            useDimensionLabelsIfExist: true// || default raw else fenixtool
                        }, // :type-creator config

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [ { "uid": "UNECA_hp_indicators" } ],
                                "parameters": {
                                    "columns": [
                                        "year",
                                        "value",
                                        "indicator"
                                    ],
                                    "rows": {
                                        "indicator": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_Indicators",
                                                    "codes": [ "gdp_capita" ]
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ]
            }]
        },
        "gdp_growth": {
            dashboard: [{
                uid: "UNECA_hp_indicators",
                items: [
                    {
                        id: "chart1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["year"], //x axis and series
                            series: ["indicator"], //Y dimension
                            y: ["value"],
                            aggregationFn: {"value": "sum"},
                            useDimensionLabelsIfExist: true// || default raw else fenixtool
                        }, // :type-creator config

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [ { "uid": "UNECA_hp_indicators" } ],
                                "parameters": {
                                    "columns": [
                                        "year",
                                        "value",
                                        "indicator"
                                    ],
                                    "rows": {
                                        "indicator": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_Indicators",
                                                    "codes": [ "gdp_growth" ]
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ]
            }]
        }
    }
});