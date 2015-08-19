define([
    'fx-menu/start'
], function (TopMenu) {

    function Host() {
    }

    Host.prototype.initFenixComponent = function () {

        new TopMenu({
            url: 'config/submodules/fx-menu/fenix-ui-topmenu_config.json'
        });

    };

    return Host;

});