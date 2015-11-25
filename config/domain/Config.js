/*global define*/

define(function () {

    'use strict';

    return {

        population: {
            dashboard: {
                //data cube's uid
                uid: "Uneca_PopulationNew",

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
                                xDimensions: 'CountryCode',
                                yDimensions: 'item',
                                valueDimensions: 'value',
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
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "ISO3",
                                                    "codes": [
                                                        "ETH", "ZMB", "TZA", "CMR", "MLI", "SOM", "ZAF"
                                                    ]
                                                }
                                            ]
                                        },

                                        "Year": {
                                            "time": [
                                                {
                                                    "from": 2011,
                                                    "to": 2011
                                                }
                                            ]
                                        },

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

                    {
                        id: 'population-2',
                        type: 'map',
                        class: "fx-map-chart",
                        //needed if layout = injected
                        container: "#population-2",
                        config: {
                            container: "#population-2",
                            geoSubject: 'CountryCode',
                            leaflet: {
                                zoomControl: false,
                                attributionControl: true,
                                scrollWheelZoom: false,
                                minZoom: 3
                            }
                        },
                        // for now it takes the id, TODO: add uid as well
                        allowedFilter: [],
                        //forbiddenValues: {
                        //    year: {time: [{from: 2011, to: 2011}]},
                        //    domain: {removeFilter: true}
                        //},
                        filter: [
                            {
                                "name": "filter",
                                "parameters": {
                                    "rows": {
                                        "Year": {
                                            "time": [
                                                {
                                                    "from": 2011,
                                                    "to": 2011
                                                }
                                            ]
                                        },


                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "codes": [
                                                        "010103"
                                                    ]
                                                }
                                            ]
                                        },


                                        "GenderCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_Gender",
                                                    "codes": [
                                                        "3"
                                                    ]
                                                }
                                            ]
                                        },

                                        "AgeRangeCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_AgeRange",
                                                    "codes": [
                                                        "AGT"
                                                    ]
                                                }
                                            ]
                                        },


                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "ISO3",
                                                    "codes": [
                                                        "ETH", "ZMB", "TZA", "CMR", "MLI", "SOM", "ZAF"
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
                        id: 'population-3',
                        type: 'chart',
                        class: "fx-map-chart",
                        //needed if layout = injected
                        container: "#population-3",
                        config: {
                            container: "#population-3",
                            adapter: {
                                type: "standard",
                                xDimensions: 'time',
                                yDimensions: 'item',
                                valueDimensions: 'value',
                                seriesDimensions: ['CountryCode']
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
                        // for now it takes the id, TODO: add uid as well
                        allowedFilter: [],
                        filter: [
                            {
                                "name": "filter",
                                "parameters": {
                                    "rows": {
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "ISO3",
                                                    "codes": [
                                                        "ETH", "ZMB", "TZA", "CMR"
                                                    ]
                                                }
                                            ]
                                        },

                                        "Year": {
                                            "time": [
                                                {
                                                    "from": 2011,
                                                    "to": 2011
                                                }
                                            ]
                                        },

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





                    {
                        id: 'population-4',
                        type: 'chart',
                        chart :{
                            type: "bar"
                        },
                        class: "fx-map-chart",
                        //needed if layout = injected
                        container: "#population-4",
                        config: {
                            container: "#population-4",
                            adapter: {
                                type: "standard",
                                xDimensions:  'time',
                                yDimensions:'item',
                                valueDimensions: 'value',
                                seriesDimensions: ["CountryCode"]
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
                        // for now it takes the id, TODO: add uid as well
                        allowedFilter: [],
                        filter: [
                            {
                                "name": "filter",
                                "parameters": {
                                    "rows": {
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "ISO3",
                                                    "codes": [
                                                        "ETH", "ZMB", "TZA", "MLI", "SOM", "ZAF"
                                                    ]
                                                }
                                            ]
                                        },
                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "codes": [
                                                        "010108"
                                                    ]
                                                }
                                            ]
                                        },
                                        "Year": {
                                            "time": [
                                                {
                                                    "from": 2011,
                                                    "to": 2011
                                                }
                                            ]
                                        }

                                    },
                                    "columns": ["IndicatorCode", "CountryCode", "Year", "GenderCode", "AgeRangeCode", "Value"]


                                }
                            }
                        ]
                    },


                    {
                        id: 'population-5',
                        type: 'chart',
                        class: "fx-map-chart",
                        //needed if layout = injected
                        container: "#population-5",
                        config: {
                            container: "#population-5",
                            adapter: {
                                type: "standard",
                                xDimensions: 'CountryCode',
                                yDimensions: 'item',
                                valueDimensions: 'value',
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
                        // for now it takes the id, TODO: add uid as well
                        allowedFilter: [],
                        filter: [
                            {
                                "name": "filter",
                                "parameters": {
                                    "rows": {
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "ISO3",
                                                    "codes": [
                                                        "ETH", "ZMB", "TZA", "CMR", "MLI", "SOM", "ZAF"
                                                    ]
                                                }
                                            ]
                                        },
                                        "Year": {
                                            "time": [
                                                {
                                                    "from": 2010,
                                                    "to": 2010
                                                }
                                            ]
                                        },


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

            }
        },
        education: {
            dashboard: {
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
                        id: 'education-1',
                        type: 'map',
                        class: "fx-map-chart",
                        //needed if layout = injected
                        container: "#education-1",
                        config: {
                            container: "#education-1",
                            geoSubject: 'CountryCode',
                            leaflet: {
                                zoomControl: false,
                                attributionControl: true,
                                scrollWheelZoom: false,
                                minZoom: 3
                            }
                        },
                        // for now it takes the id, TODO: add uid as well
                        allowedFilter: [],
                        //forbiddenValues: {
                        //    year: {time: [{from: 2011, to: 2011}]},
                        //    domain: {removeFilter: true}
                        //},
                        filter: [
                            {
                                "name": "filter",
                                "parameters": {
                                    "rows": {
                                        "Year": {
                                            "time": [
                                                {
                                                    "from": 2010,
                                                    "to": 2010
                                                }
                                            ]
                                        },


                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "codes": [
                                                        "010204"
                                                    ]
                                                }
                                            ]
                                        },


                                        "GenderCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_Gender",
                                                    "codes": [
                                                        "3"
                                                    ]
                                                }
                                            ]
                                        },


                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "ISO3",
                                                    "codes": [
                                                        "ETH", "ZMB", "TZA", "CMR", "MLI", "SOM", "ZAF"
                                                    ]
                                                }
                                            ]
                                        }



                                    }
                                }
                            }
                        ]
                    },

                    //{
                    //    id: 'education-2',
                    //    type: 'table',
                    //    class: "fx-map-chart",
                    //    //needed if layout = injected
                    //    container: "#education-2",
                    //    config: {
                    //        container: "#education-2",
                    //        leaflet: {
                    //            zoomControl: false,
                    //            attributionControl: true,
                    //            scrollWheelZoom: false,
                    //            minZoom: 2
                    //        },
                    //
                    //        options: {
                    //            hidden_columns: ["GenderCode"
                    //            ]
                    //
                    //
                    //        }
                    //    },
                    //
                    //
                    //    // for now it takes the id, TODO: add uid as well
                    //    allowedFilter: [],
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
                    //                                    "010204"
                    //                                ]
                    //                            }
                    //                        ]
                    //                    },
                    //
                    //
                    //                    "GenderCode": {
                    //                        "codes": [
                    //                            {
                    //                                "uid": "UNECA_Gender",
                    //                                "codes": [
                    //                                    "3"
                    //                                ]
                    //                            }
                    //                        ]
                    //                    },
                    //
                    //
                    //                    "CountryCode": {
                    //                        "codes": [
                    //                            {
                    //                                "uid": "ISO3",
                    //                                "codes": [
                    //                                    "ETH", "ZMB", "TZA", "CMR", "MLI", "SOM", "ZAF"
                    //                                ]
                    //                            }
                    //                        ]
                    //                    }
                    //                },
                    //                "columns": ["IndicatorCode","GenderCode", "CountryCode", "Year","Value"]
                    //
                    //
                    //            }
                    //        }
                    //    ]
                    //},

                    {
                        id: 'education-3',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#education-3",
                        config: {
                            container: "#education-3",
                            adapter: {
                                type: "standard",
                                xDimensions: 'CountryCode',
                                yDimensions: "um",
                                valueDimensions: 'Value',
                                seriesDimensions: ['GenderCode']
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
                                                        "01020401"
                                                    ]
                                                }
                                            ]
                                        },

                                        "GenderCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_Gender",
                                                    "codes": [
                                                        "1", "2"
                                                    ]
                                                }
                                            ]
                                        },
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "ISO3",
                                                    "codes": [
                                                        "ETH", "ZMB", "TZA", "CMR", "MLI", "SOM", "ZAF"
                                                    ]
                                                }
                                            ]
                                        },
                                        "Year": {
                                            "time": [
                                                {
                                                    "from": 2010,
                                                    "to": 2010
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        ]
                    },


                    {
                        id: 'education-4',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#education-4",
                        config: {
                            container: "#education-4",
                            adapter: {
                                type: "standard",
                                xDimensions: 'CountryCode',
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
                                                        "010201", "010202", "010203"
                                                    ]
                                                }
                                            ]
                                        },
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "ISO3",
                                                    "codes": [
                                                        "ETH", "ZMB", "TZA", "CMR", "MLI", "SOM", "ZAF"
                                                    ]
                                                }
                                            ]
                                        },
                                        "Year": {
                                            "time": [
                                                {
                                                    "from": 2010,
                                                    "to": 2010
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






        health: {
            dashboard: {
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
                                xDimensions: 'CountryCode',
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
                                    //plotOptions: {
                                    //    column: {
                                    //
                                    //        stacking: "normal"
                                    //    }
                                    //
                                    //}
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
                                        },


                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "ISO3",
                                                    "codes": [
                                                        "ETH", "ZMB", "TZA", "CMR", "MLI", "SOM", "ZAF"
                                                    ]
                                                }
                                            ]
                                        },
                                        "Year": {
                                            "time": [
                                                {
                                                    "from": 2010,
                                                    "to": 2010
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
                        type: 'map',
                        class: "fx-map-chart",
                        //needed if layout = injected
                        container: "#health-2",
                        config: {
                            container: "#health-2",
                            geoSubject: 'CountryCode',
                            leaflet: {
                                zoomControl: false,
                                attributionControl: true,
                                scrollWheelZoom: false,
                                minZoom: 3
                            }
                        },
                        // for now it takes the id, TODO: add uid as well
                        allowedFilter: [],
                        //forbiddenValues: {
                        //    year: {time: [{from: 2011, to: 2011}]},
                        //    domain: {removeFilter: true}
                        //},
                        filter: [
                            {
                                "name": "filter",
                                "parameters": {
                                    "rows": {
                                        "Year": {
                                            "time": [
                                                {
                                                    "from": 2010,
                                                    "to": 2010
                                                }
                                            ]
                                        },


                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "codes": [
                                                        "010302"
                                                    ]
                                                }
                                            ]
                                        },




                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "ISO3",
                                                    "codes": [
                                                        "ETH", "ZMB", "TZA", "CMR", "MLI", "SOM", "ZAF"
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
                        type: 'map',
                        class: "fx-map-chart",
                        //needed if layout = injected
                        container: "#health-3",
                        config: {
                            container: "#health-3",
                            geoSubject: 'CountryCode',
                            leaflet: {
                                zoomControl: false,
                                attributionControl: true,
                                scrollWheelZoom: false,
                                minZoom: 3
                            }
                        },
                        // for now it takes the id, TODO: add uid as well
                        allowedFilter: [],
                        //forbiddenValues: {
                        //    year: {time: [{from: 2011, to: 2011}]},
                        //    domain: {removeFilter: true}
                        //},
                        filter: [
                            {
                                "name": "filter",
                                "parameters": {
                                    "rows": {
                                        "Year": {
                                            "time": [
                                                {
                                                    "from": 2011,
                                                    "to": 2011
                                                }
                                            ]
                                        },


                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "codes": [
                                                        "010301"
                                                    ]
                                                }
                                            ]
                                        },





                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "ISO3",
                                                    "codes": [
                                                        "ETH", "ZMB", "TZA", "CMR", "MLI", "SOM", "ZAF"
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



        gdp: {
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
                        type: 'map',
                        class: "fx-map-chart",
                        //needed if layout = injected
                        container: "#gdp-1",
                        config: {
                            container: "#gdp-1",
                            geoSubject: 'CountryCode',
                            leaflet: {
                                zoomControl: false,
                                attributionControl: true,
                                scrollWheelZoom: false,
                                minZoom: 3
                            }
                        },
                        // for now it takes the id, TODO: add uid as well
                        allowedFilter: [],
                        //forbiddenValues: {
                        //    year: {time: [{from: 2011, to: 2011}]},
                        //    domain: {removeFilter: true}
                        //},
                        filter: [
                            {
                                "name": "filter",
                                "parameters": {
                                    "rows": {
                                        "Year": {
                                            "time": [
                                                {
                                                    "from": 2010,
                                                    "to": 2010
                                                }
                                            ]
                                        },


                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "codes": [
                                                        "0207801"
                                                    ]
                                                }
                                            ]
                                        },




                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "ISO3",
                                                    "codes": [
                                                        "ETH", "ZMB", "TZA", "CMR", "MLI", "SOM", "ZAF"
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
                        id: 'gdp-2',
                        type: 'chart',
                        class: "fx-timeseries-ecample",
                        //needed if layout = injected
                        container: "#gdp-2",
                        config: {
                            container: "#gdp-2",
                            adapter: {
                                type: "standard",
                                xDimensions: "Year",
                                yDimensions: 'IndicatorCode',
                                valueDimensions: 'Value',
                                seriesDimensions: ['CountryCode']
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
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "ISO3",
                                                    "codes": [
                                                        "ETH", "ZMB", "TZA", "CMR", "MLI", "SOM", "ZAF"
                                                    ]
                                                }
                                            ]
                                        },


                                        //"Year": {
                                        //    "time": [
                                        //        {
                                        //            "from": 2010,
                                        //            "to": 2010
                                        //        }
                                        //    ]
                                        //},


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
                        id: 'gdp-3',
                        type: 'map',
                        class: "fx-map-chart",
                        //needed if layout = injected
                        container: "#gdp-3",
                        config: {
                            container: "#gdp-3",
                            geoSubject: 'CountryCode',
                            leaflet: {
                                zoomControl: false,
                                attributionControl: true,
                                scrollWheelZoom: false,
                                minZoom: 3
                            }
                        },
                        // for now it takes the id, TODO: add uid as well
                        allowedFilter: [],
                        //forbiddenValues: {
                        //    year: {time: [{from: 2011, to: 2011}]},
                        //    domain: {removeFilter: true}
                        //},
                        filter: [
                            {
                                "name": "filter",
                                "parameters": {
                                    "rows": {
                                        "Year": {
                                            "time": [
                                                {
                                                    "from": 2010,
                                                    "to": 2010
                                                }
                                            ]
                                        },


                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "codes": [
                                                        "0207802"
                                                    ]
                                                }
                                            ]
                                        },





                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "ISO3",
                                                    "codes": [
                                                        "ETH", "ZMB", "TZA", "CMR", "MLI", "SOM", "ZAF"
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

            }
});