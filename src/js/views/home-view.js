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
    'copyShader',
    'effectComposer',
    'maskPass',
    'renderPass',
    'shaderPass',
    'orbitControls',
    'threejs',
    "highcharts",
    'amplify'
], function (View, C, Q, E, template, i18nLabels, Handlebars, WDSClient ) {

    'use strict';

    var s = {},renderer, scena, camera, control, stats, controlliCamera, sfondoScena, cameraSfondo, composer, renderScene,containerWidth,containerHeight;

    var HomeView = View.extend({

        autoRender: true,

        className: 'home',

        template: template,

        getTemplateData: function () {
            return i18nLabels;
        },

        attach: function () {

            console.log(THREE)
            console.log($.fn.highcharts)

            View.prototype.attach.call(this, arguments);

            this.initWorldMap();

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'home'});

            this.initVariables();

            this.initComponents();

            this.bindEventListeners();

            this.configurePage();
        },

        initVariables: function () { },

        initComponents: function () {

            this.WDSClient = new WDSClient({
                serviceUrl: C.WDS_URL,
                datasource: C.DB_NAME,
                outputType : C.WDS_OUTPUT_TYPE
            });
        },

        configurePage: function () {




        },

        bindEventListeners: function () {

        },

        unbindEventListeners: function () {

        },

        dispose: function () {

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        },
        initWorldMap : function () {
        // Inizialization
        scena = new THREE.Scene();
        var container = document.getElementById('container');
        containerWidth = $('#container').width();
        containerHeight = $('#container').height();

        camera = new THREE.PerspectiveCamera(45, containerWidth / containerHeight, 0.1, 1000);


        renderer = new THREE.WebGLRenderer();
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
        var materialColor = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('src/images/starry_background.jpg'), depthTest: false }); /// DEPTH TEST FALSE SUPER IMPORTANT TO COMPOSING!!!

        var sfondoBG = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialColor);
        sfondoBG.position.z = -100;
        sfondoBG.scale.set(window.innerWidth * 2, window.innerHeight * 2, 1); // LOOK AT THE SCALE!!!!!
        sfondoScena.add(sfondoBG);




        // texture

        var manager = new THREE.LoadingManager();
        manager.onProgress = function ( item, loaded, total ) {

            console.log( item, loaded, total );

            console.log( (loaded / total * 100) + '% loaded' );

            $('#preload-text').text((loaded / total * 100) + '% loaded')


        };


        manager.onLoad = function () {
            // All the texure are loaded
            console.log( 'all Loaded' );
            $('#world-preload').removeClass('visible');

        };


        var nuvoleTexture = new THREE.Texture();
        var terraTexture = new THREE.Texture();
        var terraNormal = new THREE.Texture();
        var terraSpec = new THREE.Texture();


        var loader = new THREE.ImageLoader( manager );
        loader.load( 'src/images/fair_clouds_4k.png', function ( image ) {  nuvoleTexture.image = image; nuvoleTexture.needsUpdate = true; } );
        loader.load( 'src/images/earthmap4k.jpg', function ( image ) {  terraTexture.image = image; terraTexture.needsUpdate = true; } );
        loader.load( 'src/images/earth_normalmap_flat4k.jpg', function ( image ) {  terraNormal.image = image; terraNormal.needsUpdate = true; } );
        loader.load( 'src/images/earthspec4k.jpg', function ( image ) {  terraSpec.image = image; terraSpec.needsUpdate = true; } );

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
        terraMateriale.normalScale = new THREE.Vector2(0.5,0.7); // Scale of the bump effect
        terraMateriale.specularMap = terraSpec;
        terraMateriale.specular = new THREE.Color(0x00283a); // Color of the specular

        var terraMesh = new THREE.Mesh(sferaGeometria, terraMateriale);
        terraMesh.name = 'terra';

        scena.add(terraMesh);

        // Nuvole
        var nuvoleGeometria = new THREE.SphereGeometry(sferaGeometria.parameters.radius * 1.01, sferaGeometria.parameters.widthSegments, sferaGeometria.parameters.heightSegments);
        var nuvoleMesh = new THREE.Mesh(nuvoleGeometria, nuvoleMateriale);

        scena.add(nuvoleMesh);

        var luceDirezionale = new THREE.DirectionalLight(0xffffff, 1); // Color, intensity
        //luceDirezionale.position = new THREE.Vector3(100, 10, -50);
        luceDirezionale.name = "direzionale";

        scena.add(luceDirezionale);


        var luceAmbientale = new THREE.AmbientLight(0x111111); // Only light color

        scena.add(luceAmbientale);

        controlliCamera = new THREE.OrbitControls(camera);
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



        console.log('eeeeeeeee');
        container.appendChild(renderer.domElement); //domElement is a property of WEBGLRender

        window.addEventListener('resize', this.onWindowResize, false);
        this.renderScene();

    },
    renderScene : function () {
        controlliCamera.update();
        //stats.update();
        var rotSpeed = 0.0005;
        camera.position.x = camera.position.x * Math.cos(rotSpeed) + camera.position.z * Math.sin(rotSpeed);
        camera.position.z = camera.position.z * Math.cos(rotSpeed) - camera.position.x * Math.sin(rotSpeed);
        camera.lookAt(scena.position);

        renderer.render(scena, camera);
        renderer.autoClear = false;
        composer.render();
        console.log('ma che è');
       requestAnimationFrame(this.renderScene.bind( this ));

    },
    onWindowResize: function() {
        containerWidth = $('#container').width();
        containerHeight = $('#container').height();
        camera.aspect = containerWidth / containerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(containerWidth , containerHeight);

    }
    });









    return HomeView;
});
