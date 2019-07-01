"use strict";

// Ids
const sunId = 0;
const mercuryId = 1;
const venusId = 2;
const earthId = 3;
const marsId = 4;
const jupiterId = 5;
const saturnId = 6;
const uranusId = 7;
const neptuneId = 8;
const plutoId = 9;
const moonId = 10;
const saturnRingId = 11;

// Planet (Sphere) segments
const planetSegments = 48;

// Planet data
const data = [];
data[sunId] = {
    name: "Sun",
    size: 5,
    rotationRate: 0.015/25.38,
    color: 'img/sunColorMap.jpg'
};
data[earthId] = {
    name: "Earth",
    size: 1,
    distanceFromSun: 25,
    orbitRate: 365.2564,
    rotationRate: 0.015,
    color: 'img/earthColorMap.jpg',
    bump: 'img/earthBumpMap.jpg',
    specular: 'img/earthSpecularMap.jpg',
    cloud: 'img/earthCloudMap.jpg'
};
data[mercuryId] = {
    name: "Mercury",
    size: 1/2.54,
    distanceFromSun: 10,
    orbitRate: 87.969,
    rotationRate: data[earthId]/58.65,
    color: 'img/mercuryColorMap.jpg',
    bump: 'img/mercuryBumpMap.jpg'
};
data[venusId] = {
    name: "Venus",
    size: 1/1.05,
    distanceFromSun: 17.5,
    orbitRate: 224.701,
    rotationRate: data[earthId]/243.69,
    color: 'img/venusColorMap.jpg',
    bump: 'img/venusBumpMap.jpg'
};
data[marsId] = {
    name: "Mars",
    size: 1/1.88,
    distanceFromSun: 40,
    orbitRate: 686.96,
    rotationRate: data[earthId]/1.025957,
    color: 'img/marsColorMap.jpg',
    bump: 'img/marsBumpMap.jpg',
    normal: 'img/marsNormalMap.jpg'
};
data[jupiterId] = {
    name: "Jupiter",
    size: 2.7,
    distanceFromSun: 65,
    orbitRate: 4333.2867,
    rotationRate: data[earthId]*0.413538021,
    color: 'img/jupiterColorMap.jpg'
};
data[saturnId] = {
    name: "Saturn",
    size: 2.14,
    distanceFromSun: 125,
    orbitRate: 10749.25,
    rotationRate: data[earthId]/0.445,
    ringInnerDiameter: 2.5,
    ringOuterDiameter: 3.5,
    ringSegments: 500,
    color: 'img/saturnColorMap.jpg',
    ring: 'img/saturnRingColor.jpg'
};
data[uranusId] = {
    name: "Uranus",
    size: 1,
    distanceFromSun: 245,
    orbitRate: 30664.015,
    rotationRate: data[earthId]/0.71833,
    color: 'img/uranusColorMap.jpg',
    ring: 'img/uranusRingColor.jpg'
};
data[neptuneId] = {
    name: "Neptune",
    size: 1.94,
    distanceFromSun: 485,
    orbitRate: 60223.3528,
    rotationRate: data[earthId]/0.67125,
    color: 'img/neptuneColorMap.jpg'
};
data[plutoId] = {
    name: "Pluto",
    size: 1/0.555,
    distanceFromSun: 965,
    orbitRate: 91201.35,
    rotationRate: data[earthId]*6.387230,
    color: 'img/plutoColorMap.jpg',
    bump: 'img/plutoBumpMap.jpg'
};
data[moonId] = {
    name: "Moon",
    orbitRate: 29.5,
    rotationRate: 0.01,
    distanceFromEarth: 2.0,
    size: 0.2728,
    color: 'img/moonColorMap.jpg',
    bump: 'img/moonBumpMap.jpg'
};

var scene, camera, renderer, controls, raycaster;

// Far camera parameter
var far = 10000;

// Solar System Group (Hierarchical Model)
var solarSystem;

// Planets array
var planets = [];

// Trajectories array
var trajectories = [];

// Light of the sunId
var pointLight;

// Ambient light
var ambientLight;

// Texture Loader
var textureloader = new THREE.TextureLoader();

// Play or pause the animation
var play = true;

// Speed factor
var speedFactor = 1.0;

// mouse
var mouse;

// tooltip
var tooltipDiv = $("#tooltip");

