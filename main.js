"use strict";

// Vars
const maps = {
    sun: {
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
        color: 'img/earthColorMap.jpg',
        bump: 'img/earthBumpMap.jpg',
        specular: 'img/earthSpecularMap.jpg',
        cloud: 'img/earthCloudMap.jpg'
    },
    moon: {
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
var scene, camera, renderer, controls;
var geometry, material, sphere;
var solarSystem;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 50;
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById("container").appendChild( renderer.domElement );
    controls = new THREE.OrbitControls( camera );

    solarSystem = new THREE.Group();
    scene.add(solarSystem);

    geometry = new THREE.SphereGeometry( 10, 48, 48 );
    var textureloader = new THREE.TextureLoader();
	var texture = textureloader.load('./img/sunColorMap.jpg');
    material = new THREE.MeshBasicMaterial({
    	        map: texture
    });
    sphere = new THREE.Mesh( geometry, material );
    solarSystem.add( sphere );

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
