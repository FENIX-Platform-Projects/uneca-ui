// relative or absolute path of Components' main.js
require([
    '../../submodules/fenix-ui-menu/js/paths',
    '../../submodules/fenix-ui-common/js/Compiler'
], function (Menu, Compiler) {

    var menuConfig = Menu;
    menuConfig['baseUrl'] = '../../submodules/fenix-ui-menu/js';

    Compiler.resolve([menuConfig],
        {
            placeholders: { "FENIX_CDN": "//fenixapps.fao.org/repository" },
            config: {
                paths: {
                    "host": '../index/host',
                    'domReady': '{FENIX_CDN}/js/requirejs/plugins/domready/2.0.1/domReady',
                    'highcharts': "{FENIX_CDN}/js/highcharts/4.0.4/js/highcharts",
                    'swiper': "{FENIX_CDN}/js/swiper/2.7.5/dist/idangerous.swiper.min"
                },
                shim: {
                    "bootstrap": {
                        deps: ["jquery"]
                    },
                    "highcharts": {
                        deps: ["jquery"]
                    }
                }
            }
        });

    require(['host', 'domReady!'], function (Host) {

        var host = new Host();
        host.initFenixComponent();
    });
});