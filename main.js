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
const earthCloudId = 11;
const saturnRingId = 12;
const solarSystemId = 13;

// Planet (Sphere) segments
const planetSegments = 48;

// Planet data
const data = [];
data[earthId] = {
    name: "Earth",
    size: 1,
    distance: 50,
    orbitRate: 365.2564,
    rotationRate: 0.015,
    equatorInclination: 23.45,
    orbitalInclination: 0,
    orbitCenter: solarSystemId,
    color: 'img/earthColorMap.jpg',
    bump: 'img/earthBumpMap.jpg',
    specular: 'img/earthSpecularMap.jpg',
    cloud: 'img/earthCloudMap.jpg',
    icon: 'img/earth.png'
};
data[sunId] = {
    name: "Sun",
    size: data[earthId].size * 15,
    rotationRate: data[earthId].rotationRate * 0.037,
    equatorInclination: 7.4166,
    color: 'img/sunColorMap.jpg'
};
data[mercuryId] = {
    name: "Mercury",
    size: data[earthId].size * 0.382,
    distance: data[earthId].distance * 0.387,
    orbitRate: data[earthId].orbitRate * 0.0219,
    rotationRate: data[earthId].rotationRate * 0.017,
    equatorInclination: 0,
    orbitalInclination: 7,
    orbitCenter: solarSystemId,
    color: 'img/mercuryColorMap.jpg',
    bump: 'img/mercuryBumpMap.jpg',
    icon: 'img/mercury.png'
};
data[venusId] = {
    name: "Venus",
    size: data[earthId].size * 0.949,
    distance: data[earthId].distance * 0.723,
    orbitRate: data[earthId].orbitRate * 0.6152,
    rotationRate: -data[earthId].rotationRate * 0.0041,
    equatorInclination: 178,
    orbitalInclination: 3.4,
    orbitCenter: solarSystemId,
    color: 'img/venusColorMap.jpg',
    bump: 'img/venusBumpMap.jpg',
    icon: 'img/venus.png'
};
data[marsId] = {
    name: "Mars",
    size: data[earthId].size * 0.532,
    distance: data[earthId].distance * 1.524,
    orbitRate: data[earthId].orbitRate * 1.881,
    rotationRate: data[earthId].rotationRate * 0.949,
    equatorInclination: 23.9833,
    orbitalInclination: 1.85,
    orbitCenter: solarSystemId,
    color: 'img/marsColorMap.jpg',
    bump: 'img/marsBumpMap.jpg',
    normal: 'img/marsNormalMap.jpg',
    icon: 'img/mars.png'
};
data[jupiterId] = {
    name: "Jupiter",
    size: data[earthId].size * 11.19,
    distance: data[earthId].distance * 5.203,
    orbitRate: data[earthId].orbitRate * 11.86,
    rotationRate: data[earthId].rotationRate * 2.434,
    equatorInclination: 3.0833,
    orbitalInclination: 1.3,
    orbitCenter: solarSystemId,
    color: 'img/jupiterColorMap.jpg',
    icon: 'img/jupiter.png'
};
data[saturnId] = {
    name: "Saturn",
    size: data[earthId].size * 9.26,
    distance: data[earthId].distance * 9.537,
    orbitRate: data[earthId].orbitRate * 29.45,
    rotationRate: data[earthId].rotationRate * 2.3388,
    equatorInclination: 26.7333,
    orbitalInclination: 2.4833,
    ringInnerDiameter: data[earthId].size * 10,
    ringOuterDiameter: data[earthId].size * 13,
    ringSegments: 500,
    orbitCenter: solarSystemId,
    color: 'img/saturnColorMap.jpg',
    ringColor: 'img/saturnRingColor.jpg',
    ringPattern: 'img/saturnRingPattern.gif',
    icon: 'img/saturn.png'
};
data[uranusId] = {
    name: "Uranus",
    size: data[earthId].size * 4.01,
    distance: data[earthId].distance * 19.191,
    orbitRate: data[earthId].orbitRate * 84.02,
    rotationRate: -data[earthId].rotationRate * 1.3888,
    equatorInclination: 98,
    orbitalInclination: 0.7666,
    orbitCenter: solarSystemId,
    color: 'img/uranusColorMap.jpg',
    ring: 'img/uranusRingColor.jpg',
    icon: 'img/uranus.png'
};
data[neptuneId] = {
    name: "Neptune",
    size: data[earthId].size * 3.88,
    distance: data[earthId].distance * 30.069,
    orbitRate: data[earthId].orbitRate * 164.79,
    rotationRate: data[earthId].rotationRate * 1.4912,
    equatorInclination: 28.8,
    orbitalInclination: 1.7666,
    orbitCenter: solarSystemId,
    color: 'img/neptuneColorMap.jpg',
    icon: 'img/neptune.png'
};
data[plutoId] = {
    name: "Pluto",
    size: data[earthId].size * 0.18,
    distance: data[earthId].distance * 39.44,
    orbitRate: data[earthId].orbitRate * 249.6913,
    rotationRate: -data[earthId].rotationRate * 0.0065,
    equatorInclination: 0,
    orbitalInclination: 17.1666,
    orbitCenter: solarSystemId,
    color: 'img/plutoColorMap.jpg',
    bump: 'img/plutoBumpMap.jpg',
    icon: 'img/pluto.png'
};
data[moonId] = {
    name: "Moon",
    orbitRate: 27.3,
    rotationRate: data[earthId].rotationRate * 0.0366,
    distance: 2.0,
    size: data[earthId].size * 0.2725,
    equatorInclination: 0,
    orbitalInclination: 5.25,
    orbitCenter: earthId,
    color: 'img/moonColorMap.jpg',
    bump: 'img/moonBumpMap.jpg',
    icon: 'img/moon.png'
};

