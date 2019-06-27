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

var camera, scene, renderer;

function init() {

    camera = new THREE.PerspectiveCamera(
            45, // field of view
            window.innerWidth / window.innerHeight, // aspect ratio
            1, // near clipping plane
            1000 // far clipping plane
            );
    camera.position.z = 30;
    camera.position.x = -30;
    camera.position.y = 30;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

	scene = new THREE.Scene();

	geometry = new THREE.SphereGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh( geometry, material );
    mesh.castShadow = true;
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.getElementById("container").appendChild( renderer.domElement );
}

function animate() {

	requestAnimationFrame( animate );

	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;

	renderer.render( scene, camera );

}

init();
animate();