// Create orbit trajectory for the planets
function createOrbitTrajectory(Id) {

    var geometry = null;
    if (Id == moonId) geometry = new THREE.CircleGeometry(data[Id].distanceFromEarth, 128);
    else geometry = new THREE.CircleGeometry(data[Id].distanceFromSun, 128);

    var material = new THREE.LineBasicMaterial({color: 0xffffff});

    geometry.vertices.shift();  // Remove center vertex

    trajectories[Id] = new THREE.LineLoop(geometry, material);
    trajectories[Id].rotation.x = Math.PI * 0.5;
    if (Id == moonId) planets[earthId].add(trajectories[Id]);
    else solarSystem.add(trajectories[Id]);

}

// Create planet
function createPlanet(Id) {
    var geometry = new THREE.SphereGeometry(data[Id].size, planetSegments, planetSegments);
    var texture = textureloader.load(data[Id].color);
    var planetBump = null;
    if(data[Id].bump) planetBump = textureloader.load(data[Id].bump);
    var specMap = null;
    if(data[Id].specular) specMap = textureloader.load(data[Id].specular);
    var norMap = null;
    if(data[Id].normal) norMap = textureloader.load(data[Id].normal);
    var material = new THREE.MeshPhongMaterial({
        shininess: 20,
        map: texture,
        bumpMap: planetBump,
        specularMap: specMap,
        normalMap: norMap
    });

    planets[Id] = new THREE.Mesh(geometry, material);
    planets[Id].castShadow = true;
    if(Id == moonId) {
        planets[Id].position.set(data[Id].distanceFromEarth, 0, 0);
        planets[earthId].add(planets[Id]);
    }
    else {
        planets[Id].position.set(data[Id].distanceFromSun, 0, 0);
        solarSystem.add(planets[Id]);
    }

    // Draws its orbit trajectory
    createOrbitTrajectory(Id);

    if(Id == earthId) createPlanet(moonId);

    else if(Id == saturnId) {
        var ringGeometry = new THREE.RingGeometry(data[saturnId].ringInnerDiameter, data[saturnId].ringOuterDiameter, data[saturnId].ringSegments);
        var ringTexture = textureloader.load(data[saturnId].saturnRingColor);
        var ringMaterial = new THREE.MeshBasicMaterial({
            color: 0x757064,
            side: THREE.DoubleSide
        });
        planets[saturnRingId] = new THREE.Mesh(ringGeometry, ringMaterial);
        planets[saturnId].add(planets[saturnRingId]);
        planets[saturnRingId].rotation.x = Math.PI/2;
    }
}

// Move planet
function rotationPlanet(Id, time) {

    // Rotation motion
    if (Id == venusId || Id == neptuneId) planets[Id].rotation.y -= data[Id].rotationRate * speedFactor;      // Retrograde motion
    else planets[Id].rotation.y += data[Id].rotationRate * speedFactor;

    // Orbit motion
    if(Id == moonId) {
        planets[Id].position.x = Math.cos(time * (1.0/(data[Id].orbitRate * (200 / speedFactor)))) * data[Id].distanceFromEarth;
        planets[Id].position.z = Math.sin(time * (1.0/(data[Id].orbitRate * (200 / speedFactor)))) * data[Id].distanceFromEarth;
    }
    else {
        if (Id != sunId) {
            planets[Id].position.x = Math.cos(time * (1.0/(data[Id].orbitRate * (200 / speedFactor)))) * data[Id].distanceFromSun;
            planets[Id].position.z = Math.sin(time * (1.0/(data[Id].orbitRate * (200 / speedFactor)))) * data[Id].distanceFromSun;
        }
    }
}

// Focus camera over a selected planet
function dblclickPlanet(event) {
    // normalize mouse coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // capture the clicked object
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);
    var targetElement = null;
    if (intersects.length > 0) targetElement = intersects[0].object;

    // focus camera on it
    if (targetElement) {
        controls.target.set(targetElement.position.x, targetElement.position.y, targetElement.position.z);
        controls.update();
        let id = 0;
        for(let i = 0; i <= moonId; i++) if(planets[i] == targetElement) id = i;
        selector.selectedIndex = id;
    }
}

function showInfoPlanet(event) {

    // normalize mouse coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // capture the clicked object
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);
    var targetElement = null;
    if (intersects.length > 0) targetElement = intersects[0].object;

    // show tooltip
    if (targetElement) {
        let id = 0;
        for(let i = 0; i <= moonId; i++) if(planets[i] == targetElement) id = i;

        tooltipDiv.css({
            display: "block",
            opacity: 0.0
        });

        var canvasHalfWidth = renderer.domElement.offsetWidth / 2;
        var canvasHalfHeight = renderer.domElement.offsetHeight / 2;

        var tooltipPosition = intersects[0].point.clone().project(camera);
        tooltipPosition.x = (tooltipPosition.x * canvasHalfWidth) + canvasHalfWidth + renderer.domElement.offsetLeft;
        tooltipPosition.y = -(tooltipPosition.y * canvasHalfHeight) + canvasHalfHeight + renderer.domElement.offsetTop;

        var tootipWidth = tooltipDiv[0].offsetWidth;
        var tootipHeight = tooltipDiv[0].offsetHeight;

        tooltipDiv.css({
            left: `${tooltipPosition.x - tootipWidth/2}px`,
            top: `${tooltipPosition.y - tootipHeight - 5}px`
        });

        tooltipDiv.text(data[id].name);

        setTimeout(function() {
            tooltipDiv.css({
                opacity: 1.0
            });
        }, 25);
    }
    else {
        tooltipDiv.css({
            display: "none"
        });
    }
}