var scene, camera, renderer, controls, raycaster;

// Far camera parameter
var far = 10000;

// Planets array
var planets = [];

// Trajectories array
var trajectories = [];

// Light of the sunId
var sunLight;

// Ambient light
var ambientLight;

// Texture Loader
var textureloader = new THREE.TextureLoader();

// Play or pause the animation
var play = true;

// Rotation speed factor
var rotationSpeedFactor = 1.0;

// Revolution speed factor
var revolutionSpeedFactor = 1.0;

// Rotation
var rotatingAroundEquator = true;

// Revolution
var rotatingAroundSun = true;

// mouse
var mouse;

// tooltip
var tooltipDiv = $("#tooltip");

// Create orbit trajectory for the planets
function createOrbitTrajectory(Id) {
    var geometry = null;
    geometry = new THREE.CircleGeometry(data[Id].distance, 128);
    var material = new THREE.LineBasicMaterial({color: 0xffffff});

    geometry.vertices.shift();  // Remove center vertex

    trajectories[Id] = new THREE.LineLoop(geometry, material);
    trajectories[Id].rotation.x = Math.PI * 0.5;
    trajectories[Id].name = "trajectory";        // used for ignoring if focus on it
    planets[data[Id].orbitCenter].add(trajectories[Id]);
}

function createSun() {
    planets[solarSystemId] = new THREE.Group();
    scene.add(planets[solarSystemId]);

    // The sun is a light source
    sunLight = new THREE.PointLight("rgb(255, 220, 180)", 1.5);
    sunLight.castShadow = true;
    sunLight.shadow.bias = 0.001;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    // Create Sun
    var geometry = new THREE.SphereGeometry(data[sunId].size, 48, 48 );
	var texture = textureloader.load(data[sunId].color);
    var material = new THREE.MeshBasicMaterial({
        map: texture
    });
    planets[sunId] = new THREE.Mesh(geometry, material);
    planets[sunId].name = data[sunId].name;
    planets[solarSystemId].add(planets[sunId]);
}

