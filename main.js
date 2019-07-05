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
const uranusRingId = 13;
const sunGlowId = 14;
const solarSystemId = 15;
const earthSystemId = 16;
const saturnSystemId = 17;
const uranusSystemId = 18;
const asteroidBeltId = 19;

// Planet (Sphere) segments
const planetSegments = 48;

// Trajectory segments
const trajSegments = 1024;

// Planet data
const data = [];
data[earthId] = {
    name: "Earth",
    size: 1,
    distance: 50,
    orbitRate: 365,
    rotationRate: 0.015,
    equatorInclination: 23.45,
    orbitalInclination: 0,
    orbitCenter: earthSystemId,
    groupId: earthSystemId,
    color: 'img/earthColorMap.jpg',
    bump: 'img/earthBumpMap.jpg',
    specular: 'img/earthSpecularMap.jpg',
    cloud: 'img/earthCloudMap.jpg',
    cloudTrans: 'img/earthCloudMapTrans.jpg',
    icon: 'img/earth.png',
    bumpScale: 0.05
};
data[sunId] = {
    name: "Sun",
    size: data[earthId].size * 15,
    rotationRate: data[earthId].rotationRate * 0.037,
    equatorInclination: 7.4166,
    color: 'img/sunColorMap.jpg',
    glow: 'img/glow.png',
    bumpScale: 0.05
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
    icon: 'img/mercury.png',
    bumpScale: 0.005
};
data[venusId] = {
    name: "Venus",
    size: data[earthId].size * 0.949,
    distance: data[earthId].distance * 0.723,
    orbitRate: data[earthId].orbitRate * 0.6152,
    rotationRate: data[earthId].rotationRate * 0.0041,
    equatorInclination: 178,
    orbitalInclination: 3.4,
    orbitCenter: solarSystemId,
    color: 'img/venusColorMap.jpg',
    bump: 'img/venusBumpMap.jpg',
    icon: 'img/venus.png',
    bumpScale: 0.005
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
    icon: 'img/mars.png',
    bumpScale: 0.05
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
    icon: 'img/jupiter.png',
    bumpScale: 0.02
};
data[saturnId] = {
    name: "Saturn",
    size: data[earthId].size * 9.26,
    distance: data[earthId].distance * 9.537,
    orbitRate: data[earthId].orbitRate * 29.45,
    rotationRate: data[earthId].rotationRate * 2.3388,
    equatorInclination: 26.7333,
    orbitalInclination: 2.4833,
    ringSegments: 500,
    orbitCenter: solarSystemId,
    groupId: saturnSystemId,
    color: 'img/saturnColorMap.jpg',
    ringColor: 'img/saturnRingColor.jpg',
    ringPattern: 'img/saturnRingPattern.gif',
    ringId: saturnRingId,
    icon: 'img/saturn.png',
    bumpScale: 0.05
};
data[saturnId].ringInnerDiameter = data[saturnId].size * 1.5;
data[saturnId].ringOuterDiameter = data[saturnId].ringInnerDiameter * 1.5;
data[uranusId] = {
    name: "Uranus",
    size: data[earthId].size * 4.01,
    distance: data[earthId].distance * 19.191,
    orbitRate: data[earthId].orbitRate * 84.02,
    rotationRate: data[earthId].rotationRate * 1.3888,
    equatorInclination: 98,
    orbitalInclination: 0.7666,
    ringSegments: 500,
    orbitCenter: solarSystemId,
    groupId: uranusSystemId,
    color: 'img/uranusColorMap.jpg',
    ringColor: 'img/uranusRingColor.jpg',
    ringPattern: 'img/uranusRingPattern.gif',
    ringId: uranusRingId,
    icon: 'img/uranus.png',
    bumpScale: 0.05
};
data[uranusId].ringInnerDiameter = data[uranusId].size * 1.5;
data[uranusId].ringOuterDiameter = data[uranusId].ringInnerDiameter * 1.5;
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
    rotationRate: data[earthId].rotationRate * 0.0065,
    equatorInclination: 0,
    orbitalInclination: 17.1666,
    orbitCenter: solarSystemId,
    color: 'img/plutoColorMap.jpg',
    bump: 'img/plutoBumpMap.jpg',
    icon: 'img/pluto.png',
    bumpScale: 0.005
};
data[moonId] = {
    name: "Moon",
    orbitRate: 27.3,
    rotationRate: data[earthId].rotationRate * 0.0366,
    distance: 2.0,
    size: data[earthId].size * 0.2725,
    equatorInclination: 0,
    orbitalInclination: 5.25,
    orbitCenter: earthSystemId,
    color: 'img/moonColorMap.jpg',
    bump: 'img/moonBumpMap.jpg',
    icon: 'img/moon.png',
    bumpScale: 0.002
};
data[asteroidBeltId] = {
    name: "Asteroid Belt",
    distance: (data[jupiterId].distance + data[marsId].distance)/2,
    size: 0.01,
    minOffsetY: -5,
    maxOffsetY: 5,
    minOffsetXZ: -30,
    maxOffsetXZ: 30,
    number: 20000,
    orbitCenter: solarSystemId,
    orbitRate: (data[marsId].orbitRate + data[jupiterId].orbitRate)/2
};

