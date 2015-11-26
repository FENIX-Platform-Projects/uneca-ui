/*global define, _:false, $, console, amplify, FM, THREE*/
define([
    'views/base/view',
    'config/Config',
    'config/Queries',
    'config/Events',
    'text!json/home/data_at_glance.json',
    'text!templates/home/home.hbs',
    'i18n!nls/home',
    'handlebars',
    'fx-common/WDSClient',
    'fx-c-c/config/creators/highcharts_template',
    'copyShader',
    'effectComposer',
    'maskPass',
    'renderPass',
    'shaderPass',
    'orbitControls',
    'threejs',
    'detector',
    'canvasRender',
    "highcharts",
    'projector',
    'tweenMax',
    'amplify'
], function (View, C, Q, E, DATA,template, i18nLabels, Handlebars, WDSClient, chartTemplate) {

    'use strict';

    var s = {
        CHART_TABS: '#home-charts-tab a[data-toggle="tab"]'
    }, renderer, scena, camera, control, stats, controlliCamera, sfondoScena, cameraSfondo, composer, renderScene, containerWidth, containerHeight, terraMesh, nuvoleMesh;

    var mouseX = 0, mouseY = 0;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;


    var HomeView = View.extend({

        autoRender: true,

        className: 'home',

        template: template,

        getTemplateData: function () {
            return i18nLabels;
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            this.initWorldMap();

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'home'});

            this.initVariables();

            this.initComponents();

            this.bindEventListeners();

            this.configurePage();
        },

        initVariables: function () {
        },

        initComponents: function () {

            this.WDSClient = new WDSClient({
                serviceUrl: C.WDS_URL,
                datasource: C.DB_NAME,
                outputType: C.WDS_OUTPUT_TYPE
            });
        },

        configurePage: function () {

            this.initCharts();

            //$(document).off('click.bs.tab.data-api', '[data-hover="tab"]');
            //$(document).on('mouseenter.bs.tab.data-api', '[data-toggle="tab"], [data-hover="tab"]', function () {
            //    $(this).tab('show');
            //});
        },

        initCharts: function () {

            this.data = JSON.parse(DATA);


            var series1GDP = [5.8, 6, 5.4, 3.4, 5.7, 2.8, 6.7, 3.5, 3.9];
            var series2GDP = [5.6, 6.9, 10.7, 9.7, 8, 9.2, 9.2, 7, 7.2];

            var dataTrade = this._prepareDataForTradeCharts()

            var tradeEXP_Africa = [68462.5104220494,
                9050.6287310754,
                4115.0177205069,
                16013.4677062515,
                9200.8443261552,
                16013.4677062515,
                11962.8622821194,
                32107.026934404,
                7817.6145332362,
                513492.712089327
            ];

            var tradeEXP_AMU  = [8549.0820712788,
                5523.6582642259,
                359.3222079135,
                1353.0396394817,
                448.6223826144,
                1353.0396394817,
                1139.4696250704,
                146.6742921518,
                778.725838483,
                143574.65932264
            ];

            var tradeEXP_CAEMC = [1768.9245073853,
                52.2110401204,
                635.4886141976,
                419.9764051568,
                754.5348933603,
                419.9764051568,
                770.2081692759,
                643.1666983442,
                134.2816411206,
                40495.3215939978
            ];

            var tradeEXP_COMESA = [20127.030266817,
                423.1839998335,
                2705.5278529663,
                11936.8401903878,
                2929.3200448406,
                11936.8401903878,
                9043.9308542918,
                4972.2696247999,
                6337.9443900915,
                129012.727248329
            ]

            var tradeEXP_ECCAS = [5543.0231074565,
                60.9879597404,
                659.6638061102,
                393.0657007599,
                794.0378825135,
                448.9599476145,
                803.8584945159,
                4285.653781385,
                143.756774448,
                109809.073380668,
            ]

            var tradeEXP_ECOWAS = [20127.030266817,
                423.1839998335,
                2705.5278529663,
                11936.8401903878,
                2929.3200448406,
                11936.8401903878,
                9043.9308542918,
                4960.2623594103,
                6337.9443900915,
                129012.727248329
            ];

            var tradeEXP_FrancZone = [9582.7106344252,
                323.0399059275,
                1830.4641135651,
                6392.3649015739,
                2072.8507605572,
                6392.3649015739,
                4569.8833684967,
                977.3740234641,
                2738.9606436977,
                59526.9478307125
            ];

            var tradeEXP_SADC = [29334.3371368016,
                557.1697869014,
                296.6365162176,
                1889.7350756463,
                4289.5425397316,
                1889.7350756463,
                752.4018135932,
                24549.2445782135,
                436.8348595936,
                183082.782536727
            ];

            var tradeEXP_WAEMU = [7810.1374870042,
                270.2167212327,
                1194.5321075021,
                5971.7666043059,
                1317.8724753314,
                5971.7666043059,
                3799.2298707138,
                331.2206208531,
                2604.2391519778,
                18985.4785552384
            ];

            var tradeEXP_WORLD = [569221.298069115,
                141779.609446006,
                20439.955940727,
                123931.704086158,
                47918.8064727643,
                106753.248023692,
                61280.7513025198,
                179817.059969213,
                40656.8743238408,
                18227586.1786803
                ];


            var tradeIMP_AFRICA = [69946.042288494,
                8188.5996355991,
                1806.185021867,
                20981.7110758055,
                5958.2878391665,
                20981.7110758055,
                4766.1382242821,
                29733.8622994837,
                8230.681238622,
                563407.593824328
            ];


            var tradeIMP_AMU = [8672.1971005844,
                5518.79845265,
                51.6964806163,
                302.0366234484,
                61.1571265982,
                302.0366234484,
                191.0742899471,
                584.6082627025,
                139.3536230232,
                152926.209887509
            ];

            var tradeIMP_CAEMC = [3744.7370570706,
                395.8516836417,
                699.8914990901,
                2176.5183041289,
                726.5988529588,
                2176.5183041289,
                2014.377312146,
                343.9805214413,
                1314.4640288759,
                21725.4008538638,
            ];

            var tradeIMP_COMESA = [17308.2378096072,
                1262.4555476581,
                372.2630642216,
                13120.3855609623,
                404.6874716023,
                13120.3855609623,
                6922.7203281071,
                2108.4409068757,
                6550.2391294351,
                143850.234412651
            ];

            var tradeIMP_ECCAS = [1444.5528911846,
                495.002458648,
                834.6948880192,
                2417.1038549027,
                878.2628188526,
                2417.1038549027,
                2279.2695633838,
                4737.0342547029,
                1444.5528911846,
                52003.6376049377
            ];

            var tradeIMP_ECOWAS = [17308.2378096072,
                1262.4555476581,
                372.2630642216,
                13120.3855609623,
                404.6874716023,
                13120.3855609623,
                6922.7203281071,
                2108.4409068757,
                6550.2391294351,
                139888.623031967
            ];


            var tradeIMP_FrancZONE = [12113.8904495556,
                1028.2116264704,
                848.4537697829,
                9130.4912673116,
                886.1226264463,
                9130.4912673116,
                5009.8840011638,
                834.7427275076,
                4161.4063168953,
                59537.3986036757
            ];

            var tradeIMP_SADC = [32674.1406455378,
                186.7395670035,
                662.9535387894,
                5277.1467967585,
                4669.6950590901,
                5277.1467967585,
                837.8145188296,
                24426.0313062133,
                172.0415522188,
                191870.60574347
            ];

            var tradeIMP_WAMU = [8336.468109405,
                631.2621531594,
                148.5465122113,
                6953.9344376974,
                159.508015006,
                6953.9344376974,
                6953.9344376974,
                470.404671378,
                2846.9037625341,
                37561.4368568348
            ];

            var tradeIMP_WORLD = [609773.793457011,
                126541.689410851,
                43065.4246888646,
                137783.347944203,
                119285.643243957,
                137783.347944203,
                63040.3755886891,
                237374.054658063,
                19925.3412007829,
                18685081.8269679
            ]

            $('#chart1').highcharts($.extend(true, {}, chartTemplate, {
                title: {
                    text: 'Gross Domestic Product'
                },
                credits: {
                    enabled: false
                },
               /* colors: [ //Colori delle charts
                    '#005493',
                    '#005493',
                    '#744490',
                    '#E10079',
                    '#2D1706',
                    '#F1E300',
                    '#F7AE3C',
                    '#DF3328'
                ],*/
                xAxis: {
                    categories: [
                        '2006',
                        '2007',
                        '2008',
                        '2009',
                        '2010',
                        '2011',
                        '2012',
                        '2013',
                        '2014'
                    ],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Million AED'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [
                    {
                        name: 'GDP growth rates',
                        data: series1GDP
                    },
                    {
                        name: 'Inflation',
                        data: series2GDP
                    }]
            }));

            $('#chart2').highcharts($.extend(true, {}, chartTemplate, {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Trade'
                },
                credits: {
                    enabled: false
                },
                colors: [ //Colori delle charts
                    '#a62d3e',
                    '#986e2e',
                    '#744490',
                    '#E10079',
                    '#2D1706',
                    '#F1E300',
                    '#F7AE3C',
                    '#DF3328'
                ],
                xAxis: {
                    categories: [
                        'AFRICA',
                        'AMU',
                        'CAEMC',
                        'COMESA',
                        'ECCAS',
                        'ECOWAS',
                        'FRANC ZONE',
                        'SADC',
                        'WAEMU',
                        'WORLD']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Trade, World (value in AED)'
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                    shared: true
                },
                plotOptions: {
                    column: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    name: 'Re-Export',
                    data: [31444008427.00, 41124922234.00, 50696679981.00, 69515225632.00, 97043197533.00, 95580167401.00, 128338414920.29, 162844575681.00, 147693366837.24, 185863253742.03, 210842814591.00]
                }, {
                    name: 'Export',
                    data: [7535955504.00, 8649496688.00, 10588599116.00, 14615221779.00, 16462607861.00, 29232285857.00, 36262324842.00, 60359055129.00, 65278896533.54, 83077687322.91, 114038287878.38]
                },
                    {
                        name: 'Import',
                        data: [147775800078.00, 202896419979.00, 247589715083.00, 291048964687.00, 388356836394.00, 565719823370.00, 447393840482.09, 485413921745.90, 602757314852.26, 667520204394.26, 685068106621.00]
                    }]
            }));

            $('#chart3').highcharts($.extend(true, {}, chartTemplate, {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Arable and Permanent Crop Land Area, 1000 ha'
                },
                credits: {
                    enabled: false
                },
                colors: [ //Colori delle charts
                    '#005493',
                    '#005493',
                    '#744490',
                    '#E10079',
                    '#2D1706',
                    '#F1E300',
                    '#F7AE3C',
                    '#DF3328'
                ],
                xAxis: {
                    categories: ['2010',
                        '2011',
                        '2012',
                        '2013']
                },
                yAxis: {
                    min: 0
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
                    shared: true
                },
                plotOptions: {
                    column: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    name: 'UNECA',
                    data: [92.53, 88.50, 76.63, 77.24]
                }]
            }));
        },

        _prepareDataForTradeCharts : function() {

            var result = {};

            result['import'] = []
            result['export'] = [];

            for(var key in this.data.trade.import) {
                result['import'].push({'name':key,'data': this.data.trade.import[key]})
            }


            for(var key in this.data.trade.export) {
                result['export'].push({'name':key,'data': this.data.trade.export[key]})
            }



        },

        bindEventListeners: function () {

            var self = this;

            $(s.CHART_TABS).on('shown.bs.tab', function (e) {
                e.preventDefault();

                /*
                 console.log($(e.currentTarget).data("id"))
                 */

                self.initCharts();
            });

        },

        unbindEventListeners: function () {
            $(s.CHART_TABS).off('shown.bs.tab');

        },

        dispose: function () {

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        },
        initWorldMap: function () {
            // Inizialization


            if (Detector.webgl) {
                //console.log('nicola dapauara computer supersonic');

                renderer = new THREE.WebGLRenderer({


                    antialias: true
                });

                scena = new THREE.Scene();
                var container = document.getElementById('container');
                containerWidth = $('#container').width();
                containerHeight = $('#container').height();

                camera = new THREE.PerspectiveCamera(45, containerWidth / containerHeight, 0.1, 1000);


                renderer.setClearColor(0x000000, 1.0);
                renderer.setSize(containerWidth, containerHeight);
                renderer.shadowMapEnabled = true;


                cameraSfondo = new THREE.OrthographicCamera(
                    -window.innerWidth // LEFT This property defines the border for the leftmost position to be rendered.
                    , window.innerWidth // RIGHT This property defines the border for the rightmost position to be rendered.
                    , window.innerHeight // TOP This property defines the border for the topmost position to be rendered.
                    , -window.innerHeight // BOTTOM This property defines the border for the bottommost position to be rendered.
                    , -10000, 10000 //This property defines the point, based on the position of the camera, from where the scene will be rendered. , This property defines the point, based on position of the camera, to whic the scene will be rendered
                );
                cameraSfondo.position.z = 50;

                sfondoScena = new THREE.Scene();
                var materialColor = new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture('src/images/starry_background.jpg'),
                    depthTest: false
                }); /// DEPTH TEST FALSE SUPER IMPORTANT TO COMPOSING!!!

                var sfondoBG = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialColor);
                sfondoBG.position.z = -100;
                sfondoBG.scale.set(window.innerWidth * 2, window.innerHeight * 2, 1); // LOOK AT THE SCALE!!!!!
                sfondoScena.add(sfondoBG);


                // texture

                var manager = new THREE.LoadingManager();
                manager.onProgress = function (item, loaded, total) {
                    /*
                     console.log(item, loaded, total);

                     console.log((loaded / total * 100) + '% loaded');*/

                    $('#preload-text').text((loaded / total * 100) + '% loaded') // For preload


                };

                var self = this;

                manager.onLoad = function () {
                    // All the texure are loaded
                    /*
                     console.log('all Loaded');
                     */
                    $('#world-preload').removeClass('visible');


                    TweenMax.to(camera.position, 4, {
                        x: 23, z: -10, y: 0, onComplete: function () {
                            self.startHomeHeader();

                        }
                    });
                    //TweenMax.to(terraMesh.position, 5, {x: -3, z:-7,y:0 ,fov:10});
                };


                var nuvoleTexture = new THREE.Texture();
                var terraTexture = new THREE.Texture();
                var terraNormal = new THREE.Texture();
                var terraSpec = new THREE.Texture();


                var loader = new THREE.ImageLoader(manager);
                loader.load('src/images/fair_clouds_4k.png', function (image) {
                    nuvoleTexture.image = image;
                    nuvoleTexture.needsUpdate = true;
                });
                loader.load('src/images/earthmap4k.jpg', function (image) {
                    terraTexture.image = image;
                    terraTexture.needsUpdate = true;
                });
                loader.load('src/images/earth_normalmap_flat4k.jpg', function (image) {
                    terraNormal.image = image;
                    terraNormal.needsUpdate = true;
                });
                loader.load('src/images/earthspec4k.jpg', function (image) {
                    terraSpec.image = image;
                    terraSpec.needsUpdate = true;
                });

