/*global define*/
define(function () {

    'use strict';

    /**
     UNECA_Education
     UNECA_Health
     ILO_Labour
     UNECA_Labour
     **/

    return {

        uid: "UNECA_Labour",
        //version: "",
        //preProcess : {} //D3P process
        //postProcess : {} //D3P process
        items: [
            {
                id: "chart_1", //ref [data-item=':id']
                type: "chart", //chart || map || olap,
                config: {
                    type: "line",
                    columns: ["Year"], //x axis and series
                    rows: ["IndicatorCode_EN"], //Y dimension
                    values: ["Value"],
                    aggregationFn: {"Value": "sum"}
                }, // :type-creator config
                filter: { //FX-filter format

                    IndicatorCode: ["010401"],
                    SectorCode : ["4"],
                    GenderCode: ["3"],
                    CountryCode: ["AGO"]//column id and values to include,
                }
                //filterFor: ["Year"], // allowed dimension ids to filter,
            },


            {
                id: "chart_2", //ref [data-item=':id']
                type: "chart", //chart || map || olap,
                config: {
                    type: "column",
                    columns: ["Year"], //x axis and series
                    rows: ["SectorCode"], //Y dimension
                    values: ["Value"],
                    aggregationFn: {"Value": "sum"}
                }, // :type-creator config
                filter: { //FX-filter format
                    CountryCode: ["AGO"],//column id and values to include,
                    IndicatorCode: ["010401"],
                    SectorCode : ["1","2","3"],
                    GenderCode : ["3"]
                }
                //filterFor: ["Year"], // allowed dimension ids to filter,
            },


            {
                id: "chart_3", //ref [data-item=':id']
                type: "chart", //chart || map || olap,
                config: {
                    type: "column",
                    columns: ["Year"], //x axis and series
                    rows: ["GenderCode_EN"], //Y dimension
                    values: ["Value"],
                    aggregationFn: {"Value": "sum"}
                }, // :type-creator config
                filter: { //FX-filter format
                    CountryCode: ["AGO"],//column id and values to include,
                    IndicatorCode: ["010401"],
                    SectorCode : ["4"],
                    GenderCode : ["1","2"]
                }
                //filterFor: ["Year"], // allowed dimension ids to filter,
            }
        ]
    }

});