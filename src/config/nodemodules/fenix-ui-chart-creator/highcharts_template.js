/*global define*/
define([], function () {

    'use strict';

    return {
        chart: {
            spacing: [15, 10, 27, 10],
            events: {
                load: function () {
                    var showLegend = false;

                    if (this.options.chart.forExport) {
                        this.xAxis[0].update({
                            categories: this.xAxis[0].categories,
                            labels: {
                                style: {
                                    width: '50px',
                                    fontSize: '8px'
                                },
                                step: 1
                            }
                        }, false);


                        $.each(this.series, function (i, serie) {
                            serie.update({
                                marker : {
                                    radius: 2
                                },
                                dataLabels: {
                                    enabled: true,
                                    style: {
                                        fontSize: '8px'
                                    }
                                }
                            })

                        });


                        this.redraw();
                    }

                    if(this.series.length > 1){
                        showLegend = true;
                    }

                    $.each(this.series, function (i, serie) {
                        serie.update({
                            showInLegend: showLegend
                        })
                    });

                    this.redraw();

                },
                beforePrint: function (event) {
                    var $chart = $(this.renderTo);
                    //Hide buttons and legend title
                    $chart.find('.highcharts-button').hide();
                    $chart.find('.highcharts-legend-title').hide();
                },
                afterPrint: function (event) {
                    var $chart = $(this.renderTo);

                    //Re-show buttons and legend title
                    $chart.find('.highcharts-button').show();
                    $chart.find('.highcharts-legend-title').show();
                }

            }

        },
        title: {
            text: null,
            align: 'center',
            style: {
                fontWeight: 'bold',
                fontFamily: 'Helvetica',
                paddingBottom: '20px'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            y:40
        },
        tooltip: {
            pointFormat:"<tr><td style='color:{series.color};padding:0'>{series.name}: </td><td style='padding:0'><b>{point.y} </b></td></tr>"
        },
        exporting: {
            chartOptions: {
                chart: {
                    style: {
                        fontFamily: 'Helvetica',
                        fontWeight: 'bold'
                    }
                },
                xAxis: {
                    labels: {
                        y: 15,
                        style: {
                            fontSize: '8px',
                            fontWeight: 'bold'
                        }
                    }
                },
                yAxis: {
                    title: {
                        style: {
                            fontSize: '8px'
                        }
                    },
                    labels: {
                        style: {
                            fontSize: '8px'
                        }
                    }
                },
                title: {
                    style: {
                        fontSize: '10px'
                    }
                },

                legend: {
                    itemStyle: {
                        fontSize: '8px',
                        fontWeight: 'bold'
                    }
                }
            }
        }
    };
});