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
                        id: "population1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                           x : ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format
                            IndicatorCode: ["010101"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        id: "population2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x : ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format
                            IndicatorCode: ["010103"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        id: "population3", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x : ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format
                            IndicatorCode: ["010104"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        id: "population4", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x : ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format
                            IndicatorCode: ["010105"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        id: "population5", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x : ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format
                            IndicatorCode: ["010106"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        id: "population6", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                           x : ["Year"], //x axis and series
                          series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["010108"]
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
                        id: "edu1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["010201"],
                            GenderCode: ["3"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },


                    {
                        id: "edu2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["010201", "010202", "010203"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        id: "edu3", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            series: ["GenderCode_EN"], //Y dimension
                            y: ["Value"],
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
                        id: "health1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["010304"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },
                    {
                        id: "health2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["010303"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },
                    {
                        id: "health3", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["010313"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },


                    {
                        id: "health4", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["010314"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    }
                ]
            }
        },

        "labour": {

            dashboard: [
            {
                uid: "UNECA_Labour",
                //version: "",
                //preProcess : {} //D3P process
                //postProcess : {} //D3P process
                items: [
                        {
                            id: "labour1", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "line",
                                x: ["Year"], //x axis and series
                                series: ["IndicatorCode_EN"], //Y dimension
                                y: ["VALUE"],
                                aggregationFn: {"Value": "sum"}
                            }, // :type-creator config
                            filter: { //FX-filter format
                                IndicatorCode: ["010401"],
                                GenderCode :["3"],
                                SectorCode: ["4"]
                            }
                            //filterFor: ["Year"], // allowed dimension ids to filter,
                        },

                        {
                            id: "labour2", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "column",
                                x: ["Year"], //x axis and series
                                series: ["SectorCode_EN"], //Y dimension
                                y: ["VALUE"],
                                aggregationFn: {"Value": "sum"}
                            }, // :type-creator config
                            filter: { //FX-filter format
                                IndicatorCode: ["010401"],
                                SectorCode : ["1","2","3"],
                                GenderCode : ["3"]
                            }
                            //filterFor: ["Year"], // allowed dimension ids to filter,
                        },

                        {
                            id: "labour3", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "column",
                                x: ["Year"], //x axis and series
                                series: ["GenderCode_EN"], //Y dimension
                                y: ["VALUE"],
                                aggregationFn: {"Value": "sum"}
                            }, // :type-creator config
                            filter: { //FX-filter format
                                IndicatorCode: ["010401"],
                                SectorCode : ["4"],
                                GenderCode : ["1","2"]
                            }
                            //filterFor: ["Year"], // allowed dimension ids to filter,
                        }
                      ]

                },


                { uid: "ILO_Labour",
                      items :  [
                        {
                            id: "labour4", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "line",
                                x: ["Year"], //x axis and series
                                series: ["GenderCode_EN"], //Y dimension
                                y: ["Value"],
                                aggregationFn: {"Value": "sum"}
                            }, // :type-creator config
                            filter: { //FX-filter format
                                IndicatorCode: ["010404"]
                            }
                            //filterFor: ["Year"], // allowed dimension ids to filter,
                        },

                        {
                            id: "labour5", //ref [data-item=':id']
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
                                GenderCode: ["3"],
                                Year :_.range(1990,2015)

                            }
                            //filterFor: ["Year"], // allowed dimension ids to filter,
                        },


                        {
                            id: "labour6", //ref [data-item=':id']
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
                                GenderCode: ["1", "2"],
                                Year :_.range(1990,2015)
                            }
                            //filterFor: ["Year"], // allowed dimension ids to filter,
                        }

                          ]

                }


                ]


        },



        "gdp": {

            dashboard: [


                { uid: "UNECA_GDP_NC",
                    items :  [
                        {
                            id: "gdp1", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "line",
                                x: ["Year"], //x axis and series
                                series: ["IndicatorCode_EN"], //Y dimension
                                y: ["Value"],
                                aggregationFn: {"Value": "sum"}
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
                            id: "gdp2", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "line",
                                x: ["Year"], //x axis and series
                                series: ["IndicatorCode_EN"], //Y dimension
                                y: ["Value"],
                                aggregationFn: {"Value": "sum"}
                            }, // :type-creator config
                            filter: { //FX-filter format
                                IndicatorCode: ["02070202"]
                            }
                            //filterFor: ["Year"], // allowed dimension ids to filter,
                        },
                        {
                            id: "gdp3", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "line",
                                x: ["Year"], //x axis and series
                                series: ["IndicatorCode_EN"], //Y dimension
                                y: ["Value"],
                                aggregationFn: {"Value": "sum"}
                            }, // :type-creator config
                            filter: { //FX-filter format
                                IndicatorCode: ["02070203"]
                            }
                            //filterFor: ["Year"], // allowed dimension ids to filter,
                        }


                    ]

                }/*,




                {
                    uid: "UNECA_GDP",
                    //version: "",
                    //preProcess : {} //D3P process
                    //postProcess : {} //D3P process
                    items: [
                        {
                            id: "gdp-4", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "column",
                                x: ["Year"], //x axis and series
                                series: ["IndicatorCode_EN"], //Y dimension
                                y: ["Value"],
                                aggregationFn: {"Value": "sum"}
                            }, // :type-creator config
                            filter: { //FX-filter format
                                IndicatorCode: ["020705"]
                            }
                            //filterFor: ["Year"], // allowed dimension ids to filter,
                        },


                        {
                            id: "gdp-5", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "line",
                                x: ["Year"], //x axis and series
                                series: ["IndicatorCode_EN"], //Y dimension
                                y: ["Value"],
                                aggregationFn: {"Value": "sum"}
                            }, // :type-creator config
                            filter: { //FX-filter format
                                IndicatorCode: ["020706"]

                            }
                            //filterFor: ["Year"], // allowed dimension ids to filter,
                        }




                    ]

                }
*/




            ]


        },

        "expenditure_gdp": {

            dashboard: [


                { uid: "UNECA_ExpenditureGDPCurrent",
                    items: [
                        {
                            id: "expenditure1", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "column",
                                x: ["Year"], //x axis and series
                                series: ["IndicatorCode_EN"], //Y dimension
                                y: ["Value"],
                                aggregationFn: {"Value": "sum"}
                            }, // :type-creator config
                            filter: { //FX-filter format
                                IndicatorCode: ["0207020103"]
                            }
                            //filterFor: ["Year"], // allowed dimension ids to filter,
                        },





                        {
                            id: "expenditure2", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "column",
                                x: ["Year"], //x axis and series
                                series: ["IndicatorCode_EN"], //Y dimension
                                y: ["Value"],
                                aggregationFn: {"Value": "sum"}
                            }, // :type-creator config
                            filter: { //FX-filter format
                                IndicatorCode: ["020702010301"]
                            }
                            //filterFor: ["Year"], // allowed dimension ids to filter,
                        },


                        {
                            id: "expenditure3", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "line",
                                x: ["Year"], //x axis and series
                                series: ["IndicatorCode_EN"], //Y dimension
                                y: ["Value"],
                                aggregationFn: {"Value": "sum"}
                            }, // :type-creator config
                            filter: { //FX-filter format
                                IndicatorCode: ["02070207"]

                            }
                            //filterFor: ["Year"], // allowed dimension ids to filter,
                        },
                        {
                            id: "expenditure4", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "line",
                                x: ["Year"], //x axis and series
                                series: ["IndicatorCode_EN"], //Y dimension
                                y: ["Value"],
                                aggregationFn: {"Value": "sum"}
                            }, // :type-creator config
                            filter: { //FX-filter format
                                IndicatorCode: ["02070208"]

                            }
                            //filterFor: ["Year"], // allowed dimension ids to filter,
                        }




                    ]


                },


                {
                    uid: "UNECA_ExpenditureGDPCostant",
                    //version: "",
                    //preProcess : {} //D3P process
                    //postProcess : {} //D3P process
                    items: [
                        {
                            id: "expenditure5", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "column",
                                x: ["Year"], //x axis and series
                                series: ["IndicatorCode_EN"], //Y dimension
                                y: ["Value"],
                                aggregationFn: {"Value": "sum"}
                            }, // :type-creator config
                            filter: { //FX-filter format
                                IndicatorCode: ["0207010103"]
                            }
                            //filterFor: ["Year"], // allowed dimension ids to filter,
                        },





                        {
                            id: "expenditure6", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "column",
                                x: ["Year"], //x axis and series
                                series: ["IndicatorCode_EN"], //Y dimension
                                y: ["Value"],
                                aggregationFn: {"Value": "sum"}
                            }, // :type-creator config
                            filter: { //FX-filter format
                                IndicatorCode: ["020701010301"]
                            }
                            //filterFor: ["Year"], // allowed dimension ids to filter,
                        },


                        {
                            id: "expenditure7", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "line",
                                x: ["Year"], //x axis and series
                                series: ["IndicatorCode_EN"], //Y dimension
                                y: ["Value"],
                                aggregationFn: {"Value": "sum"}
                            }, // :type-creator config
                            filter: { //FX-filter format
                                IndicatorCode: ["02070107"]

                            }
                            //filterFor: ["Year"], // allowed dimension ids to filter,
                        },
                        {
                            id: "expenditure8", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "line",
                                x: ["Year"], //x axis and series
                                series: ["IndicatorCode_EN"], //Y dimension
                                y: ["Value"],
                                aggregationFn: {"Value": "sum"}
                            }, // :type-creator config
                            filter: { //FX-filter format
                                IndicatorCode: ["02070108"]

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
                        id: "monetary1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["020901"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        id: "monetary2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["020904"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },
                    {
                        id: "monetary3", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
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
                        id: "finance1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["021204"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        id: "finance2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["021203"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        id: "finance3", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["021201"]

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
                        id: "debt1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["020308"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        id: "debt2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["020305"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },


                    {
                        id: "debt3", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
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
        "energy": {

            dashboard: {

                uid: "UNSD_EnergyData",

                items: [

                    {
                        id: "energy1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            series: ["EnergyCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["020402"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        id: "energy2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            series: ["EnergyCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["02040203"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },


                    {
                        id: "energy3", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            series: ["EnergyCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["02040204"]

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
                        id: "poverty1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["030301"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },
                    {
                        id: "poverty2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["010114"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    }
                ]
            }

        },

        "financial_flows": {

            dashboard: [{



                //data cube's uid
                uid: "UNECA_FinancialFlows",



                items: [

                    {
                        id: "financial_flows1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["021001"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },
                    {
                        id: "financial_flows2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["020501"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },






                    {
                        id: "financial_flows3", //ref [data-item=':id']
                        type: "map", //chart || map || olap,
                        config: {
                            geoSubject: 'PartnerCode',
                            fenix_ui_map: {

                                guiController: {
                                    overlay: false,
                                    baselayer: false,
                                    wmsLoader: false
                                },
                                baselayers: {
                                    "cartodb": {
                                        title_en: "Baselayer",
                                        url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                                        subdomains: 'abcd',
                                        maxZoom: 19
                                    }
                                }
                            }
                        },
                        filter: { //FX-filter format

                            Year: [2012],
                            IndicatorCode: ["02100101"],
                            PartnerCode: [
                                "DEU", "FRA", "AUT", "CAN", "USA", "NLD", "GBR", "ITA", "ESP", "JPN", "LUX", "DNK", "KOR", "NOR", "TUR", "SVN", "IRL", "POL", "CHL", "SWE", "CZE", "HUN", "PRT", "ARE", "BEL", "CHE", "AUS", "SVK", "POL", "GRC"
                            ]
                        }
                    },

                    {
                        id: "financial_flows4", //ref [data-item=':id']
                        type: "map", //chart || map || olap,
                        config: {
                            geoSubject: 'PartnerCode',
                            fenix_ui_map: {

                                guiController: {
                                    overlay: false,
                                    baselayer: false,
                                    wmsLoader: false
                                },
                                baselayers: {
                                    "cartodb": {
                                        title_en: "Baselayer",
                                        url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                                        subdomains: 'abcd',
                                        maxZoom: 19
                                    }
                                }
                            }
                        },
                        filter: { //FX-filter format

                            Year: [2012],
                            IndicatorCode: ["020501"],
                            PartnerCode: [
                                "DEU", "FRA", "AUT", "CAN", "USA", "NLD", "GBR", "ITA", "ESP", "JPN", "LUX", "DNK", "KOR", "NOR", "TUR", "SVN", "IRL", "POL", "CHL", "SWE", "CZE", "HUN", "PRT", "ARE", "BEL", "CHE", "AUS", "SVK", "POL", "GRC"
                            ]
                        }
                    }










                    //{
                    //    id: "financial_flows-3", //ref [data-item=':id']
                    //    type: "map", //chart || map || olap,
                    //    config: {
                    //        container: "#financial_flows-3",
                    //        geoSubject: 'PartnerCode',
                    //        leaflet: {
                    //            zoomControl: false,
                    //            attributionControl: true,
                    //            scrollWheelZoom: false,
                    //            minZoom: 2
                    //        }
                    //
                    //    }, // :type-creator config
                    //    filter: { //FX-filter format
                    //
                    //        "Year": [2012],
                    //        "IndicatorCode": ["02100101"],
                    //        "PartnerCode": [
                    //            "DEU", "FRA", "AUT", "CAN", "USA", "NLD", "GBR", "ITA", "ESP", "JPN", "LUX", "DNK", "KOR", "NOR", "TUR", "SVN", "IRL", "POL", "CHL", "SWE", "CZE", "HUN", "PRT", "ARE", "BEL", "CHE", "AUS", "SVK", "POL", "GRC"
                    //        ]
                    //
                    //    }
                    //    //filterFor: ["Year"], // allowed dimension ids to filter,
                    //},
                    //{
                    //    id: "financial_flows-4", //ref [data-item=':id']
                    //    type: "map", //chart || map || olap,
                    //    config: {
                    //        container: "#financial_flows-3",
                    //        geoSubject: 'PartnerCode',
                    //        leaflet: {
                    //            zoomControl: false,
                    //            attributionControl: true,
                    //            scrollWheelZoom: false,
                    //            minZoom: 2
                    //        }
                    //
                    //    }, // :type-creator config
                    //    filter: { //FX-filter format
                    //
                    //        "Year": [2012],
                    //        "IndicatorCode": ["020501"],
                    //        "PartnerCode": [
                    //            "DEU", "FRA", "AUT", "CAN", "USA", "NLD", "GBR", "ITA", "ESP", "JPN", "LUX", "DNK", "KOR", "NOR", "TUR", "SVN", "IRL", "POL", "CHL", "SWE", "CZE", "HUN", "PRT", "ARE", "BEL", "CHE", "AUS", "SVK", "POL", "GRC"
                    //        ]
                    //
                    //    }
                    //    //filterFor: ["Year"], // allowed dimension ids to filter,
                    //}



                    /// {
                    //    id: 'financial_flows-5',
                    //    type: 'map',
                    //
                    //    config: {
                    //        container: "#financial_flows-3",
                    //        geoSubject: 'PartnerCode',
                    //        leaflet: {
                    //            zoomControl: false,
                    //            attributionControl: true,
                    //            scrollWheelZoom: false,
                    //            minZoom: 2
                    //        }
                    //    },
                    //
                    //    filter: {
                    //        "Year": [2012],
                    //        "IndicatorCode": ["020502"],
                    //        "PartnerCode": [
                    //            "DEU", "FRA", "AUT", "CAN", "USA", "NLD", "GBR", "ITA", "ESP", "JPN", "LUX", "DNK", "KOR", "NOR", "TUR", "SVN", "IRL", "POL", "CHL", "SWE", "CZE", "HUN", "PRT", "ARE", "BEL", "CHE", "AUS", "SVK", "POL", "GRC"
                    //        ]
                    //    }
                    //},

                    //{
                    //    id: 'financial_flows-6',
                    //    type: 'map',
                    //
                    //    config: {
                    //        container: "#financial_flows-3",
                    //        geoSubject: 'PartnerCode',
                    //        leaflet: {
                    //            zoomControl: false,
                    //            attributionControl: true,
                    //            scrollWheelZoom: false,
                    //            minZoom: 2
                    //        }
                    //    },
                    //
                    //    filter: {
                    //        "Year": [2012],
                    //        "IndicatorCode": ["020502"],
                    //        "PartnerCode": [
                    //            "DEU", "FRA", "AUT", "CAN", "USA", "NLD", "GBR", "ITA", "ESP", "JPN", "LUX", "DNK", "KOR", "NOR", "TUR", "SVN", "IRL", "POL", "CHL", "SWE", "CZE", "HUN", "PRT", "ARE", "BEL", "CHE", "AUS", "SVK", "POL", "GRC"
                    //        ]
                    //    }
                    //}


                ]

            }]

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
                        id: "tourism1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x : ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format
                            IndicatorCode: ["021305"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        id: "tourism2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x : ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
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
                        id: "BOP1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["020204"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },
                    {
                        id: "BOP2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["02020501"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },


                    {
                        id: "BOP3", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["02020502"]

                        }
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
                        id: "inflation1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
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