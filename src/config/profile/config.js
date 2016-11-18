/*global define*/

define(['underscore'],function (_) {

    'use strict';

    return {

        "resume": {
            dashboard: [{

                uid: "UNECA_CountryResume",
                items: [
                    {
                        id: "country-map-container", //ref [data-item=':id']
                        type: "map", //chart || map || olap,

                        /*
                        geoSubject: 'gaul0',
                        colorRamp: 'GnBu',  //Blues, Greens,
                            //colorRamp values: http://fenixrepo.fao.org/cdn/fenix/fenix-ui-map-datasets/colorramp.png
                        legendtitle: 'ODA',
                        */

                        config: {
                            fenix_ui_map: {
                                guiController: {
                                    overlay: false,
                                    baselayer: false,
                                    wmsLoader: false
                                },
                                baselayers: {
                                    "cartodb": {
                                        title_en: "Baselayer",
                                        url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                                        subdomains: 'abcd',
                                        maxZoom: 19
                                    }
                                },
                                zoomToCountry: ["DZA"],
                                highlightCountry: ["DZA"]
                            }
                        }
                    }
                ]      
            }]
        },

        "population": {

            dashboard: [{

                uid: "Uneca_PopulationNew",
                //version: "",
                //preProcess : {} //D3P process
                //postProcess : {} //D3P process
                //filter : {} //FX-filter format
                items: [

                    {
                        //Mid-year Population  010101
                        id: "population1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                           x : ["Year"], //x axis and series
                            series: ["IndicatorCode"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"},
                            useDimensionLabelsIfExist: true,
                            config: {
                                legend: {
                                    enabled:false
                                }
                            }
                        }, // :type-creator config
                        filter: { //FX-filter format
                            IndicatorCode: ["010101"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        //Average annual growth rate  010103
                        id: "population2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x : ["Year"], //x axis and series
                            series: ["IndicatorCode"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"},
                            useDimensionLabelsIfExist: true,
                            config: {
                                legend: {
                                    enabled:false
                                }
                            }
                        }, // :type-creator config
                        filter: { //FX-filter format
                            IndicatorCode: ["010103"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        //Crude birth rate per 1,000 population  010104
                        id: "population3", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x : ["Year"], //x axis and series
                            series: ["IndicatorCode"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"},
                            useDimensionLabelsIfExist: true,
                            config: {
                                legend: {
                                    enabled:false
                                }
                            }
                        }, // :type-creator config
                        filter: { //FX-filter format
                            IndicatorCode: ["010104"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        //Crude death rate per 1,000 population  010105
                        id: "population4", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x : ["Year"], //x axis and series
                            series: ["IndicatorCode"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"},
                            useDimensionLabelsIfExist: true,
                            config: {
                                legend: {
                                    enabled:false
                                }
                            }
                        }, // :type-creator config
                        filter: { //FX-filter format
                            IndicatorCode: ["010105"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        //Total fertility  010106
                        id: "population5", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x : ["Year"], //x axis and series
                            series: ["IndicatorCode"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"},
                            useDimensionLabelsIfExist: true,
                            config: {
                                legend: {
                                    enabled:false
                                }
                            }
                        }, // :type-creator config
                        filter: { //FX-filter format
                            IndicatorCode: ["010106"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        //Life expectancy (years)  010108
                        id: "population6", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                           x : ["Year"], //x axis and series
                          series: ["IndicatorCode"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"},
                            useDimensionLabelsIfExist: true,
                            config: {
                                legend: {
                                    enabled:false
                                }
                            }

                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["010108"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    }
                ]
            }]
        },

        "health": {

            dashboard: {

                uid: "UNECA_Health",
                //version: "",
                //preProcess : {} //D3P process
                //postProcess : {} //D3P process
                items: [
                    {
                        //Infant mortality rate (both sexes) per 1,000  010304
                        id: "health1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"},
                            useDimensionLabelsIfExist: true,
                            config: {
                                legend: {
                                    enabled:false
                                }
                            }
                        }, // :type-creator config
                        filter: { //FX-filter format
                            IndicatorCode: ["010304"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },
                    {
                        //Under five mortality rate (both sexes) per 1,000  010303
                        id: "health2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"},
                            useDimensionLabelsIfExist: true,
                            config: {
                                legend: {
                                    enabled:false
                                }
                            }
                        }, // :type-creator config
                        filter: { //FX-filter format
                            IndicatorCode: ["010303"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },
                    {
                        //Number of doctors per 10,000 population  010313;  Number of nurses and midwives per 10,000 population 010314
                        id: "health3", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"},
                            useDimensionLabelsIfExist: true,
                            config: {
                                legend: {
                                    enabled:false
                                }
                            }
                        }, // :type-creator config
                        filter: { //FX-filter format
                            IndicatorCode: ["010313", "010314"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    }
                ]
            }
        },

        "gdp": {

            dashboard: [

                { uid: "UNECA_GDP_NC",
                    items :  [
                        {
                            //GDP (Current prices)  020707
                            id: "gdp1", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "line",
                                x: ["Year"], //x axis and series
                                series: ["IndicatorCode"], //Y dimension
                                y: ["Value"],
                                aggregationFn: {"Value": "sum"},
                                useDimensionLabelsIfExist: true,
                                config: {
                                    legend: {
                                        enabled:false
                                    },
                                    tooltip: {
                                        valueSuffix:" NC"
                                    }
                                }
                            }, // :type-creator config
                            filter: { //FX-filter format
                                IndicatorCode: ["020707"]
                            }
                            //filterFor: ["Year"], // allowed dimension ids to filter,
                        }

                    ]

                },

                { uid: "UNECA_GDP_NC",
                    items :  [
                        {
                            //Exports of goods and services at current prices  02070202; Import of goods and services 02070203
                            id: "gdp2", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "line",
                                x: ["Year"], //x axis and series
                                series: ["IndicatorCode"], //Y dimension
                                y: ["Value"],
                                aggregationFn: {"Value": "sum"},
                                useDimensionLabelsIfExist: true,
                                config: {
                                    legend: {
                                        enabled:false
                                    }
                                }
                            }, // :type-creator config
                            filter: { //FX-filter format
                                IndicatorCode: ["02070202", "02070203"]
                            }
                            //filterFor: ["Year"], // allowed dimension ids to filter,
                        }

                    ]

                }

            ]


        },

        "monetary_statistics": {

            dashboard: {

                uid: "UNECA_MonetaryStatistics",


                items: [
                    {
                        //Money supply (M1)  020901
                        id: "monetary1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"},
                            useDimensionLabelsIfExist: true,
                            config: {
                                legend: {
                                    enabled:false
                                }
                            }
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["020901"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        //Net foreign assets  020904
                        id: "monetary2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"},
                            useDimensionLabelsIfExist: true,
                            config: {
                                legend: {
                                    enabled:false
                                }
                            }
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["020904"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },
                    {
                        //International reserves  020906
                        id: "monetary3", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"},
                            useDimensionLabelsIfExist: true,
                            config: {
                                legend: {
                                    enabled:false
                                }
                            }
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["020906"]

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
                        //Fiscal balance 021204
                        id: "finance1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"},
                            useDimensionLabelsIfExist: true,
                            config: {
                                legend: {
                                    enabled:false
                                }
                            }
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["021204"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        //Total expenditures and net lending 021203
                        id: "finance2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"},
                            useDimensionLabelsIfExist: true,
                            config: {
                                legend: {
                                    enabled:false
                                }
                            }
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["021203"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        //Total revenues and grants 021201
                        id: "finance3", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"},
                            useDimensionLabelsIfExist: true,
                            config: {
                                legend: {
                                    enabled:false
                                }
                            }
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["021201"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    }


                ]
            }

        },

        "poverty": {

            dashboard: {

                uid: "UNECA_Poverty",

                items: [

                    {
                        //GNI Per Capita (US$) 030301
                        id: "poverty1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"},
                            useDimensionLabelsIfExist: true,
                            config: {
                                legend: {
                                    enabled:false
                                }
                            }
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["030301"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },
                    {
                        //Population below $2 (PPP) per day 010114
                        id: "poverty2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"},
                            useDimensionLabelsIfExist: true,
                            config: {
                                legend: {
                                    enabled:false
                                }
                            }
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["010114"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    }
                ]
            }

        },

        "tourism": {

            dashboard: [{

                uid: "UNECA_Tourism",
                //version: "",
                //preProcess : {} //D3P process
                //postProcess : {} //D3P process
                //filter : {} //FX-filter format
                items: [

                  {
                        //International tourism, number of arrivals 021305
                        id: "tourism1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x : ["Year"], //x axis and series
                            series: ["IndicatorCode"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"},
                            useDimensionLabelsIfExist: true,
                            config: {
                                legend: {
                                    enabled:false
                                }
                            }
                        }, // :type-creator config
                        filter: { //FX-filter format
                            IndicatorCode: ["021305"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        //Rooms in hotels and similar establishments 021301
                        id: "tourism2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x : ["Year"], //x axis and series
                            series: ["IndicatorCode"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"},
                            useDimensionLabelsIfExist: true,
                            config: {
                                legend: {
                                    enabled:false
                                }
                            }
                        }, // :type-creator config
                        filter: { //FX-filter format
                            IndicatorCode: ["021301"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    }
                ]
            }]
        },

        "balance_of_payments": {


            dashboard: {
                uid: "UNECA_BalanceOfPayments",
                //version: "",
                //preProcess : {} //D3P process
                //postProcess : {} //D3P process
                items: [
                    {
                        //Current account balance (BoP) 020204
                        id: "BOP1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"},
                            useDimensionLabelsIfExist: true,
                            config: {
                                legend: {
                                    enabled:false
                                },
                                tooltip: {
                                    valueSuffix:" NC"
                                }
                            }

                        }, // :type-creator config

                        filterFor: {
                            "filter_current": ['CountryCode']
                        },

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "UNECA_BalanceOfPayments"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "IndicatorCode",
                                        "CountryCode",
                                        "Year",
                                        "Value"
                                    ],
                                    "rows": {

                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "version":"2.0",
                                                    "codes": [
                                                        "020204"

                                                    ]
                                                }
                                            ]
                                        },
                                        "Year": {
                                            "time": [
                                                {
                                                    "from": 2000,
                                                    "to": 2013
                                                }
                                            ]
                                        },
                                        "um": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_Currencies",
                                                    "codes": [
                                                        "NC"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                },
                                "rid":{"uid":"filter_current"}
                            }
                        ]
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },
                    {
                        //Capital account balance (BoP) 02020501
                        id: "BOP2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"},
                            useDimensionLabelsIfExist: true,
                            config: {
                                legend: {
                                    enabled:false
                                },
                                tooltip: {
                                    valueSuffix:" NC"
                                }
                            }
                        }, // :type-creator config

                        filterFor: {
                            "filter_capital": ['CountryCode']
                        },

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "UNECA_BalanceOfPayments"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "IndicatorCode",
                                        "CountryCode",
                                        "Year",
                                        "Value"
                                    ],
                                    "rows": {

                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "version":"2.0",
                                                    "codes": [
                                                        "02020501"

                                                    ]
                                                }
                                            ]
                                        },
                                        "Year": {
                                            "time": [
                                                {
                                                    "from": 2000,
                                                    "to": 2013
                                                }
                                            ]
                                        },
                                        "um": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_Currencies",
                                                    "codes": [
                                                        "NC"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                },
                                "rid":{"uid":"filter_capital"}
                            }
                        ]

                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },
                    {
                        //Financial account balance (BoP) 02020502
                        id: "BOP3", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"},
                            useDimensionLabelsIfExist: true,
                            config: {
                                legend: {
                                    enabled:false
                                },
                                tooltip: {
                                    valueSuffix:" NC"
                                }
                            }
                        }, // :type-creator config

                        filterFor: {
                            "filter_financial": ['CountryCode']
                        },

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "UNECA_BalanceOfPayments"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "IndicatorCode",
                                        "CountryCode",
                                        "Year",
                                        "Value"
                                    ],
                                    "rows": {

                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "version":"2.0",
                                                    "codes": [
                                                        "02020502"

                                                    ]
                                                }
                                            ]
                                        },
                                        "Year": {
                                            "time": [
                                                {
                                                    "from": 2000,
                                                    "to": 2013
                                                }
                                            ]
                                        },
                                        "um": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_Currencies",
                                                    "codes": [
                                                        "NC"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                },
                                "rid":{"uid":"filter_financial"}
                            }
                        ]
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    }
                ]

            }

        },

        "inflation" : {

filter:{

    CommodityCode :{
        selector: {
            id : "tree"
        },

        cl: {
            uid: "UNECA_KindOfCommodity"


        },
        template: {
            hideHeader : true
        }


    }
},

            dashboard: {
                uid: "UNECA_Inflation",
                //version: "",
                //preProcess : {} //D3P process
                //postProcess : {} //D3P process
                items: [

                    {
                        //Inflation, consumer prices (annual %) 02110114
                        id: "inflation1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"},
                            useDimensionLabelsIfExist: true,
                            config: {
                                legend: {
                                    enabled:false
                                }
                            }
                        }, // :type-creator config
                        filter: { //FX-filter format
                            IndicatorCode: ["02110114"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    }

                ]

            }


        }


    }

});