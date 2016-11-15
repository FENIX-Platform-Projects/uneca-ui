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
                    // default: [ "DZA",
                    //     "BFA"]AMU
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
                        ],
                        config: {
                            core: {
                                multiple: false
                            }
                        }
                    },

                    template: {
                        title: "Single selection",
                        hideHeader : true
                    }
                }

            },


            dashboard: [{

                uid: "Uneca_PopulationNew",
                //version: "",
                //preProcess : {} //D3P process
                //postProcess : {} //D3P process
                //filter : {} //FX-filter format
                items: [
                   {
                       //Mid-year Population 010101
                        id: "population-1", //ref [data-item=':id']
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
                    // {
                    //     //Average annual growth rate 010103
                    //     id: "population-2", //ref [data-item=':id'] // 010103  Average annual growth rate
                    //     type: "map", //chart || map || olap,
                    //     config: {
                    //         fenix_ui_map: {
                    //             guiController: {
                    //                 overlay: false,
                    //                 baselayer: false,
                    //                 wmsLoader: false
                    //             },
                    //             baselayers: {
                    //                 "cartodb": {
                    //                     title_en: "Baselayer",
                    //                     url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                    //                     subdomains: 'abcd',
                    //                     maxZoom: 19
                    //                 }
                    //             }
                    //         }
                    //     },
                    //     filter: { //FX-filter format
                    //         IndicatorCode: ["010103"],
                    //         Year: ["2013"],
                    //         "CountryCode": ["DZA"]
                    //     },
                    //     //filterFor: ["CountryCode"],
                    //     filterFor: {
                    //         "filtered_ds": ['CountryCode']
                    //     },
                    //     postProcess:[
                    //         {
                    //             "name": "join",
                    //             "sid": [
                    //                 {
                    //                     "uid": "filtered_ds"
                    //                 },
                    //                 {
                    //                     "uid": "last_year_country"
                    //                 }
                    //             ],
                    //             "parameters": {
                    //                 "joins": [
                    //                     [
                    //                         {
                    //                             "type": "id",
                    //                             "value": "CountryCode"
                    //                         },
                    //                         {
                    //                             "type": "id",
                    //                             "value": "Year"
                    //                         }
                    //
                    //                     ],
                    //                     [
                    //                         {
                    //                             "type": "id",
                    //                             "value": "CountryCode"
                    //                         },
                    //                         {
                    //                             "type": "id",
                    //                             "value": "Year"
                    //                         }
                    //
                    //                     ]
                    //                 ],
                    //                 "values": [
                    //                 ]
                    //             },
                    //             "rid": {
                    //                 "uid": "filtered_join"
                    //             }
                    //         },
                    //
                    //         {
                    //             "name": "filter",
                    //             "sid": [
                    //                 {
                    //                     "uid": "Uneca_PopulationNew"
                    //                 }
                    //             ],
                    //             "parameters": {
                    //                 "columns": [
                    //                     "CountryCode",
                    //                     "Year",
                    //                     "Value"
                    //                 ],
                    //                 "rows": {
                    //
                    //                     "IndicatorCode": {
                    //                         "codes": [
                    //                             {
                    //                                 "uid": "UNECA_ClassificationOfActivities",
                    //                                 "codes": [
                    //                                     "010103"
                    //                                 ]
                    //                             }
                    //                         ]
                    //                     },
                    //                     "CountryCode": {
                    //                         "codes": [
                    //                             {
                    //                                 "uid": "ISO3",
                    //                                 "codes": [
                    //                                     "DZA"
                    //                                 ]
                    //                             }
                    //                         ]
                    //                     }
                    //                 }
                    //             },
                    //             "rid": {
                    //                 "uid": "filtered_ds"
                    //             }
                    //         },
                    //
                    //         {
                    //             "name": "group",
                    //             "sid": [
                    //                 {
                    //                     "uid": "filtered_ds"
                    //                 }
                    //             ],
                    //             "parameters": {
                    //                 "by": [                   //
                    //                     "CountryCode"
                    //                 ],
                    //                 "aggregations": [
                    //                     {
                    //                         "columns": [
                    //                             "Year"
                    //                         ],
                    //                         "rule": "max"
                    //                     }
                    //                 ]
                    //             },
                    //             "rid": {
                    //                 "uid": "last_year_country"
                    //             }
                    //         },
                    //         {
                    //             "name": "group",
                    //             "sid": [
                    //                 {
                    //                     "uid": "filtered_join"
                    //                 }
                    //             ],
                    //             "parameters": {
                    //                 "by": [
                    //                     "CountryCode"
                    //                 ],
                    //                 "aggregations": [
                    //                     {
                    //                         "columns": [
                    //                             "filtered_ds_Value"
                    //                         ],
                    //                         "rule": "max"
                    //                     }
                    //                 ]
                    //             }
                    //         }
                    //
                    //     ]
                    // },
                    //
                    // {
                    //     //Crude birth rate per 1,000 population 010104
                    //     id: "population-3", //ref [data-item=':id'] // 010104  Crude birth rate per 1,000 population
                    //     type: "map", //chart || map || olap,
                    //     config: {
                    //         fenix_ui_map: {
                    //             guiController: {
                    //                 overlay: false,
                    //                 baselayer: false,
                    //                 wmsLoader: false
                    //             },
                    //             baselayers: {
                    //                 "cartodb": {
                    //                     title_en: "Baselayer",
                    //                     url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                    //                     subdomains: 'abcd',
                    //                     maxZoom: 19
                    //                 }
                    //             }
                    //         }
                    //     },
                    //          filter: { //FX-filter format
                    //              IndicatorCode: ["010104"],
                    //              Year: ["2013"],
                    //              "CountryCode": ["DZA"]
                    //          },
                    //          //filterFor: ["CountryCode"],
                    //          filterFor: {
                    //              "filtered_ds": ['CountryCode']
                    //          },
                    //          postProcess:[
                    //              {
                    //                  "name": "join",
                    //                  "sid": [
                    //                      {
                    //                          "uid": "filtered_ds"
                    //                      },
                    //                      {
                    //                          "uid": "last_year_country"
                    //                      }
                    //                  ],
                    //                  "parameters": {
                    //                      "joins": [
                    //                          [
                    //                              {
                    //                                  "type": "id",
                    //                                  "value": "CountryCode"
                    //                              },
                    //                              {
                    //                                  "type": "id",
                    //                                  "value": "Year"
                    //                              }
                    //
                    //                          ],
                    //                          [
                    //                              {
                    //                                  "type": "id",
                    //                                  "value": "CountryCode"
                    //                              },
                    //                              {
                    //                                  "type": "id",
                    //                                  "value": "Year"
                    //                              }
                    //
                    //                          ]
                    //                      ],
                    //                      "values": [
                    //                      ]
                    //                  },
                    //                  "rid": {
                    //                      "uid": "filtered_join"
                    //                  }
                    //              },
                    //
                    //              {
                    //                  "name": "filter",
                    //                  "sid": [
                    //                      {
                    //                          "uid": "Uneca_PopulationNew"
                    //                      }
                    //                  ],
                    //                  "parameters": {
                    //                      "columns": [
                    //                          "CountryCode",
                    //                          "Year",
                    //                          "Value"
                    //                      ],
                    //                      "rows": {
                    //
                    //                          "IndicatorCode": {
                    //                              "codes": [
                    //                                  {
                    //                                      "uid": "UNECA_ClassificationOfActivities",
                    //                                      "codes": [
                    //                                          "010104"
                    //                                      ]
                    //                                  }
                    //                              ]
                    //                          },
                    //                          "CountryCode": {
                    //                              "codes": [
                    //                                  {
                    //                                      "uid": "ISO3",
                    //                                      "codes": [
                    //                                          "DZA"
                    //                                      ]
                    //                                  }
                    //                              ]
                    //                          }
                    //                      }
                    //                  },
                    //                  "rid": {
                    //                      "uid": "filtered_ds"
                    //                  }
                    //              },
                    //
                    //              {
                    //                  "name": "group",
                    //                  "sid": [
                    //                      {
                    //                          "uid": "filtered_ds"
                    //                      }
                    //                  ],
                    //                  "parameters": {
                    //                      "by": [                   //
                    //                          "CountryCode"
                    //                      ],
                    //                      "aggregations": [
                    //                          {
                    //                              "columns": [
                    //                                  "Year"
                    //                              ],
                    //                              "rule": "max"
                    //                          }
                    //                      ]
                    //                  },
                    //                  "rid": {
                    //                      "uid": "last_year_country"
                    //                  }
                    //              },
                    //              {
                    //                  "name": "group",
                    //                  "sid": [
                    //                      {
                    //                          "uid": "filtered_join"
                    //                      }
                    //                  ],
                    //                  "parameters": {
                    //                      "by": [
                    //                          "CountryCode"
                    //                      ],
                    //                      "aggregations": [
                    //                          {
                    //                              "columns": [
                    //                                  "filtered_ds_Value"
                    //                              ],
                    //                              "rule": "max"
                    //                          }
                    //                      ]
                    //                  }
                    //              }
                    //
                    //          ]
                    // },
                    // {
                    //     //Crude death rate per 1,000 population 010105
                    //     id: "population-4", //ref [data-item=':id'] // 010103  Average annual growth rate
                    //     type: "map", //chart || map || olap,
                    //     config: {
                    //         fenix_ui_map: {
                    //             guiController: {
                    //                 overlay: false,
                    //                 baselayer: false,
                    //                 wmsLoader: false
                    //             },
                    //             baselayers: {
                    //                 "cartodb": {
                    //                     title_en: "Baselayer",
                    //                     url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                    //                     subdomains: 'abcd',
                    //                     maxZoom: 19
                    //                 }
                    //             }
                    //         }
                    //     },
                    //     filter: { //FX-filter format
                    //         IndicatorCode: ["010105"],
                    //         Year: ["2013"],
                    //         "CountryCode": ["DZA"]
                    //     },
                    //     //filterFor: ["CountryCode"],
                    //     filterFor: {
                    //         "filtered_ds": ['CountryCode']
                    //     },
                    //     postProcess: [
                    //         {
                    //             "name": "join",
                    //             "sid": [
                    //                 {
                    //                     "uid": "filtered_ds"
                    //                 },
                    //                 {
                    //                     "uid": "last_year_country"
                    //                 }
                    //             ],
                    //             "parameters": {
                    //                 "joins": [
                    //                     [
                    //                         {
                    //                             "type": "id",
                    //                             "value": "CountryCode"
                    //                         },
                    //                         {
                    //                             "type": "id",
                    //                             "value": "Year"
                    //                         }
                    //
                    //                     ],
                    //                     [
                    //                         {
                    //                             "type": "id",
                    //                             "value": "CountryCode"
                    //                         },
                    //                         {
                    //                             "type": "id",
                    //                             "value": "Year"
                    //                         }
                    //
                    //                     ]
                    //                 ],
                    //                 "values": []
                    //             },
                    //             "rid": {
                    //                 "uid": "filtered_join"
                    //             }
                    //         },
                    //
                    //         {
                    //             "name": "filter",
                    //             "sid": [
                    //                 {
                    //                     "uid": "Uneca_PopulationNew"
                    //                 }
                    //             ],
                    //             "parameters": {
                    //                 "columns": [
                    //                     "CountryCode",
                    //                     "Year",
                    //                     "Value"
                    //                 ],
                    //                 "rows": {
                    //
                    //                     "IndicatorCode": {
                    //                         "codes": [
                    //                             {
                    //                                 "uid": "UNECA_ClassificationOfActivities",
                    //                                 "codes": [
                    //                                     "010105"
                    //                                 ]
                    //                             }
                    //                         ]
                    //                     },
                    //                     "CountryCode": {
                    //                         "codes": [
                    //                             {
                    //                                 "uid": "ISO3",
                    //                                 "codes": [
                    //                                     "DZA"
                    //                                 ]
                    //                             }
                    //                         ]
                    //                     }
                    //                 }
                    //             },
                    //             "rid": {
                    //                 "uid": "filtered_ds"
                    //             }
                    //         },
                    //
                    //         {
                    //             "name": "group",
                    //             "sid": [
                    //                 {
                    //                     "uid": "filtered_ds"
                    //                 }
                    //             ],
                    //             "parameters": {
                    //                 "by": [                   //
                    //                     "CountryCode"
                    //                 ],
                    //                 "aggregations": [
                    //                     {
                    //                         "columns": [
                    //                             "Year"
                    //                         ],
                    //                         "rule": "max"
                    //                     }
                    //                 ]
                    //             },
                    //             "rid": {
                    //                 "uid": "last_year_country"
                    //             }
                    //         },
                    //         {
                    //             "name": "group",
                    //             "sid": [
                    //                 {
                    //                     "uid": "filtered_join"
                    //                 }
                    //             ],
                    //             "parameters": {
                    //                 "by": [
                    //                     "CountryCode"
                    //                 ],
                    //                 "aggregations": [
                    //                     {
                    //                         "columns": [
                    //                             "filtered_ds_Value"
                    //                         ],
                    //                         "rule": "max"
                    //                     }
                    //                 ]
                    //             }
                    //         }
                    //
                    //     ]
                    // },
                    // {
                    //     //Total fertility 010106
                    //     id: "population-5", //ref [data-item=':id'] // 010103  Average annual growth rate
                    //     type: "map", //chart || map || olap,
                    //     config: {
                    //         fenix_ui_map: {
                    //             guiController: {
                    //                 overlay: false,
                    //                 baselayer: false,
                    //                 wmsLoader: false
                    //             },
                    //             baselayers: {
                    //                 "cartodb": {
                    //                     title_en: "Baselayer",
                    //                     url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                    //                     subdomains: 'abcd',
                    //                     maxZoom: 19
                    //                 }
                    //             }
                    //         }
                    //     },
                    //           filter: { //FX-filter format
                    //               IndicatorCode: ["010106"],
                    //               Year: ["2013"],
                    //               "CountryCode": ["DZA"]
                    //           },
                    //           //filterFor: ["CountryCode"],
                    //           filterFor: {
                    //               "filtered_ds": ['CountryCode']
                    //           },
                    //           postProcess:[
                    //               {
                    //                   "name": "join",
                    //                   "sid": [
                    //                       {
                    //                           "uid": "filtered_ds"
                    //                       },
                    //                       {
                    //                           "uid": "last_year_country"
                    //                       }
                    //                   ],
                    //                   "parameters": {
                    //                       "joins": [
                    //                           [
                    //                               {
                    //                                   "type": "id",
                    //                                   "value": "CountryCode"
                    //                               },
                    //                               {
                    //                                   "type": "id",
                    //                                   "value": "Year"
                    //                               }
                    //
                    //                           ],
                    //                           [
                    //                               {
                    //                                   "type": "id",
                    //                                   "value": "CountryCode"
                    //                               },
                    //                               {
                    //                                   "type": "id",
                    //                                   "value": "Year"
                    //                               }
                    //
                    //                           ]
                    //                       ],
                    //                       "values": [
                    //                       ]
                    //                   },
                    //                   "rid": {
                    //                       "uid": "filtered_join"
                    //                   }
                    //               },
                    //
                    //               {
                    //                   "name": "filter",
                    //                   "sid": [
                    //                       {
                    //                           "uid": "Uneca_PopulationNew"
                    //                       }
                    //                   ],
                    //                   "parameters": {
                    //                       "columns": [
                    //                           "CountryCode",
                    //                           "Year",
                    //                           "Value"
                    //                       ],
                    //                       "rows": {
                    //
                    //                           "IndicatorCode": {
                    //                               "codes": [
                    //                                   {
                    //                                       "uid": "UNECA_ClassificationOfActivities",
                    //                                       "codes": [
                    //                                           "010106"
                    //                                       ]
                    //                                   }
                    //                               ]
                    //                           },
                    //                           "CountryCode": {
                    //                               "codes": [
                    //                                   {
                    //                                       "uid": "ISO3",
                    //                                       "codes": [
                    //                                           "DZA"
                    //                                       ]
                    //                                   }
                    //                               ]
                    //                           }
                    //                       }
                    //                   },
                    //                   "rid": {
                    //                       "uid": "filtered_ds"
                    //                   }
                    //               },
                    //
                    //               {
                    //                   "name": "group",
                    //                   "sid": [
                    //                       {
                    //                           "uid": "filtered_ds"
                    //                       }
                    //                   ],
                    //                   "parameters": {
                    //                       "by": [                   //
                    //                           "CountryCode"
                    //                       ],
                    //                       "aggregations": [
                    //                           {
                    //                               "columns": [
                    //                                   "Year"
                    //                               ],
                    //                               "rule": "max"
                    //                           }
                    //                       ]
                    //                   },
                    //                   "rid": {
                    //                       "uid": "last_year_country"
                    //                   }
                    //               },
                    //               {
                    //                   "name": "group",
                    //                   "sid": [
                    //                       {
                    //                           "uid": "filtered_join"
                    //                       }
                    //                   ],
                    //                   "parameters": {
                    //                       "by": [
                    //                           "CountryCode"
                    //                       ],
                    //                       "aggregations": [
                    //                           {
                    //                               "columns": [
                    //                                   "filtered_ds_Value"
                    //                               ],
                    //                               "rule": "max"
                    //                           }
                    //                       ]
                    //                   }
                    //               }
                    //
                    //           ]
                    //  },
                    //
                    //
                    // {
                    //     //Life expectancy (years) 010108
                    //     id: "population-6", //ref [data-item=':id']
                    //     type: "chart", //chart || map || olap,
                    //     config: {
                    //         type: "column",
                    //         x: ["Year"], //x axis and series
                    //         series: ["CountryCode_EN"], //Y dimension
                    //         y: ["Value"],
                    //         aggregationFn: {"Value": "sum"}
                    //     }, // :type-creator config
                    //
                    //     filterFor: {
                    //         "filter_expectancy": ['CountryCode', 'Year']
                    //     },
                    //
                    //     postProcess: [
                    //         {
                    //             "name": "filter",
                    //             "sid": [
                    //                 {
                    //                     "uid": "Uneca_PopulationNew"
                    //                 }
                    //             ],
                    //             "parameters": {
                    //                 "columns": [
                    //                     "IndicatorCode",
                    //                     "CountryCode",
                    //                     "GenderCode",
                    //                     "AgeRangeCode",
                    //                     "Year",
                    //                     "Value"
                    //                 ],
                    //                 "rows": {
                    //
                    //                     "IndicatorCode": {
                    //                         "codes": [
                    //                             {
                    //                                 "uid": "UNECA_ClassificationOfActivities",
                    //                                 "codes": [
                    //                                     "010108"
                    //
                    //                                 ]
                    //                             }
                    //                         ]
                    //                     },
                    //                     "CountryCode": {
                    //                         "codes": [
                    //                             {
                    //                                 "uid": "ISO3",
                    //                                 "codes": [
                    //                                     "DZA"
                    //                                 ]
                    //                             }
                    //                         ]
                    //                     },
                    //
                    //
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
                    //             "rid":{"uid":"filter_expectancy"}
                    //         }
                    //     ]
                    // },
                    //
                    // {
                    //     //Urbanization rate (per cent) 010102
                    //     id: "population-7", //ref [data-item=':id']
                    //     type: "map", //chart || map || olap,
                    //     config: {
                    //         fenix_ui_map: {
                    //             guiController: {
                    //                 overlay: false,
                    //                 baselayer: false,
                    //                 wmsLoader: false
                    //             },
                    //             baselayers: {
                    //                 "cartodb": {
                    //                     title_en: "Baselayer",
                    //                     url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                    //                     subdomains: 'abcd',
                    //                     maxZoom: 19
                    //                 }
                    //             }
                    //         }
                    //     },
                    //      filter: { //FX-filter format
                    //          IndicatorCode: ["010102"],
                    //          Year: ["2013"],
                    //          "CountryCode": ["DZA"]
                    //      },
                    //      //filterFor: ["CountryCode"],
                    //      filterFor: {
                    //          "filtered_ds": ['CountryCode']
                    //      },
                    //      postProcess:[
                    //          {
                    //              "name": "join",
                    //              "sid": [
                    //                  {
                    //                      "uid": "filtered_ds"
                    //                  },
                    //                  {
                    //                      "uid": "last_year_country"
                    //                  }
                    //              ],
                    //              "parameters": {
                    //                  "joins": [
                    //                      [
                    //                          {
                    //                              "type": "id",
                    //                              "value": "CountryCode"
                    //                          },
                    //                          {
                    //                              "type": "id",
                    //                              "value": "Year"
                    //                          }
                    //
                    //                      ],
                    //                      [
                    //                          {
                    //                              "type": "id",
                    //                              "value": "CountryCode"
                    //                          },
                    //                          {
                    //                              "type": "id",
                    //                              "value": "Year"
                    //                          }
                    //
                    //                      ]
                    //                  ],
                    //                  "values": [
                    //                  ]
                    //              },
                    //              "rid": {
                    //                  "uid": "filtered_join"
                    //              }
                    //          },
                    //          {
                    //              "name": "filter",
                    //              "sid": [
                    //                  {
                    //                      "uid": "Uneca_PopulationNew"
                    //                  }
                    //              ],
                    //              "parameters": {
                    //                  "columns": [
                    //                      "CountryCode",
                    //                      "Year",
                    //                      "Value"
                    //                  ],
                    //                  "rows": {
                    //
                    //                      "IndicatorCode": {
                    //                          "codes": [
                    //                              {
                    //                                  "uid": "UNECA_ClassificationOfActivities",
                    //                                  "codes": [
                    //                                      "010102"
                    //                                  ]
                    //                              }
                    //                          ]
                    //                      },
                    //                      "CountryCode": {
                    //                          "codes": [
                    //                              {
                    //                                  "uid": "ISO3",
                    //                                  "codes": [
                    //                                      "DZA"
                    //                                  ]
                    //                              }
                    //                          ]
                    //                      }
                    //                  }
                    //              },
                    //              "rid": {
                    //                  "uid": "filtered_ds"
                    //              }
                    //          },
                    //
                    //          {
                    //              "name": "group",
                    //              "sid": [
                    //                  {
                    //                      "uid": "filtered_ds"
                    //                  }
                    //              ],
                    //              "parameters": {
                    //                  "by": [                   //
                    //                      "CountryCode"
                    //                  ],
                    //                  "aggregations": [
                    //                      {
                    //                          "columns": [
                    //                              "Year"
                    //                          ],
                    //                          "rule": "max"
                    //                      }
                    //                  ]
                    //              },
                    //              "rid": {
                    //                  "uid": "last_year_country"
                    //              }
                    //          },
                    //          {
                    //              "name": "group",
                    //              "sid": [
                    //                  {
                    //                      "uid": "filtered_join"
                    //                  }
                    //              ],
                    //              "parameters": {
                    //                  "by": [
                    //                      "CountryCode"
                    //                  ],
                    //                  "aggregations": [
                    //                      {
                    //                          "columns": [
                    //                              "filtered_ds_Value"
                    //                          ],
                    //                          "rule": "max"
                    //                      }
                    //                  ]
                    //              }
                    //          }
                    //
                    //      ]
                    //  }
                ]
            }]
        },

        "education": {

            filter: {

                CountryCode: {
                    className: 'col-md-6',
                    selector: {
                        id: "tree",
                        default: ["DZA"]
                    },

                    cl: {
                        uid: "UNECA_ISO3",

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

                        ],
                        default: ["2010"],
                        config: {
                            core: {
                                multiple: false
                            }
                        }
                    },

                    template: {
                        title: "Single selection",
                        hideHeader : true
                    }
                }

            },


            dashboard: {

                uid: "UNECA_Education",
                //version: "",
                //preProcess : {} //D3P process
                //postProcess : {} //D3P process
                items: [


                    {
                        id: "edu_1", //ref [data-item=':id']
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

                            IndicatorCode: ["010201"],
                            "GenderCode": ["3"],
                            "CountryCode": ["NAM", "MWI", "MLI", "MOZ"
                            ],
                            "Year": ["2010"]
                        }
                    },


                    {
                        id: "edu_2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["CountryCode_EN"], //x axis and series
                            series: ["GenderCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["010206"],
                            GenderCode: ["1", "2"],
                            "CountryCode": ["NAM", "MWI", "MLI", "MOZ"
                            ],
                            "Year": ["2010"]
                            //filterFor: ["Year"], // allowed dimension ids to filter,
                        }
                    },

                    {
                        id: "edu_3", //ref [data-item=':id']
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

                            IndicatorCode: ["010206"],
                            "GenderCode": ["3"],
                            "CountryCode": ["NAM", "MWI", "MLI", "MOZ"
                            ],
                            "Year": ["2010"]
                        }
                    },


                    {
                        id: "edu_4", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["CountryCode_EN"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["010201", "010202", "010203"],
                            GenderCode: ["3"],
                            "CountryCode": ["NAM", "MWI", "MLI", "MOZ"
                            ],
                            "Year": ["2010"]
                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
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

                        ],
                        //default: ["2012"],
                        config: {
                            core: {
                                multiple: false
                            }
                        }
                    },

                    template: {
                        title: "Single selection",
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
                    {
                        id: "health-1", //ref [data-item=':id']
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
                        id: "health-2", //ref [data-item=':id']
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
                        id: "health-3", //ref [data-item=':id']
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
                    },
                    {
                        id: "health-4", //ref [data-item=':id']
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
                            IndicatorCode: ["010311"],
                            Year: ["2013"],
                            "CountryCode": ["DZA"
                            ]
                        },

                        filterFor: ["CountryCode"],
                        // postProcess: [
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
                        //                 "uid": "UNECA_Health"
                        //             }
                        //         ],
                        //         "parameters": {
                        //             "columns": [
                        //                 "CountryCode",
                        //                 "Year",
                        //                 "Value",
                        //                 "Unit"
                        //             ],
                        //             "rows": {
                        //
                        //                 "IndicatorCode": {
                        //                     "codes": [
                        //                         {
                        //                             "uid": "UNECA_ClassificationOfActivities",
                        //                             "version":"2.0",
                        //                             "codes": [
                        //                                 "010311"
                        //                             ]
                        //                         }
                        //                     ]
                        //                 },
                        //                 "CountryCode": {
                        //                     "codes": [
                        //                         {
                        //                             "uid": "UNECA_ISO3",
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
                        id: "health-5", //ref [data-item=':id']
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
                            IndicatorCode: ["010312"],
                            Year: ["2013"],
                            "CountryCode": ["DZA"
                            ]
                        },

                        filterFor: ["CountryCode"],
                //         postProcess: [
                //         {
                //             "name": "join",
                //             "sid": [
                //                 {
                //                     "uid": "filtered_ds"
                //                 },
                //                 {
                //                     "uid": "last_year_country"
                //                 }
                //             ],
                //             "parameters": {
                //                 "joins": [
                //                     [
                //                         {
                //                             "type": "id",
                //                             "value": "CountryCode"
                //                         },
                //                         {
                //                             "type": "id",
                //                             "value": "Year"
                //                         }
                //
                //                     ],
                //                     [
                //                         {
                //                             "type": "id",
                //                             "value": "CountryCode"
                //                         },
                //                         {
                //                             "type": "id",
                //                             "value": "Year"
                //                         }
                //
                //                     ]
                //                 ],
                //                 "values": [
                //                 ]
                //             }
                //         },
                //
                //     {
                //         "name": "filter",
                //         "sid": [
                //             {
                //                 "uid": "UNECA_Health"
                //             }
                //         ],
                //         "parameters": {
                //             "columns": [
                //                 "CountryCode",
                //                 "Year",
                //                 "Value",
                //                 "Unit"
                //             ],
                //             "rows": {
                //
                //                 "IndicatorCode": {
                //                     "codes": [
                //                         {
                //                             "uid": "UNECA_ClassificationOfActivities",
                //                             "version":"2.0",
                //                             "codes": [
                //                                 "010312"
                //                             ]
                //                         }
                //                     ]
                //                 },
                //                 "CountryCode": {
                //                     "codes": [
                //                         {
                //                             "uid": "UNECA_ISO3",
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
// 010311 : Percentage of mothers provided at least one antenatal care
// 010312 : Percentage of deliveries attended by skilled health personnel
// 010301 : Percentage of children under-five and underweight

            },
                    {
                        id: "health-6", //ref [data-item=':id']
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
                        id: "health-7", //ref [data-item=':id']
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
                            IndicatorCode: ["010312"],
                            Year: ["2013"],
                            "CountryCode": ["DZA"
                            ]
                        },

                        filterFor: ["CountryCode"],
                        // postProcess: [
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
                        //                 "uid": "UNECA_Health"
                        //             }
                        //         ],
                        //         "parameters": {
                        //             "columns": [
                        //                 "CountryCode",
                        //                 "Year",
                        //                 "Value",
                        //                 "Unit"
                        //             ],
                        //             "rows": {
                        //
                        //                 "IndicatorCode": {
                        //                     "codes": [
                        //                         {
                        //                             "uid": "UNECA_ClassificationOfActivities",
                        //                             "version":"2.0",
                        //                             "codes": [
                        //                                 "010312"
                        //                             ]
                        //                         }
                        //                     ]
                        //                 },
                        //                 "CountryCode": {
                        //                     "codes": [
                        //                         {
                        //                             "uid": "UNECA_ISO3",
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

        "labour": {
            filter: {


                CountryCode: {
                    className: 'col-md-6',
                    selector: {
                        id: "tree"
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

                            {"value": "2011", "label": "2011", "selected": true},
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

                        ],
                        default: ["2010"],
                        config: {
                            core: {
                                multiple: false
                            }
                        }
                    },

                    template: {
                        title: "Single selection",
                        hideHeader : true
                    }
                }

            },

            dashboard: [
                {
                    uid: "UNECA_Labour",
                    //version: "",
                    //preProcess : {} //D3P process
                    //postProcess : {} //D3P process
                    items: [


                        //{
                        //    id: "labour-2", //ref [data-item=':id']
                        //    type: "chart", //chart || map || olap,
                        //    config: {
                        //        type: "column",
                        //        x: ["CountryCode_EN"], //x axis and series
                        //        series: ["SectorCode_EN"], //Y dimension
                        //        y: ["VALUE"],
                        //        aggregationFn: {"Value": "sum"}
                        //    }, // :type-creator config
                        //    filter: { //FX-filter format
                        //        IndicatorCode: ["010401"],
                        //        SectorCode : ["1","2","3"],
                        //        GenderCode : ["3"],
                        //        "CountryCode": ["KEN","TZA","ZMB","ETH"
                        //        ],
                        //        Year: ["2010"]
                        //    }
                        //    //filterFor: ["Year"], // allowed dimension ids to filter,
                        //},

                        {
                            id: "labour-3", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "column",
                                x: ["CountryCode_EN"], //x axis and series
                                series: ["GenderCode_EN"], //Y dimension
                                y: ["VALUE"],
                                aggregationFn: {"Value": "sum"}
                            }, // :type-creator config
                            filter: { //FX-filter format
                                IndicatorCode: ["010401"],
                                SectorCode: ["4"],
                                GenderCode: ["1", "2"],
                                "CountryCode": ["KEN", "TZA", "ZMB", "ETH"
                                ],
                                Year: ["2010"]
                            }
                            //filterFor: ["Year"], // allowed dimension ids to filter,
                        }
                    ]

                },


                {
                    uid: "ILO_Labour",
                    items: [
                        {
                            id: "labour-4", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "column_stacked",
                                x: ["CountryCode_EN"], //x axis and series
                                series: ["GenderCode_EN"], //Y dimension
                                y: ["Value"],
                                aggregationFn: {"Value": "sum"}
                            }, // :type-creator config
                            filter: { //FX-filter format
                                IndicatorCode: ["010404"],
                                Year: ["2010"],
                                GenderCode: ["1", "2"],
                                "CountryCode": ["KEN", "TZA", "ZMB", "ETH"
                                ]

                            }
                            //filterFor: ["Year"], // allowed dimension ids to filter,
                        },


                        //sarebbe meglio mappa 010402


                        {
                            id: "labour-5", //ref [data-item=':id']
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

                                IndicatorCode: ["010402"],
                                "GenderCode": ["3"],
                                "CountryCode": ["KEN", "TZA", "ZMB", "ETH"
                                ],
                                Year: ["2010"]
                            }
                        },


                        //{
                        //    id: "labour-5", //ref [data-item=':id']
                        //    type: "chart", //chart || map || olap,
                        //    config: {
                        //        type: "column",
                        //        x: ["CountryCode_EN"], //x axis and series
                        //        series: ["IndicatorCode_EN"], //Y dimension
                        //        y: ["Value"],
                        //        aggregationFn: {"Value": "sum"}
                        //    }, // :type-creator config
                        //    filter: { //FX-filter format
                        //        IndicatorCode: ["010402"],
                        //        GenderCode: ["3"]
                        //    }
                        //    //filterFor: ["Year"], // allowed dimension ids to filter,
                        //},


                        {
                            id: "labour-6", //ref [data-item=':id']
                            type: "chart", //chart || map || olap,
                            config: {
                                type: "column_stacked",
                                x: ["CountryCode_EN"], //x axis and series
                                series: ["GenderCode_EN"], //Y dimension
                                y: ["Value"],
                                aggregationFn: {"Value": "sum"}
                            }, // :type-creator config
                            filter: { //FX-filter format
                                IndicatorCode: ["010402"],
                                GenderCode: ["1", "2"],
                                "CountryCode": ["KEN", "TZA", "ZMB", "ETH"
                                ],
                                Year: ["2010"]
                            }
                            //filterFor: ["Year"], // allowed dimension ids to filter,
                        }

                    ]

                }


            ]


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

                        ],
                        config: {
                            core: {
                                multiple: false
                            }
                        }
                    },

                    template: {
                        title: "Single selection",
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
                        id: "BOP-1", //ref [data-item=':id']
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
                        id: "BOP-2", //ref [data-item=':id']
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
                            "filter_capital": ['CountryCode', 'Year']
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
                                        }
                                    }
                                },
                                "rid":{"uid":"filter_capital"}
                            }
                        ]



                    },
                    {
                        id: "BOP-3", //ref [data-item=':id']
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
                            "filter_finan": ['CountryCode', 'Year']
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

                        ],
                        //default: ["2012"],
                        config: {
                            core: {
                                multiple: false
                            }
                        }
                    },

                    template: {
                        title: "Single selection",
                        hideHeader : true
                    }
                }


            },

            dashboard: [

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
                            id: "gdp-1", //ref [data-item=':id']
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
                            id: "gdp-2", //ref [data-item=':id']
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
                            id: "gdp-3", //ref [data-item=':id']
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

            ]


        },

        //"expenditure_gdp": {
        //
        //    dashboard: [
        //
        //
        //        { uid: "UNECA_ExpenditureGDPCurrent",
        //            items: [
        //                {
        //                    id: "expenditure-1", //ref [data-item=':id']
        //                    type: "chart", //chart || map || olap,
        //                    config: {
        //                        type: "column",
        //                        x: ["Year"], //x axis and series
        //                        series: ["IndicatorCode_EN"], //Y dimension
        //                        y: ["Value"],
        //                        aggregationFn: {"Value": "sum"}
        //                    }, // :type-creator config
        //                    filter: { //FX-filter format
        //                        IndicatorCode: ["0207020103"]
        //                    }
        //                    //filterFor: ["Year"], // allowed dimension ids to filter,
        //                },
        //
        //
        //
        //
        //
        //                {
        //                    id: "expenditure-2", //ref [data-item=':id']
        //                    type: "chart", //chart || map || olap,
        //                    config: {
        //                        type: "column",
        //                        x: ["Year"], //x axis and series
        //                        series: ["IndicatorCode_EN"], //Y dimension
        //                        y: ["Value"],
        //                        aggregationFn: {"Value": "sum"}
        //                    }, // :type-creator config
        //                    filter: { //FX-filter format
        //                        IndicatorCode: ["020702010301"]
        //                    }
        //                    //filterFor: ["Year"], // allowed dimension ids to filter,
        //                },
        //
        //
        //                {
        //                    id: "expenditure-3", //ref [data-item=':id']
        //                    type: "chart", //chart || map || olap,
        //                    config: {
        //                        type: "line",
        //                        x: ["Year"], //x axis and series
        //                        series: ["IndicatorCode_EN"], //Y dimension
        //                        y: ["Value"],
        //                        aggregationFn: {"Value": "sum"}
        //                    }, // :type-creator config
        //                    filter: { //FX-filter format
        //                        IndicatorCode: ["02070207"]
        //
        //                    }
        //                    //filterFor: ["Year"], // allowed dimension ids to filter,
        //                },
        //                {
        //                    id: "expenditure-4", //ref [data-item=':id']
        //                    type: "chart", //chart || map || olap,
        //                    config: {
        //                        type: "line",
        //                        x: ["Year"], //x axis and series
        //                        series: ["IndicatorCode_EN"], //Y dimension
        //                        y: ["Value"],
        //                        aggregationFn: {"Value": "sum"}
        //                    }, // :type-creator config
        //                    filter: { //FX-filter format
        //                        IndicatorCode: ["02070208"]
        //
        //                    }
        //                    //filterFor: ["Year"], // allowed dimension ids to filter,
        //                }
        //
        //
        //
        //
        //            ]
        //
        //
        //        },
        //
        //
        //        {
        //            uid: "UNECA_ExpenditureGDPCostant",
        //            //version: "",
        //            //preProcess : {} //D3P process
        //            //postProcess : {} //D3P process
        //            items: [
        //                {
        //                    id: "expenditure-5", //ref [data-item=':id']
        //                    type: "chart", //chart || map || olap,
        //                    config: {
        //                        type: "column",
        //                        x: ["Year"], //x axis and series
        //                        series: ["IndicatorCode_EN"], //Y dimension
        //                        y: ["Value"],
        //                        aggregationFn: {"Value": "sum"}
        //                    }, // :type-creator config
        //                    filter: { //FX-filter format
        //                        IndicatorCode: ["0207010103"]
        //                    }
        //                    //filterFor: ["Year"], // allowed dimension ids to filter,
        //                },
        //
        //
        //
        //
        //
        //                {
        //                    id: "expenditure-6", //ref [data-item=':id']
        //                    type: "chart", //chart || map || olap,
        //                    config: {
        //                        type: "column",
        //                        x: ["Year"], //x axis and series
        //                        series: ["IndicatorCode_EN"], //Y dimension
        //                        y: ["Value"],
        //                        aggregationFn: {"Value": "sum"}
        //                    }, // :type-creator config
        //                    filter: { //FX-filter format
        //                        IndicatorCode: ["020701010301"]
        //                    }
        //                    //filterFor: ["Year"], // allowed dimension ids to filter,
        //                },
        //
        //
        //                {
        //                    id: "expenditure-7", //ref [data-item=':id']
        //                    type: "chart", //chart || map || olap,
        //                    config: {
        //                        type: "line",
        //                        x: ["Year"], //x axis and series
        //                        series: ["IndicatorCode_EN"], //Y dimension
        //                        y: ["Value"],
        //                        aggregationFn: {"Value": "sum"}
        //                    }, // :type-creator config
        //                    filter: { //FX-filter format
        //                        IndicatorCode: ["02070107"]
        //
        //                    }
        //                    //filterFor: ["Year"], // allowed dimension ids to filter,
        //                },
        //                {
        //                    id: "expenditure-8", //ref [data-item=':id']
        //                    type: "chart", //chart || map || olap,
        //                    config: {
        //                        type: "line",
        //                        x: ["Year"], //x axis and series
        //                        series: ["IndicatorCode_EN"], //Y dimension
        //                        y: ["Value"],
        //                        aggregationFn: {"Value": "sum"}
        //                    }, // :type-creator config
        //                    filter: { //FX-filter format
        //                        IndicatorCode: ["02070108"]
        //
        //                    }
        //                    //filterFor: ["Year"], // allowed dimension ids to filter,
        //                }
        //
        //
        //
        //
        //
        //            ]
        //
        //        }
        //
        //
        //
        //
        //
        //    ]
        //
        //
        //},

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

                        ],
                        config: {
                            core: {
                                multiple: false
                            }
                        }
                    },

                    template: {
                        title: "Single selection",
                        hideHeader : true
                    }
                }

            },


            dashboard: [{

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
                        id: "monetary-1", //ref [data-item=':id']
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
                        id: "monetary-2", //ref [data-item=':id']
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
                        id: "monetary-3", //ref [data-item=':id']
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
            }]
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

                        ],
                        // default: ["2013"],
                        config: {
                            core: {
                                multiple: false
                            }
                        }
                    },

                    template: {
                        title: "Single selection",
                        hideHeader : true
                    }
                }

            },


            dashboard: [{

                uid: "UNECA_PublicFinance",
                items: [

                    {
                        id: "finance-1", //ref [data-item=':id']
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
                        id: "finance-2", //ref [data-item=':id']
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
                        id: "finance-3", //ref [data-item=':id']
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
            }]
        },

        "debt": {
            filter: {


                CountryCode: {
                    className: 'col-md-6',
                    selector: {
                        id: "tree"
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

                        ],
                        default: ["2013"],
                        config: {
                            core: {
                                multiple: false
                            }
                        }
                    },

                    template: {
                        title: "Single selection",
                        hideHeader : true
                    }
                }

            },
            dashboard: {

                uid: "UNECA_Debt",

                items: [

                    {
                        id: "debt-1", //ref [data-item=':id']
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

                            IndicatorCode: ["020305"],

                            "CountryCode": ["KEN", "TZA", "ZMB", "ETH"
                            ],
                            "Year": ["2013"]
                        }


                        //postProcess : [{  "name": "filter",
                        //    "parameters": {
                        //        "rows": {
                        //            "IndicatorCode": {
                        //                "codes": [
                        //                    {
                        //                        "uid": "UNECA_ClassificationOfActivities",
                        //                        "version": "2.0",
                        //                        "codes": [
                        //                            "020305"
                        //                        ]
                        //                    }
                        //                ]
                        //            }
                        //        }
                        //    }
                        //},
                        //    {
                        //        "name": "unecaPercentageGDP"}]
                    },


                    {
                        id: "debt-2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column_stacked",
                            x: ["CountryCode_EN"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["02030501", "02030502"],

                            "CountryCode": ["KEN", "TZA", "ZMB", "ETH"
                            ],
                            "Year": ["2013"]


                        }

                        //  filterFor: ["IndicatorCode", "CountryCode","Year"]
                        // allowed dimension ids to filter,
                    }


                ]
            }

        },
        "energy": {

            dashboard: {

                uid: "UNSD_EnergyData",

                items: [

                    {
                        id: "energy-1", //ref [data-item=':id']
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
                        id: "energy-2", //ref [data-item=':id']
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
                        id: "energy-3", //ref [data-item=':id']
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

                        ],
                        config: {
                            core: {
                                multiple: false
                            }
                        }
                    },

                    template: {
                        title: "Single selection",
                        hideHeader : true
                    }
                }

            },
            dashboard: {

                uid: "UNECA_Poverty",

                items: [
                    {
                        id: "poverty-1", //ref [data-item=':id']
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
                            IndicatorCode: ["030306"],
                            Year: ["2013"],
                            "CountryCode": ["DZA"
                            ]
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
                                                    "codes": [
                                                        "030306"
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
                        id: "poverty-2", //ref [data-item=':id']
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
                        id: "poverty-3", //ref [data-item=':id']
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

        "financial_flows": {

            dashboard: [{


                //data cube's uid
                uid: "UNECA_FinancialFlows",


                items: [

                    {
                        id: "financial_flows-1", //ref [data-item=':id']
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
                        id: "financial_flows-2", //ref [data-item=':id']
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
                        id: "financial_flows-3", //ref [data-item=':id']
                        type: "map", //chart || map || olap,
                        config: {
                            container: "#financial_flows-3",
                            geoSubject: 'PartnerCode',
                            leaflet: {
                                zoomControl: false,
                                attributionControl: true,
                                scrollWheelZoom: false,
                                minZoom: 2
                            }

                        }, // :type-creator config
                        filter: { //FX-filter format

                            "Year": [2012],
                            "IndicatorCode": ["02100101"],
                            "PartnerCode": [
                                "DEU", "FRA", "AUT", "CAN", "USA", "NLD", "GBR", "ITA", "ESP", "JPN", "LUX", "DNK", "KOR", "NOR", "TUR", "SVN", "IRL", "POL", "CHL", "SWE", "CZE", "HUN", "PRT", "ARE", "BEL", "CHE", "AUS", "SVK", "POL", "GRC"
                            ]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },
                    {
                        id: "financial_flows-4", //ref [data-item=':id']
                        type: "map", //chart || map || olap,
                        config: {
                            container: "#financial_flows-3",
                            geoSubject: 'PartnerCode',
                            leaflet: {
                                zoomControl: false,
                                attributionControl: true,
                                scrollWheelZoom: false,
                                minZoom: 2
                            }

                        }, // :type-creator config
                        filter: { //FX-filter format

                            "Year": [2012],
                            "IndicatorCode": ["020501"],
                            "PartnerCode": [
                                "DEU", "FRA", "AUT", "CAN", "USA", "NLD", "GBR", "ITA", "ESP", "JPN", "LUX", "DNK", "KOR", "NOR", "TUR", "SVN", "IRL", "POL", "CHL", "SWE", "CZE", "HUN", "PRT", "ARE", "BEL", "CHE", "AUS", "SVK", "POL", "GRC"
                            ]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    }



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


        "inflation": {

            filter: {

                CountryCode: {

                    className: 'col-md-6',

                    selector: {
                        id: "tree"
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

                        ],
                        // default: ["2013"],
                        config: {
                            core: {
                                multiple: false
                            }
                        }
                    },

                    template: {
                        title: "Single selection",
                        hideHeader : true
                    }
                }

            },


            dashboard: [{

                uid: "UNECA_Inflation",
                items: [

                    {
                        id: "inflation-1", //ref [data-item=':id']
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
            }]
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

                        ],
                        // default: ["2013"],
                        config: {
                            core: {
                                multiple: false
                            }
                        }
                    },

                    template: {
                        title: "Single selection",
                        hideHeader : true
                    }
                }

            },


            dashboard: [{

                uid: "UNECA_Tourism",
                items: [

                    {
                        id: "tourism-1", //ref [data-item=':id']
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
                        id: "tourism-2", //ref [data-item=':id']
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
                        id: "tourism-3", //ref [data-item=':id']
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
            }]
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

                        ],
                        //default: ["2012"],
                        config: {
                            core: {
                                multiple: false
                            }
                        }
                    },

                    template: {
                        title: "Single selection",
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
                        id: "infrastructure-1", //ref [data-item=':id']
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
                        id: "infrastructure-2", //ref [data-item=':id']
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
        /*,
        "inflation": {

            filter: {

                CommodityCode: {
                    className: 'col-md-12',
                    selector: {
                        id: "tree"
                    },

                    cl: {
                        uid: "UNECA_KindOfCommodity",


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
                        id: "inflation-1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["021101"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },
                    {
                        id: "inflation-2", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["02110114"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },


                    {
                        id: "inflation-3", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            series: ["IndicatorCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["02110115"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    },

                    {
                        id: "inflation-4", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["Year"], //x axis and series
                            series: ["CommodityCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["021102"]

                        }
                        //filterFor: ["Year"], // allowed dimension ids to filter,
                    }


                ]

            }


        }*/


    }

});