// Create planet
function createPlanet(Id) {
    var geometry = new THREE.SphereGeometry(data[Id].size, planetSegments, planetSegments);
    var texture = textureloader.load(data[Id].color);
    var material = new THREE.MeshPhongMaterial({
        shininess: 20,
        map: texture
    });
    if(data[Id].hasOwnProperty('bump')) material.bumpMap = textureloader.load(data[Id].bump);
    if(data[Id].hasOwnProperty('specular')) material.specularMap = textureloader.load(data[Id].specular);
    if(data[Id].hasOwnProperty('normal')) material.normalMap = textureloader.load(data[Id].normal);

    planets[Id] = new THREE.Mesh(geometry, material);
    planets[Id].castShadow = true;
    planets[Id].name = data[Id].name;       // used for not ignoring if focus on it
    planets[Id].position.set(data[Id].distance, 0, 0);
    planets[data[Id].orbitCenter].add(planets[Id]);

    // Draws its orbit trajectory
    createOrbitTrajectory(Id);

    if(Id == saturnId) {
        var ringGeometry = new THREE.RingGeometry(data[saturnId].ringInnerDiameter, data[saturnId].ringOuterDiameter, data[saturnId].ringSegments);
        var ringTexture = textureloader.load(data[saturnId].ringColor);
        var ringPattern = textureloader.load(data[saturnId].ringPattern);
        var ringMaterial = new THREE.MeshBasicMaterial({
            map: ringTexture,
            alphaMap: ringPattern,
            side: THREE.DoubleSide
        });
        planets[saturnRingId] = new THREE.Mesh(ringGeometry, ringMaterial);
        planets[saturnRingId].rotation.x = Math.PI/2;
        planets[saturnRingId].name = "Rings of Saturn";       // used for not ignoring if focus on it
        planets[saturnId].add(planets[saturnRingId]);
    }
}

//Create stars
function createStars(image) {
    var starsArray = [];
    for(let i = 0; i < 6; i++) starsArray[i] = image;
    var cubeStars = new THREE.CubeTextureLoader().load(starsArray);
    cubeStars.format = THREE.RGBFormat;
    scene.background = cubeStars;
}

// Create Earth cloud
function createEarthCloud() {
    var cloudTexture = textureloader.load(data[earthId].cloud);
    var material = new THREE.MeshPhongMaterial({
        map: cloudTexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
    });
    planets[earthCloudId] = new THREE.Mesh(new THREE.SphereGeometry(data[earthId].size, planetSegments, planetSegments), material);
    planets[earthCloudId].scale.set(1.02, 1.02, 1.02);
    planets[earthCloudId].name = data[earthId].name;
}

// Move planet
function rotationPlanet(Id, time) {
    // Rotation motion
    if(rotatingAroundEquator) planets[Id].rotation.y += data[Id].rotationRate * rotationSpeedFactor;

    // Orbit motion
    if(rotatingAroundSun && Id != sunId) {
        planets[Id].position.x = Math.cos(time * (1.0/(data[Id].orbitRate * (200 / revolutionSpeedFactor)))) * data[Id].distance;
        planets[Id].position.z = Math.sin(time * (1.0/(data[Id].orbitRate * (200 / revolutionSpeedFactor)))) * data[Id].distance;
    }
}

// Capture the object selected with mouse
function captureObject(point) {
    // normalize mouse coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // capture the clicked object
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);

    // Analize the result
    for (let i = 0; i < intersects.length; i++)
        if (intersects[i].object.name != "trajectory") {
            if (point) point.coord = intersects[i].point;   // funct called by showInfoPlanet
            return intersects[i].object;    // found object that is not a trajectory
        }
    return null;    // there are no element or only trajectories
}

// Focus camera over a selected planet
function dblclickPlanet(event) {
    // capture the object
    var targetElement = captureObject(null);       // null if it's not object or it's trajectory

    let id = -1;
    for(let i = sunId; i <= saturnRingId; i++) if(planets[i] == targetElement) id = i;

    // focus camera on it
    if (targetElement && id != -1) {
        controls.target.set(targetElement.position.x, targetElement.position.y, targetElement.position.z);
        controls.update();
        $("#cameraSelect").val(id);
        $("#cameraSelect").formSelect();
    }
}