//        loader.load( 'images/earthmap4k.jpg', function ( image ) {
//
//            terraTexture.image = image;
//            terraTexture.needsUpdate = true;
//
//        } );


//
//        var onProgress = function ( xhr ) {
//            if ( xhr.lengthComputable ) {
//                var percentComplete = xhr.loaded / xhr.total * 100;
//                console.log( Math.round(percentComplete, 2) + '% downloaded' );
//            }
//        };
//
//        var onError = function ( xhr ) {
//        };


                // Create cloud material
                // var nuvoleTexture = THREE.ImageUtils.loadTexture('images/fair_clouds_4k.png');
                var nuvoleMateriale = new THREE.MeshPhongMaterial();

                nuvoleMateriale.map = nuvoleTexture;
                nuvoleMateriale.transparent = true;


                //Terra
                var sferaGeometria = new THREE.SphereGeometry(15, 30, 30); // Radius, number of width segment, number of height segment Only radius is required
                // Create earth material
                //var terraTexture = THREE.ImageUtils.loadTexture('images/earthmap4k.jpg');
                //var terraNormal = THREE.ImageUtils.loadTexture('images/earth_normalmap_flat4k.jpg');
                //var terraSpec = THREE.ImageUtils.loadTexture('images/earthspec4k.jpg');
                var terraMateriale = new THREE.MeshPhongMaterial(); // Reacts to lights

                terraMateriale.map = terraTexture;
                terraMateriale.normalMap = terraNormal;
                terraMateriale.normalScale = new THREE.Vector2(0.5, 0.7); // Scale of the bump effect
                terraMateriale.specularMap = terraSpec;
                terraMateriale.specular = new THREE.Color(0x00283a); // Color of the specular

                terraMesh = new THREE.Mesh(sferaGeometria, terraMateriale);
                terraMesh.name = 'terra';

                scena.add(terraMesh);

                //terraMesh.position.set(0,0, 0);

                // Nuvole
                var nuvoleGeometria = new THREE.SphereGeometry(sferaGeometria.parameters.radius * 1.02, sferaGeometria.parameters.widthSegments, sferaGeometria.parameters.heightSegments);
                nuvoleMesh = new THREE.Mesh(nuvoleGeometria, nuvoleMateriale);

                scena.add(nuvoleMesh);


                var luceDirezionale = new THREE.DirectionalLight(0xffffff, 1); // Color, intensity

                luceDirezionale.name = "direzionale";

                scena.add(luceDirezionale);
                /*
                 console.log(luceDirezionale.position);
                 */
                luceDirezionale.position.set(50, 40, 50);

                var luceAmbientale = new THREE.AmbientLight(0x666666); // Only light color

                scena.add(luceAmbientale);

                //controlliCamera = new THREE.OrbitControls(camera);
                camera.position.x = 15;
                camera.position.y = 16;
                camera.position.z = 13;
                camera.lookAt(scena.position);


