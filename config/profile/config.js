/*global define*/

define(function () {

    'use strict';

    return {

        "resume": {},

        "population": {

            dashboard: [{

                uid: "UNECA_Population",
                //version: "",
                //preProcess : {} //D3P process
                //postProcess : {} //D3P process
                //filter : {} //FX-filter format
                items: [
                    {
                        id: "population-1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            columns: ["Year"], //x axis and series
                            rows: ["IndicatorCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["010101"],
                            "GenderCode": ["3"],
                            "AgeRangeCode": ["AGT"]


                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        id: "population-2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            y: ["Value"],
                            series: ["IndicatorCode_EN"], //Y dimension
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["010103"],
                            "GenderCode": ["3"],
                            "AgeRangeCode": ["AGT"]


                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },


                    {
                        id: "population-3", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            columns: ["Year"], //x axis and series
                            rows: ["AgeRangeCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["010101"],
                            "GenderCode": ["3"],
                            "AgeRangeCode": ["AG01", "AG02", "AG15"]


                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        id: "population-4", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            columns: ["Year"], //x axis and series
                            rows: ["IndicatorCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["010108"],
                            "GenderCode": ["3"],
                            "AgeRangeCode": ["AGT"]


                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },


                    {
                        id: "population-6", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            columns: ["Year"], //x axis and series
                            rows: ["IndicatorCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["010102"],
                            "GenderCode": ["3"],
                            "AgeRangeCode": ["AGT"]


                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    }
                ]
            }]
        },

        "education": {

            dashboard: {

                uid: "UNECA_Education",
                //version: "",
                //preProcess : {} //D3P process
                //postProcess : {} //D3P process
                items: [
                    {
                        id: "edu_1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            columns: ["Year"], //x axis and series
                            rows: ["IndicatorCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["010201"],
                            GenderCode: ["3"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },


                    {
                        id: "edu_2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            columns: ["Year"], //x axis and series
                            rows: ["IndicatorCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["010201", "010202", "010203"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        id: "edu_3", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            columns: ["Year"], //x axis and series
                            rows: ["GenderCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["010206"],
                            GenderCode: ["1", "2"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    }
                ]


            }
        },

        "health": {

            dashboard: {

                uid: "UNECA_Health",
                //version: "",
                //preProcess : {} //D3P process
                //postProcess : {} //D3P process
                items: [
                    {
                        id: "health-1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            columns: ["Year"], //x axis and series
                            rows: ["IndicatorCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["010307", "010308", "010309", "010310"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },
                    {
                        id: "health-2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            columns: ["Year"], //x axis and series
                            rows: ["IndicatorCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format
                            IndicatorCode: ["010301"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },
                    {
                        id: "health-3", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            columns: ["Year"], //x axis and series
                            rows: ["IndicatorCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["010302"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },


                    {
                        id: "health-4", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            columns: ["Year"], //x axis and series
                            rows: ["IndicatorCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["010303", "010304"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },
                    {
                        id: "health-5", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            columns: ["Year"], //x axis and series
                            rows: ["IndicatorCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["010313", "010314", "010315"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    }

                ]
            }
        },

        "labour": {

            dashboard: [
                {
                    uid: "ILO_Labour",
                    //version: "",
                    //preProcess : {} //D3P process
                    //postProcess : {} //D3P process
                    items: [
                        {
                            id: "labour-4", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "line",
                                x: ["Year"], //x axis and series
                                series: ["GenderCode_EN"], //Y dimension
                                y: ["Value"],
                                aggregationFn: {"Value": "sum"}
                            }, // :type-creator config
                            filter: { //FX-filter format
                                IndicatorCode: ["010401"]
                            }
                            //filterFor: ["Year"], // allowed dimension ids to filter,
                        },

                        {
                            id: "labour-5", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "column",
                                x: ["Year"], //x axis and series
                                series: ["GenderCode_EN"], //Y dimension
                                y: ["Value"],
                                aggregationFn: {"Value": "sum"}
                            }, // :type-creator config
                            filter: { //FX-filter format
                                IndicatorCode: ["010402"],
                                GenderCode: ["3"]
                            }
                            //filterFor: ["Year"], // allowed dimension ids to filter,
                        },


                        {
                            id: "labour-6", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "column",
                                x: ["Year"], //x axis and series
                                series: ["GenderCode_EN"], //Y dimension
                                y: ["Value"],
                                aggregationFn: {"Value": "sum"}
                            }, // :type-creator config
                            filter: { //FX-filter format
                                IndicatorCode: ["010402"],
                                GenderCode: ["1", "2"]
                            }
                            //filterFor: ["Year"], // allowed dimension ids to filter,
                        }
                    ]
                }
            ]
        },

        "energy": {
            dashboard: {

                //data cube's uid
                uid: "UNECA_Energy",

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
                        id: 'labour-1',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#labour-1",
                        config: {
                            container: "#labour-1",
                            adapter: {
                                type: "standard",
                                xDimensions: 'Year',
                                yDimensions: "UMcode",
                                valueDimensions: 'Value',
                                seriesDimensions: ['IndicatorCode']
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

                        filter: []
                    }


                ]

            }
        },

        "gdp": {

            dashboard: {
                //data cube's uid
                uid: "UNECA_GDP",

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
                        id: 'gdp-1',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#gdp-1",
                        config: {
                            container: "#gdp-1",
                            adapter: {
                                type: "line",
                                xDimensions: 'Year',
                                yDimensions: "IndicatorCode",
                                valueDimensions: 'Value',
                                seriesDimensions: ['IndicatorCode']
                            },
                            template: {
                                //"title": "Top 25..."
                            },
                            creator: {},
                            plotOptions: {
                                line: {
                                    dataLabels: {
                                        enabled: true
                                    },
                                    enableMouseTracking: false
                                }


                            }
                        },

                        filter: [{
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "IndicatorCode": {
                                        "codes": [
                                            {
                                                "uid": "UNECA_ClassificationOfActivities",
                                                "codes": [
                                                    "0207801"
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
                        id: 'gdp-2',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#gdp-2",
                        config: {
                            container: "#gdp-2",
                            adapter: {
                                type: "line",
                                xDimensions: 'Year',
                                yDimensions: "IndicatorCode",
                                valueDimensions: 'Value',
                                seriesDimensions: ['IndicatorCode']
                            },
                            template: {
                                //"title": "Top 25..."
                            },
                            creator: {}
                        },

                        filter: [{
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "IndicatorCode": {
                                        "codes": [
                                            {
                                                "uid": "UNECA_ClassificationOfActivities",
                                                "codes": [
                                                    "0207802"
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

        },

        "monetary_statistics": {

            dashboard: {

                uid: "UNECA_MonetaryStatistics",


                items: [
                    {
                        id: "monetary-1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            columns: ["Year"], //x axis and series
                            rows: ["IndicatorCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["02090501", "02090502"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        id: "monetary-2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            columns: ["Year"], //x axis and series
                            rows: ["IndicatorCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["020904"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },
                    {
                        id: "monetary-3", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            columns: ["Year"], //x axis and series
                            rows: ["IndicatorCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["020906"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        id: "monetary-4", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            columns: ["Year"], //x axis and series
                            rows: ["IndicatorCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["020901"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },


                    {
                        id: "monetary-5", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            columns: ["Year"], //x axis and series
                            rows: ["IndicatorCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["020903", "02090301"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    }


                ]
            }

        },

        "public_finance": {

            dashboard: {
                //data cube's uid
                uid: "UNECA_PublicFinance",
                items: [


                    {
                        id: "finance-1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "stackedColumn",
                            columns: ["Year"], //x axis and series
                            rows: ["IndicatorCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["021202", "02120101", "02120102"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        id: "finance-2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            columns: ["Year"], //x axis and series
                            rows: ["IndicatorCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["02120301", "02120302"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        id: "finance-3", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            columns: ["Year"], //x axis and series
                            rows: ["IndicatorCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["02120301", "02120302"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        id: "finance-4", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            columns: ["Year"], //x axis and series
                            rows: ["IndicatorCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["02120301", "0212030101"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        id: "finance-5", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            columns: ["Year"], //x axis and series
                            rows: ["IndicatorCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["021204"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    }


                ]
            }

        },

        "debt": {

            dashboard: {

                uid: "UNECA_Debt",

                items: [

                    {
                        id: "debt-1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            columns: ["Year"], //x axis and series
                            rows: ["IndicatorCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["020308"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        id: "debt-2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            columns: ["Year"], //x axis and series
                            rows: ["IndicatorCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["020305"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },


                    {
                        id: "debt-3", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            columns: ["Year"], //x axis and series
                            rows: ["IndicatorCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["02030501", "02030502"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    }


                ]
            }

        },

        "infrastructure": {

            dashboard: {
                //data cube's uid
                uid: "UNECA_Infrastructure",

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
                        id: 'infrastructure-1',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#infrastructure-1",
                        config: {
                            container: "#infrastructure-1",
                            adapter: {
                                type: "standard",
                                xDimensions: 'Year',
                                yDimensions: 'IndicatorCode',
                                valueDimensions: 'Value',
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
                                                        "021423"
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
                        id: 'infrastructure-2',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#infrastructure-2",
                        config: {
                            container: "#infrastructure-2",
                            adapter: {
                                type: "standard",
                                xDimensions: 'Year',
                                yDimensions: 'IndicatorCode',
                                valueDimensions: 'Value',
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
                                                        "021424"
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
                        id: 'infrastructure-3',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#infrastructure-3",
                        config: {
                            container: "#infrastructure-3",
                            adapter: {
                                type: "standard",
                                xDimensions: 'Year',
                                yDimensions: null,
                                valueDimensions: 'Value',
                                seriesDimensions: ['IndicatorCode']
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
                                                        "030202", "030201"
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
        },

        "tourism": {

            dashboard: {
                //data cube's uid
                uid: "UNECA_Tourism",

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
                        id: 'tourism-1',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#tourism-1",
                        config: {
                            container: "#tourism-1",
                            adapter: {
                                type: "standard",
                                xDimensions: 'Year',
                                yDimensions: null,
                                valueDimensions: 'Value',
                                seriesDimensions: ['IndicatorCode']
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
                                                        "021304", "021303"
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
                        id: 'tourism-2',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#tourism-2",
                        config: {
                            container: "#tourism-2",
                            adapter: {
                                type: "standard",
                                xDimensions: 'Year',
                                yDimensions: null,
                                valueDimensions: 'Value',
                                seriesDimensions: ['IndicatorCode']
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
                                                        "021305"
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
                        id: 'tourism-3',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#tourism-3",
                        config: {
                            container: "#tourism-3",
                            adapter: {
                                type: "standard",
                                xDimensions: 'Year',
                                yDimensions: null,
                                valueDimensions: 'Value',
                                seriesDimensions: ['IndicatorCode']
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
                                                        "021307"
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
                        id: 'tourism-4',
                        type: 'table',
                        class: "fx-map-chart",
                        //needed if layout = injected
                        container: "#tourism-4",
                        config: {
                            container: "#tourism-4",
                            leaflet: {
                                zoomControl: false,
                                attributionControl: true,
                                scrollWheelZoom: false,
                                minZoom: 2
                            }
                        },
                        // for now it takes the id, TODO: add uid as well
                        allowedFilter: [],
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
                                                        "021302"
                                                    ]
                                                }
                                            ]
                                        }
                                    },
                                    "columns": ["IndicatorCode", "CountryCode", "Year", "Value"]


                                }
                            }
                        ]
                    }

                ]
            }

        },

        "inflation": {

            filter: [
                //{
                //    "type": "static",
                //    "containerType": "baseContainer",
                //    "title": "Year",
                //    "components": [
                //        {
                //            "type": "time",
                //            "componentType": "dropDownList-FENIX",
                //            "lang": "EN",
                //            "name": "Year",
                //            config: {
                //                "defaultsource": [
                //                    {"value": "2011", "label": "2011", "selected": true},
                //                    {"value": "2010", "label": "2010", "selected": false},
                //                    {"value": "2009", "label": "2009", "selected": false},
                //                    {"value": "2008", "label": "2008", "selected": false},
                //                    {"value": "2007", "label": "2007", "selected": false},
                //                    {"value": "2006", "label": "2006", "selected": false},
                //                    {"value": "2005", "label": "2005", "selected": false},
                //                    {"value": "2004", "label": "2004", "selected": false},
                //                    {"value": "2003", "label": "2003", "selected": false},
                //                    {"value": "2002", "label": "2002", "selected": false},
                //                    {"value": "2001", "label": "2001", "selected": false},
                //                    {"value": "2000", "label": "2000", "selected": false},
                //                    {"value": "1999", "label": "1999", "selected": false},
                //                    {"value": "1998", "label": "1998", "selected": false},
                //                    {"value": "1997", "label": "1997", "selected": false},
                //                    {"value": "1996", "label": "1996", "selected": false},
                //                    {"value": "1995", "label": "1995", "selected": false},
                //                    {"value": "1994", "label": "1994", "selected": false},
                //                    {"value": "1993", "label": "1993", "selected": false},
                //                    {"value": "1992", "label": "1992", "selected": false},
                //                    {"value": "1991", "label": "1991", "selected": false},
                //                    {"value": "1990", "label": "1990", "selected": false}
                //                ]
                //            }
                //        }
                //    ]
                //},
                {
                    "type": "static",
                    "containerType": "baseContainer",
                    "title": "Commodity",
                    "uid": "UNECA_ClassificationOfActivities",
                    "components": [
                        {
                            "type": "codelist",
                            "uid": "UNECA_ClassificationOfActivities",
                            "componentType": "dropDownList-FENIX",
                            "lang": "EN",
                            "name": "IndicatorCode",
                            config: {
                                "defaultsource": [
                                    {"value": "02110103", "label": " Clothing and footwear", "selected": false},
                                    {"value": "02110109", "label": " Recreation and culture", "selected": false},
                                    {"value": "02110113", "label": " Other goods and  service", "selected": false},
                                    {"value": "02110110", "label": " Education", "selected": false},
                                    {"value": "02110104", "label": " Rent, water fuel and power", "selected": false},
                                    {
                                        "value": "02110101",
                                        "label": " Food and non-alcoholic beverage",
                                        "selected": false
                                    },
                                    {
                                        "value": "02110105",
                                        "label": " Furniture household and maintenance",
                                        "selected": false
                                    },
                                    {"value": "02110106", "label": " Medical care", "selected": false},
                                    {
                                        "value": "02110102",
                                        "label": " Alcoholic beverages and tobacco",
                                        "selected": false
                                    },
                                    {"value": "02110108", "label": " Communication", "selected": false},
                                    {
                                        "value": "02110112",
                                        "label": " Hotels, coffee-house and restaurant",
                                        "selected": false
                                    },
                                    {"value": "021101", "label": " Inflation, consumer prices", "selected": false},
                                    {"value": "02110107", "label": " Transportation", "selected": false}
                                ],
                                "enableMultiselection": true
                            }
                        }
                    ]
                }
            ],

            dashboard: {

                //data cube's uid
                uid: "UNECA_Inflation",

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
                        id: 'inflation-1',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#inflation-1",
                        config: {
                            container: "#inflation-1",
                            adapter: {
                                type: "standard",
                                xDimensions: 'Year',
                                yDimensions: 'Unit',
                                valueDimensions: 'Value',
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
                                                        "02110114"
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
                        id: 'inflation-2',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#inflation-2",
                        config: {
                            container: "#inflation-2",
                            adapter: {
                                type: "standard",
                                xDimensions: 'Year',
                                yDimensions: 'Unit',
                                valueDimensions: 'Value',
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
                                                        "02110115"
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
                        id: 'inflation-3',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#inflation-3",
                        config: {
                            container: "#inflation-3",
                            adapter: {
                                type: "standard",
                                xDimensions: 'Year',
                                yDimensions: "Unit",
                                valueDimensions: 'Value',
                                seriesDimensions: ['IndicatorCode']
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
                        allowedFilter: ['IndicatorCode'],
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
                                                        "02110103", "02110103", "02110109", "02110113", "02110110", "02110104", "02110101", "02110105", "02110106", "02110102", "02110108", "02110112", "021101", "02110107"
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
        },

        "financial_flows": {

            dashboard: {

                filter: [

                    {
                        "type": "static",
                        "containerType": "baseContainer",
                        "title": "Year",
                        "components": [
                            {
                                "type": "time",
                                "componentType": "dropDownList-FENIX",
                                "lang": "EN",
                                "name": "Year",
                                config: {
                                    "enableMultiselection": true,
                                    "defaultsource": [

                                        {"value": "2013", "label": "2013", "selected": true},
                                        {"value": "2012", "label": "2012", "selected": false},
                                        {"value": "2011", "label": "2011", "selected": false},
                                        {"value": "2010", "label": "2010", "selected": false},
                                        {"value": "2009", "label": "2009", "selected": false},
                                        {"value": "2008", "label": "2008", "selected": false},
                                        {"value": "2007", "label": "2007", "selected": false},
                                        {"value": "2006", "label": "2006", "selected": false},
                                        {"value": "2005", "label": "2005", "selected": false},
                                        {"value": "2004", "label": "2004", "selected": false},
                                        {"value": "2003", "label": "2003", "selected": false},
                                        {"value": "2002", "label": "2002", "selected": false},
                                        {"value": "2001", "label": "2001", "selected": false},
                                        {"value": "2000", "label": "2000", "selected": false}

                                    ]
                                }
                            }
                        ]
                    },


                    {
                        "type": "static",
                        "column": "IdicatorCode",
                        "containerType": "baseContainer",
                        "title": "Indicator",
                        "defaultCodes": ["02100101"],
                        "components": [
                            {
                                "type": "distinct",
                                "componentType": "dropDownList-FENIX",
                                "lang": "EN",
                                "uid": "UNECA_ClassificationOfActivities",

                                "title": {"EN": "Distinct"},
                                // name is the ID output in tehe filter getValues()
                                "name": "IndicatorCode",
                                "config": {
                                    "enableMultiselection": true,
                                    "defaultsource": [
                                        {
                                            "value": "020501",
                                            "label": "Net Foreign Direct Investment Inflows",
                                            "selected": false
                                        },
                                        {
                                            "value": "021001",
                                            "label": "Net Total Official Development assistance",
                                            "selected": false
                                        },
                                        {
                                            "value": "02100101",
                                            "label": "Official Development assistance",
                                            "selected": true
                                        },
                                        {"value": "020502", "label": "Origin of FDI Inflows", "selected": false},
                                    ]
                                }

                            }
                        ]
                    }


                ],


                //data cube's uid
                uid: "UNECA_FinancialFlows",

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
                        id: 'financial_flows-1',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#financial_flows-1",
                        config: {
                            container: "#financial_flows-1",
                            adapter: {
                                type: "standard",
                                xDimensions: 'Year',
                                yDimensions: "IndicatorCode",
                                valueDimensions: 'Value',
                                seriesDimensions: ['IndicatorCode']
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
                                                        '021001'
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
                        id: 'financial_flows-2',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#financial_flows-2",
                        config: {
                            container: "#financial_flows-2",
                            adapter: {
                                type: "standard",
                                xDimensions: 'Year',
                                yDimensions: "Unit",
                                valueDimensions: 'Value',
                                seriesDimensions: ['IndicatorCode']
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
                                                        "020501"
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
                        id: 'financial_flows-3',
                        type: 'map',

                        config: {
                            container: "#financial_flows-3",
                            geoSubject: 'PartnerCode',
                            leaflet: {
                                zoomControl: false,
                                attributionControl: true,
                                scrollWheelZoom: false,
                                minZoom: 2
                            }
                        },

                        filter: {
                            "Year": [2012],
                            "IndicatorCode": ["02100101"],
                            "PartnerCode": [
                                "DEU", "FRA", "AUT", "CAN", "USA", "NLD", "GBR", "ITA", "ESP", "JPN", "LUX", "DNK", "KOR", "NOR", "TUR", "SVN", "IRL", "POL", "CHL", "SWE", "CZE", "HUN", "PRT", "ARE", "BEL", "CHE", "AUS", "SVK", "POL", "GRC"
                            ]
                        }
                    },


                    {
                        id: 'financial_flows-4',
                        type: 'map',

                        config: {
                            container: "#financial_flows-3",
                            geoSubject: 'PartnerCode',
                            leaflet: {
                                zoomControl: false,
                                attributionControl: true,
                                scrollWheelZoom: false,
                                minZoom: 2
                            }
                        },

                        filter: {
                            "Year": [2012],
                            "IndicatorCode": ["020501"],
                            "PartnerCode": [
                                "DEU", "FRA", "AUT", "CAN", "USA", "NLD", "GBR", "ITA", "ESP", "JPN", "LUX", "DNK", "KOR", "NOR", "TUR", "SVN", "IRL", "POL", "CHL", "SWE", "CZE", "HUN", "PRT", "ARE", "BEL", "CHE", "AUS", "SVK", "POL", "GRC"
                            ]
                        }
                    },

                    {
                        id: 'financial_flows-5',
                        type: 'map',

                        config: {
                            container: "#financial_flows-3",
                            geoSubject: 'PartnerCode',
                            leaflet: {
                                zoomControl: false,
                                attributionControl: true,
                                scrollWheelZoom: false,
                                minZoom: 2
                            }
                        },

                        filter: {
                            "Year": [2012],
                            "IndicatorCode": ["020502"],
                            "PartnerCode": [
                                "DEU", "FRA", "AUT", "CAN", "USA", "NLD", "GBR", "ITA", "ESP", "JPN", "LUX", "DNK", "KOR", "NOR", "TUR", "SVN", "IRL", "POL", "CHL", "SWE", "CZE", "HUN", "PRT", "ARE", "BEL", "CHE", "AUS", "SVK", "POL", "GRC"
                            ]
                        }
                    },

                    {
                        id: 'financial_flows-6',
                        type: 'map',

                        config: {
                            container: "#financial_flows-3",
                            geoSubject: 'PartnerCode',
                            leaflet: {
                                zoomControl: false,
                                attributionControl: true,
                                scrollWheelZoom: false,
                                minZoom: 2
                            }
                        },

                        filter: {
                            "Year": [2012],
                            "IndicatorCode": ["020502"],
                            "PartnerCode": [
                                "DEU", "FRA", "AUT", "CAN", "USA", "NLD", "GBR", "ITA", "ESP", "JPN", "LUX", "DNK", "KOR", "NOR", "TUR", "SVN", "IRL", "POL", "CHL", "SWE", "CZE", "HUN", "PRT", "ARE", "BEL", "CHE", "AUS", "SVK", "POL", "GRC"
                            ]
                        }
                    }


                ]

            }

        },

        "balance_of_payments": {


            dashboard: {
                uid: "UNECA_BalanceOfPayments",
                //version: "",
                //preProcess : {} //D3P process
                //postProcess : {} //D3P process
                items: [
                    {
                        id: "BOP-1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            columns: ["Year"], //x axis and series
                            rows: ["IndicatorCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format
                            CountryCode: ["AGO"],//column id and values to include,
                            IndicatorCode: ["020204"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },
                    {
                        id: "BOP-2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            columns: ["Year"], //x axis and series
                            rows: ["IndicatorCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format
                            CountryCode: ["AGO"],//column id and values to include,
                            IndicatorCode: ["02020501", "02020501"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },


                    {
                        id: "BOP-3", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            columns: ["Year"], //x axis and series
                            rows: ["IndicatorCode_EN"], //Y dimension
                            values: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format
                            CountryCode: ["AGO"],//column id and values to include,
                            IndicatorCode: ["02020101"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    }


                ]

            }

        },

        "agriculture_production": {

            dashboard: {

                //data cube's uid
                uid: "UNECA_AgricultureProduction3",

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
                        id: 'agriculture_production-1',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#agriculture_production-1",
                        config: {
                            container: "#agriculture_production-1",
                            adapter: {
                                type: "standard",
                                xDimensions: 'Year',
                                yDimensions: "UM",
                                valueDimensions: 'Value',
                                seriesDimensions: ['Commodity']
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
                                                        '0201'
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                }
                            }


                        ]
                    }

                    /*
                     //{
                     //    id: 'balanceOfPayments-2',
                     //    type: 'chart',
                     //    class: "fx-timeseries-ecample",
                     //    //needed if layout = injected
                     //    container: "#balanceOfPayments-2",
                     //    config: {
                     //        container: "#balanceOfPayments-2",
                     //        adapter: {
                     //            type: "standard",
                     //            xDimensions: 'Year',
                     //            yDimensions: "um",
                     //            valueDimensions: 'Value',
                     //            seriesDimensions: ['IndicatorCode']
                     //        },
                     //        template: {
                     //            //"title": "Top 25..."
                     //        },
                     //        creator: {
                     //            chartObj: {
                     //                chart: {
                     //                    type: "column"
                     //                }
                     //            }
                     //        }
                     //    },
                     //
                     //    filter: [
                     //        {
                     //            "name": "filter",
                     //            "parameters": {
                     //                "rows": {
                     //                    "IndicatorCode": {
                     //                        "codes": [
                     //                            {
                     //                                "uid": "UNECA_ClassificationOfActivities",
                     //                                "codes": [
                     //                                    '020205'
                     //                                ]
                     //                            }
                     //                        ]
                     //                    }
                     //                }
                     //            }
                     //        }
                     //
                     //
                     //
                     //    ]
                     //},
                     {
                     id: 'balanceOfPayments-3',
                     type: 'chart',
                     class: "fx-timeseries-ecample",
                     //needed if layout = injected
                     container: "#balanceOfPayments-3",
                     config: {
                     container: "#balanceOfPayments-3",
                     adapter: {
                     type: "standard",
                     xDimensions: 'Year',
                     yDimensions: "um",
                     valueDimensions: 'Value',
                     seriesDimensions: ['IndicatorCode']
                     },
                     template: {
                     //"title": "Top 25..."
                     },
                     creator: {
                     chartObj: {
                     chart: {
                     type: "column"
                     },
                     plotOptions: {
                     column: {

                     stacking: "normal"
                     }

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
                     '02020501', '02020502'
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
                     id: 'balanceOfPayments-4',
                     type: 'chart',
                     class: "fx-timeseries-ecample",
                     //needed if layout = injected
                     container: "#balanceOfPayments-4",
                     config: {
                     container: "#balanceOfPayments-4",
                     adapter: {
                     type: "standard",
                     xDimensions: 'Year',
                     yDimensions: "um",
                     valueDimensions: 'Value',
                     seriesDimensions: ['IndicatorCode']
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
                     '02020101'
                     ]
                     }
                     ]
                     }
                     }
                     }
                     }


                     ]
                     }
                     */
                ]

            }

        },

        "mining_production": {

            dashboard: {

                //data cube's uid
                uid: "UNECA_MiningProduction4",

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
                        id: 'mining_production-1',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#mining_production-1",
                        config: {
                            container: "#mining_production-1",
                            adapter: {
                                type: "standard",
                                xDimensions: 'Year',
                                yDimensions: "UM",
                                valueDimensions: 'Value',
                                seriesDimensions: ['Commodity']
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
                                                        '0208'
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                }
                            }


                        ]
                    }

                    /*
                     //{
                     //    id: 'balanceOfPayments-2',
                     //    type: 'chart',
                     //    class: "fx-timeseries-ecample",
                     //    //needed if layout = injected
                     //    container: "#balanceOfPayments-2",
                     //    config: {
                     //        container: "#balanceOfPayments-2",
                     //        adapter: {
                     //            type: "standard",
                     //            xDimensions: 'Year',
                     //            yDimensions: "um",
                     //            valueDimensions: 'Value',
                     //            seriesDimensions: ['IndicatorCode']
                     //        },
                     //        template: {
                     //            //"title": "Top 25..."
                     //        },
                     //        creator: {
                     //            chartObj: {
                     //                chart: {
                     //                    type: "column"
                     //                }
                     //            }
                     //        }
                     //    },
                     //
                     //    filter: [
                     //        {
                     //            "name": "filter",
                     //            "parameters": {
                     //                "rows": {
                     //                    "IndicatorCode": {
                     //                        "codes": [
                     //                            {
                     //                                "uid": "UNECA_ClassificationOfActivities",
                     //                                "codes": [
                     //                                    '020205'
                     //                                ]
                     //                            }
                     //                        ]
                     //                    }
                     //                }
                     //            }
                     //        }
                     //
                     //
                     //
                     //    ]
                     //},
                     {
                     id: 'balanceOfPayments-3',
                     type: 'chart',
                     class: "fx-timeseries-ecample",
                     //needed if layout = injected
                     container: "#balanceOfPayments-3",
                     config: {
                     container: "#balanceOfPayments-3",
                     adapter: {
                     type: "standard",
                     xDimensions: 'Year',
                     yDimensions: "um",
                     valueDimensions: 'Value',
                     seriesDimensions: ['IndicatorCode']
                     },
                     template: {
                     //"title": "Top 25..."
                     },
                     creator: {
                     chartObj: {
                     chart: {
                     type: "column"
                     },
                     plotOptions: {
                     column: {

                     stacking: "normal"
                     }

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
                     '02020501', '02020502'
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
                     id: 'balanceOfPayments-4',
                     type: 'chart',
                     class: "fx-timeseries-ecample",
                     //needed if layout = injected
                     container: "#balanceOfPayments-4",
                     config: {
                     container: "#balanceOfPayments-4",
                     adapter: {
                     type: "standard",
                     xDimensions: 'Year',
                     yDimensions: "um",
                     valueDimensions: 'Value',
                     seriesDimensions: ['IndicatorCode']
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
                     '02020101'
                     ]
                     }
                     ]
                     }
                     }
                     }
                     }


                     ]
                     }
                     */
                ]


            }

        }

    }

});