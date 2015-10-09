/*global define, _:false, $, console, amplify, FM, THREE*/
define([
    'views/base/view',
    'config/Config',
    'config/Queries',
    'config/Events',
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

    'tweenMax',
    'amplify'
], function (View, C, Q, E, template, i18nLabels, Handlebars, WDSClient, chartTemplate) {

    'use strict';

    var s = {
        CHART_TABS : '#home-charts-tab a[data-toggle="tab"]'
    }, renderer, scena, camera, control, stats, controlliCamera, sfondoScena, cameraSfondo, composer, renderScene, containerWidth, containerHeight;

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
        },

        initCharts: function () {

            $('#chart1').highcharts($.extend(true, {}, chartTemplate, {
                title: {
                    text: 'Gross Domestic Product'
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
                    categories: [
                        '2001',
                        '2002',
                        '2003',
                        '2004',
                        '2005',
                        '2006',
                        '2007',
                        '2008',
                        '2009',
                        '2010',
                        '2011',
                        '2012',
                        '2013'
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
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
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
                series: [{
                    name: 'UAE',
                    data: [379411.97, 403299.59, 456662.43, 542884.56, 663317.65, 815722.97, 947197.06, 1158580.53, 931152.67, 1050516.19, 1276025.00, 1367323.00, 1477594.25]

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
                    categories: ['2001',
                        '2002',
                        '2003',
                        '2004',
                        '2005',
                        '2006',
                        '2007',
                        '2008',
                        '2009',
                        '2010', '2011']
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
                    name: 'UAE',
                    data: [92.53, 88.50, 76.63, 77.24]
                }]
            }));
        },

        bindEventListeners: function () {

            var self = this;

            $(s.CHART_TABS).on('shown.bs.tab', function (e) {
                e.preventDefault();

                console.log($(e.currentTarget).data("id"))

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





            if( Detector.webgl ){
                renderer = new THREE.WebGLRenderer({
                    antialias       : true
                });

                // uncomment if webgl is required
                //}else{
                //  Detector.addGetWebGLMessage();
                //  return true;
            }else{
                renderer    = new THREE.CanvasRenderer();
            }




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

                console.log(item, loaded, total);

                console.log((loaded / total * 100) + '% loaded');

                $('#preload-text').text((loaded / total * 100) + '% loaded') // For preload



            };


            manager.onLoad = function () {
                // All the texure are loaded
                console.log('all Loaded');
                $('#world-preload').removeClass('visible');


                TweenMax.to(camera.position, 4, {x: 23, z:-10,y:0 , onComplete:
                    function () {
                        startHomeHeader();

                    }
                });
                //TweenMax.to(terraMesh.position, 5, {x: -3, z:-7,y:0 ,fov:10});
            };


            function startHomeHeader(){
                TweenMax.to($('.welcome'), 2, {opacity: 1});
                TweenMax.to($('.home-logo, .topic-container'), 2, {opacity: 1, delay:.5});
                TweenMax.to($(' .one'), 2, {opacity: 1, delay:1.3});
                TweenMax.to($(' .two'), 2, {opacity: 1, delay:1.7});
                TweenMax.to($(' .three'), 2, {opacity: 1, delay:2.0});
                TweenMax.to($(' .four'), 2, {opacity: 1, delay:2.3});
                $('.carousel').carousel('cycle');
            }

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

            var terraMesh = new THREE.Mesh(sferaGeometria, terraMateriale);
            terraMesh.name = 'terra';

            scena.add(terraMesh);

            //terraMesh.position.set(0,0, 0);

            // Nuvole
            var nuvoleGeometria = new THREE.SphereGeometry(sferaGeometria.parameters.radius * 1.01, sferaGeometria.parameters.widthSegments, sferaGeometria.parameters.heightSegments);
            var nuvoleMesh = new THREE.Mesh(nuvoleGeometria, nuvoleMateriale);

            scena.add(nuvoleMesh);


            var luceDirezionale = new THREE.DirectionalLight(0xffffff,1); // Color, intensity

            luceDirezionale.name = "direzionale";

            scena.add(luceDirezionale);
            console.log(luceDirezionale.position);
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
            container.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
            window.addEventListener('resize', this.onWindowResize, false);
            this.renderScene();

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

            //mouseX = ( event.clientX - windowHalfX ) / 8;
            //mouseY = ( event.clientY - windowHalfY ) / 4;

        }
    });


    return HomeView;
});