function showInfoPlanet(event) {
    // capture the object
    var point = {coord:null};
    var targetElement = captureObject(point);       // null if it's not object or it's trajectory

    // show tooltip
    if (targetElement) {
        tooltipDiv.css({
            display: "block",
            opacity: 0.0
        });

        var canvasHalfWidth = renderer.domElement.offsetWidth / 2;
        var canvasHalfHeight = renderer.domElement.offsetHeight / 2;

        var tooltipPosition = point.coord.clone().project(camera);
        tooltipPosition.x = (tooltipPosition.x * canvasHalfWidth) + canvasHalfWidth + renderer.domElement.offsetLeft;
        tooltipPosition.y = -(tooltipPosition.y * canvasHalfHeight) + canvasHalfHeight + renderer.domElement.offsetTop;

        var tootipWidth = tooltipDiv[0].offsetWidth;
        var tootipHeight = tooltipDiv[0].offsetHeight;

        tooltipDiv.css({
            left: `${tooltipPosition.x - tootipWidth/2}px`,
            top: `${tooltipPosition.y - tootipHeight - 70}px`
        });

        tooltipDiv.text(targetElement.name);

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
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, far);
    camera.position.y = 45;
    camera.position.z = 100;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    raycaster = new THREE.Raycaster();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("container").appendChild(renderer.domElement);
    controls = new THREE.OrbitControls(camera, document.getElementById("container"));

    // Create Solar System group
    createSun();

    // Create planets
    for(let i = mercuryId; i <= moonId; i++) createPlanet(i);

    // Create Earth clouds
    createEarthCloud();

    // Stars background
    createStars('./img/stars.jpg');

    // Create light viewable from all directions.
    ambientLight = new THREE.AmbientLight(0xaaaaaa);

    mouse = new THREE.Vector2();

    // listener for window resizing
    window.addEventListener('resize', function(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);

    // listener for double click over a planet
    document.getElementById("container").addEventListener('dblclick', dblclickPlanet, false);

    // listener for hover on a planet
    window.addEventListener('mousemove', showInfoPlanet, false);

    // listeners for sidebar menu
    $("#trajectoriesCheckbox").on("change", function(event) {
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
            if($("#rotationCheckbox").is(':checked')) $("#rotationCheckbox").click();
            if($("#revolutionCheckbox").is(':checked')) $("#revolutionCheckbox").click();
            $("#rotationCheckbox").attr("disabled", "true");
            $("#revolutionCheckbox").attr("disabled", "true");
        }
        else {
            play = true;
            event.target.innerHTML = "Pause Animation";
            $("#rotationCheckbox").removeAttr("disabled");
            $("#revolutionCheckbox").removeAttr("disabled");
            $("#rotationCheckbox").click();
            $("#revolutionCheckbox").click();
        }
    });

    $("#rotationCheckbox").on("change", function(event) {
        if (event.target.checked) rotatingAroundEquator = true;
        else rotatingAroundEquator= false;
    });

    $("#revolutionCheckbox").on("change", function(event) {
        if (event.target.checked) rotatingAroundSun = true;
        else rotatingAroundSun= false;
    });

    $("#rotationSpeedSlider").on("input", function(event) {
        rotationSpeedFactor = event.target.value;
        document.getElementById("rotationSpeedText").innerHTML = "Rotation speed: "+rotationSpeedFactor+"x";
    });

    $("#revolutionSpeedSlider").on("input", function(event) {
        revolutionSpeedFactor = event.target.value;
        document.getElementById("revolutionSpeedText").innerHTML = "Revolution speed: "+revolutionSpeedFactor+"x";
    });

    $("#farSlider").on("input", function(event) {
        far = parseFloat(event.target.value);
        camera.far = far;
        camera.updateProjectionMatrix();
        document.getElementById("farText").innerHTML = "Far: "+far;
    });

    $("#cameraSelect").on("change", function(event) {
        let planetId = $("#cameraSelect").val();
        controls.target.set(planets[planetId].position.x, planets[planetId].position.y, planets[planetId].position.z);
        controls.update();
    });

    $("#earthCloudCheckbox").on("change", function(event) {
        if (event.target.checked) {
            planets[earthId].add(planets[earthCloudId]);
        }
        else {
            planets[earthId].remove(planets[earthCloudId]);
        }
    });

    $("#ambientLightCheckbox").on("change", function(event) {
        if (event.target.checked) scene.add(ambientLight);
        else scene.remove(ambientLight);
    });

    $("#sunLightCheckbox").on("change", function(event) {
        if (event.target.checked) scene.add(sunLight);
        else scene.remove(sunLight);
    });

    $("#sunLightSlider").on("input", function(event) {
        let intensity = parseFloat(event.target.value);
        sunLight.intensity = intensity;
        document.getElementById("sunLightText").innerHTML = "Sun light intensity: "+intensity;
    });

    $(document).ready(function() {
        $('.sidenav').sidenav({edge: 'right'});
        $('select').formSelect();
    });
}

// Update animation
function render () {
    requestAnimationFrame(render);
    var time = Date.now();
    for(let i = sunId; i <= moonId; i++) rotationPlanet(i, time);
    controls.update();
    renderer.render(scene, camera);
}

init();
render();
