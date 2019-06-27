"use strict";

// Vars
const planetSegments = 24;
const data = {
    sun: {
        size: 10,
        color: 'img/sunColorMap.jpg'
    },
    mercury: {
        color: 'img/mercuryColorMap.jpg',
        bump: 'img/mercuryBumpMap.jpg'
    },
    venus: {
        color: 'img/venusColorMap.jpg',
        bump: 'img/venusBumpMap.jpg'
    },
    earth: {
        orbitRate: 365.2564,
        rotationRate: 0.015,
        distanceFromSun: 25,
        size: 1,
        color: 'img/earthColorMap.jpg',
        bump: 'img/earthBumpMap.jpg',
        specular: 'img/earthSpecularMap.jpg',
        cloud: 'img/earthCloudMap.jpg'
    },
    moon: {
        orbitRate: 29.5,
        rotationRate: 0.01,
        distanceFromSun: 2.8,
        size: 0.5,
        color: 'img/moonColorMap.jpg',
        bump: 'img/moonBumpMap.jpg'
    },
    mars: {
        color: 'img/marsColorMap.jpg',
        bump: 'img/marsBumpMap.jpg',
        normal: 'img/marsNormalMap.jpg'
    },
    jupiter: {
        color: 'img/jupiterColorMap.jpg'
    },
    saturn: {
        color: 'img/saturnColorMap.jpg',
        ring: 'img/saturnRingColor'
    },
    uranus: {
        color: 'img/uranusColorMap.jpg',
        ring: 'img/uranusRingColor'
    },
    neptune: {
        color: 'img/neptuneColorMap.jpg'
    },
    pluto: {
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
    planet.position.set(name.distanceFromSun, name.distanceFromSun, 0);
    return planet;
}

var scene, camera, renderer, controls;
var solarSystem;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 100;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById("container").appendChild( renderer.domElement );
    controls = new THREE.OrbitControls( camera );

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
    var sun = new THREE.Mesh( geometry, material );
    solarSystem.add(sun);

    var earth = createPlanet(data.earth);
    solarSystem.add(earth);

    var stars = textureloader.load('./img/stars.jpg');
    scene.background = stars;
}

function render () {
    requestAnimationFrame( render );
    controls.update();
    renderer.render( scene, camera );
}

init();
render();
