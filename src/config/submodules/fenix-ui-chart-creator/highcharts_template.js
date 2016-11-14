/*global define*/
define([], function () {

    'use strict';

    return {
        chart: {
           spacing: [10, 10, 27, 10], // was [10, 10, 15, 10]
           events: {
                load: function () {
                    var showLegend = false;

                    if(this.series.length > 1){
                        showLegend = true;
                    }

                    $.each(this.series, function (i, serie) {
                       serie.update({
                         showInLegend: showLegend
                       })
                    });

                    this.redraw();

                }

            }

        },
        title: {
            text: null,
            align: 'center'
        }
    };
});