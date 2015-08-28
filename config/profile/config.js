/*global define*/

define(function () {
    return {

        "resume" : {
            //data cube's uid
            uid: "resume",

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
                    id: 'item-1',
                    type: 'map',
                    class: "fx-map-chart",
                    //needed if layout = injected
                    container: "#item-1",
                    config: {
                        container: "#item-1"
                    },
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 2015,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "Forest"
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
                    id: 'item-2',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-2",
                    config: {
                        container: "#item-2",
                        adapter: {
                            type: "standard",
                            xDimensions: 'time',
                            yDimensions: 'element',
                            valueDimensions: 'value',
                            seriesDimensions: ['country']
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
                                    "year": {
                                        "time": [
                                            {
                                                "from": 2015,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "Forest"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "value": "DESC"
                            }
                        },
                        {
                            "name": "page",
                            "parameters": {
                                "perPage": 25,
                                "page": 1
                            }
                        }
                    ]
                },
                {
                    id: 'item-3',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-3",
                    config: {
                        container: "#item-3",
                        adapter: {
                            type: "standard",
                            xDimensions: 'year',
                            yDimensions: 'indicator',
                            valueDimensions: 'value',
                            seriesDimensions: ['region']
                        },
                        template: {},
                        creator: {
                            chartObj: {
                                chart: {
                                    type: "column"
                                },
                                tooltip: {
                                    crosshairs: "mixed",
                                    shared: true
                                }
                            }
                        }
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: ['indicator'],
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 1990,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "Forest"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "group",
                            "parameters": {
                                "by": [
                                    "region", "year", "indicator"
                                ],
                                "aggregations": [
                                    {
                                        "columns": ["value"],
                                        "rule": "AVG"
                                    }
                                ]
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "region": "ASC",
                                "year": "ASC"
                            }
                        }
                    ]
                },
                {
                    id: 'item-7',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-7",
                    config: {
                        container: "#item-7",
                        adapter: {
                            type: "pie",
                            valueDimensions: 'value',
                            seriesDimensions: ['region']
                        },
                        template: {},
                        creator: {
                            chartObj: {
                                chart: {
                                    type: "column"
                                },
                                tooltip: {
                                    crosshairs: "mixed",
                                    shared: true
                                }
                            }
                        }
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: ['indicator', 'year'],
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 2015,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "Forest"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "group",
                            "parameters": {
                                "by": [
                                    "region", "indicator"
                                ],
                                "aggregations": [
                                    {
                                        "columns": ["value"],
                                        "rule": "AVG"
                                    }
                                ]
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "region": "ASC"
                            }
                        }
                    ]
                },
                {
                    id: 'item-4',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-4",
                    config: {
                        container: "#item-4",
                        adapter: {
                            type: "standard",
                            xDimensions: 'year',
                            yDimensions: 'indicator',
                            valueDimensions: 'value',
                            seriesDimensions: ['subregion']
                        },
                        template: {},
                        creator: {
                            chartObj: {
                                chart: {
                                    type: "column"
                                },
                                tooltip: {
                                    crosshairs: "mixed",
                                    shared: true
                                }
                            }
                        }
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: ['indicator'],
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 1990,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "Forest"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "group",
                            "parameters": {
                                "by": [
                                    "subregion", "year", "indicator"
                                ],
                                "aggregations": [
                                    {
                                        "columns": ["value"],
                                        "rule": "AVG"
                                    }
                                ]
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "subregion": "ASC",
                                "year": "ASC"
                            }
                        }
                    ]
                },
                {
                    id: 'item-5',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-5",
                    config: {
                        container: "#item-5",
                        adapter: {
                            type: "standard",
                            xDimensions: 'year',
                            yDimensions: 'indicator',
                            valueDimensions: 'value',
                            seriesDimensions: ['domain']
                        },
                        template: {},
                        creator: {
                            chartObj: {
                                chart: {
                                    type: "column"
                                },
                                tooltip: {
                                    crosshairs: "mixed",
                                    shared: true
                                }
                            }
                        }
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: ['indicator'],
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 1990,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "Forest"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "group",
                            "parameters": {
                                "by": [
                                    "domain", "year", "indicator"
                                ],
                                "aggregations": [
                                    {
                                        "columns": ["value"],
                                        "rule": "AVG"
                                    }
                                ]
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "domain": "ASC",
                                "year": "ASC"
                            }
                        }
                    ]
                },
                {
                    id: 'item-6',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-6",
                    config: {
                        container: "#item-6",
                        adapter: {
                            type: "standard",
                            xDimensions: 'year',
                            yDimensions: 'indicator',
                            valueDimensions: 'value',
                            seriesDimensions: ['incomes']
                        },
                        template: {},
                        creator: {
                            chartObj: {
                                chart: {
                                    type: "column"
                                },
                                tooltip: {
                                    crosshairs: "mixed",
                                    shared: true
                                }
                            }
                        }
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: ['indicator'],
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 1990,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "Forest"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "group",
                            "parameters": {
                                "by": [
                                    "incomes", "year", "indicator"
                                ],
                                "aggregations": [
                                    {
                                        "columns": ["value"],
                                        "rule": "AVG"
                                    }
                                ]
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "incomes": "ASC",
                                "year": "ASC"
                            }
                        }
                    ]
                },
                {
                    id: 'item-8',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-8",
                    config: {
                        container: "#item-8",
                        adapter: {
                            type: "pie",
                            valueDimensions: 'value',
                            seriesDimensions: ['subregion']
                        },
                        template: {},
                        creator: {
                            chartObj: {
                                chart: {
                                    type: "column"
                                },
                                tooltip: {
                                    crosshairs: "mixed",
                                    shared: true
                                }
                            }
                        }
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: ['indicator', 'year'],
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 2015,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "Forest"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "group",
                            "parameters": {
                                "by": [
                                    "subregion", "indicator"
                                ],
                                "aggregations": [
                                    {
                                        "columns": ["value"],
                                        "rule": "AVG"
                                    }
                                ]
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "subregion": "ASC"
                            }
                        }
                    ]
                },
                {
                    id: 'item-9',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-9",
                    config: {
                        container: "#item-9",
                        adapter: {
                            type: "pie",
                            valueDimensions: 'value',
                            seriesDimensions: ['domain']
                        },
                        template: {},
                        creator: {
                            chartObj: {
                                chart: {
                                    type: "column"
                                },
                                tooltip: {
                                    crosshairs: "mixed",
                                    shared: true
                                }
                            }
                        }
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: ['indicator', 'year'],
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 2015,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "Forest"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "group",
                            "parameters": {
                                "by": [
                                    "domain", "indicator"
                                ],
                                "aggregations": [
                                    {
                                        "columns": ["value"],
                                        "rule": "AVG"
                                    }
                                ]
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "domain": "ASC"
                            }
                        }
                    ]
                },
                {
                    id: 'item-10',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-10",
                    config: {
                        container: "#item-10",
                        adapter: {
                            type: "pie",
                            valueDimensions: 'value',
                            seriesDimensions: ['incomes']
                        },
                        template: {},
                        creator: {
                            chartObj: {
                                chart: {
                                    type: "column"
                                },
                                tooltip: {
                                    crosshairs: "mixed",
                                    shared: true
                                }
                            }
                        }
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: ['indicator', 'year'],
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 2015,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "Forest"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "group",
                            "parameters": {
                                "by": [
                                    "incomes", "indicator"
                                ],
                                "aggregations": [
                                    {
                                        "columns": ["value"],
                                        "rule": "AVG"
                                    }
                                ]
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "incomes": "ASC"
                            }
                        }
                    ]
                }
            ]


        },
        "FLUDE_TOPIC_1": {
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

            items: [
                {
                    id: 'item-1',
                    type: 'map',
                    class: "fx-map-chart",
                    //needed if layout = injected
                    container: "#item-1",
                    config: {
                        container: "#item-1"
                    },
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 2015,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "Forest"
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
                    id: 'item-2',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-2",
                    config: {
                        container: "#item-2",
                        adapter: {
                            type: "standard",
                            xDimensions: 'time',
                            yDimensions: 'element',
                            valueDimensions: 'value',
                            seriesDimensions: ['country']
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
                                    "year": {
                                        "time": [
                                            {
                                                "from": 2015,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "Forest"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "value": "DESC"
                            }
                        },
                        {
                            "name": "page",
                            "parameters": {
                                "perPage": 25,
                                "page": 1
                            }
                        }
                    ]
                },
                {
                    id: 'item-3',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-3",
                    config: {
                        container: "#item-3",
                        adapter: {
                            type: "standard",
                            xDimensions: 'year',
                            yDimensions: 'indicator',
                            valueDimensions: 'value',
                            seriesDimensions: ['region']
                        },
                        template: {},
                        creator: {
                            chartObj: {
                                chart: {
                                    type: "column"
                                },
                                tooltip: {
                                    crosshairs: "mixed",
                                    shared: true
                                }
                            }
                        }
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: ['indicator'],
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 1990,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "Forest"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "group",
                            "parameters": {
                                "by": [
                                    "region", "year", "indicator"
                                ],
                                "aggregations": [
                                    {
                                        "columns": ["value"],
                                        "rule": "AVG"
                                    }
                                ]
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "region": "ASC",
                                "year": "ASC"
                            }
                        }
                    ]
                },
                {
                    id: 'item-7',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-7",
                    config: {
                        container: "#item-7",
                        adapter: {
                            type: "pie",
                            valueDimensions: 'value',
                            seriesDimensions: ['region']
                        },
                        template: {},
                        creator: {
                            chartObj: {
                                chart: {
                                    type: "column"
                                },
                                tooltip: {
                                    crosshairs: "mixed",
                                    shared: true
                                }
                            }
                        }
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: ['indicator', 'year'],
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 2015,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "Forest"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "group",
                            "parameters": {
                                "by": [
                                    "region", "indicator"
                                ],
                                "aggregations": [
                                    {
                                        "columns": ["value"],
                                        "rule": "AVG"
                                    }
                                ]
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "region": "ASC"
                            }
                        }
                    ]
                },
                {
                    id: 'item-4',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-4",
                    config: {
                        container: "#item-4",
                        adapter: {
                            type: "standard",
                            xDimensions: 'year',
                            yDimensions: 'indicator',
                            valueDimensions: 'value',
                            seriesDimensions: ['subregion']
                        },
                        template: {},
                        creator: {
                            chartObj: {
                                chart: {
                                    type: "column"
                                },
                                tooltip: {
                                    crosshairs: "mixed",
                                    shared: true
                                }
                            }
                        }
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: ['indicator'],
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 1990,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "Forest"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "group",
                            "parameters": {
                                "by": [
                                    "subregion", "year", "indicator"
                                ],
                                "aggregations": [
                                    {
                                        "columns": ["value"],
                                        "rule": "AVG"
                                    }
                                ]
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "subregion": "ASC",
                                "year": "ASC"
                            }
                        }
                    ]
                },
                {
                    id: 'item-5',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-5",
                    config: {
                        container: "#item-5",
                        adapter: {
                            type: "standard",
                            xDimensions: 'year',
                            yDimensions: 'indicator',
                            valueDimensions: 'value',
                            seriesDimensions: ['domain']
                        },
                        template: {},
                        creator: {
                            chartObj: {
                                chart: {
                                    type: "column"
                                },
                                tooltip: {
                                    crosshairs: "mixed",
                                    shared: true
                                }
                            }
                        }
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: ['indicator'],
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 1990,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "Forest"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "group",
                            "parameters": {
                                "by": [
                                    "domain", "year", "indicator"
                                ],
                                "aggregations": [
                                    {
                                        "columns": ["value"],
                                        "rule": "AVG"
                                    }
                                ]
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "domain": "ASC",
                                "year": "ASC"
                            }
                        }
                    ]
                },
                {
                    id: 'item-6',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-6",
                    config: {
                        container: "#item-6",
                        adapter: {
                            type: "standard",
                            xDimensions: 'year',
                            yDimensions: 'indicator',
                            valueDimensions: 'value',
                            seriesDimensions: ['incomes']
                        },
                        template: {},
                        creator: {
                            chartObj: {
                                chart: {
                                    type: "column"
                                },
                                tooltip: {
                                    crosshairs: "mixed",
                                    shared: true
                                }
                            }
                        }
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: ['indicator'],
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 1990,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "Forest"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "group",
                            "parameters": {
                                "by": [
                                    "incomes", "year", "indicator"
                                ],
                                "aggregations": [
                                    {
                                        "columns": ["value"],
                                        "rule": "AVG"
                                    }
                                ]
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "incomes": "ASC",
                                "year": "ASC"
                            }
                        }
                    ]
                },
                {
                    id: 'item-8',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-8",
                    config: {
                        container: "#item-8",
                        adapter: {
                            type: "pie",
                            valueDimensions: 'value',
                            seriesDimensions: ['subregion']
                        },
                        template: {},
                        creator: {
                            chartObj: {
                                chart: {
                                    type: "column"
                                },
                                tooltip: {
                                    crosshairs: "mixed",
                                    shared: true
                                }
                            }
                        }
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: ['indicator', 'year'],
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 2015,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "Forest"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "group",
                            "parameters": {
                                "by": [
                                    "subregion", "indicator"
                                ],
                                "aggregations": [
                                    {
                                        "columns": ["value"],
                                        "rule": "AVG"
                                    }
                                ]
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "subregion": "ASC"
                            }
                        }
                    ]
                },
                {
                    id: 'item-9',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-9",
                    config: {
                        container: "#item-9",
                        adapter: {
                            type: "pie",
                            valueDimensions: 'value',
                            seriesDimensions: ['domain']
                        },
                        template: {},
                        creator: {
                            chartObj: {
                                chart: {
                                    type: "column"
                                },
                                tooltip: {
                                    crosshairs: "mixed",
                                    shared: true
                                }
                            }
                        }
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: ['indicator', 'year'],
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 2015,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "Forest"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "group",
                            "parameters": {
                                "by": [
                                    "domain", "indicator"
                                ],
                                "aggregations": [
                                    {
                                        "columns": ["value"],
                                        "rule": "AVG"
                                    }
                                ]
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "domain": "ASC"
                            }
                        }
                    ]
                },
                {
                    id: 'item-10',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-10",
                    config: {
                        container: "#item-10",
                        adapter: {
                            type: "pie",
                            valueDimensions: 'value',
                            seriesDimensions: ['incomes']
                        },
                        template: {},
                        creator: {
                            chartObj: {
                                chart: {
                                    type: "column"
                                },
                                tooltip: {
                                    crosshairs: "mixed",
                                    shared: true
                                }
                            }
                        }
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: ['indicator', 'year'],
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 2015,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "Forest"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "group",
                            "parameters": {
                                "by": [
                                    "incomes", "indicator"
                                ],
                                "aggregations": [
                                    {
                                        "columns": ["value"],
                                        "rule": "AVG"
                                    }
                                ]
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "incomes": "ASC"
                            }
                        }
                    ]
                }
            ]


        },

        "FLUDE_TOPIC_2": {

            //data cube's uid
            uid: "FLUDE_TOPIC_2",

            //data base filter
            filter: [],

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
                    id: 'item-2',
                    type: 'map',
                    class: "fx-map-chart",
                    //needed if layout = injected
                    container: "#item-2",
                    config: {
                        container: "#item-2"
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: ['indicator', 'year', 'domain', 'incomes', 'subregion'],
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 2015,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "ProdFor"
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
                    id: 'item-1',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-1",
                    config: {
                        container: "#item-1",
                        adapter: {
                            type: "standard",
                            xDimensions: 'time',
                            yDimensions: 'element',
                            valueDimensions: 'value',
                            seriesDimensions: ['country']
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
                    allowedFilter: ['indicator', 'year', 'domain', 'incomes', 'subregion'],
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 2015,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "ProdFor"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "value": "DESC"
                            }
                        },
                        {
                            "name": "page",
                            "parameters": {
                                "perPage": 25,
                                "page": 1
                            }
                        }
                    ]
                },
                {
                    id: 'item-3',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-3",
                    config: {
                        container: "#item-3",
                        adapter: {
                            type: "standard",
                            xDimensions: 'year',
                            yDimensions: 'indicator',
                            valueDimensions: 'value',
                            seriesDimensions: ['region']
                        },
                        template: {},
                        creator: {
                            chartObj: {
                                chart: {
                                    type: "column"
                                },
                                tooltip: {
                                    crosshairs: "mixed",
                                    shared: true
                                }
                            }
                        }
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: ['indicator'],
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 1990,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "ProdFor"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "group",
                            "parameters": {
                                "by": [
                                    "region", "year", "indicator"
                                ],
                                "aggregations": [
                                    {
                                        "columns": ["value"],
                                        "rule": "AVG"
                                    }
                                ]
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "region": "ASC",
                                "year": "ASC"
                            }
                        }
                    ]
                },
                {
                    id: 'item-7',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-7",
                    config: {
                        container: "#item-7",
                        adapter: {
                            type: "pie",
                            valueDimensions: 'value',
                            seriesDimensions: ['region']
                        },
                        template: {},
                        creator: {
                            chartObj: {
                                chart: {
                                    type: "column"
                                },
                                tooltip: {
                                    crosshairs: "mixed",
                                    shared: true
                                }
                            }
                        }
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: ['indicator', 'year'],
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 2015,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "ProdFor"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "group",
                            "parameters": {
                                "by": [
                                    "region", "indicator"
                                ],
                                "aggregations": [
                                    {
                                        "columns": ["value"],
                                        "rule": "AVG"
                                    }
                                ]
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "region": "ASC"
                            }
                        }
                    ]
                },
                {
                    id: 'item-4',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-4",
                    config: {
                        container: "#item-4",
                        adapter: {
                            type: "standard",
                            xDimensions: 'year',
                            yDimensions: 'indicator',
                            valueDimensions: 'value',
                            seriesDimensions: ['subregion']
                        },
                        template: {},
                        creator: {
                            chartObj: {
                                chart: {
                                    type: "column"
                                },
                                tooltip: {
                                    crosshairs: "mixed",
                                    shared: true
                                }
                            }
                        }
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: ['indicator'],
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 1990,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "ProdFor"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "group",
                            "parameters": {
                                "by": [
                                    "subregion", "year", "indicator"
                                ],
                                "aggregations": [
                                    {
                                        "columns": ["value"],
                                        "rule": "AVG"
                                    }
                                ]
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "subregion": "ASC",
                                "year": "ASC"
                            }
                        }
                    ]
                },
                {
                    id: 'item-5',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-5",
                    config: {
                        container: "#item-5",
                        adapter: {
                            type: "standard",
                            xDimensions: 'year',
                            yDimensions: 'indicator',
                            valueDimensions: 'value',
                            seriesDimensions: ['domain']
                        },
                        template: {},
                        creator: {
                            chartObj: {
                                chart: {
                                    type: "column"
                                },
                                tooltip: {
                                    crosshairs: "mixed",
                                    shared: true
                                }
                            }
                        }
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: ['indicator'],
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 1990,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "ProdFor"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "group",
                            "parameters": {
                                "by": [
                                    "domain", "year", "indicator"
                                ],
                                "aggregations": [
                                    {
                                        "columns": ["value"],
                                        "rule": "AVG"
                                    }
                                ]
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "domain": "ASC",
                                "year": "ASC"
                            }
                        }
                    ]
                },
                {
                    id: 'item-6',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-6",
                    config: {
                        container: "#item-6",
                        adapter: {
                            type: "standard",
                            xDimensions: 'year',
                            yDimensions: 'indicator',
                            valueDimensions: 'value',
                            seriesDimensions: ['incomes']
                        },
                        template: {},
                        creator: {
                            chartObj: {
                                chart: {
                                    type: "column"
                                },
                                tooltip: {
                                    crosshairs: "mixed",
                                    shared: true
                                }
                            }
                        }
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: ['indicator'],
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 1990,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "ProdFor"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "group",
                            "parameters": {
                                "by": [
                                    "incomes", "year", "indicator"
                                ],
                                "aggregations": [
                                    {
                                        "columns": ["value"],
                                        "rule": "AVG"
                                    }
                                ]
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "incomes": "ASC",
                                "year": "ASC"
                            }
                        }
                    ]
                },
                {
                    id: 'item-8',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-8",
                    config: {
                        container: "#item-8",
                        adapter: {
                            type: "pie",
                            valueDimensions: 'value',
                            seriesDimensions: ['subregion']
                        },
                        template: {},
                        creator: {
                            chartObj: {
                                chart: {
                                    type: "column"
                                },
                                tooltip: {
                                    crosshairs: "mixed",
                                    shared: true
                                }
                            }
                        }
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: ['indicator', 'year'],
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 2015,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "ProdFor"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "group",
                            "parameters": {
                                "by": [
                                    "subregion", "indicator"
                                ],
                                "aggregations": [
                                    {
                                        "columns": ["value"],
                                        "rule": "AVG"
                                    }
                                ]
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "subregion": "ASC"
                            }
                        }
                    ]
                },
                {
                    id: 'item-9',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-9",
                    config: {
                        container: "#item-9",
                        adapter: {
                            type: "pie",
                            valueDimensions: 'value',
                            seriesDimensions: ['domain']
                        },
                        template: {},
                        creator: {
                            chartObj: {
                                chart: {
                                    type: "column"
                                },
                                tooltip: {
                                    crosshairs: "mixed",
                                    shared: true
                                }
                            }
                        }
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: ['indicator', 'year'],
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 2015,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "ProdFor"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "group",
                            "parameters": {
                                "by": [
                                    "domain", "indicator"
                                ],
                                "aggregations": [
                                    {
                                        "columns": ["value"],
                                        "rule": "AVG"
                                    }
                                ]
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "domain": "ASC"
                            }
                        }
                    ]
                },
                {
                    id: 'item-10',
                    type: 'chart',
                    class: "fx-timeseries-ecample",
                    //needed if layout = injected
                    container: "#item-10",
                    config: {
                        container: "#item-10",
                        adapter: {
                            type: "pie",
                            valueDimensions: 'value',
                            seriesDimensions: ['incomes']
                        },
                        template: {},
                        creator: {
                            chartObj: {
                                chart: {
                                    type: "column"
                                },
                                tooltip: {
                                    crosshairs: "mixed",
                                    shared: true
                                }
                            }
                        }
                    },
                    // for now it takes the id, TODO: add uid as well
                    allowedFilter: ['indicator', 'year'],
                    filter: [
                        {
                            "name": "filter",
                            "parameters": {
                                "rows": {
                                    "year": {
                                        "time": [
                                            {
                                                "from": 2015,
                                                "to": 2015
                                            }
                                        ]
                                    },
                                    "indicator": {
                                        "codes": [
                                            {
                                                "uid": "FLUDE_INDICATORS",
                                                "codes": [
                                                    "ProdFor"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "name": "group",
                            "parameters": {
                                "by": [
                                    "incomes", "indicator"
                                ],
                                "aggregations": [
                                    {
                                        "columns": ["value"],
                                        "rule": "AVG"
                                    }
                                ]
                            }
                        },
                        {
                            "name": "order",
                            "parameters": {
                                "incomes": "ASC"
                            }
                        }
                    ]
                },
            ]
        }
    }
});