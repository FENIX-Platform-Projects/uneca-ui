/*global define*/

define(function () {

    'use strict';

    return {

        "gdp_ppp": {
            dashboard: [{
                uid: "UNECA_hp_indicators",
                items: [
                    {
                        id: "gdp_ppp", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["year"], //x axis and series
                            series: ["indicator"], //Y dimension
                            y: ["value"],
                            aggregationFn: {"value": "sum"},
                            useDimensionLabelsIfExist: true,// || default raw else fenixtool
                       //     showUnit: true,
                            config: {
                                plotOptions: {
                                    line: {
                                        dataLabels: {
                                            enabled: true
                                        }
                                    }
                                },
                                tooltip: {
                                    valuePrefix:"$",
                                    valueSuffix:" billion"
                                }
                            }
                        }, // :type-creator config

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [ { "uid": "UNECA_hp_indicators" } ],
                                "parameters": {
                                    "columns": [
                                        "year",
                                        "value",
                                        "indicator",
                                        "um"
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
                        id: "gdp_capita", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["year"], //x axis and series
                            series: ["indicator"], //Y dimension
                            y: ["value"],
                            aggregationFn: {"value": "sum"},
                            useDimensionLabelsIfExist: true,// || default raw else fenixtool
                            config: {
                                series: [{color: 'orange'}], //orange
                                plotOptions: {
                                    line: {
                                        dataLabels: {
                                            enabled: true
                                        }
                                    }
                                },
                                tooltip: {
                                    valuePrefix:"$"
                                }
                            }
                        }, // :type-creator config

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [ { "uid": "UNECA_hp_indicators" } ],
                                "parameters": {
                                    "columns": [
                                        "year",
                                        "value",
                                        "indicator",
                                        "um"
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
                        id: "gdp_growth", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["year"], //x axis and series
                            series: ["indicator"], //Y dimension
                            y: ["value"],
                            aggregationFn: {"value": "sum"},
                            useDimensionLabelsIfExist: true,// || default raw else fenixtool
                            config: {
                                series: [{color: 'gray'}],
                                plotOptions: {
                                    line: {
                                        dataLabels: {
                                            enabled: true
                                        }
                                    }
                                },
                                tooltip: {
                                    valueSuffix:"%"
                                }
                            }
                        }, // :type-creator config

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [ { "uid": "UNECA_hp_indicators" } ],
                                "parameters": {
                                    "columns": [
                                        "year",
                                        "value",
                                        "indicator",
                                        "um"
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
        },
        "inflation": {
            dashboard: [{
                uid: "UNECA_hp_indicators",
                items: [
                    {
                        id: "inflation", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["year"], //x axis and series
                            series: ["indicator"], //Y dimension
                            y: ["value"],
                            aggregationFn: {"value": "sum"},
                            useDimensionLabelsIfExist: true,// || default raw else fenixtool
                            config: {
                                series: [{color: '#FFC009'}], // yellow
                                plotOptions: {
                                    column: {
                                        dataLabels: {
                                            enabled: true
                                        }
                                    }
                                },
                                tooltip: {
                                    valueSuffix:"%"
                                }
                            }
                        }, // :type-creator config

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [ { "uid": "UNECA_hp_indicators" } ],
                                "parameters": {
                                    "columns": [
                                        "year",
                                        "value",
                                        "indicator",
                                        "um"
                                    ],
                                    "rows": {
                                        "indicator": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_Indicators",
                                                    "codes": [ "inflation" ]
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
        "investment": {
            dashboard: [{
                uid: "UNECA_hp_indicators",
                items: [
                    {
                        id: "investment", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["year"], //x axis and series
                            series: ["indicator"], //Y dimension
                            y: ["value"],
                            aggregationFn: {"value": "sum"},
                            useDimensionLabelsIfExist: true,// || default raw else fenixtool
                            config: {
                                series: [{color: 'DarkRed'}],
                                plotOptions: {
                                    line: {
                                        dataLabels: {
                                            enabled: true
                                        }
                                    }
                                },
                                tooltip: {
                                    valueSuffix:"%"
                                }
                            }
                        }, // :type-creator config

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [ { "uid": "UNECA_hp_indicators" } ],
                                "parameters": {
                                    "columns": [
                                        "year",
                                        "value",
                                        "indicator",
                                        "um"
                                    ],
                                    "rows": {
                                        "indicator": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_Indicators",
                                                    "codes": [ "investment" ]
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
        "export_growth": {
            dashboard: [{
                uid: "UNECA_hp_indicators",
                items: [
                    {
                        id: "export_growth", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["year"], //x axis and series
                            series: ["indicator"], //Y dimension
                            y: ["value"],
                            aggregationFn: {"value": "sum"},
                            useDimensionLabelsIfExist: true,// || default raw else fenixtool
                            config: {
                                series: [{color: 'green'}],
                                plotOptions: {
                                    column: {
                                        dataLabels: {
                                            enabled: true
                                        }
                                    }
                                },
                                tooltip: {
                                    valueSuffix:"%"
                                }
                            }
                        }, // :type-creator config

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [ { "uid": "UNECA_hp_indicators" } ],
                                "parameters": {
                                    "columns": [
                                        "year",
                                        "value",
                                        "indicator",
                                        "um"
                                    ],
                                    "rows": {
                                        "indicator": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_Indicators",
                                                    "codes": [ "export_growth" ]
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
        "fdi": {
            dashboard: [{
                uid: "UNECA_hp_indicators",
                items: [
                    {
                        id: "fdi", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["year"], //x axis and series
                            series: ["indicator"], //Y dimension
                            y: ["value"],
                            aggregationFn: {"value": "sum"},
                            useDimensionLabelsIfExist: true,// || default raw else fenixtool
                            config: {
                                series: [{color: 'DarkBlue'}, {color: 'DarkRed'}],
                                plotOptions: {
                                    line: {
                                        dataLabels: {
                                            enabled: true
                                        }
                                    }
                                },
                                tooltip: {
                                    valueSuffix:" USD million"
                                }
                            }
                        }, // :type-creator config

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [ { "uid": "UNECA_hp_indicators" } ],
                                "parameters": {
                                    "columns": [
                                        "year",
                                        "value",
                                        "indicator",
                                        "um"
                                    ],
                                    "rows": {
                                        "indicator": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_Indicators",
                                                    "codes": [ "fdi_inward", "fdi_outward" ]
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
        "life_expectancy": {
            dashboard: [{
                uid: "UNECA_hp_indicators",
                items: [
                    {
                        id: "life_expectancy", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["year"], //x axis and series
                            series: ["indicator"], //Y dimension
                            y: ["value"],
                            aggregationFn: {"value": "sum"},
                            useDimensionLabelsIfExist: true,// || default raw else fenixtool
                            config: {
                                series: [{color: 'CornflowerBlue'}],
                                plotOptions: {
                                    column: {
                                        dataLabels: {
                                            enabled: true
                                        }
                                    }
                                },
                                tooltip: {
                                    valueSuffix:" years"
                                }
                            }
                        }, // :type-creator config

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [ { "uid": "UNECA_hp_indicators" } ],
                                "parameters": {
                                    "columns": [
                                        "year",
                                        "value",
                                        "indicator",
                                        "um"
                                    ],
                                    "rows": {
                                        "indicator": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_Indicators",
                                                    "codes": [ "life_expectancy" ]
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