var scene, camera, renderer, controls, raycaster;

// Date
var date = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

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
var textureLoader = new THREE.TextureLoader();

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

// sound var used in addAmbientMusic function
var sound, audioListener, audioLoader;
var volume = 0.3;
var tracks = ['sounds/ambient.ogg', 'sounds/strangerThings.ogg'];
var sounds = [];

// Follow planet
var followPlanetId = sunId;
var cameraFollowsPlanet = true;

// Create orbit trajectory for the planets
function createOrbitTrajectory(Id) {
    var geometry = null;
    geometry = new THREE.CircleGeometry(data[Id].distance, trajSegments);
    var material = new THREE.LineBasicMaterial({color: 0xffffff});

    geometry.vertices.shift();  // Remove center vertex

    trajectories[Id] = new THREE.LineLoop(geometry, material);
    trajectories[Id].rotation.x = Math.PI * 0.5;
    trajectories[Id].name = "trajectory";        // used for ignoring if focus on it
    if (Id != moonId) planets[solarSystemId].add(trajectories[Id]);
    else planets[data[Id].orbitCenter].add(trajectories[Id]);
}

function createSun() {
    planets[solarSystemId] = new THREE.Group();
    scene.add(planets[solarSystemId]);

    planets[earthSystemId] = new THREE.Group();
    planets[earthSystemId].position.set(data[earthId].distance, 0, 0);
    planets[solarSystemId].add(planets[earthSystemId]);

    // The sun is a light source
    sunLight = new THREE.PointLight("rgb(255, 220, 180)", 1.5);
    sunLight.castShadow = true;
    sunLight.shadow.bias = 0.0001;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    // Create Sun
    var geometry = new THREE.SphereGeometry(data[sunId].size, 48, 48 );
	var texture = textureLoader.load(data[sunId].color);
    var material = new THREE.MeshBasicMaterial({
        map: texture
    });
    planets[sunId] = new THREE.Mesh(geometry, material);
    planets[sunId].name = data[sunId].name;
    planets[sunId].myId = sunId;
    planets[sunId].receiveShadow = false;
    planets[sunId].castShadow = false;
    planets[solarSystemId].add(planets[sunId]);

    // Create the glow of the sun.
    var spriteMaterial = new THREE.SpriteMaterial({
        map: textureLoader.load(data[sunId].glow),
        color: 0xffffee,
        transparent: true,
        blending: THREE.AdditiveBlending
    });
    planets[sunGlowId] = new THREE.Sprite(spriteMaterial);
    planets[sunGlowId].name = "Sun Glow";
    planets[sunGlowId].scale.set(70, 70, 1.0);
    planets[sunId].add(planets[sunGlowId]); // This centers the glow at the sun.
}