//        control = new function () {
//            this.rotationSpeed = 0.005;
//            this.opacity = 0.6;
//            this.color = cuboMateriale.color.getHex();
//        };
//
//        addControlGui(control);
//        addStatsObject();

                // setup the composer steps
                // first render the background
                var bgPass = new THREE.RenderPass(sfondoScena, cameraSfondo);
                // next render the scene (rotating earth), without clearing the current output
                var renderPass = new THREE.RenderPass(scena, camera);
                renderPass.clear = false;
                // finally copy the result to the screen
                var effectCopy = new THREE.ShaderPass(THREE.CopyShader);
                effectCopy.renderToScreen = true;

                // add these passes to the composer
                composer = new THREE.EffectComposer(renderer);
                composer.addPass(bgPass);
                composer.addPass(renderPass);
                composer.addPass(effectCopy);


                container.appendChild(renderer.domElement); //domElement is a property of WEBGLRender
                $(window).mousemove(this.onDocumentMouseMove);
                window.addEventListener('resize', this.onWindowResize, false);
                this.renderScene();


                // uncomment if webgl is required
                //}else{
                //  Detector.addGetWebGLMessage();
                //  return true;
            } else {
                //console.log('dani purciaro computer vecchio')
                this.startHomeHeader();
                //renderer    = new THREE.CanvasRenderer();
            }


        },
        renderScene: function () {
            //controlliCamera.update();
            //stats.update();
            //var rotSpeed = 0.0005;
            //camera.position.x = camera.position.x * Math.cos(rotSpeed) + camera.position.z * Math.sin(rotSpeed);
            //camera.position.z = camera.position.z * Math.cos(rotSpeed) - camera.position.x * Math.sin(rotSpeed);
            //camera.position.x += ( mouseX - camera.position.x ) * .0005;
            //camera.position.y += ( - mouseY - camera.position.y ) * .005;
            camera.lookAt(scena.position);
            //console.log('x'+camera.position.x);
            //console.log('y'+camera.position.z);
            //console.log('z'+camera.position.y);
            renderer.render(scena, camera);
            renderer.autoClear = false;
            composer.render();

            requestAnimationFrame(this.renderScene.bind(this));

        },
        onWindowResize: function () {
            containerWidth = $('#container').width();
            containerHeight = $('#container').height();
            camera.aspect = containerWidth / containerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(containerWidth, containerHeight);

        },
        onDocumentMouseMove: function (event) {


            mouseX = ( event.clientX - windowHalfX ) / 8;
            //mouseY = ( event.clientY - windowHalfY ) / 4;

            /*
             console.log(mouseX * Math.PI / 180);
             */

            var rotazione = (mouseX * Math.PI / 180) / 20;
            //var rotazioneY = (mouseY * Math.PI / 180) / 10;

            terraMesh.rotation.y = rotazione;
            nuvoleMesh.rotation.y = rotazione;

            //terraMesh.rotation.z = rotazioneY;
            //nuvoleMesh.rotation.z = rotazioneY;

            //TweenMax.to(terraMesh.rotation, 4, {x: 23, z:-10,y:0 , onComplete:
            //    function () {
            //        self.startHomeHeader();
            //
            //    }
            //});


        },
        startHomeHeader: function () {
            TweenMax.to($('.world-fallback'), 1, {opacity: 1});
            TweenMax.to($('.welcome'), 1, {opacity: 1});
            TweenMax.to($('.home-logo, .topic-container'), 2, {opacity: 1, delay: .5});
            TweenMax.to($(' .one'), 2, {opacity: 1, delay: 1.3});
            TweenMax.to($(' .two'), 2, {opacity: 1, delay: 1.7});
            TweenMax.to($(' .three'), 2, {opacity: 1, delay: 2.0});
            TweenMax.to($(' .four'), 2, {opacity: 1, delay: 2.3});
            $('.carousel').carousel('cycle');

        }
    });


    return HomeView;
});
