/* global define */
/*global define*/
define(['jquery', 
    'fx-submodules/config/baseConfig'
],
    function ($, config_base) {

        'use strict';

        var cfg = {};
        $.extend(cfg, config_base);

        // configuration data management
        cfg.DSD_EDITOR_CODELISTS = "config/submodules/DSDEditor/CodelistsUneca.json";
        //cfg.DSD_EDITOR_CONTEXT_SYSTEM = "UNECA";
        cfg.DSD_EDITOR_CONTEXT_SYSTEM = "uneca";
        cfg.DSD_EDITOR_LABEL = "UNECA";
        cfg.DATAMANAGEMENT_ENVIRONMENT = config_base.ENVIRONMENT;
        //cfg.METADATA_EDITOR_AJAX_EVENT_CALL = "config/submodules/metadataEditor/fx-editor-ajax-config_DEMO.json";
        cfg.METADATA_EDITOR_AJAX_EVENT_CALL = "config/submodules/metadataEditor/fx-editor-ajax-config_PROD.json";
        cfg.TOP_MENU= {
            container : '#top-menu-container',
            url: 'config/submodules/fx-menu/top_menu_data_mng.json',
        //    template: 'fx-menu/templates/blank-fluid.html',
            active: "datamgmt"
        };
        cfg.FAKE_AUTHENTICATION = false;

        return cfg;

});
