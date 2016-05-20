/*global define*/

define(function () {

    'use strict';

    return {

        population: {

            filter:{

                CountryCode :{
                    selector: {
                        id : "tree"
                    },

                    cl: {
                        uid: "UNECA_ISO3",


                    }


                }
            },

            dashboard: [{
                //data cube's uid
                uid: "Uneca_Population",


                items: [

                    /* Mid-year population
                     */



                    {
                        id: "population-1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            container: "#population-1",
                            geoSubject: 'CountryCode',
                            leaflet: {
                                zoomControl: false,
                                attributionControl: true,
                                scrollWheelZoom: false,
                                minZoom: 3
                            }
                        }, // :type-creator config



                        filter: { //FX-filter format

                            IndicatorCode: ["010103"],
                            GenderCode: ["3"],

                            AgeRangeCode: ["AGT"],
                            CountryCode:[  "GHA", "NGA", "MLI"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },































                    //{
                    //    //Time series
                    //    id: 'population-1',
                    //
                    //    type: 'chart',
                    //
                    //    class: "fx-timeseries-ecample",
                    //
                    //    //needed if layout = injected
                    //    container: "#population-1",
                    //
                    //    config: {
                    //        container: "#population-1",
                    //        adapter: {
                    //            type: "standard",
                    //            xDimensions: 'CountryCode',
                    //            yDimensions: 'item',
                    //            valueDimensions: 'value',
                    //            seriesDimensions: ["IndicatorCode"]
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
                    //    allowedFilter: ['CountryCode', 'Year'],
                    //
                    //    filter: [
                    //        {
                    //            "name": "filter",
                    //            "parameters": {
                    //                "rows": {
                    //                    "CountryCode": {
                    //                        "codes": [
                    //                            {
                    //                                "uid": "ISO3",
                    //                                "codes": [
                    //                                    "GHA", "NGA", "MLI"
                    //                                ]
                    //                            }
                    //                        ]
                    //                    },
                    //
                    //                    "Year": {
                    //                        "time": [
                    //                            {
                    //                                "from": 2011,
                    //                                "to": 2011
                    //                            }
                    //                        ]
                    //                    },
                    //
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

                    //{
                    //    id: 'population-2',
                    //    type: 'map',
                    //    class: "fx-map-chart",
                    //    //needed if layout = injected
                    //    container: "#population-2",
                    //    config: {
                    //        container: "#population-2",
                    //        geoSubject: 'CountryCode',
                    //        leaflet: {
                    //            zoomControl: false,
                    //            attributionControl: true,
                    //            scrollWheelZoom: false,
                    //            minZoom: 3
                    //        }
                    //    },
                    //    // for now it takes the id, TODO: add uid as well
                    //    allowedFilter: ['CountryCode', 'Year'],
                    //    //forbiddenValues: {
                    //    //    year: {time: [{from: 2011, to: 2011}]},
                    //    //    domain: {removeFilter: true}
                    //    //},
                    //
                    //
                    //    filter: [
                    //        {
                    //            "name": "filter",
                    //            "parameters": {
                    //                "rows": {
                    //                    "Year": {
                    //                        "time": [
                    //                            {
                    //                                "from": 2011,
                    //                                "to": 2011
                    //                            }
                    //                        ]
                    //                    },
                    //
                    //
                    //                    "IndicatorCode": {
                    //                        "codes": [
                    //                            {
                    //                                "uid": "UNECA_ClassificationOfActivities",
                    //                                "codes": [
                    //                                    "010103"
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
                    //                    "AgeRangeCode": {
                    //                        "codes": [
                    //                            {
                    //                                "uid": "UNECA_AgeRange",
                    //                                "codes": [
                    //                                    "AGT"
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
                    //                                    "GHA", "NGA", "MLI"
                    //                                ]
                    //                            }
                    //                        ]
                    //                    }
                    //
                    //
                    //                }
                    //            }
                    //        }
                    //    ]
                    //},

                    //
                    //{
                    //    id: 'population-3',
                    //    type: 'chart',
                    //    class: "fx-map-chart",
                    //    //needed if layout = injected
                    //    container: "#population-3",
                    //    config: {
                    //        container: "#population-3",
                    //        adapter: {
                    //            type: "standard",
                    //            xDimensions: 'time',
                    //            yDimensions: 'item',
                    //            valueDimensions: 'value',
                    //            seriesDimensions: ['CountryCode']
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
                    //    // for now it takes the id, TODO: add uid as well
                    //    allowedFilter: ['CountryCode', 'Year'],
                    //    filter: [
                    //        {
                    //            "name": "filter",
                    //            "parameters": {
                    //                "rows": {
                    //                    "CountryCode": {
                    //                        "codes": [
                    //                            {
                    //                                "uid": "ISO3",
                    //                                "codes": [
                    //                                    "ETH", "ZMB", "TZA", "CMR"
                    //                                ]
                    //                            }
                    //                        ]
                    //                    },
                    //
                    //                    "Year": {
                    //                        "time": [
                    //                            {
                    //                                "from": 2011,
                    //                                "to": 2011
                    //                            }
                    //                        ]
                    //                    },
                    //
                    //                    "IndicatorCode": {
                    //                        "codes": [
                    //                            {
                    //                                "uid": "UNECA_ClassificationOfActivities",
                    //                                "codes": [
                    //                                    "010103"
                    //                                ]
                    //                            }
                    //                        ]
                    //                    }
                    //                },
                    //                "columns": ["IndicatorCode", "CountryCode", "Year", "GenderCode", "AgeRangeCode", "Value"]
                    //
                    //
                    //            }
                    //        }
                    //    ]
                    //},


                    //{
                    //    id: 'population-4',
                    //    type: 'chart',
                    //    chart: {
                    //        type: "bar"
                    //    },
                    //    class: "fx-map-chart",
                    //    //needed if layout = injected
                    //    container: "#population-4",
                    //    config: {
                    //        container: "#population-4",
                    //        adapter: {
                    //            type: "standard",
                    //            xDimensions: 'time',
                    //            yDimensions: 'item',
                    //            valueDimensions: 'value',
                    //            seriesDimensions: ["CountryCode"]
                    //        },
                    //        template: {
                    //            //"title": "Top 25..."
                    //        },
                    //
                    //        creator: {
                    //            chartObj: {
                    //                chart: {
                    //                    type: "column"
                    //                }
                    //            }
                    //        }
                    //
                    //
                    //    },
                    //    // for now it takes the id, TODO: add uid as well
                    //    allowedFilter: ['CountryCode', 'Year'],
                    //    filter: [
                    //        {
                    //            "name": "filter",
                    //            "parameters": {
                    //                "rows": {
                    //                    "CountryCode": {
                    //                        "codes": [
                    //                            {
                    //                                "uid": "ISO3",
                    //                                "codes": [
                    //                                    "GHA", "NGA", "MLI"
                    //                                ]
                    //                            }
                    //                        ]
                    //                    },
                    //                    "IndicatorCode": {
                    //                        "codes": [
                    //                            {
                    //                                "uid": "UNECA_ClassificationOfActivities",
                    //                                "codes": [
                    //                                    "010108"
                    //                                ]
                    //                            }
                    //                        ]
                    //                    },
                    //                    "Year": {
                    //                        "time": [
                    //                            {
                    //                                "from": 2011,
                    //                                "to": 2011
                    //                            }
                    //                        ]
                    //                    }
                    //
                    //                },
                    //                "columns": ["IndicatorCode", "CountryCode", "Year", "GenderCode", "AgeRangeCode", "Value"]
                    //
                    //
                    //            }
                    //        }
                    //    ]
                    //},


                    //{
                    //    id: 'population-5',
                    //    type: 'chart',
                    //    class: "fx-map-chart",
                    //    //needed if layout = injected
                    //    container: "#population-5",
                    //    config: {
                    //        container: "#population-5",
                    //        adapter: {
                    //            type: "standard",
                    //            xDimensions: 'CountryCode',
                    //            yDimensions: 'item',
                    //            valueDimensions: 'value',
                    //            seriesDimensions: ["IndicatorCode"]
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
                    //    // for now it takes the id, TODO: add uid as well
                    //    allowedFilter: ['CountryCode', 'Year'],
                    //    filter: [
                    //        {
                    //            "name": "filter",
                    //            "parameters": {
                    //                "rows": {
                    //                    "CountryCode": {
                    //                        "codes": [
                    //                            {
                    //                                "uid": "ISO3",
                    //                                "codes": [
                    //                                    "GHA", "NGA", "MLI"
                    //                                ]
                    //                            }
                    //                        ]
                    //                    },
                    //                    "Year": {
                    //                        "time": [
                    //                            {
                    //                                "from": 2010,
                    //                                "to": 2010
                    //                            }
                    //                        ]
                    //                    },
                    //
                    //
                    //                    "IndicatorCode": {
                    //                        "codes": [
                    //                            {
                    //                                "uid": "UNECA_ClassificationOfActivities",
                    //                                "codes": [
                    //                                    "010102"
                    //                                ]
                    //                            }
                    //                        ]
                    //                    }
                    //                },
                    //                "columns": ["IndicatorCode", "CountryCode", "Year", "GenderCode", "AgeRangeCode", "Value"]
                    //
                    //
                    //            }
                    //        }
                    //    ]
                    //}


                ]

            }]
        }



    }
});