// Initialize
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, far );
    camera.position.z = 100;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    raycaster = new THREE.Raycaster();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("container").appendChild(renderer.domElement);
    controls = new THREE.OrbitControls(camera, document.getElementById("container"));

    // Create Solar System group
    solarSystem = new THREE.Group();
    scene.add(solarSystem);

    // The sun is a light source
    pointLight = new THREE.PointLight("rgb(255, 220, 180)", 1.5);
    pointLight.castShadow = true;
    pointLight.shadow.bias = 0.001;
    pointLight.shadow.mapSize.width = 2048;
    pointLight.shadow.mapSize.height = 2048;
    scene.add(pointLight);

    // Create light viewable from all directions.
    ambientLight = new THREE.AmbientLight(0xaaaaaa);

    // Create Sun
    var geometry = new THREE.SphereGeometry(data[sunId].size, 48, 48 );
	var texture = textureloader.load(data[sunId].color);
    var material = new THREE.MeshBasicMaterial({
        map: texture
    });
    planets[sunId] = new THREE.Mesh(geometry, material);
    solarSystem.add(planets[sunId]);

    // Create planets
    createPlanet(mercuryId);
    createPlanet(venusId);
    createPlanet(earthId);
    createPlanet(marsId);
    createPlanet(jupiterId);
    createPlanet(saturnId);
    createPlanet(uranusId);
    createPlanet(neptuneId);
    createPlanet(plutoId);

    // Stars background
    var stars = './img/stars.jpg';
    var starsArray = [stars, stars, stars, stars, stars, stars];
    var cubeStars = new THREE.CubeTextureLoader().load(starsArray);
    cubeStars.format = THREE.RGBFormat;
    scene.background = cubeStars;

    mouse = new THREE.Vector2();

    // listener for window resizing
    window.addEventListener('resize', function(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);

    // listener for double click over a planet
    window.addEventListener('dblclick', dblclickPlanet, false);

    // listener for hover on a planet
    window.addEventListener('mousemove', showInfoPlanet, false);

    // listeners for sidebar menu
    $("#trajCheckbox").on("change", function(event) {
        if (event.target.checked)
            for (let i = mercuryId; i <= moonId; i++)
                trajectories[i].visible = true;
        else
            for (let i = mercuryId; i <= moonId; i++)
                trajectories[i].visible = false;
    });

    $("#playButton").on("click", function(event) {
        if (play) {
            play = false;
            event.target.innerHTML = "Play Animation";
        }
        else {
            play = true;
            event.target.innerHTML = "Pause Animation";
        }
    });

    $("#speedSlider").on("input", function(event) {
        speedFactor = event.target.value;
        document.getElementById("speedText").innerHTML = "Speed: "+speedFactor+"x";
    });

    $("#farSlider").on("input", function(event) {
        far = parseFloat(event.target.value);
        camera.far = far;
        camera.updateProjectionMatrix();
        document.getElementById("farText").innerHTML = "Far: "+far;
    });

    $("#lightSlider").on("input", function(event) {
        let intensity = parseFloat(event.target.value);
        pointLight.intensity = intensity;
        document.getElementById("lightText").innerHTML = "Light intensity: "+intensity;
    });

    $("#cameraSelect").on("change", function(event) {
        let planetId = $("#cameraSelect").val();
        controls.target.set(planets[planetId].position.x, planets[planetId].position.y, planets[planetId].position.z);
        controls.update();
    });

    $("#ambientLightCheckbox").on("change", function(event) {
        if (event.target.checked)
            scene.add(ambientLight);
        else
            scene.remove(ambientLight);
    });

    $(document).ready(function() {
        $('select').formSelect();
    });
}

// Update animation
function render () {
    requestAnimationFrame(render);
    var time = Date.now();
    if (play) for(let i = sunId; i <= moonId; i++) rotationPlanet(i, time);
    controls.update();
    renderer.render(scene, camera);
}

init();
render();