// Create planet
function createPlanet(Id) {
    var geometry = new THREE.SphereGeometry(data[Id].size, planetSegments, planetSegments);
    var texture = textureLoader.load(data[Id].color);
    var material = new THREE.MeshPhongMaterial({
        map: texture
    });
    if (data[Id].hasOwnProperty('bump')) {
        material.bumpMap = textureLoader.load(data[Id].bump);
        material.bumpScale = data[Id].bumpScale;
    }
    if (data[Id].hasOwnProperty('specular')) {
        material.specularMap = textureLoader.load(data[Id].specular);
        material.specular = new THREE.Color('grey');
    }
    if (data[Id].hasOwnProperty('normal')) material.normalMap = textureLoader.load(data[Id].normal);

    planets[Id] = new THREE.Mesh(geometry, material);

    // Eclipse
    if (Id == earthId || Id == moonId) {
        planets[Id].receiveShadow = true;
        planets[Id].castShadow = true;
    }
    planets[Id].name = data[Id].name; // used for not ignoring if focus on it
    planets[Id].myId = Id;
    planets[Id].rotation.x = data[Id].equatorInclination * Math.PI/180;
    planets[Id].rotation.z = data[Id].equatorInclination * Math.PI/180;

    if (data[Id].hasOwnProperty('ringId')) {
        planets[data[Id].groupId] = new THREE.Group();
        planets[data[Id].groupId].add(planets[Id]);
        createRing(Id);
        planets[data[Id].groupId].position.set(data[Id].distance, 0, 0);
        planets[data[Id].orbitCenter].add(planets[data[Id].groupId]);
    }
    else {
        if (Id != earthId) planets[Id].position.set(data[Id].distance, 0, 0);
        planets[data[Id].orbitCenter].add(planets[Id]);
    }

    // Draws its orbit trajectory
    createOrbitTrajectory(Id);
}

// Create ring
function createRing(Id) {
    var ringGeometry = new THREE.BufferGeometry().fromGeometry(
                new _RingGeometry(data[Id].ringInnerDiameter, data[Id].ringOuterDiameter, data[Id].ringSegments));
    //new THREE.RingGeometry(data[Id].ringInnerDiameter, data[Id].ringOuterDiameter, data[Id].ringSegments);
    var ringTexture = textureLoader.load(data[Id].ringColor);
    var ringPattern = textureLoader.load(data[Id].ringPattern);
    var ringMaterial = new THREE.MeshPhongMaterial({
        map: ringTexture,
        alphaMap: ringPattern,
        side: THREE.DoubleSide,
		transparent: true,
		opacity: 0.8
    });
    planets[data[Id].ringId] = new THREE.Mesh(ringGeometry, ringMaterial);
    planets[data[Id].ringId].castShadow = true;
    planets[data[Id].ringId].rotation.x = Math.PI/2 + data[Id].equatorInclination * Math.PI/180;
    planets[data[Id].ringId].name = "Rings of " + data[Id].name; // used for not ignoring if focus on it
    planets[data[Id].ringId].myId = data[Id].ringId;
    planets[data[Id].groupId].add(planets[data[Id].ringId]);
}

//Create stars
function createStars(image) {
    var starsArray = [];
    for (let i = 0; i < 6; i++) starsArray[i] = image;
    var cubeStars = new THREE.CubeTextureLoader().load(starsArray);
    cubeStars.format = THREE.RGBFormat;
    scene.background = cubeStars;
}

// Create Earth cloud
function createEarthCloud() {
    // create destination canvas
	var canvasResult	= document.createElement('canvas');
	canvasResult.width	= 1024;
	canvasResult.height	= 512;
	var contextResult	= canvasResult.getContext('2d');

	// load earthcloudmap
	var imageMap	= new Image();
	imageMap.addEventListener("load", function() {

		// create dataMap ImageData for earthcloudmap
		var canvasMap	= document.createElement('canvas');
		canvasMap.width	= imageMap.width;
		canvasMap.height= imageMap.height;
		var contextMap	= canvasMap.getContext('2d');
		contextMap.drawImage(imageMap, 0, 0);
		var dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height);

		// load earthcloudmaptrans
		var imageTrans	= new Image();
		imageTrans.addEventListener("load", function(){
			// create dataTrans ImageData for earthcloudmaptrans
			var canvasTrans		= document.createElement('canvas');
			canvasTrans.width	= imageTrans.width;
			canvasTrans.height	= imageTrans.height;
			var contextTrans	= canvasTrans.getContext('2d');
			contextTrans.drawImage(imageTrans, 0, 0);
			var dataTrans		= contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height);
			// merge dataMap + dataTrans into dataResult
			var dataResult		= contextMap.createImageData(canvasMap.width, canvasMap.height);
			for (var y = 0, offset = 0; y < imageMap.height; y++){
				for (var x = 0; x < imageMap.width; x++, offset += 4){
					dataResult.data[offset+0]	= dataMap.data[offset+0];
					dataResult.data[offset+1]	= dataMap.data[offset+1];
					dataResult.data[offset+2]	= dataMap.data[offset+2];
					dataResult.data[offset+3]	= 255 - dataTrans.data[offset+0];
				}
			}
			// update texture with result
			contextResult.putImageData(dataResult,0,0)
			material.map.needsUpdate = true;
		})
		imageTrans.src	= data[earthId].cloudTrans;
	}, false);
	imageMap.src = data[earthId].cloud;
    var geometry = new THREE.SphereGeometry(data[earthId].size, planetSegments, planetSegments);
	var material = new THREE.MeshPhongMaterial({
		map: new THREE.Texture(canvasResult),
		side: THREE.DoubleSide,
		transparent: true,
        depthWrite: false,
		opacity: 0.8
	});
	planets[earthCloudId] = new THREE.Mesh(geometry, material);
    planets[earthCloudId].scale.set(1.02, 1.02, 1.02);
    planets[earthCloudId].name = "Earth";
    planets[earthCloudId].receiveShadow = true;
    planets[earthCloudId].myId = earthCloudId;
}

