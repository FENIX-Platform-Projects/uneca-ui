/*global define*/
define(['jquery', 'fx-submodules/config/baseConfig'],
    function ($, config_base) {

        'use strict';

        //Use the following example to override properties:
        //services.SERVICE_BASE_ADDRESS = "http://fenix.fao.org/d3s_dev2/msd";

        /*var services = {
    
            TOP_MENU: {
                url: 'json/fenix-ui-topmenu_config.json',
                active: "createdataset"
            },
            SERVICE_BASE_ADDRESS: "http://fenix.fao.org/d3s_dev/msd"
        };*/

        var services = {};
        $.extend(services, config_base);

        services.DSD_EDITOR_CODELISTS = "config/submodules/DSDEditor/CodelistsUNECA.json";
        services.DSD_EDITOR_CONTEXT_SYSTEM = "UNECA";


        /*services.TOP_MENU = {
            url: 'json/fenix-ui-topmenu_config.json',
            active: "createdataset"
        };*/

        return services;
    });