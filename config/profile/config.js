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

        "population": {
            //data cube's uid
            uid: "UNECA_Population",

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

                /* Mid-year population
                 */
                {
                    //Time series
                    id: 'population-1',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#population-1",
                    config: {
                        container: "#population-1",
                        adapter: {
                            type: "standard",
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
                                                    "010101"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                },


                /*
                 TABLE
                 */

                {
                    id: 'population-2',
                    type: 'table',
                    class: "fx-map-chart",
                    //needed if layout = injected
                    container: "#population-2",
                    config: {
                        container: "#population-2",
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
                                                    "010103"
                                                ]
                                            }
                                        ]
                                    }
                                },
                                "columns": ["IndicatorCode", "CountryCode", "Year", "GenderCode", "AgeRangeCode", "Value"]


                            }
                        }
                    ]
                },


                /*
                 Mid-year population by age group
                 */

                {
                    //Time series
                    id: 'population-3',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#population-3",
                    config: {
                        container: "#population-3",
                        adapter: {
                            type: "standard",
                            xDimensions: 'time',
                            yDimensions: 'item',
                            valueDimensions: 'value',
                            seriesDimensions: ['AgeRangeCode']
                        },
                        template: {
                            //"title": "Top 25..."
                        },
                        creator: {
                            chartObj: {
                                chart: {
                                    type: "area"
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
                                                    "01010104"
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
                    id: 'population-4',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#population-4",
                    config: {
                        container: "#population-4",
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
                                                    "01010101"
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
                    id: 'population-5',
                    type: 'table',
                    class: "fx-map-chart",
                    //needed if layout = injected
                    container: "#population-5",
                    config: {
                        container: "#population-5",
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
                                                    "010108"
                                                ]
                                            }
                                        ]
                                    }
                                },
                                "columns": ["IndicatorCode", "CountryCode", "Year", "GenderCode", "AgeRangeCode", "Value"]


                            }
                        }
                    ]
                },


                /*
                 Population Pyramid
                 */

                //{
                //    //Time series
                //    id: 'population-6',
                //    type: 'chart',
                //    class: "fx-timeseries-ecample",
                //    //needed if layout = injected
                //    container: "#population-6",
                //    config: {
                //        container: "#population-6",
                //        adapter: {
                //            type: "standard",
                //            xDimensions: 'time',
                //            yDimensions: 'item',
                //            valueDimensions: 'value',
                //            seriesDimensions: []
                //        },
                //        template: {
                //            //"title": "Top 25..."
                //        },
                //        creator: {
                //
                //
                //
                //        }
                //    },
                //
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
                //                                    "010101"
                //                                ]
                //                            }
                //                        ]
                //                    }
                //                }
                //            }
                //        }
                //    ]
                //},



                {
                    id: 'population-7',
                    type: 'table',
                    class: "fx-map-chart",
                    //needed if layout = injected
                    container: "#population-7",
                    config: {
                        container: "#population-7",
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
                                                    "010102"
                                                ]
                                            }
                                        ]
                                    }
                                },
                                "columns": ["IndicatorCode", "CountryCode", "Year", "GenderCode", "AgeRangeCode", "Value"]


                            }
                        }
                    ]
                }


            ]


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


        },


        "health": {
            //data cube's uid
            uid: "UNCEA_Health1",

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
                    id: 'health-1',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#health-1",
                    config: {
                        container: "#health-1",
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
                                                    "010307", "010308", "010309", "010310"
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
                    id: 'health-2',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#health-1",
                    config: {
                        container: "#health-2",
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
                                                    "010301"
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
                    id: 'health-3',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#health-3",
                    config: {
                        container: "#health-3",
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
                                                    "010302"
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
                    id: 'health-4',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#health-4",
                    config: {
                        container: "#health-4",
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
                                                    "010303", "010304"
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
                    id: 'health-5',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#health-5",
                    config: {
                        container: "#health-5",
                        adapter: {
                            type: "standard",
                            xDimensions: 'Year',
                            yDimensions: null,
                            valueDimensions: 'Value',
                            seriesDimensions: []
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
                                                    "010313", "010314", "010315"
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


        },


        "labour": {
            //data cube's uid
            uid: "UNECA_Labour",

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
                                                    "010401"
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
                    id: 'labour-2',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#labour-2",
                    config: {
                        container: "#labour-2",
                        adapter: {
                            type: "standard",
                            xDimensions: 'Year',
                            yDimensions: null,
                            valueDimensions: 'Value',
                            seriesDimensions: ['QualifierEconomicSector']
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
                                                "codes": ["01040102"

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


        },


        "energy": {
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


        },




        "gdp": {
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
                        creator: {



                        },
                        plotOptions: {
                            line:{
                                dataLabels:{
        enabled: true
    },
      enableMouseTracking: false
                            }


                        }
                    },

                    filter: [ {
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
                        creator: {

                        }
                    },

                    filter: [ {
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


        },


        "monetary_statistics": {
            //data cube's uid
            uid: "UNECA_MonetaryStatistics1",

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
                    id: 'monetary-1',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#monetary-1",
                    config: {
                        container: "#monetary-1",
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
                                                    "020905"
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
                    id: 'monetary-2',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#monetary-2",
                    config: {
                        container: "#monetary-2",
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
                                                    "02090501", "02090502"
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
                    id: 'monetary-3',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#monetary-3",
                    config: {
                        container: "#monetary-3",
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
                                                    "020904"
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
                    id: 'monetary-4',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#monetary-4",
                    config: {
                        container: "#monetary-4",
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
                                                    "020906"
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
                    id: 'monetary-5',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#monetary-5",
                    config: {
                        container: "#monetary-5",
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
                                                    "020901"
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
                    id: 'monetary-6',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#monetary-6",
                    config: {
                        container: "#monetary-6",
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
                                                    "020903", "02090301"
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


        },
        "public_finance": {
            //data cube's uid
            uid: "UNECA_PublicFinance1",

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
                    id: 'finance-1',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#finance-1",
                    config: {
                        container: "#finance-1",
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
                                                    "021201"
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
                    id: 'finance-2',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#finance-2",
                    config: {
                        container: "#finance-2",
                        adapter: {
                            type: "standard",
                            xDimensions: 'Year',
                            yDimensions: "Currency",
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
                                                    "021202", "02120101", "02120102"
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
                    id: 'finance-3',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#finance-3",
                    config: {
                        container: "#finance-3",
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
                                                    "021203"
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
                    id: 'finance-4',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#finance-4",
                    config: {
                        container: "#finance-4",
                        adapter: {
                            type: "standard",
                            xDimensions: 'Year',
                            yDimensions: "Currency",
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
                                                    "02120301", "02120302"
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
                    id: 'finance-5',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#finance-5",
                    config: {
                        container: "#finance-5",
                        adapter: {
                            type: "standard",
                            xDimensions: 'Year',
                            yDimensions: "Currency",
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
                                                    "02120301", "0212030101"
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
                    id: 'finance-6',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#finance-6",
                    config: {
                        container: "#finance-6",
                        adapter: {
                            type: "standard",
                            xDimensions: 'Year',
                            yDimensions: "Currency",
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
                                                    "021204"
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


        },


        "debt": {
            //data cube's uid
            uid: "UNECA_Debt",

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
                    id: 'debt-1',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#debt-1",
                    config: {
                        container: "#debt-1",
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
                                                    "020308"
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
                    id: 'debt-2',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#debt-2",
                    config: {
                        container: "#debt-2",
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
                                                    "020305"
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
                    id: 'debt-3',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#debt-3",
                    config: {
                        container: "#debt-3",
                        adapter: {
                            type: "standard",
                            xDimensions: 'Year',
                            yDimensions: "UMcurrency",
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
                                                    "02030501", "02030502"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                },

            ]


        },


        "infrastructure": {
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


        },


        "tourism": {
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


        },

        "inflation": {


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
                                                    "02110103","02110103","02110109","02110113","02110110","02110104","02110101","02110105","02110106","02110102","02110108","02110112","021101","02110107"
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


        },


        "financial_flows": {


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
                                    {"value":"020501","label":"Net Foreign Direct Investment Inflows","selected":false},
                                    {"value":"021001","label":"Net Total Official Development assistance","selected":false},
                                    {"value":"02100101","label":"Official Development assistance","selected":true},
                                    {"value":"020502","label":"Origin of FDI Inflows","selected":false},
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
                    class: "fx-map-chart",
                    //needed if layout = injected
                    container: "#financial_flows-3",
                    config: {
                        container: "#financial_flows-3",
                        geoSubject : 'PartnerCode',
                        leaflet: {
                            zoomControl: false,
                            attributionControl: true,
                            scrollWheelZoom: false,
                            minZoom: 2
                        }
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: [],
                    forbiddenValues: {
                        year: {time: [{from: 2013, to: 2013}]},
                        domain: {removeFilter: true}
                    },
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "Year": {
                                        "time": [
                                            {
                                                "from": 2012,
                                                "to": 2012
                                            }
                                        ]
                                    },



                                    "IndicatorCode": {
                                        "codes": [
                                            {
                                                "uid": "UNECA_ClassificationOfActivities",
                                                "codes": [
                                                    "02100101"
                                                ]
                                            }
                                        ]
                                    },



                                 "PartnerCode": {
                                    "codes": [
                                        {
                                            "uid": "UNECA_Partner",
                                            "codes": [
                                                "DEU","FRA","AUT","CAN","USA","NLD","GBR","ITA","ESP","JPN","LUX","DNK","KOR","NOR","TUR","SVN","IRL","POL","CHL","SWE","CZE","HUN","PRT","ARE","BEL","CHE","AUS","SVK","POL","GRC"
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
                    id: 'financial_flows-4',
                    type: 'table',
                    class: "fx-map-chart",
                    //needed if layout = injected
                    container: "#financial_flows-4",
                    config: {
                        container: "#financial_flows-4",
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
                                                    "020501"
                                                ]
                                            }
                                        ]
                                    }
                                },
                                "columns": ["IndicatorCode", "CountryCode", "Year","PartnerCode","Value","um"]


                            }
                        }
                    ]
                },


                {
                    id: 'financial_flows-5',
                    type: 'map',
                    class: "fx-map-chart",
                    //needed if layout = injected
                    container: "#financial_flows-5",
                    config: {
                        container: "#financial_flows-5",
                        geoSubject : 'PartnerCode',
                        leaflet: {
                            zoomControl: false,
                            attributionControl: true,
                            scrollWheelZoom: false,
                            minZoom: 2
                        }
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: [],
                    forbiddenValues: {
                        year: {time: [{from: 2013, to: 2013}]},
                        domain: {removeFilter: true}
                    },
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "Year": {
                                        "time": [
                                            {
                                                "from": 2012,
                                                "to": 2012
                                            }
                                        ]
                                    },



                                    "IndicatorCode": {
                                        "codes": [
                                            {
                                                "uid": "UNECA_ClassificationOfActivities",
                                                "codes": [
                                                    "020502"
                                                ]
                                            }
                                        ]
                                    },



                                    "PartnerCode": {
                                        "codes": [
                                            {
                                                "uid": "UNECA_Partner",
                                                "codes": [
                                                    "DEU","FRA","AUT","CAN","USA","NLD","GBR","ITA","ESP","JPN","LUX","DNK","KOR","NOR","TUR","SVN","IRL","POL","CHL","SWE","CZE","HUN","PRT","ARE","BEL","CHE","AUS","SVK","POL","GRC"
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
                    id: 'financial_flows-6',
                    type: 'table',
                    class: "fx-map-chart",
                    //needed if layout = injected
                    container: "#financial_flows-6",
                    config: {
                        container: "#financial_flows-6",
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
                                                    "020502"
                                                ]
                                            }
                                        ]
                                    }
                                },
                                "columns": ["IndicatorCode", "CountryCode", "Year","PartnerCode","Value","um"]


                            }
                        }
                    ]
                }


            ]


        },


        "balance_of_payments": {





            //data cube's uid
            uid: "UNECA_BalanceOfPayements",

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
                    id: 'balanceOfPayments-1',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#balanceOfPayments-1",
                    config: {
                        container: "#balanceOfPayments-1",
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
                                                  '020204'
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
                    id: 'balanceOfPayments-2',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#balanceOfPayments-2",
                    config: {
                        container: "#balanceOfPayments-2",
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
                                                    '020205'
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
                                                    '02020501','02020502'
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

            ]


        }




    }



});