// Create asteroid belt
function createAsteroidBelt() {
    // Values as variables to not made code too difficult to read
    const asteroidSize = data[asteroidBeltId].size;
    const distance = data[asteroidBeltId].distance;
    const minOffsetY = data[asteroidBeltId].minOffsetY;
    const maxOffsetY = data[asteroidBeltId].maxOffsetY;
    const minOffsetXZ = data[asteroidBeltId].minOffsetXZ;
    const maxOffsetXZ = data[asteroidBeltId].maxOffsetXZ;

    // Create an invisible torus only to make working showInfoPlanet when move on it
    var torusAsteroid = new THREE.Mesh(new THREE.TorusGeometry(distance, maxOffsetY, planetSegments, planetSegments), new THREE.MeshBasicMaterial({
        transparent: true,  // made torus transparent
        opacity: 0.0        // made torus transparent
    }));
    torusAsteroid.rotation.x = Math.PI/2;
    torusAsteroid.name = data[asteroidBeltId].name;
    planets[solarSystemId].add(torusAsteroid);

    const asteroidCount = data[asteroidBeltId].number;
    var asteroidsGeometry = new THREE.Geometry();

    // now create the individual particles
    for (let i = 0; i < asteroidCount; i++) {
        // create a particle with random position
        var asteroidDistance = distance + THREE.Math.randFloat(minOffsetXZ, maxOffsetXZ);
        var angle = THREE.Math.randFloat(0, 2*Math.PI);
        var coord = new THREE.Vector3();

        coord.x = Math.cos(angle) * asteroidDistance;
        coord.y = THREE.Math.randFloat(minOffsetY, maxOffsetY);
        coord.z = Math.sin(angle) * asteroidDistance;

        // insert asteroid
        asteroidsGeometry.vertices.push(coord);
    }

    asteroidsGeometry.morphAttributes = {};     // use to fix updateMorphAttribute bug

    planets[asteroidBeltId] = new THREE.Points(asteroidsGeometry, new THREE.PointsMaterial({ size: asteroidSize }));
    planets[asteroidBeltId].name = data[asteroidBeltId].name;
    planets[asteroidBeltId].myId = asteroidBeltId;
    planets[solarSystemId].add(planets[asteroidBeltId]);
}

// Move planet
function movePlanet(Id, time) {
    // Rotation motion
    if (rotatingAroundEquator) rotationMovement(Id, time);

    // Orbit motion
    if (rotatingAroundSun && Id != sunId) revolutionMovement(Id, time);
}

function rotationMovement(Id, time) {
    planets[Id].rotation.y += data[Id].rotationRate * rotationSpeedFactor;
    if (Id == earthId) {
        planets[earthCloudId].rotation.y -= data[Id].rotationRate/2 * rotationSpeedFactor;
    }
    if (data[Id].hasOwnProperty('ringId')) planets[data[Id].ringId].rotation.z += data[Id].rotationRate * rotationSpeedFactor;
}

function revolutionMovement(Id, time) {
    let currentId = Id;
    if (data[Id].hasOwnProperty('groupId')) currentId = data[Id].groupId;
    planets[currentId].position.x = -Math.cos(time * 2 * Math.PI/(data[Id].orbitRate *24*3600000)) * data[Id].distance;
    planets[currentId].position.z = Math.sin(time * 2 * Math.PI/(data[Id].orbitRate *24*3600000)) * data[Id].distance;
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
        if (intersects[i].object.name != "trajectory" && intersects[i].object.name != "Sun Glow") {
            if ($("#asteroidBeltCheckbox").is(':checked')) {
                if (point) point.coord = intersects[i].point;   // funct called by showInfoPlanet
                return intersects[i].object;    // found object that is not a trajectory or sun glow
            }
            else {
                if (intersects[i].object.name != "Asteroid Belt") {
                    if (point) point.coord = intersects[i].point;   // funct called by showInfoPlanet
                    return intersects[i].object;    // found object that is not a trajectory, sun glow or asteroid belt
                }
            }
        }
    return null;    // there are no element or only trajectories
}

