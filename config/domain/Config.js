/*global define*/

define(function () {

    'use strict';

    return {


            population: {
                //data cube's uid


                /*
                 * in case bridge is WDS this is the cube metadata.
                 * if bridge is D3P this is ignored
                 * */
                metadata: {},


                filter: [
                    {
                        "type": "distinct",
                        "uid": "UNECA_Population",
                        "column": "CountryCode",
                        "containerType": "baseContainer",
                        "title": "CountryCode",
                        "defaultCodes": ["MWI"],
                        "components": [
                            {
                                "type": "codelist",
                                "componentType": "dropDownList-FENIX",
                                "lang": "EN",
                                "uid": "ISO3",
                                "title": {"EN": "Distinct"},
                                // name is the ID output in the filter getValues()
                                "name": "CountryCode",
                                "config": {
                                    "defaultsource": []
                                }

                            }
                        ]
                    },


                    {
                        "type": "static",
                        "containerType": "baseContainer",
                        "title": "Year",
                        "components": [
                            {
                                "type": "time",
                                "componentType": "dropDownList-FENIX",
                                "lang": "EN",
                                "title": {"EN": "Year"},
                                "name": "year",
                                config: {
                                    "defaultsource": [
                                        {"value": "2015", "label": "2015", "selected": true},
                                        {"value": "2010", "label": "2010", "selected": false},
                                        {"value": "2005", "label": "2005", "selected": false},
                                        {"value": "2000", "label": "2000", "selected": false},
                                        {"value": "1990", "label": "1990", "selected": false}
                                    ]
                                }
                            }
                        ]
                    }

















                    //{
                    //    "type": "codelist",
                    //    "containerType": "baseContainer",
                    //    "title": "Domains",
                    //    "components": [
                    //        {
                    //            "uid": "FLUDE_DOMAINS",
                    //            "type": "codelist",
                    //            "name": "domain",
                    //            "componentType": "dropDownList-FENIX",
                    //            "lang": "EN",
                    //            "title": {"EN": "Codelist"},
                    //
                    //            config: {
                    //                "defaultsource": [
                    //                    //{"value": null, "label": "All", "selected": true},
                    //                    //{"value": null, "label": "All", "selected": true, "removeFilter": true},
                    //                ],
                    //                "enableMultiselection": true
                    //            }
                    //        }
                    //    ]
                    //},
                    //{
                    //    "type": "codelist",
                    //    "containerType": "baseContainer",
                    //    "title": "Incomes",
                    //    "components": [
                    //        {
                    //            "uid": "FLUDE_INCOMES",
                    //            "type": "codelist",
                    //            "componentType": "dropDownList-FENIX",
                    //            "lang": "EN",
                    //            "title": {"EN": "Codelist"},
                    //            "name": "incomes",
                    //            config: {
                    //                "defaultsource": [
                    //                    //{"value": null, "label": "All", "selected": true},
                    //                ],
                    //                "enableMultiselection": true
                    //            }
                    //        }
                    //    ]
                    //},
                    //{
                    //    "type": "codelist",
                    //    "containerType": "baseContainer",
                    //    "title": "Subregions",
                    //    "components": [
                    //        {
                    //            "uid": "FLUDE_SUBREGIONS",
                    //            "type": "codelist",
                    //            "componentType": "dropDownList-FENIX",
                    //            "lang": "EN",
                    //            "title": {"EN": "Codelist"},
                    //            "name": "subregion",
                    //            config: {
                    //                "defaultsource": [
                    //                    //{"value": null, "label": "All", "selected": true},
                    //                ],
                    //                "enableMultiselection": true
                    //            }
                    //        }
                    //    ]
                    //}
                ],






                dashboard: {


                    uid: "UNECA_Population",

                    //bridge configuration
                    bridge: {

                        type: "d3p"

                    },
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
                                            "CountryCode": {
                                                "codes": [
                                                    {
                                                        "uid": "ISO3",
                                                        "codes": [
                                                            "MWI"
                                                        ]
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
                            type: 'chart',
                            class: "fx-map-chart",
                            //needed if layout = injected
                            container: "#population-2",
                            config: {
                                container: "#population-2",
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
                                                            "MWI"
                                                        ]
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


                        //Mid-year population by age group

                        /*
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
                         seriesDimensions: ['CountryCode']
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
                         stacking: 'normal'
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
                         "CountryCode": {
                         "codes": [
                         {
                         "uid": "ISO3",
                         "codes": [
                         "ETH", "CMR"
                         ]
                         }
                         ]
                         },
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
                         */



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
                                                            "MWI"
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
                                            }
                                        },
                                        "columns": ["IndicatorCode", "CountryCode", "Year", "GenderCode", "AgeRangeCode", "Value"]


                                    }
                                }
                            ]
                        },


                        //Population Pyramid


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
                            type: 'chart',
                            class: "fx-map-chart",
                            //needed if layout = injected
                            container: "#population-7",
                            config: {
                                container: "#population-7",
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
                                                            "MWI"
                                                        ]
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






            }

    }

});