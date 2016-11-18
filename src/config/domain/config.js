/*global define*/

define(function () {

    'use strict';

    return {

        "resume": {},

        "population": {

            filter: {

                CountryCode: {

                    className: 'col-md-6',

                    selector: {
                        id: "tree",
                        default: ["DZA"]
                    },

                    cl: {
                        uid: "ISO3"
                    },
                    template: {
                        hideHeader : true
                    }
                },

                Year: {

                    className: 'col-md-6',

                    selector: {
                        id: "tree",
                        source: [

                            {"value": "2013", "label": "2013", "selected": false},
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
                    },

                    template: {
                        hideHeader : true
                    }
                }

            },

            dashboard: {

                uid: "Uneca_PopulationNew",
                //version: "",
                //preProcess : {} //D3P process
                //postProcess : {} //D3P process
                //filter : {} //FX-filter format
                items: [
                   {
                       //Mid-year Population 010101
                        id: "population1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["CountryCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"},
                            config: {
                                tooltip: {
                                    pointFormat: '<br/><span style="color:{point.color}">{series.name}</span>: <b>{point.y:,.0f}</b>'
                                }
                            }
                        }, // :type-creator config

                        filterFor: {
                            "filter_population": ['CountryCode', 'Year']
                        },

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "Uneca_PopulationNew"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "IndicatorCode",
                                        "CountryCode",
                                        "GenderCode",
                                        "AgeRangeCode",
                                        "Year",
                                        "Value"
                                    ],
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
                                        },
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "ISO3",
                                                    "codes": [
                                                        "DZA"
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
                                        }
                                    }
                                },
                                "rid":{"uid":"filter_population"}
                            }
                        ]
                    },
                    {
                        //Average annual growth rate 010103
                        id: "population2", //ref [data-item=':id'] // 010103  Average annual growth rate
                        type: "map", //chart || map || olap,
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
                                        url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                                        subdomains: 'abcd',
                                        maxZoom: 19
                                    }
                                },
                                zoomToCountry : ["DZA"],
                                highlightCountry : ["DZA"]
                            }
                        },
                        filterFor: {
                            "filtered_ds": ['CountryCode']
                        },
                        postProcess:[
                            {
                                "name": "join",
                                "sid": [
                                    {
                                        "uid": "filtered_ds"
                                    },
                                    {
                                        "uid": "last_year_country"
                                    }
                                ],
                                "parameters": {
                                    "joins": [
                                        [
                                            {
                                                "type": "id",
                                                "value": "CountryCode"
                                            },
                                            {
                                                "type": "id",
                                                "value": "Year"
                                            }

                                        ],
                                        [
                                            {
                                                "type": "id",
                                                "value": "CountryCode"
                                            },
                                            {
                                                "type": "id",
                                                "value": "Year"
                                            }

                                        ]
                                    ],
                                    "values": [
                                    ]
                                },
                                "rid": {
                                    "uid": "filtered_join"
                                }
                            },

                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "Uneca_PopulationNew"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "CountryCode",
                                        "Year",
                                        "Value"
                                    ],
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
                                        },
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "ISO3",
                                                    "codes": [
                                                        "DZA"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                },
                                "rid": {
                                    "uid": "filtered_ds"
                                }
                            },

                            {
                                "name": "group",
                                "sid": [
                                    {
                                        "uid": "filtered_ds"
                                    }
                                ],
                                "parameters": {
                                    "by": [                   //
                                        "CountryCode"
                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "Year"
                                            ],
                                            "rule": "max"
                                        }
                                    ]
                                },
                                "rid": {
                                    "uid": "last_year_country"
                                }
                            },
                            {
                                "name": "group",
                                "sid": [
                                    {
                                        "uid": "filtered_join"
                                    }
                                ],
                                "parameters": {
                                    "by": [
                                        "CountryCode"
                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "filtered_ds_Value"
                                            ],
                                            "rule": "max"
                                        }
                                    ]
                                }
                            }

                        ]
                    },
                    {
                        //Crude birth rate per 1,000 population 010104
                        id: "population3", //ref [data-item=':id'] // 010104  Crude birth rate per 1,000 population
                        type: "map", //chart || map || olap,
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
                                        url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                                        subdomains: 'abcd',
                                        maxZoom: 19
                                    }
                                },
                                zoomToCountry : ["DZA"],
                                highlightCountry : ["DZA"]
                            }
                        },
                             filterFor: {
                                 "filtered_ds": ['CountryCode']
                             },
                             postProcess:[
                                 {
                                     "name": "join",
                                     "sid": [
                                         {
                                             "uid": "filtered_ds"
                                         },
                                         {
                                             "uid": "last_year_country"
                                         }
                                     ],
                                     "parameters": {
                                         "joins": [
                                             [
                                                 {
                                                     "type": "id",
                                                     "value": "CountryCode"
                                                 },
                                                 {
                                                     "type": "id",
                                                     "value": "Year"
                                                 }

                                             ],
                                             [
                                                 {
                                                     "type": "id",
                                                     "value": "CountryCode"
                                                 },
                                                 {
                                                     "type": "id",
                                                     "value": "Year"
                                                 }

                                             ]
                                         ],
                                         "values": [
                                         ]
                                     },
                                     "rid": {
                                         "uid": "filtered_join"
                                     }
                                 },

                                 {
                                     "name": "filter",
                                     "sid": [
                                         {
                                             "uid": "Uneca_PopulationNew"
                                         }
                                     ],
                                     "parameters": {
                                         "columns": [
                                             "CountryCode",
                                             "Year",
                                             "Value"
                                         ],
                                         "rows": {

                                             "IndicatorCode": {
                                                 "codes": [
                                                     {
                                                         "uid": "UNECA_ClassificationOfActivities",
                                                         "codes": [
                                                             "010104"
                                                         ]
                                                     }
                                                 ]
                                             },
                                             "CountryCode": {
                                                 "codes": [
                                                     {
                                                         "uid": "ISO3",
                                                         "codes": [
                                                             "DZA"
                                                         ]
                                                     }
                                                 ]
                                             }
                                         }
                                     },
                                     "rid": {
                                         "uid": "filtered_ds"
                                     }
                                 },

                                 {
                                     "name": "group",
                                     "sid": [
                                         {
                                             "uid": "filtered_ds"
                                         }
                                     ],
                                     "parameters": {
                                         "by": [                   //
                                             "CountryCode"
                                         ],
                                         "aggregations": [
                                             {
                                                 "columns": [
                                                     "Year"
                                                 ],
                                                 "rule": "max"
                                             }
                                         ]
                                     },
                                     "rid": {
                                         "uid": "last_year_country"
                                     }
                                 },
                                 {
                                     "name": "group",
                                     "sid": [
                                         {
                                             "uid": "filtered_join"
                                         }
                                     ],
                                     "parameters": {
                                         "by": [
                                             "CountryCode"
                                         ],
                                         "aggregations": [
                                             {
                                                 "columns": [
                                                     "filtered_ds_Value"
                                                 ],
                                                 "rule": "max"
                                             }
                                         ]
                                     }
                                 }

                             ]
                    },
                    {
                        //Crude death rate per 1,000 population 010105
                        id: "population4", //ref [data-item=':id'] // 010103  Average annual growth rate
                        type: "map", //chart || map || olap,
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
                                        url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                                        subdomains: 'abcd',
                                        maxZoom: 19
                                    }
                                },
                                zoomToCountry : ["DZA"],
                                highlightCountry : ["DZA"]
                            }
                        },
                        filterFor: {
                            "filtered_ds": ['CountryCode']
                        },
                        postProcess: [
                            {
                                "name": "join",
                                "sid": [
                                    {
                                        "uid": "filtered_ds"
                                    },
                                    {
                                        "uid": "last_year_country"
                                    }
                                ],
                                "parameters": {
                                    "joins": [
                                        [
                                            {
                                                "type": "id",
                                                "value": "CountryCode"
                                            },
                                            {
                                                "type": "id",
                                                "value": "Year"
                                            }

                                        ],
                                        [
                                            {
                                                "type": "id",
                                                "value": "CountryCode"
                                            },
                                            {
                                                "type": "id",
                                                "value": "Year"
                                            }

                                        ]
                                    ],
                                    "values": []
                                },
                                "rid": {
                                    "uid": "filtered_join"
                                }
                            },

                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "Uneca_PopulationNew"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "CountryCode",
                                        "Year",
                                        "Value"
                                    ],
                                    "rows": {

                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "codes": [
                                                        "010105"
                                                    ]
                                                }
                                            ]
                                        },
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "ISO3",
                                                    "codes": [
                                                        "DZA"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                },
                                "rid": {
                                    "uid": "filtered_ds"
                                }
                            },

                            {
                                "name": "group",
                                "sid": [
                                    {
                                        "uid": "filtered_ds"
                                    }
                                ],
                                "parameters": {
                                    "by": [                   //
                                        "CountryCode"
                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "Year"
                                            ],
                                            "rule": "max"
                                        }
                                    ]
                                },
                                "rid": {
                                    "uid": "last_year_country"
                                }
                            },
                            {
                                "name": "group",
                                "sid": [
                                    {
                                        "uid": "filtered_join"
                                    }
                                ],
                                "parameters": {
                                    "by": [
                                        "CountryCode"
                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "filtered_ds_Value"
                                            ],
                                            "rule": "max"
                                        }
                                    ]
                                }
                            }

                        ]
                    },
                    {
                        //Total fertility 010106
                        id: "population5", //ref [data-item=':id'] // 010103  Average annual growth rate
                        type: "map", //chart || map || olap,
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
                                        url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                                        subdomains: 'abcd',
                                        maxZoom: 19
                                    }
                                },
                                zoomToCountry : ["DZA"],
                                highlightCountry : ["DZA"]
                            }
                        },
                              filterFor: {
                                  "filtered_ds": ['CountryCode']
                              },
                              postProcess:[
                                  {
                                      "name": "join",
                                      "sid": [
                                          {
                                              "uid": "filtered_ds"
                                          },
                                          {
                                              "uid": "last_year_country"
                                          }
                                      ],
                                      "parameters": {
                                          "joins": [
                                              [
                                                  {
                                                      "type": "id",
                                                      "value": "CountryCode"
                                                  },
                                                  {
                                                      "type": "id",
                                                      "value": "Year"
                                                  }

                                              ],
                                              [
                                                  {
                                                      "type": "id",
                                                      "value": "CountryCode"
                                                  },
                                                  {
                                                      "type": "id",
                                                      "value": "Year"
                                                  }

                                              ]
                                          ],
                                          "values": [
                                          ]
                                      },
                                      "rid": {
                                          "uid": "filtered_join"
                                      }
                                  },

                                  {
                                      "name": "filter",
                                      "sid": [
                                          {
                                              "uid": "Uneca_PopulationNew"
                                          }
                                      ],
                                      "parameters": {
                                          "columns": [
                                              "CountryCode",
                                              "Year",
                                              "Value"
                                          ],
                                          "rows": {

                                              "IndicatorCode": {
                                                  "codes": [
                                                      {
                                                          "uid": "UNECA_ClassificationOfActivities",
                                                          "codes": [
                                                              "010106"
                                                          ]
                                                      }
                                                  ]
                                              },
                                              "CountryCode": {
                                                  "codes": [
                                                      {
                                                          "uid": "ISO3",
                                                          "codes": [
                                                              "DZA"
                                                          ]
                                                      }
                                                  ]
                                              }
                                          }
                                      },
                                      "rid": {
                                          "uid": "filtered_ds"
                                      }
                                  },

                                  {
                                      "name": "group",
                                      "sid": [
                                          {
                                              "uid": "filtered_ds"
                                          }
                                      ],
                                      "parameters": {
                                          "by": [                   //
                                              "CountryCode"
                                          ],
                                          "aggregations": [
                                              {
                                                  "columns": [
                                                      "Year"
                                                  ],
                                                  "rule": "max"
                                              }
                                          ]
                                      },
                                      "rid": {
                                          "uid": "last_year_country"
                                      }
                                  },
                                  {
                                      "name": "group",
                                      "sid": [
                                          {
                                              "uid": "filtered_join"
                                          }
                                      ],
                                      "parameters": {
                                          "by": [
                                              "CountryCode"
                                          ],
                                          "aggregations": [
                                              {
                                                  "columns": [
                                                      "filtered_ds_Value"
                                                  ],
                                                  "rule": "max"
                                              }
                                          ]
                                      }
                                  }

                              ]
                     },


                    {
                        //Life expectancy (years) 010108
                        id: "population6", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            series: ["CountryCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config

                        filterFor: {
                            "filter_expectancy": ['CountryCode', 'Year']
                        },

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "Uneca_PopulationNew"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "IndicatorCode",
                                        "CountryCode",
                                        "GenderCode",
                                        "AgeRangeCode",
                                        "Year",
                                        "Value"
                                    ],
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
                                        },
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "ISO3",
                                                    "codes": [
                                                        "DZA"
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
                                        }
                                    }
                                },
                                "rid":{"uid":"filter_expectancy"}
                            }
                        ]
                    },

                    {
                        //Urbanization rate (per cent) 010102
                        id: "population7", //ref [data-item=':id']
                        type: "map", //chart || map || olap,
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
                                        url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                                        subdomains: 'abcd',
                                        maxZoom: 19
                                    }
                                },
                                zoomToCountry : ["DZA"],
                                highlightCountry : ["DZA"]
                            }
                        },
                         filterFor: {
                             "filtered_ds": ['CountryCode']
                         },
                         postProcess:[
                             {
                                 "name": "join",
                                 "sid": [
                                     {
                                         "uid": "filtered_ds"
                                     },
                                     {
                                         "uid": "last_year_country"
                                     }
                                 ],
                                 "parameters": {
                                     "joins": [
                                         [
                                             {
                                                 "type": "id",
                                                 "value": "CountryCode"
                                             },
                                             {
                                                 "type": "id",
                                                 "value": "Year"
                                             }

                                         ],
                                         [
                                             {
                                                 "type": "id",
                                                 "value": "CountryCode"
                                             },
                                             {
                                                 "type": "id",
                                                 "value": "Year"
                                             }

                                         ]
                                     ],
                                     "values": [
                                     ]
                                 },
                                 "rid": {
                                     "uid": "filtered_join"
                                 }
                             },
                             {
                                 "name": "filter",
                                 "sid": [
                                     {
                                         "uid": "Uneca_PopulationNew"
                                     }
                                 ],
                                 "parameters": {
                                     "columns": [
                                         "CountryCode",
                                         "Year",
                                         "Value"
                                     ],
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
                                         },
                                         "CountryCode": {
                                             "codes": [
                                                 {
                                                     "uid": "ISO3",
                                                     "codes": [
                                                         "DZA"
                                                     ]
                                                 }
                                             ]
                                         }
                                     }
                                 },
                                 "rid": {
                                     "uid": "filtered_ds"
                                 }
                             },

                             {
                                 "name": "group",
                                 "sid": [
                                     {
                                         "uid": "filtered_ds"
                                     }
                                 ],
                                 "parameters": {
                                     "by": [                   //
                                         "CountryCode"
                                     ],
                                     "aggregations": [
                                         {
                                             "columns": [
                                                 "Year"
                                             ],
                                             "rule": "max"
                                         }
                                     ]
                                 },
                                 "rid": {
                                     "uid": "last_year_country"
                                 }
                             },
                             {
                                 "name": "group",
                                 "sid": [
                                     {
                                         "uid": "filtered_join"
                                     }
                                 ],
                                 "parameters": {
                                     "by": [
                                         "CountryCode"
                                     ],
                                     "aggregations": [
                                         {
                                             "columns": [
                                                 "filtered_ds_Value"
                                             ],
                                             "rule": "max"
                                         }
                                     ]
                                 }
                             }

                         ]
                     }
                ]
            }
        },

        "health": {

            filter: {


                CountryCode: {
                    className: 'col-md-6',
                    selector: {
                        id: "tree",
                        default: ["DZA"]
                    },

                    cl: {
                        uid: "UNECA_ISO3"

                    },
                    template: {
                        title: "Multiple selection",
                        hideHeader : true
                    }
                },

                Year: {
                    className: 'col-md-6',

                    selector: {
                        id: "tree",
                        source: [
                            {"value": "2013", "label": "2013", "selected": false},
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
                    },

                    template: {
                        hideHeader : true
                    }
                }

            },

            dashboard: {

                uid: "UNECA_Health",
                //version: "",
                //preProcess : {} //D3P process
                //postProcess : {} //D3P process
                items: [
                   /* {
                        //Infant mortality rate (both sexes) per 1,000  010304
                        id: "health1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["CountryCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config

                        filterFor: {
                            "filter_rate": ['CountryCode', 'Year']
                        },

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "UNECA_Health"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "IndicatorCode",
                                        "CountryCode",
                                        "Year",
                                        "Value",
                                        "Unit"
                                    ],
                                    "rows": {

                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "version":"2.0",
                                                    "codes": [
                                                        "010304"

                                                    ]
                                                }
                                            ]
                                        },
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ISO3",
                                                    "codes": [
                                                        "DZA"
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
                                        }
                                    }
                                },
                                "rid":{"uid":"filter_rate"}
                            }
                        ]
                    },
                    {
                        //Under five mortality rate (both sexes) per 1,000  010303
                        id: "health2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["CountryCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config

                        filterFor: {
                            "filter_mortality": ['CountryCode', 'Year']
                        },

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "UNECA_Health"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "IndicatorCode",
                                        "CountryCode",
                                        "Year",
                                        "Value",
                                        "Unit"
                                    ],
                                    "rows": {

                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "version":"2.0",
                                                    "codes": [
                                                        "010303"

                                                    ]
                                                }
                                            ]
                                        },
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ISO3",
                                                    "codes": [
                                                        "DZA"
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
                                        }
                                    }
                                },
                                "rid":{"uid":"filter_mortality"}
                            }
                        ]
                    },
                    {
                        //Number of doctors per 10,000 population 010313, Number of nurses and Midwives per 10,000 population 010314
                        id: "health3", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["CountryCode_EN"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config

                        filterFor: {
                            "filter_doctors": ['CountryCode', 'Year']
                        },

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "UNECA_Health"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "IndicatorCode",
                                        "CountryCode",
                                        "Year",
                                        "Value",
                                        "Unit"
                                    ],
                                    "rows": {

                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "version":"2.0",
                                                    "codes": [
                                                        "010313","010314"
                                                    ]
                                                }
                                            ]
                                        },
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ISO3",
                                                    "codes": [
                                                        "DZA"
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
                                        }
                                    }
                                },
                                "rid":{"uid":"filter_doctors"}
                            }
                        ]
                    }*/
                   {
                        //Percentage of mothers provided at least one antenatal care 010311
                        id: "health4", //ref [data-item=':id']
                        type: "map", //chart || map || olap,
                        config: {
                           fenix_ui_map: {
                               guiController: {
                                   overlay: true,
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
                               },
                               zoomToCountry : ["DZA"]//,
                              // highlightCountry : ["DZA"]
                           }
                       },

                        filterFor: {
                            "filtered_ds": ['CountryCode']
                        },
                        postProcess:[
                            {
                                "name": "join",
                                "sid": [
                                    {
                                        "uid": "filtered_ds"
                                    },
                                    {
                                        "uid": "last_year_country"
                                    }
                                ],
                                "parameters": {
                                    "joins": [
                                        [
                                            {
                                                "type": "id",
                                                "value": "CountryCode"
                                            },
                                            {
                                                "type": "id",
                                                "value": "Year"
                                            }

                                        ],
                                        [
                                            {
                                                "type": "id",
                                                "value": "CountryCode"
                                            },
                                            {
                                                "type": "id",
                                                "value": "Year"
                                            }

                                        ]
                                    ],
                                    "values": [
                                    ]
                                },
                                "rid": {
                                    "uid": "joined_ds"
                                }
                            },

                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "UNECA_Health"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
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
                                                        "010311"
                                                    ]
                                                }
                                            ]
                                        },
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ISO3",
                                                    "codes": [
                                                        "DZA"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                },
                                "rid": {
                                    "uid": "filtered_ds"
                                }
                            },

                            {
                                "name": "group",
                                "sid": [
                                    {
                                        "uid": "filtered_ds"
                                    }
                                ],
                                "parameters": {
                                    "by": [
                                        "CountryCode"

                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "Year"
                                            ],
                                            "rule": "max"
                                        }
                                    ]
                                },
                                "rid": {
                                    "uid": "last_year_country"
                                }
                            },

                            {
                                "name": "group",
                                "sid": [
                                    {
                                        "uid": "joined_ds"
                                    }
                                ],
                                "parameters": {
                                    "by": [
                                        "CountryCode",
                                        "Year"
                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "filtered_ds_Value"
                                            ],
                                            "rule": "max"
                                        }
                                    ]
                                }
                            }

                        ]
                    }//,
                    /*  {
                        //Percentage of deliveries attended by skilled health personnel  010312
                        id: "health5", //ref [data-item=':id']
                        type: "map", //chart || map || olap,
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
                                        url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                                        subdomains: 'abcd',
                                        maxZoom: 19
                                    }
                                },
                                zoomToCountry : ["DZA"],
                                highlightCountry : ["DZA"]
                            }
                        },
                        filterFor: {
                            "filtered_ds": ['CountryCode']
                        },
                        postProcess:[
                            {
                                "name": "join",
                                "sid": [
                                    {
                                        "uid": "filtered_ds"
                                    },
                                    {
                                        "uid": "last_year_country"
                                    }
                                ],
                                "parameters": {
                                    "joins": [
                                        [
                                            {
                                                "type": "id",
                                                "value": "CountryCode"
                                            },
                                            {
                                                "type": "id",
                                                "value": "Year"
                                            }

                                        ],
                                        [
                                            {
                                                "type": "id",
                                                "value": "CountryCode"
                                            },
                                            {
                                                "type": "id",
                                                "value": "Year"
                                            }

                                        ]
                                    ],
                                    "values": [
                                    ]
                                }
                            },

                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "UNECA_Health"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "CountryCode",
                                        "Year",
                                        "Value",
                                        "Unit"
                                    ],
                                    "rows": {

                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "version":"2.0",
                                                    "codes": [
                                                        "010312"
                                                    ]
                                                }
                                            ]
                                        },
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ISO3",
                                                    "codes": [
                                                        "DZA"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                },
                                "rid": {
                                    "uid": "filtered_ds"
                                }
                            },

                            {
                                "name": "group",
                                "sid": [
                                    {
                                        "uid": "filtered_ds"
                                    }
                                ],
                                "parameters": {
                                    "by": [
                                        "CountryCode"

                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "Year"
                                            ],
                                            "rule": "max"
                                        }
                                    ]
                                },
                                "rid": {
                                    "uid": "last_year_country"
                                }
                            }

                        ]

            },
                    {
                        //Percentage of children provided the vaccines (BCG, DPT3, measles, polio)
                        id: "health6", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["CountryCode_EN"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config

                        filterFor: {
                            "filter_vaccines": ['CountryCode', 'Year']
                        },

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "UNECA_Health"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "IndicatorCode",
                                        "CountryCode",
                                        "Year",
                                        "Value",
                                        "Unit"
                                    ],
                                    "rows": {

                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "version":"2.0",
                                                    "codes": ["010307","010308","010309","010310"]
                                                }
                                            ]
                                        },
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ISO3",
                                                    "codes": [
                                                        "DZA"
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
                                        }
                                    }
                                },
                                "rid":{"uid":"filter_vaccines"}
                            }
                        ]
                    },
                    {
                        //Percentage of children under-five and underweight  010301
                        id: "health7", //ref [data-item=':id']
                        type: "map", //chart || map || olap,
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
                                        url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                                        subdomains: 'abcd',
                                        maxZoom: 19
                                    }
                                },
                                zoomToCountry : ["DZA"],
                                highlightCountry : ["DZA"]
                            }
                        },
                        filterFor: {
                            "filtered_ds": ['CountryCode']
                        },
                        postProcess:[
                            {
                                "name": "join",
                                "sid": [
                                    {
                                        "uid": "filtered_ds"
                                    },
                                    {
                                        "uid": "last_year_country"
                                    }
                                ],
                                "parameters": {
                                    "joins": [
                                        [
                                            {
                                                "type": "id",
                                                "value": "CountryCode"
                                            },
                                            {
                                                "type": "id",
                                                "value": "Year"
                                            }

                                        ],
                                        [
                                            {
                                                "type": "id",
                                                "value": "CountryCode"
                                            },
                                            {
                                                "type": "id",
                                                "value": "Year"
                                            }

                                        ]
                                    ],
                                    "values": [
                                    ]
                                },
                                "rid": {
                                    "uid": "filtered_join"
                                }
                            },

                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "UNECA_Health"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "CountryCode",
                                        "Year",
                                        "Value"
                                    ],
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
                                        },
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "ISO3",
                                                    "codes": [
                                                        "DZA"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                },
                                "rid": {
                                    "uid": "filtered_ds"
                                }
                            },

                            {
                                "name": "group",
                                "sid": [
                                    {
                                        "uid": "filtered_ds"
                                    }
                                ],
                                "parameters": {
                                    "by": [                   //
                                        "CountryCode"
                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "Year"
                                            ],
                                            "rule": "max"
                                        }
                                    ]
                                },
                                "rid": {
                                    "uid": "last_year_country"
                                }
                            },
                            {
                                "name": "group",
                                "sid": [
                                    {
                                        "uid": "filtered_join"
                                    }
                                ],
                                "parameters": {
                                    "by": [
                                        "CountryCode"
                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "filtered_ds_Value"
                                            ],
                                            "rule": "max"
                                        }
                                    ]
                                }
                            }

                        ]
                    }*/
                ]
            }
        },

        "balance_of_payments": {

            filter: {

                CountryCode: {
                    className: 'col-md-4',
                    selector: {
                        id: "tree",
                        default: ["DZA"]
                    },

                    cl: {
                        uid: "UNECA_ISO3"

                    },
                    template: {
                        title: "Multiple selection",
                        hideHeader : true
                    }
                },

                Year: {
                    className: 'col-md-4',

                    selector: {
                        id: "tree",
                        source: [
                            {"value": "2013", "label": "2013", "selected": false},
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
                    },

                    template: {
                        hideHeader : true
                    }
                },
                um: {
                    className: 'col-md-4',
                    selector: {
                        id: "input",
                        type: "radio",
                        source: [
                            {value: "NC", label: "National currency"},
                            {value: "USD", label: "US dollars"}
                        ],
                        default: ["NC"],
                    },

                    template: {
                        title: "Radio",
                        hideHeader : true
                    }
                }

            },

            dashboard: {
                uid: "UNECA_BalanceOfPayments",
                //version: "",
                //preProcess : {} //D3P process
                //postProcess : {} //D3P process
                items: [
              /*      {
                        id: "BOP-1", //ref [data-item=':id']
                        type: "map", //chart || map || olap,
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
                                        url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                                        subdomains: 'abcd',
                                        maxZoom: 19
                                    }
                                }
                            }
                        },
                        filter: { //FX-filter format

                            IndicatorCode: ["020207"],

                            "CountryCode": ["KEN", "TZA", "ZMB", "ETH"
                            ],

                            "Year": ["2012"]
                        }


                    },*/


                    {
                        //Current account balance (BoP)  020204
                        id: "BOP1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["CountryCode_EN"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["020204"],
                            "CountryCode": ["DZA"],
                            "um": ["NC"]
                        },

                        // filterFor: ["CountryCode", "IndicatorCode"] // allowed dimension ids to filter,


                        filterFor: {
                            "filter_current": ['CountryCode', 'Year', 'um']
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
                                        "Value",
                                        "um"
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

                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ISO3",
                                                    "codes": [
                                                        "DZA"
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



                    },
                    {
                        //Capital account balance (BoP)   02020501
                        id: "BOP2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["CountryCode_EN"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        /*filter: { //FX-filter format

                         IndicatorCode: ["020207"],

                         "CountryCode": ["KEN", "TZA", "ZMB", "ETH"
                         ],
                         "Year": ["2012"]


                         },

                         filterFor: ["CountryCode", "IndicatorCode"] // allowed dimension ids to filter,
                         */

                        filterFor: {
                            "filter_capital": ['CountryCode', 'Year', 'um']
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
                                        "Value",
                                        "um"
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

                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ISO3",
                                                    "codes": [
                                                        "DZA"
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



                    },
                    {
                        //Financial account balance (BoP)  02020502
                        id: "BOP3", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["CountryCode_EN"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        /*filter: { //FX-filter format

                         IndicatorCode: ["020207"],

                         "CountryCode": ["KEN", "TZA", "ZMB", "ETH"
                         ],
                         "Year": ["2012"]


                         },

                         filterFor: ["CountryCode", "IndicatorCode"] // allowed dimension ids to filter,
                         */

                        filterFor: {
                            "filter_finan": ['CountryCode', 'Year', 'um']
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
                                        "Value",
                                        "um"
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

                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ISO3",
                                                    "codes": [
                                                        "DZA"
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
                                "rid":{"uid":"filter_finan"}
                            }
                        ]



                    }//,


                    /*{
                        id: "BOP-3", //ref [data-item=':id']
                        type: "map", //chart || map || olap,
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
                                        url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                                        subdomains: 'abcd',
                                        maxZoom: 19
                                    }
                                }
                            }
                        },
                        filter: { //FX-filter format

                            IndicatorCode: ["020204"],

                            "CountryCode": ["KEN", "TZA", "ZMB", "ETH"
                            ],
                            "Year": ["2012"]
                        },


                        postProcess: [{
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "IndicatorCode": {
                                        "codes": [
                                            {
                                                "uid": "UNECA_ClassificationOfActivities",
                                                "version": "2.0",
                                                "codes": [
                                                    "020204"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                            {
                                "name": "unecaPercentageGDP"
                            }]

                    }*/

                ]

            }

        },

        "gdp": {
            filter: {

                CountryCode: {
                    className: 'col-md-6',
                    selector: {
                        id: "tree",
                        default: ["DZA"]
                    },

                    cl: {
                        uid: "UNECA_ISO3"

                    },
                    template: {
                        title: "Multiple selection",
                        hideHeader : true
                    }


                },


                Year: {
                    className: 'col-md-6',
                    selector: {
                        id: "tree",
                        source: [
                            {"value": "2013", "label": "2013", "selected": false},
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
                    },

                    template: {
                        hideHeader : true
                    }
                }


            },

            dashboard:
                {
                    uid: "UNECA_GDP_USD",
                    //version: "",
                    //preProcess : {} //D3P process
                    //postProcess : {} //D3P process
                    items: [
                      /*  {
                            id: "gdp-1", //ref [data-item=':id']
                            type: "map", //chart || map || olap,
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
                                            url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                                            subdomains: 'abcd',
                                            maxZoom: 19
                                        }
                                    }
                                }
                            },
                            filter: { //FX-filter format

                                IndicatorCode: ["020705"],

                                "CountryCode": ["KEN", "TZA", "ZMB", "ETH"
                                ],
                                "Year": ["2012"]
                            }
                        },
                        {
                            id: "gdp-2", //ref [data-item=':id']
                            type: "map", //chart || map || olap,
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
                                            url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                                            subdomains: 'abcd',
                                            maxZoom: 19
                                        }
                                    }
                                }
                            },
                            filter: { //FX-filter format

                                IndicatorCode: ["020706"],

                                "CountryCode": ["KEN", "TZA", "ZMB", "ETH"
                                ],
                                "Year": ["2012"]
                            }
                        },
*/
                        {
                            //GROSS DOMESTIC PRODUCT (current prices)   020707
                            id: "gdp1", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "line",
                                x: ["Year"], //x axis and series
                                series: ["CountryCode_EN"], //Y dimension
                                y: ["Value"],
                                aggregationFn: {"Value": "sum"}
                            }, // :type-creator config

                            filterFor: {
                                "filter_current": ['CountryCode', 'Year']
                            },

                            postProcess: [
                                {
                                    "name": "filter",
                                    "sid": [
                                        {
                                            "uid": "UNECA_GDP_USD"
                                        }
                                    ],
                                    "parameters": {
                                        "columns": [
                                            "IndicatorCode",
                                            "CountryCode",
                                            "Year",
                                            "Value",
                                            "UnitCode"
                                        ],
                                        "rows": {

                                            "IndicatorCode": {
                                                "codes": [
                                                    {
                                                        "uid": "UNECA_ClassificationOfActivities",
                                                        "version":"2.0",
                                                        "codes": [
                                                            "020707"
                                                        ]
                                                    }
                                                ]
                                            },

                                            "CountryCode": {
                                                "codes": [
                                                    {
                                                        "uid": "UNECA_ISO3",
                                                        "codes": [
                                                            "DZA"
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
                                            }
                                        }
                                    },
                                    "rid":{"uid":"filter_current"}
                                }
                            ]
                        },
                        {
                            //Exports of goods and services at current prices   02070202
                            id: "gdp2", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "line",
                                x: ["Year"], //x axis and series
                                series: ["CountryCode_EN"], //Y dimension
                                y: ["Value"],
                                aggregationFn: {"Value": "sum"}
                            }, // :type-creator config

                            filterFor: {
                                "filter_current": ['CountryCode', 'Year']
                            },

                            postProcess: [
                                {
                                    "name": "filter",
                                    "sid": [
                                        {
                                            "uid": "UNECA_GDP_USD"
                                        }
                                    ],
                                    "parameters": {
                                        "columns": [
                                            "IndicatorCode",
                                            "CountryCode",
                                            "Year",
                                            "Value",
                                            "UnitCode"
                                        ],
                                        "rows": {

                                            "IndicatorCode": {
                                                "codes": [
                                                    {
                                                        "uid": "UNECA_ClassificationOfActivities",
                                                        "version":"2.0",
                                                        "codes": [
                                                            "02070202"
                                                        ]
                                                    }
                                                ]
                                            },

                                            "CountryCode": {
                                                "codes": [
                                                    {
                                                        "uid": "UNECA_ISO3",
                                                        "codes": [
                                                            "DZA"
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
                                            }
                                        }
                                    },
                                    "rid":{"uid":"filter_current"}
                                }
                            ]
                        },
                        {
                            //Import of goods and services   02070203
                            id: "gdp3", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "line",
                                x: ["Year"], //x axis and series
                                series: ["CountryCode_EN"], //Y dimension
                                y: ["Value"],
                                aggregationFn: {"Value": "sum"}
                            }, // :type-creator config

                            filterFor: {
                                "filter_current": ['CountryCode', 'Year']
                            },

                            postProcess: [
                                {
                                    "name": "filter",
                                    "sid": [
                                        {
                                            "uid": "UNECA_GDP_USD"
                                        }
                                    ],
                                    "parameters": {
                                        "columns": [
                                            "IndicatorCode",
                                            "CountryCode",
                                            "Year",
                                            "Value",
                                            "UnitCode"
                                        ],
                                        "rows": {

                                            "IndicatorCode": {
                                                "codes": [
                                                    {
                                                        "uid": "UNECA_ClassificationOfActivities",
                                                        "version":"2.0",
                                                        "codes": [
                                                            "02070203"
                                                        ]
                                                    }
                                                ]
                                            },

                                            "CountryCode": {
                                                "codes": [
                                                    {
                                                        "uid": "UNECA_ISO3",
                                                        "codes": [
                                                            "DZA"
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
                                            }
                                        }
                                    },
                                    "rid":{"uid":"filter_current"}
                                }
                            ]
                        }
                        // {
                        //     id: "gdp-4", //ref [data-item=':id']
                        //     type: "chart", //chart || map || olap,
                        //     config: {
                        //         type: "line",
                        //         x: ["Year"], //x axis and series
                        //         series: ["CountryCode_EN"], //Y dimension
                        //         y: ["Value"],
                        //         aggregationFn: {"Value": "sum"}
                        //     }, // :type-creator config
                        //
                        //     filterFor: {
                        //         "filter_rate": ['CountryCode', 'Year']
                        //     },
                        //
                        //     postProcess: [
                        //         {
                        //             "name": "filter",
                        //             "sid": [
                        //                 {
                        //                     "uid": "UNECA_GDP_USD"
                        //                 }
                        //             ],
                        //             "parameters": {
                        //                 "columns": [
                        //                     "IndicatorCode",
                        //                     "CountryCode",
                        //                     "Year",
                        //                     "Value",
                        //                     "UnitCode"
                        //                 ],
                        //                 "rows": {
                        //
                        //                     "IndicatorCode": {
                        //                         "codes": [
                        //                             {
                        //                                 "uid": "UNECA_ClassificationOfActivities",
                        //                                 "version":"2.0",
                        //                                 "codes": [
                        //                                     "020705"
                        //                                 ]
                        //                             }
                        //                         ]
                        //                     },
                        //
                        //                     "CountryCode": {
                        //                         "codes": [
                        //                             {
                        //                                 "uid": "UNECA_ISO3",
                        //                                 "codes": [
                        //                                     "DZA"
                        //                                 ]
                        //                             }
                        //                         ]
                        //                     },
                        //                     "Year": {
                        //                         "time": [
                        //                             {
                        //                                 "from": 2000,
                        //                                 "to": 2013
                        //                             }
                        //                         ]
                        //                     }
                        //                 }
                        //             },
                        //             "rid":{"uid":"filter_current"}
                        //         }
                        //     ]
                        // },
                        // {
                        //     id: "gdp-5", //ref [data-item=':id']
                        //     type: "chart", //chart || map || olap,
                        //     config: {
                        //         type: "line",
                        //         x: ["Year"], //x axis and series
                        //         series: ["CountryCode_EN"], //Y dimension
                        //         y: ["Value"],
                        //         aggregationFn: {"Value": "sum"}
                        //     }, // :type-creator config
                        //
                        //     filterFor: {
                        //         "filter_capita": ['CountryCode', 'Year']
                        //     },
                        //
                        //     postProcess: [
                        //         {
                        //             "name": "filter",
                        //             "sid": [
                        //                 {
                        //                     "uid": "UNECA_GDP_USD"
                        //                 }
                        //             ],
                        //             "parameters": {
                        //                 "columns": [
                        //                     "IndicatorCode",
                        //                     "CountryCode",
                        //                     "Year",
                        //                     "Value",
                        //                     "UnitCode"
                        //                 ],
                        //                 "rows": {
                        //
                        //                     "IndicatorCode": {
                        //                         "codes": [
                        //                             {
                        //                                 "uid": "UNECA_ClassificationOfActivities",
                        //                                 "version":"2.0",
                        //                                 "codes": [
                        //                                     "020706"
                        //                                 ]
                        //                             }
                        //                         ]
                        //                     },
                        //
                        //                     "CountryCode": {
                        //                         "codes": [
                        //                             {
                        //                                 "uid": "UNECA_ISO3",
                        //                                 "codes": [
                        //                                     "DZA"
                        //                                 ]
                        //                             }
                        //                         ]
                        //                     },
                        //                     "Year": {
                        //                         "time": [
                        //                             {
                        //                                 "from": 2000,
                        //                                 "to": 2013
                        //                             }
                        //                         ]
                        //                     }
                        //                 }
                        //             },
                        //             "rid":{"uid":"filter_capita"}
                        //         }
                        //     ]
                        // }

                    ]
                }
        },

        "monetary_statistics": {

            filter: {

                CountryCode: {

                    className: 'col-md-6',

                    selector: {
                        id: "tree",
                        default: [ "DZA"]
                    },

                    cl: {
                        uid: "UNECA_ISO3"

                    },
                    template: {
                        hideHeader : true
                    }
                },

                Year: {

                    className: 'col-md-6',

                    selector: {
                        id: "tree",
                        source: [

                            {"value": "2013", "label": "2013", "selected": false},
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
                    },

                    template: {
                        hideHeader : true
                    }
                }

            },


            dashboard: {

                uid: "UNECA_MonetaryStatistics",
                items: [

                    /*   {
                     id: "monetary-1", //ref [data-item=':id']
                     type: "map", //chart || map || olap,
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
                     url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                     subdomains: 'abcd',
                     maxZoom: 19
                     }
                     }
                     }
                     },
                     filter: { //FX-filter format

                     IndicatorCode: ["020905"],

                     "CountryCode": ["KEN", "TZA", "ZMB", "ETH"
                     ],
                     "Year": ["2012"]
                     }
                     },
                     {
                     id: "monetary-2", //ref [data-item=':id']
                     type: "map", //chart || map || olap,
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
                     url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                     subdomains: 'abcd',
                     maxZoom: 19
                     }
                     }
                     }
                     },
                     filter: { //FX-filter format

                     IndicatorCode: ["020906"],

                     "CountryCode": ["KEN", "TZA", "ZMB", "ETH"
                     ],
                     "Year": ["2012"]
                     }
                     },
                     {
                     id: "monetary-3", //ref [data-item=':id']
                     type: "map", //chart || map || olap,
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
                     url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                     subdomains: 'abcd',
                     maxZoom: 19
                     }
                     }
                     }
                     },
                     filter: { //FX-filter format

                     IndicatorCode: ["020903"],

                     "CountryCode": ["KEN", "TZA", "ZMB", "ETH"
                     ],
                     "Year": ["2012"]
                     }
                     }*/


                    {
                        //Money supply (M1) 020901
                        id: "monetary1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["CountryCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config

                        filterFor: {
                            "filter_supply": ['CountryCode', 'Year']
                        },

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "UNECA_MonetaryStatistics"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "IndicatorCode",
                                        "CountryCode",
                                        "Year",
                                        "Value",
                                        "UnitCode"
                                    ],
                                    "rows": {

                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "version":"2.0",
                                                    "codes": [
                                                        "020901"

                                                    ]
                                                }
                                            ]
                                        },
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ISO3",
                                                    "codes": [
                                                        "DZA"
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
                                        }
                                    }
                                },
                                "rid":{"uid":"filter_supply"}
                            }
                        ]
                    },
                    {
                        //Net foreign assets 020904
                        id: "monetary2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["CountryCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config

                        filterFor: {
                            "filter_assets": ['CountryCode', 'Year']
                        },

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "UNECA_MonetaryStatistics"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "IndicatorCode",
                                        "CountryCode",
                                        "Year",
                                        "Value",
                                        "UnitCode"
                                    ],
                                    "rows": {

                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "version":"2.0",
                                                    "codes": [
                                                        "020904"

                                                    ]
                                                }
                                            ]
                                        },
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ISO3",
                                                    "codes": [
                                                        "DZA"
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
                                        }
                                    }
                                },
                                "rid":{"uid":"filter_assets"}
                            }
                        ]
                    },
                    {
                        //International reserves  020906
                        id: "monetary3", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["CountryCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config

                        filterFor: {
                            "filter_reserves": ['CountryCode', 'Year']
                        },

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "UNECA_MonetaryStatistics"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "IndicatorCode",
                                        "CountryCode",
                                        "Year",
                                        "Value",
                                        "UnitCode"
                                    ],
                                    "rows": {

                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "version":"2.0",
                                                    "codes": [
                                                        "020906"

                                                    ]
                                                }
                                            ]
                                        },
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ISO3",
                                                    "codes": [
                                                        "DZA"
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
                                        }
                                    }
                                },
                                "rid":{"uid":"filter_reserves"}
                            }
                        ]
                    }
                ]
            }
        },

        "public_finance": {

            filter: {

                CountryCode: {

                    className: 'col-md-6',

                    selector: {
                        id: "tree",
                        default: [ "DZA"]
                    },

                    cl: {
                        uid: "UNECA_ISO3"

                    },
                    template: {
                        hideHeader : true
                    },
                    default: [ "DZA"]

                },


                Year: {

                    className: 'col-md-6',

                    selector: {
                        id: "tree",
                        source: [

                            {"value": "2013", "label": "2013", "selected": false},
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
                    },

                    template: {
                        hideHeader : true
                    }
                }

            },


            dashboard: {

                uid: "UNECA_PublicFinance",
                items: [
                    {
                        //Fiscal balance 021204
                        id: "finance1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["CountryCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config

                        filterFor: {
                            "filter_fiscal": ['CountryCode', 'Year']
                        },

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "UNECA_PublicFinance"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "IndicatorCode",
                                        "CountryCode",
                                        "Year",
                                        "Value",
                                        "UnitCode"
                                    ],
                                    "rows": {

                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "version": "2.0",
                                                    "codes": [
                                                        "021204"

                                                    ]
                                                }
                                            ]
                                        },
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ISO3",
                                                    "codes": [
                                                        "DZA"
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
                                        }
                                    }
                                },
                                "rid":{"uid":"filter_fiscal"}
                            }
                        ]
                    },
                    {
                        //Total expenditures and net lending   021203
                        id: "finance2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["CountryCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config

                        filterFor: {
                            "filter_total": ['CountryCode', 'Year']
                        },

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "UNECA_PublicFinance"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "IndicatorCode",
                                        "CountryCode",
                                        "Year",
                                        "Value",
                                        "UnitCode"
                                    ],
                                    "rows": {

                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "version": "2.0",
                                                    "codes": [
                                                        "021203"

                                                    ]
                                                }
                                            ]
                                        },
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ISO3",
                                                    "codes": [
                                                        "DZA"
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
                                        }
                                    }
                                },
                                "rid":{"uid":"filter_total"}
                            }
                        ]
                    },
                    {
                        //Total revenues and grants  021201
                        id: "finance3", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["CountryCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config

                        filterFor: {
                            "filter_rev": ['CountryCode', 'Year']
                        },

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "UNECA_PublicFinance"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "IndicatorCode",
                                        "CountryCode",
                                        "Year",
                                        "Value",
                                        "UnitCode"
                                    ],
                                    "rows": {

                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "version": "2.0",
                                                    "codes": [
                                                        "021201"

                                                    ]
                                                }
                                            ]
                                        },
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ISO3",
                                                    "codes": [
                                                        "DZA"
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
                                        }
                                    }
                                },
                                "rid":{"uid":"filter_rev"}
                            }
                        ]
                    }
                ]
            }
        },

        "poverty": {

            filter: {

                CountryCode: {

                    className: 'col-md-6',

                    selector: {
                        id: "tree",
                        default: [ "DZA"]
                    },

                    cl: {
                        uid: "UNECA_ISO3"

                    },
                    template: {
                        hideHeader : true
                    }

                },


                Year: {

                    className: 'col-md-6',

                    selector: {
                        id: "tree",
                        source: [

                            {"value": "2013", "label": "2013", "selected": false},
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
                    },

                    template: {
                        hideHeader : true
                    }
                }

            },
            dashboard: {

                uid: "UNECA_Poverty",

                items: [
                    {
                        //Gini index 030306
                        id: "poverty1", //ref [data-item=':id']
                        type: "map", //chart || map || olap,
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
                                        url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                                        subdomains: 'abcd',
                                        maxZoom: 19
                                    }
                                },
                                zoomToCountry : ["DZA"],
                                highlightCountry : ["DZA"]
                            }
                        },
                        // filter: { //FX-filter format
                        //     IndicatorCode: ["030306"],
                        //     Year: ["2013"],
                        //     "CountryCode": ["DZA"]
                        // },

                        filterFor: {
                            "filtered_ds": ["CountryCode"]
                        },
                        postProcess:[
                            {
                                "name": "join",
                                "sid": [
                                    {
                                        "uid": "filtered_ds"
                                    },
                                    {
                                        "uid": "last_year_country"
                                    }
                                ],
                                "parameters": {
                                    "joins": [
                                        [
                                            {
                                                "type": "id",
                                                "value": "CountryCode"
                                            },
                                            {
                                                "type": "id",
                                                "value": "Year"
                                            }

                                        ],
                                        [
                                            {
                                                "type": "id",
                                                "value": "CountryCode"
                                            },
                                            {
                                                "type": "id",
                                                "value": "Year"
                                            }

                                        ]
                                    ],
                                    "values": [
                                    ]
                                },
                                "rid": {
                                    "uid": "filtered_join"
                                }
                            },

                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "UNECA_Poverty"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "CountryCode",
                                        "Year",
                                        "Value"
                                    ],
                                    "rows": {

                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "version" : "2.0",
                                                    "codes": [
                                                        "030306"
                                                    ]
                                                }
                                            ]
                                        },
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ISO3",
                                                    "codes": [
                                                        "LBY"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                },
                                "rid": {
                                    "uid": "filtered_ds"
                                }
                            },

                            {
                                "name": "group",
                                "sid": [
                                    {
                                        "uid": "filtered_ds"
                                    }
                                ],
                                "parameters": {
                                    "by": [                   //
                                        "CountryCode"
                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "Year"
                                            ],
                                            "rule": "max"
                                        }
                                    ]
                                },
                                "rid": {
                                    "uid": "last_year_country"
                                }
                            },
                            {
                                "name": "group",
                                "sid": [
                                    {
                                        "uid": "filtered_join"
                                    }
                                ],
                                "parameters": {
                                    "by": [
                                        "CountryCode"
                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "filtered_ds_Value"
                                            ],
                                            "rule": "max"
                                        }
                                    ]
                                }
                            }

                        ]
                    },
                    {
                        //GNI Per Capita (US$) 030301
                        id: "poverty2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["CountryCode_EN"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filterFor: {
                            "filter_poverty": ['CountryCode', 'Year']
                        },
                        postProcess:[
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "UNECA_Poverty"
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
                                                    "version": "2.0",
                                                    "codes": [
                                                        "030301"

                                                    ]
                                                }
                                            ]
                                        },
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ISO3",
                                                    "codes": [
                                                        "DZA"
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
                                        }
                                    }
                                },
                                "rid":{"uid":"filter_poverty"}
                            }
                        ]
                    },
                    {
                        //Population below $2 (PPP) per day  010114
                        id: "poverty3", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["CountryCode_EN"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filterFor: {
                            "filter_poverty": ['CountryCode', 'Year']
                        },
                        postProcess:[
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "UNECA_Poverty"
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
                                                    "version": "2.0",
                                                    "codes": [
                                                        "010114"
                                                    ]
                                                }
                                            ]
                                        },
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ISO3",
                                                    "codes": [
                                                        "DZA"
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
                                        }
                                    }
                                },
                                "rid":{"uid":"filter_poverty"}
                            }
                        ]
                    }
                ]
            }

        },

        "inflation": {

            filter: {

                CountryCode: {

                    className: 'col-md-6',

                    selector: {
                        id: "tree",
                        default: [ "DZA"]
                    },

                    cl: {
                        uid: "UNECA_ISO3"

                    },
                    template: {
                        hideHeader : true
                    }
                },


                Year: {

                    className: 'col-md-6',

                    selector: {
                        id: "tree",
                        source: [

                            {"value": "2013", "label": "2013", "selected": false},
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
                    },

                    template: {
                        hideHeader : true
                    }
                }

            },


            dashboard: {

                uid: "UNECA_Inflation",
                items: [
                    {
                        //Inflation, consumer prices (annual %)   02110114
                        id: "inflation1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["CountryCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config

                        filterFor: {
                            "filter_inflation": ['CountryCode', 'Year']
                        },

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "UNECA_Inflation"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "IndicatorCode",
                                        "CountryCode",
                                        "Year",
                                        "Value",
                                        "UnitCode"
                                    ],
                                    "rows": {

                                        "IndicatorCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ClassificationOfActivities",
                                                    "version":"2.0",
                                                    "codes": [
                                                        "02110114"

                                                    ]
                                                }
                                            ]
                                        },
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ISO3",
                                                    "codes": [
                                                        "DZA"
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
                                        }
                                    }
                                },
                                "rid":{"uid":"filter_inflation"}
                            }
                        ]
                    }
                ]
            }
        },

        "tourism": {

            filter: {

                CountryCode: {

                    className: 'col-md-6',

                    selector: {
                        id: "tree",
                        default: [ "DZA"]
                    },

                    cl: {
                        uid: "UNECA_ISO3"
                    },
                    template: {
                        hideHeader : true
                    }

                },


                Year: {

                    className: 'col-md-6',

                    selector: {
                        id: "tree",
                        source: [

                            {"value": "2013", "label": "2013", "selected": false},
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
                    },

                    template: {
                        hideHeader : true
                    }
                }

            },


            dashboard: {

                uid: "UNECA_Tourism",
                items: [
                    {
                        //International tourism, number of arrivals  021305
                        id: "tourism1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["CountryCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config

                        filterFor: {
                            "filter_tourism": ['CountryCode', 'Year']
                        },

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "UNECA_Tourism"
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
                                                    "version": "2.0",
                                                    "codes": [
                                                        "021305"

                                                    ]
                                                }
                                            ]
                                        },
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ISO3",
                                                    "codes": [
                                                        "DZA"
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
                                        }
                                    }
                                },
                                "rid":{"uid":"filter_tourism"}
                            }
                        ]
                    },
                    {
                        //Rooms in hotels and similar establishments  021301
                        id: "tourism2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["CountryCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config

                        filterFor: {
                            "filter_rooms": ['CountryCode', 'Year']
                        },

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "UNECA_Tourism"
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
                                                    "version": "2.0",
                                                    "codes": [
                                                        "021301"

                                                    ]
                                                }
                                            ]
                                        },
                                        "CountryCode": {
                                            "codes": [
                                                {
                                                    "uid": "UNECA_ISO3",
                                                    "codes": [
                                                        "DZA"
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
                                        }
                                    }
                                },
                                "rid":{"uid":"filter_rooms"}
                            }
                        ]
                    },
                    {
                        //Tourism contribution to GDP  021303
                        id: "tourism3", //ref [data-item=':id']
                        type: "map", //chart || map || olap,
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
                                        url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                                        subdomains: 'abcd',
                                        maxZoom: 19
                                    }
                                },
                                zoomToCountry : ["DZA"],
                                highlightCountry : ["DZA"]
                            }
                        },
                        filter: { //FX-filter format
                            IndicatorCode: ["021303"],
                            Year: ["2013"],
                            "CountryCode": ["DZA"
                            ]
                        },

                        filterFor: ["CountryCode"],
                        // postProcess:[
                        //     {
                        //         "name": "join",
                        //         "sid": [
                        //             {
                        //                 "uid": "filtered_ds"
                        //             },
                        //             {
                        //                 "uid": "last_year_country"
                        //             }
                        //         ],
                        //         "parameters": {
                        //             "joins": [
                        //                 [
                        //                     {
                        //                         "type": "id",
                        //                         "value": "IndicatorCode"
                        //                     },
                        //                     {
                        //                         "type": "id",
                        //                         "value": "CountryCode"
                        //                     },
                        //                     {
                        //                         "type": "id",
                        //                         "value": "Year"
                        //                     }
                        //
                        //                 ],
                        //                 [
                        //                     {
                        //                         "type": "id",
                        //                         "value": "IndicatorCode"
                        //                     },
                        //                     {
                        //                         "type": "id",
                        //                         "value": "CountryCode"
                        //                     },
                        //                     {
                        //                         "type": "id",
                        //                         "value": "Year"
                        //                     }
                        //
                        //                 ]
                        //             ],
                        //             "values": [
                        //             ]
                        //         }
                        //     },
                        //
                        //     {
                        //         "name": "filter",
                        //         "sid": [
                        //             {
                        //                 "uid": "UNECA_Tourism"
                        //             }
                        //         ],
                        //         "parameters": {
                        //             "columns": [
                        //                 "IndicatorCode",
                        //                 "CountryCode",
                        //                 "Year",
                        //                 "Value"
                        //             ],
                        //             "rows": {
                        //
                        //                 "IndicatorCode": {
                        //                     "codes": [
                        //                         {
                        //                             "uid": "UNECA_ClassificationOfActivities",
                        //                             "version": "2.0",
                        //                             "codes": [
                        //                                 "021303"
                        //                             ]
                        //                         }
                        //                     ]
                        //                 },
                        //                 "CountryCode": {
                        //                     "codes": [
                        //                         {
                        //                             "uid": "UNECA_ISO3",
                        //                             "codes": [
                        //                                 "AGO"
                        //                             ]
                        //                         }
                        //                     ]
                        //                 }
                        //             }
                        //         },
                        //         "rid": {
                        //             "uid": "filtered_ds"
                        //         }
                        //     },
                        //
                        //     {
                        //         "name": "group",
                        //         "sid": [
                        //             {
                        //                 "uid": "filtered_ds"
                        //             }
                        //         ],
                        //         "parameters": {
                        //             "by": [
                        //                 "IndicatorCode",
                        //                 "CountryCode"
                        //
                        //             ],
                        //             "aggregations": [
                        //                 {
                        //                     "columns": [
                        //                         "Year"
                        //                     ],
                        //                     "rule": "max"
                        //                 }
                        //             ]
                        //         },
                        //         "rid": {
                        //             "uid": "last_year_country"
                        //         }
                        //     }
                        //
                        // ]
                    }
                ]
            }
        },
        "infrastructure": {

            filter: {

                CountryCode: {
                    className: 'col-md-6',
                    selector: {
                        id: "tree",
                        default: ["DZA"]
                    },

                    cl: {
                        uid: "UNECA_ISO3"

                    },
                    template: {
                        title: "Multiple selection",
                        hideHeader : true
                    }
                },

                Year: {
                    className: 'col-md-6',

                    selector: {
                        id: "tree",
                        source: [
                            {"value": "2013", "label": "2013", "selected": false},
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
                    },

                    template: {
                        hideHeader : true
                    }
                }

            },

            dashboard: {

                uid: "UNECA_Infrastructure",
                //version: "",
                //preProcess : {} //D3P process
                //postProcess : {} //D3P process
                items: [
                    {
                        //Mobile-cellular subscriptions per 1000 inhabitants  030202
                        id: "infrastructure1", //ref [data-item=':id']
                        type: "map", //chart || map || olap,
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
                                        url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                                        subdomains: 'abcd',
                                        maxZoom: 19
                                    }
                                },
                                zoomToCountry : ["DZA"],
                                highlightCountry : ["DZA"]
                            }
                        },
                        filter: { //FX-filter format
                            IndicatorCode: ["030202"],
                            Year: ["2013"],
                            "CountryCode": ["DZA"
                            ]
                        },

                        filterFor: ["CountryCode"],
                          // postProcess:[
                          //     {
                          //         "name": "join",
                          //         "sid": [
                          //             {
                          //                 "uid": "filtered_ds"
                          //             },
                          //             {
                          //                 "uid": "last_year_country"
                          //             }
                          //         ],
                          //         "parameters": {
                          //             "joins": [
                          //                 [
                          //                     {
                          //                         "type": "id",
                          //                         "value": "IndicatorCode"
                          //                     },
                          //                     {
                          //                         "type": "id",
                          //                         "value": "CountryCode"
                          //                     },
                          //                     {
                          //                         "type": "id",
                          //                         "value": "Year"
                          //                     }
                          //
                          //                 ],
                          //                 [
                          //                     {
                          //                         "type": "id",
                          //                         "value": "IndicatorCode"
                          //                     },
                          //                     {
                          //                         "type": "id",
                          //                         "value": "CountryCode"
                          //                     },
                          //                     {
                          //                         "type": "id",
                          //                         "value": "Year"
                          //                     }
                          //
                          //                 ]
                          //             ],
                          //             "values": [
                          //             ]
                          //         }
                          //     },
                          //
                          //     {
                          //         "name": "filter",
                          //         "sid": [
                          //             {
                          //                 "uid": "UNECA_Infrastructure"
                          //             }
                          //         ],
                          //         "parameters": {
                          //             "columns": [
                          //                 "IndicatorCode",
                          //                 "CountryCode",
                          //                 "Year",
                          //                 "Value"
                          //             ],
                          //             "rows": {
                          //
                          //                 "IndicatorCode": {
                          //                     "codes": [
                          //                         {
                          //                             "uid": "UNECA_ClassificationOfActivities",
                          //                             "codes": [
                          //                                 "030202"
                          //                             ]
                          //                         }
                          //                     ]
                          //                 },
                          //                 "CountryCode": {
                          //                     "codes": [
                          //                         {
                          //                             "uid": "ISO3",
                          //                             "codes": [
                          //                                 "DZA"
                          //                             ]
                          //                         }
                          //                     ]
                          //                 }
                          //             }
                          //         },
                          //         "rid": {
                          //             "uid": "filtered_ds"
                          //         }
                          //     },
                          //
                          //     {
                          //         "name": "group",
                          //         "sid": [
                          //             {
                          //                 "uid": "filtered_ds"
                          //             }
                          //         ],
                          //         "parameters": {
                          //             "by": [
                          //                 "IndicatorCode",
                          //                 "CountryCode"
                          //
                          //             ],
                          //             "aggregations": [
                          //                 {
                          //                     "columns": [
                          //                         "Year"
                          //                     ],
                          //                     "rule": "max"
                          //                 }
                          //             ]
                          //         },
                          //         "rid": {
                          //             "uid": "last_year_country"
                          //         }
                          //     }
                          //
                          // ]
                                           },
                    {
                        //Roads, paved (% of total roads)   021423
                        id: "infrastructure2", //ref [data-item=':id']
                        type: "map", //chart || map || olap,
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
                                        url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                                        subdomains: 'abcd',
                                        maxZoom: 19
                                    }
                                },
                                zoomToCountry : ["DZA"],
                                highlightCountry : ["DZA"]
                            }
                        },
                        filter: { //FX-filter format
                            IndicatorCode: ["021423"],
                            Year: ["2013"],
                            "CountryCode": ["DZA"
                            ]
                        },

                        filterFor: ["CountryCode"],
                        // postProcess:[
                        //     {
                        //         "name": "join",
                        //         "sid": [
                        //             {
                        //                 "uid": "filtered_ds"
                        //             },
                        //             {
                        //                 "uid": "last_year_country"
                        //             }
                        //         ],
                        //         "parameters": {
                        //             "joins": [
                        //                 [
                        //                     {
                        //                         "type": "id",
                        //                         "value": "IndicatorCode"
                        //                     },
                        //                     {
                        //                         "type": "id",
                        //                         "value": "CountryCode"
                        //                     },
                        //                     {
                        //                         "type": "id",
                        //                         "value": "Year"
                        //                     }
                        //
                        //                 ],
                        //                 [
                        //                     {
                        //                         "type": "id",
                        //                         "value": "IndicatorCode"
                        //                     },
                        //                     {
                        //                         "type": "id",
                        //                         "value": "CountryCode"
                        //                     },
                        //                     {
                        //                         "type": "id",
                        //                         "value": "Year"
                        //                     }
                        //
                        //                 ]
                        //             ],
                        //             "values": [
                        //             ]
                        //         }
                        //     },
                        //
                        //     {
                        //         "name": "filter",
                        //         "sid": [
                        //             {
                        //                 "uid": "UNECA_Infrastructure"
                        //             }
                        //         ],
                        //         "parameters": {
                        //             "columns": [
                        //                 "IndicatorCode",
                        //                 "CountryCode",
                        //                 "Year",
                        //                 "Value"
                        //             ],
                        //             "rows": {
                        //
                        //                 "IndicatorCode": {
                        //                     "codes": [
                        //                         {
                        //                             "uid": "UNECA_ClassificationOfActivities",
                        //                             "codes": [
                        //                                 "021423"
                        //                             ]
                        //                         }
                        //                     ]
                        //                 },
                        //                 "CountryCode": {
                        //                     "codes": [
                        //                         {
                        //                             "uid": "ISO3",
                        //                             "codes": [
                        //                                 "DZA"
                        //                             ]
                        //                         }
                        //                     ]
                        //                 }
                        //             }
                        //         },
                        //         "rid": {
                        //             "uid": "filtered_ds"
                        //         }
                        //     },
                        //
                        //     {
                        //         "name": "group",
                        //         "sid": [
                        //             {
                        //                 "uid": "filtered_ds"
                        //             }
                        //         ],
                        //         "parameters": {
                        //             "by": [
                        //                 "IndicatorCode",
                        //                 "CountryCode"
                        //
                        //             ],
                        //             "aggregations": [
                        //                 {
                        //                     "columns": [
                        //                         "Year"
                        //                     ],
                        //                     "rule": "max"
                        //                 }
                        //             ]
                        //         },
                        //         "rid": {
                        //             "uid": "last_year_country"
                        //         }
                        //     }
                        //
                        // ]
                    }
                ]
            }
        }
    }

});