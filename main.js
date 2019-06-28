"use strict";

// Vars
const planetSegments = 24;
const data = {
    sun: {
        size: 10,
        color: 'img/sunColorMap.jpg'
    },
    mercury: {
        size: 1/2.54,
        distanceFromSun: 10,
        period: 0.24,
        color: 'img/mercuryColorMap.jpg',
        bump: 'img/mercuryBumpMap.jpg'
    },
    venus: {
        size: 1/1.05,
        distanceFromSun: 17.5,
        period: 0.62,
        color: 'img/venusColorMap.jpg',
        bump: 'img/venusBumpMap.jpg'
    },
    earth: {
        size: 1,
        distanceFromSun: 25,
        period: 1,
        color: 'img/earthColorMap.jpg',
        bump: 'img/earthBumpMap.jpg',
        specular: 'img/earthSpecularMap.jpg',
        cloud: 'img/earthCloudMap.jpg'
    },
    moon: {
        orbitRate: 29.5,
        rotationRate: 0.01,
        distance: 2.8,
        size: 0.5,
        color: 'img/moonColorMap.jpg',
        bump: 'img/moonBumpMap.jpg'
    },
    mars: {
        size: 1/1.88,
        distanceFromSun: 40,
        period: 1.88,
        color: 'img/marsColorMap.jpg',
        bump: 'img/marsBumpMap.jpg',
        normal: 'img/marsNormalMap.jpg'
    },
    jupiter: {
        size: 2.7,
        distanceFromSun: 65,
        period: 2,
        color: 'img/jupiterColorMap.jpg'
    },
    saturn: {
        size: 2.14,
        distanceFromSun: 125,
        period: 3,
        color: 'img/saturnColorMap.jpg',
        ring: 'img/saturnRingColor'
    },
    uranus: {
        size: 1,
        distanceFromSun: 245,
        period: 4,
        color: 'img/uranusColorMap.jpg',
        ring: 'img/uranusRingColor'
    },
    neptune: {
        size: 1.94,
        distanceFromSun: 485,
        period: 5,
        color: 'img/neptuneColorMap.jpg'
    },
    pluto: {
        size: 1/0.555,
        distanceFromSun: 965,
        period: 6,
        color: 'img/plutoColorMap.jpg',
        bump: 'img/plutoBumpMap.jpg'
    }
};

var textureloader = new THREE.TextureLoader();

function createPlanet(name) {
    var geometry = new THREE.SphereGeometry(name.size, planetSegments, planetSegments);
    var texture = textureloader.load(name.color);
    var planetBump = null;
    if(name.bump) planetBump = textureloader.load(name.bump);
    var specMap = null;
    if(name.specular) specMap = textureloader.load(name.specular);
    var material = new THREE.MeshPhongMaterial({
        shininess  :  20,
        map: texture,
        bumpMap: planetBump,
        specularMap: specMap
    });
    var planet = new THREE.Mesh(geometry, material);
    planet.position.set(name.distanceFromSun, 0, 0);
    return planet;
}

var scene, camera, renderer, controls;
var solarSystem;
var sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 100;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById("container").appendChild( renderer.domElement );
    controls = new THREE.OrbitControls(camera);

    solarSystem = new THREE.Group();
    scene.add(solarSystem);

    var pointLight = new THREE.PointLight("rgb(255, 220, 180)", 1.5);
    pointLight.castShadow = true;
    pointLight.shadow.bias = 0.001;
    pointLight.shadow.mapSize.width = 2048;
    pointLight.shadow.mapSize.height = 2048;
    scene.add(pointLight);

    // Create light that is viewable from all directions.
    var ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);

    var geometry = new THREE.SphereGeometry(data.sun.size, 48, 48 );
	var texture = textureloader.load(data.sun.color);
    var material = new THREE.MeshBasicMaterial({
        map: texture
    });
    sun = new THREE.Mesh( geometry, material );
    solarSystem.add(sun);

    mercury = createPlanet(data.mercury);
    solarSystem.add(mercury);

    venus = createPlanet(data.venus);
    solarSystem.add(venus);

    earth = createPlanet(data.earth);
    solarSystem.add(earth);

    mars = createPlanet(data.mars);
    solarSystem.add(mars);

    jupiter = createPlanet(data.jupiter);
    solarSystem.add(jupiter);

    saturn = createPlanet(data.saturn);
    solarSystem.add(saturn);

    uranus = createPlanet(data.uranus);
    solarSystem.add(uranus);

    neptune = createPlanet(data.neptune);
    solarSystem.add(neptune);

    pluto = createPlanet(data.pluto);
    solarSystem.add(pluto);

    var stars = textureloader.load('./img/stars.jpg');
    scene.background = stars;
}

var t = 0.0;    // time variable

function rotationPlanet() {
    earth.position.x = earth.distanceFromSun * Math.cos(t);
    earth.position.y = earth.distanceFromSun * Math.sin(t);
    //t += 0.98630137;            //degrees
    t += 0.01721420632339;        //radians
}

function render () {
    requestAnimationFrame( render );
    rotationPlanet();
    controls.update();
    renderer.render( scene, camera );
}

init();
render();