// Focus camera over a selected planet
function dblclickPlanet(event) {
    // capture the object
    var targetElement = captureObject(null);       // null if it's not object or it's trajectory

    // focus camera on it
    if (targetElement && targetElement.name != planets[asteroidBeltId].name && targetElement.name != planets[moonId].name) {
        followPlanetId = targetElement.myId;
        if (data[followPlanetId].hasOwnProperty('groupId')) followPlanetId = data[followPlanetId].groupId;
        followPlanet(followPlanetId);
        goToObject(followPlanetId);
        $("#cameraSelect").val(targetElement.myId);
        $("#cameraSelect").formSelect();
    }
}

// Function to move the camera near the object
function goToObject(Id) {
    if (Id == sunId) {
        camera.position.set(planets[Id].position.x + 30, planets[Id].position.y + 15, planets[Id].position.z + 30);
        camera.zoom = 3.0;
    }
    else {
        camera.position.set(planets[Id].position.x + 25, planets[Id].position.y + 12.5, planets[Id].position.z + 25);
        camera.zoom = 3.0;
    }
}

// Function to update target object
function followPlanet(Id) {
    controls.target.set(planets[Id].position.x, planets[Id].position.y, planets[Id].position.z);
    controls.update();
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

function incrementDate() {
    date = new Date(date.getTime() + 86400000 * revolutionSpeedFactor);
    setDate(date);
}

function getMonthName(month) {
    return monthNames[month];
}

function setDate() {
    $("#currentDate").val(getMonthName(date.getMonth()) + " " + date.getDate() + ", " + date.getFullYear());
    $("#currentTime").val(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}

// Ambient music
function ambientMusic() {
    // load a sound and set it as the Audio object's buffer
    audioLoader = new THREE.AudioLoader();

    for (let i = 0; i < tracks.length; i++) {
        // create a global audio source array
        sounds[i] = new THREE.Audio(audioListener);

        audioLoader.load(tracks[i], function(buffer) {
        	sounds[i].setBuffer(buffer);
        	sounds[i].setLoop(true);
        	sounds[i].setVolume(volume);
            // Start firts track
            if (i == 0) {
                sound = sounds[0];
                sound.play();
            }
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
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("container").appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    controls = new THREE.OrbitControls(camera, document.getElementById("container"));
    controls.autoRotateSpeed = 1;

    // Create Solar System group
    createSun();

    // Create planets
    for (let i = mercuryId; i <= moonId; i++) createPlanet(i);

    // Create asteroid belt
    createAsteroidBelt();

    // Create Earth clouds
    createEarthCloud();

    // Stars background
    createStars('./img/stars.jpg');

    // Create light viewable from all directions.
    scene.add(new THREE.AmbientLight(0x222222));
    ambientLight = new THREE.AmbientLight(0xaaaaaa);

    // create an AudioListener and add it to the camera
    audioListener = new THREE.AudioListener();
    camera.add(audioListener);

    // Add ambient music
    ambientMusic();

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

    // listener for ambient music
    $("#music-button").on("click", function(event) {
        if (sound.isPlaying) {
            sound.pause();
            $("#music-button").html('<i class="material-icons">volume_up</i>');
        }
        else {
            sound.play();
            $("#music-button").html('<i class="material-icons">volume_off</i>');
        }
    });

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
            event.target.innerHTML = "<i class='material-icons left'>play_circle_filled</i>Play Animation";
            if ($("#rotationCheckbox").is(':checked')) $("#rotationCheckbox").click();
            if ($("#revolutionCheckbox").is(':checked')) $("#revolutionCheckbox").click();
            $("#rotationCheckbox").attr("disabled", "true");
            $("#revolutionCheckbox").attr("disabled", "true");
        }
        else {
            play = true;
            event.target.innerHTML = "<i class='material-icons left'>pause_circle_filled</i>Pause Animation";
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
        document.getElementById("rotationSpeedText").innerHTML = "Rotation speed: " + rotationSpeedFactor + "x";
    });

    $("#revolutionSpeedSlider").on("input", function(event) {
        revolutionSpeedFactor = event.target.value;
        document.getElementById("revolutionSpeedText").innerHTML = "Revolution speed: " + revolutionSpeedFactor + "x";
    });

    $("#farSlider").on("input", function(event) {
        far = parseFloat(event.target.value);
        camera.far = far;
        camera.updateProjectionMatrix();
        document.getElementById("farText").innerHTML = "Far: " + far;
    });

    $("#cameraSelect").on("change", function(event) {
        let planetId = $("#cameraSelect").val();
        if (data[planetId].hasOwnProperty('groupId')) planetId = data[planetId].groupId;
        followPlanetId = planetId;
        followPlanet(followPlanetId);
        goToObject(followPlanetId);
    });

    $("#followPlanetCheckbox").on("change", function(event) {
        if (event.target.checked) cameraFollowsPlanet = true;
        else cameraFollowsPlanet = false;
    });

    $("#rotateCameraCheckbox").on("change", function(event) {
        if (event.target.checked) controls.autoRotate = true;
        else controls.autoRotate = false;
    });

    $("#earthCloudCheckbox").on("change", function(event) {
        if (event.target.checked) planets[earthId].add(planets[earthCloudId]);
        else planets[earthId].remove(planets[earthCloudId]);
    });

    $("#asteroidBeltCheckbox").on("change", function(event) {
        if (event.target.checked) planets[solarSystemId].add(planets[asteroidBeltId]);
        else planets[solarSystemId].remove(planets[asteroidBeltId]);
    });

    $("#ambientLightCheckbox").on("change", function(event) {
        if (event.target.checked) scene.add(ambientLight);
        else scene.remove(ambientLight);
    });

    $("#sunLightCheckbox").on("change", function(event) {
        if (event.target.checked) scene.add(sunLight);
        else scene.remove(sunLight);
    });

    $("#sunGlowCheckbox").on("change", function(event) {
        if (event.target.checked) planets[sunId].add(planets[sunGlowId]);
        else planets[sunId].remove(planets[sunGlowId]);
    });

    $("#sunLightSlider").on("input", function(event) {
        let intensity = parseFloat(event.target.value);
        sunLight.intensity = intensity;
        document.getElementById("sunLightText").innerHTML = "Sun light intensity: " + intensity;
    });

    $("#trackSelect").on("change", function(event) {
        let track = $("#trackSelect").val();
        sound.stop();
        sound = sounds[track];
        sound.setVolume(volume);
        sound.play();
    });

    $("#volumeSlider").on("input", function(event) {
        volume = parseFloat(event.target.value);
        sound.setVolume(volume);
        document.getElementById("volumeText").innerHTML = "Volume: " + volume;
    });

    $("#setDate").on("change", function(event) {
        if (rotatingAroundSun) $("#revolutionCheckbox").click();
        let newDate = document.getElementById("setDate").value;
        let dateString = newDate + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        date = new Date(dateString);
        setDate();
        for (let i = mercuryId; i <= moonId; i++) revolutionMovement(i, date.getTime());
    });

    $("#setTime").on("change", function(event) {
        if (rotatingAroundSun) $("#revolutionCheckbox").click();
        let newTime = document.getElementById("setTime").value;
        let dateString = getMonthName(date.getMonth()) + " " + date.getDate() + ", " + date.getFullYear() + " " + newTime + ":" + date.getSeconds();
        date = new Date(dateString);
        setDate();
        for (let i = mercuryId; i <= moonId; i++) revolutionMovement(i, date.getTime());
    });

    $(document).ready(function() {
        $('.sidenav').sidenav({edge: 'right'});
        $('select').formSelect();
        $('.tap-target').tapTarget();
        $('.datepicker').datepicker({
            container: $("#container"),
            yearRange: 50,
            format: "mmmm d, yyyy"
        });
        $('.timepicker').timepicker({container: "#container", twelveHour: false});
    });
}

// Update animation
function render () {
    requestAnimationFrame(render);
    for (let i = sunId; i <= moonId; i++) movePlanet(i, date.getTime());
    if (rotatingAroundSun) {
        incrementDate();
        planets[asteroidBeltId].rotation.y += revolutionSpeedFactor/(2 * data[asteroidBeltId].orbitRate); // Rotate asteroid belt
    }
    if (cameraFollowsPlanet) followPlanet(followPlanetId);
    controls.update();
    renderer.render(scene, camera);
}

// Listener for initial loading page
window.onload = function() {
    document.getElementById("loading").style.display = "none";
}

init();
render();
