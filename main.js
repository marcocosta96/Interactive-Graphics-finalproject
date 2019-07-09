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
const trajectorySegments = 1024;

// Planet data
const data = loadData();

// Scene variables
var scene, camera, renderer, controls, raycaster;

// Far camera parameter
var far = 10000;

// Date
var date;
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Planets array
var celestialObjects = [];

// Trajectories array
var trajectories = [];

// Light of the sunId
var sunLight;

// Ambient light
var ambientLight;

// Texture Loader
var textureLoader;

// Play or pause the animation
var play;

// Play or pause rotation
var playRotationMovement;

// Play or pause revolution
var playRevolutionMovement;

// Incline orbit
var inclinedOrbit;

// Speed factor
var speedFactor = 1.0;

// Mouse
var mouse;

// Tooltip
var tooltipDiv;

// Sound vars
var sound, audioListener, audioLoader;
var volume = 0.3;
var tracks = ['sounds/ambient.ogg', 'sounds/strangerThings.ogg'];
var sounds = [];

// Follow planet
var followPlanetId = sunId;
var cameraFollowsPlanet = true;

// Create orbit trajectory for the planets and moon
function createOrbitTrajectory(Id) {
    let orbitTrajectoryGeometry = new THREE.CircleGeometry(data[Id].distance, trajectorySegments);
    orbitTrajectoryGeometry.vertices.shift(); // Remove center vertex
    let orbitTrajectoryMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff
    });

    trajectories[Id] = new THREE.LineLoop(orbitTrajectoryGeometry, orbitTrajectoryMaterial);
    trajectories[Id].rotation.x = THREE.Math.degToRad(90);
	if(inclinedOrbit) trajectories[Id].rotation.y = THREE.Math.degToRad(data[Id].orbitInclination);
    trajectories[Id].name = "trajectory"; // Used for ignoring if focus on it
    if (Id != moonId) celestialObjects[solarSystemId].add(trajectories[Id]); // Sun as orbit center of planets
    else celestialObjects[data[Id].orbitCenter].add(trajectories[Id]); // Earth as orbit center of moon
}

function createSun() {
    // Solar system group
    celestialObjects[solarSystemId] = new THREE.Group();
    scene.add(celestialObjects[solarSystemId]);

    // Earth system group
    celestialObjects[earthSystemId] = new THREE.Group();
    celestialObjects[earthSystemId].position.set(data[earthId].distance, 0, 0);
    celestialObjects[solarSystemId].add(celestialObjects[earthSystemId]);

    // The sun is a light source
    sunLight = new THREE.PointLight("rgb(255, 220, 180)", 1.5);
    sunLight.castShadow = true;
    sunLight.shadow.bias = 0.0001;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    // Create Sun
    let sunGeometry = new THREE.SphereGeometry(data[sunId].size, 48, 48 );
    let sunMaterial = new THREE.MeshBasicMaterial({
        map: textureLoader.load(data[sunId].color) // Color texture
    });
    celestialObjects[sunId] = new THREE.Mesh(sunGeometry, sunMaterial);
    celestialObjects[sunId].name = data[sunId].name;
    celestialObjects[sunId].myId = sunId;
    celestialObjects[sunId].receiveShadow = false;
    celestialObjects[sunId].castShadow = false;
    celestialObjects[solarSystemId].add(celestialObjects[sunId]);

    // Create the glow of the sun.
    let spriteMaterial = new THREE.SpriteMaterial({
        map: textureLoader.load(data[sunId].glow), // Glow texture
        color: 0xffffee,
        transparent: true,
        blending: THREE.AdditiveBlending
    });
    celestialObjects[sunGlowId] = new THREE.Sprite(spriteMaterial);
    celestialObjects[sunGlowId].name = "Sun Glow";
    celestialObjects[sunGlowId].scale.set(70, 70, 1.0);
    celestialObjects[sunId].add(celestialObjects[sunGlowId]); // This centers the glow at the sun.
}

// Create planet
function createPlanet(Id) {
    let planetGeometry = new THREE.SphereGeometry(data[Id].size, planetSegments, planetSegments);
    let planetMaterial = new THREE.MeshPhongMaterial({
        map: textureLoader.load(data[Id].color) // Color texture
    });

    // Bump texture
    if (data[Id].hasOwnProperty('bump')) {
        planetMaterial.bumpMap = textureLoader.load(data[Id].bump);
        planetMaterial.bumpScale = data[Id].bumpScale;
    }

    // Specular texture
    if (data[Id].hasOwnProperty('specular')) {
        planetMaterial.specularMap = textureLoader.load(data[Id].specular);
        planetMaterial.specular = new THREE.Color('grey');
    }

    // Normal texture
    if (data[Id].hasOwnProperty('normal')) planetMaterial.normalMap = textureLoader.load(data[Id].normal);

    celestialObjects[Id] = new THREE.Mesh(planetGeometry, planetMaterial);

    // Eclipse (Both solar and lunar)
    if (Id == earthId || Id == moonId) {
        celestialObjects[Id].receiveShadow = true;
        celestialObjects[Id].castShadow = true;
    }

    celestialObjects[Id].name = data[Id].name; // Used for not ignoring if focus on it
    celestialObjects[Id].myId = Id; // Id of celestial object
    celestialObjects[Id].rotation.x = THREE.Math.degToRad(data[Id].equatorInclination); // Axis inclination

    // Create rings of Saturn and Uranus
    if (data[Id].hasOwnProperty('ringId')) {
        celestialObjects[data[Id].groupId] = new THREE.Group();
        celestialObjects[data[Id].groupId].add(celestialObjects[Id]);
        createRing(Id);
        celestialObjects[data[Id].groupId].position.set(data[Id].distance, 0, 0);
        celestialObjects[data[Id].orbitCenter].add(celestialObjects[data[Id].groupId]);
    }
    else {
        if (Id != earthId) celestialObjects[Id].position.set(data[Id].distance, 0, 0);
        celestialObjects[data[Id].orbitCenter].add(celestialObjects[Id]);
    }

    // Draws its orbit trajectory
    createOrbitTrajectory(Id);
}

// Create ring
function createRing(Id) {
    let ringGeometry = new THREE.BufferGeometry().fromGeometry(new _RingGeometry(data[Id].ringInnerDiameter, data[Id].ringOuterDiameter, data[Id].ringSegments));
    let ringMaterial = new THREE.MeshPhongMaterial({
        map: textureLoader.load(data[Id].ringColor), // Color texture
        alphaMap: textureLoader.load(data[Id].ringPattern), // Pattern texture
        side: THREE.DoubleSide,
		transparent: true,
		opacity: 0.8
    });
    celestialObjects[data[Id].ringId] = new THREE.Mesh(ringGeometry, ringMaterial);
    celestialObjects[data[Id].ringId].rotation.x = THREE.Math.degToRad(90) + THREE.Math.degToRad(data[Id].equatorInclination); // Axis inclination
    celestialObjects[data[Id].ringId].name = "Rings of " + data[Id].name; // Used for not ignoring if focus on it
    celestialObjects[data[Id].ringId].myId = Id; // Set planet Id
    celestialObjects[data[Id].groupId].add(celestialObjects[data[Id].ringId]);
}

// Create stars (A cube with the same texture on the 6 inner faces)
function createStars() {
    let starsArray = [];
    for (let i = 0; i < 6; i++) starsArray[i] = './img/stars.jpg'; // Stars texture
    let cubeStars = new THREE.CubeTextureLoader().load(starsArray);
    cubeStars.format = THREE.RGBFormat;
    scene.background = cubeStars;
}

// Create Earth cloud
function createEarthCloud() {
    // Create destination canvas
	let canvasResult = document.createElement('canvas');
	canvasResult.width = 1024;
	canvasResult.height = 512;
	let contextResult = canvasResult.getContext('2d');

	// Load Earth cloud map
	let imageMap = new Image();
	imageMap.addEventListener("load", function() {

		// Create dataMap ImageData for Earth cloud map
		let canvasMap = document.createElement('canvas');
		canvasMap.width = imageMap.width;
		canvasMap.height = imageMap.height;
		let contextMap = canvasMap.getContext('2d');
		contextMap.drawImage(imageMap, 0, 0);
		let dataMap = contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height);

		// Load Earth cloud map trans
		let imageTrans = new Image();
		imageTrans.addEventListener("load", function(){
			// Create dataTrans ImageData for Earth cloud map trans
			let canvasTrans = document.createElement('canvas');
			canvasTrans.width = imageTrans.width;
			canvasTrans.height = imageTrans.height;
			let contextTrans = canvasTrans.getContext('2d');
			contextTrans.drawImage(imageTrans, 0, 0);
			let dataTrans = contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height);
			// Merge dataMap + dataTrans into dataResult
			let dataResult = contextMap.createImageData(canvasMap.width, canvasMap.height);
			for (let y = 0, offset = 0; y < imageMap.height; y++){
				for (let x = 0; x < imageMap.width; x++, offset += 4){
					dataResult.data[offset+0] = dataMap.data[offset+0];
					dataResult.data[offset+1] = dataMap.data[offset+1];
					dataResult.data[offset+2] = dataMap.data[offset+2];
					dataResult.data[offset+3] = 255 - dataTrans.data[offset+0];
				}
			}
			// Update texture with result
			contextResult.putImageData(dataResult,0,0)
			earthCloudMaterial.map.needsUpdate = true;
		})
		imageTrans.src	= data[earthId].cloudTrans;
	}, false);
	imageMap.src = data[earthId].cloud;
    let earthCloudGeometry = new THREE.SphereGeometry(data[earthId].size, planetSegments, planetSegments);
	let earthCloudMaterial = new THREE.MeshPhongMaterial({
		map: new THREE.Texture(canvasResult),
		side: THREE.DoubleSide,
		transparent: true,
        depthWrite: false,
		opacity: 0.8
	});
	celestialObjects[earthCloudId] = new THREE.Mesh(earthCloudGeometry, earthCloudMaterial);
    celestialObjects[earthCloudId].scale.set(1.02, 1.02, 1.02);
    celestialObjects[earthCloudId].name = "Earth"; // Set Earth name
    celestialObjects[earthCloudId].receiveShadow = true; // Receive shadow
    celestialObjects[earthCloudId].myId = earthId; // Set Earth Id
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
    let torusAsteroid = new THREE.Mesh(new THREE.TorusGeometry(distance, maxOffsetY, planetSegments, planetSegments), new THREE.MeshBasicMaterial({
        transparent: true,  // Make torus transparent
        opacity: 0.0        // Make torus transparent
    }));
    torusAsteroid.rotation.x = THREE.Math.degToRad(90);
    torusAsteroid.name = data[asteroidBeltId].name;
    torusAsteroid.myId = asteroidBeltId;
    celestialObjects[solarSystemId].add(torusAsteroid);

    const asteroidCount = data[asteroidBeltId].number;
    let asteroidsGeometry = new THREE.Geometry();

    // Create the individual particles
    for (let i = 0; i < asteroidCount; i++) {
        // Create a particle with random position
        let asteroidDistance = distance + THREE.Math.randFloat(minOffsetXZ, maxOffsetXZ);
        let angle = THREE.Math.randFloat(0, THREE.Math.degToRad(360));
        let coord = new THREE.Vector3();

        coord.x = Math.cos(angle) * asteroidDistance;
        coord.y = THREE.Math.randFloat(minOffsetY, maxOffsetY);
        coord.z = Math.sin(angle) * asteroidDistance;

        // Insert asteroid
        asteroidsGeometry.vertices.push(coord);
    }

    asteroidsGeometry.morphAttributes = {};     // Used to fix updateMorphAttribute bug

    celestialObjects[asteroidBeltId] = new THREE.Points(asteroidsGeometry, new THREE.PointsMaterial({ size: asteroidSize }));
    celestialObjects[asteroidBeltId].name = data[asteroidBeltId].name;
    celestialObjects[asteroidBeltId].myId = asteroidBeltId;
    celestialObjects[solarSystemId].add(celestialObjects[asteroidBeltId]);
}

// Move planet
function movePlanet(Id) {
    // Rotation motion
    if (playRotationMovement) rotationMovement(Id);

    // Orbit motion
    if (playRevolutionMovement && Id != sunId) revolutionMovement(Id);
}

function rotationMovement(Id) {
    // Rotation angle
    let theta = THREE.Math.degToRad(360) * (date.getTime() / (data[Id].rotationRate * 3600000)); // Cast rotationRate in milliseconds

    celestialObjects[Id].rotation.y = theta;
    if (Id == earthId) celestialObjects[earthCloudId].rotation.y = theta/2;
    if (data[Id].hasOwnProperty('ringId')) celestialObjects[data[Id].ringId].rotation.z = theta;
}

function revolutionMovement(Id) {
    // Revolution angle
    let theta = (THREE.Math.degToRad(360) / (data[Id].revolutionRate * 86400000)) * date.getTime(); // theta = wt, cast revolutionRate in milliseconds
	let phi = THREE.Math.degToRad(data[Id].orbitInclination);

    let currentId = Id;
    if (data[Id].hasOwnProperty('groupId')) currentId = data[Id].groupId;
    celestialObjects[currentId].position.x = -data[Id].distance * Math.cos(theta); // x = -R*Cos(wt) (minus for Anti-clockwise)
	celestialObjects[currentId].position.y = 0; // y = 0
    celestialObjects[currentId].position.z = data[Id].distance * Math.sin(theta); // z = R*Sin(wt)

	// Inclined orbit
	if (inclinedOrbit) {
		celestialObjects[currentId].position.x *= Math.cos(phi); // x = -R*Cos(wt)*Cos(phi)
		celestialObjects[currentId].position.y = -data[Id].distance * Math.cos(theta) * Math.sin(phi); // y = -R*Cos(wt)*Sin(phi)
	}
}

// Capture the object selected with mouse
function captureObject(point) {
    // Normalize mouse coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Capture the clicked object
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);

    // Analize the result
    for (let i = 0; i < intersects.length; i++)
        if (intersects[i].object.name != "trajectory" && intersects[i].object.name != "Sun Glow") {
            if ($("#asteroidBeltCheckbox").is(':checked')) {
                if (point) point.coord = intersects[i].point; // Funct called by showInfoPlanet
                return intersects[i].object; // Found object that is not a trajectory or sun glow
            }
            else {
                if (intersects[i].object.name != "Asteroid Belt") {
                    if (point) point.coord = intersects[i].point; // Funct called by showInfoPlanet
                    return intersects[i].object; // Found object that is not a trajectory, sun glow or asteroid belt
                }
            }
        }
    return null; // There are no element or only trajectories
}

// Focus camera over a selected planet
function dblclickPlanet(event) {
    // Capture the object
    var targetElement = captureObject(null); // Null if it's not object or it's trajectory

    // Focus camera on it
    if (targetElement && targetElement.name != celestialObjects[asteroidBeltId].name && targetElement.name != celestialObjects[moonId].name) {
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
        camera.position.set(celestialObjects[Id].position.x + 30, celestialObjects[Id].position.y + 15, celestialObjects[Id].position.z + 30);
        camera.zoom = 3.0;
    }
    else {
        camera.position.set(celestialObjects[Id].position.x + 25, celestialObjects[Id].position.y + 12.5, celestialObjects[Id].position.z + 25);
        camera.zoom = 3.0;
    }
}

// Function to update target object
function followPlanet(Id) {
    controls.target.set(celestialObjects[Id].position.x, celestialObjects[Id].position.y, celestialObjects[Id].position.z);
    controls.update();
}

// Function to show planet infos in a tooltip
function showInfoPlanet(event) {
    // Capture the object
    var point = {coord:null};
    var targetElement = captureObject(point); // Null if it's not object or it's trajectory

    // Show tooltip
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

        let currentId = targetElement.myId;

        tooltipDiv.html("<div style='float:left;padding-top:10px;padding-left:10px;'><img src='" + data[currentId].icon + "' width=50></div> <h4 style='size:20pt;'>" + targetElement.name + "</h4>");
        if(data[currentId].hasOwnProperty('rotationRate')) tooltipDiv.append("</br>Rotation: " + data[currentId].rotationRate.toFixed(2) + " hours");
        if(data[currentId].hasOwnProperty('revolutionRate')) tooltipDiv.append("</br>Revolution: " + data[currentId].revolutionRate.toFixed(2) + " days");
        if(data[currentId].hasOwnProperty('equatorInclination')) tooltipDiv.append("</br>Axis inclination: " + data[currentId].equatorInclination.toFixed(2) + "°");
        if(data[currentId].hasOwnProperty('orbitInclination')) tooltipDiv.append("</br>Orbit inclination: " + data[currentId].orbitInclination.toFixed(2) + "°");
        if(data[currentId].hasOwnProperty('type')) tooltipDiv.append("</br>Type: " + data[currentId].type);
        if(data[currentId].hasOwnProperty('diameter')) tooltipDiv.append("</br>Diameter: " + data[currentId].diameter);
        if(data[currentId].hasOwnProperty('averageDistanceFromSun')) tooltipDiv.append("</br>Average distance from sun: " + data[currentId].averageDistanceFromSun);
        if(data[currentId].hasOwnProperty('distanceFromEarth')) tooltipDiv.append("</br>Distance from Earth: " + data[currentId].distanceFromEarth);
        if(data[currentId].hasOwnProperty('density')) tooltipDiv.append("</br>Density: " + data[currentId].density);
        if(data[currentId].hasOwnProperty('gravity')) tooltipDiv.append("</br>Gravity: " + data[currentId].gravity);
        if(data[currentId].hasOwnProperty('numberOfMoons')) tooltipDiv.append("</br>Number of moons: " + data[currentId].numberOfMoons);

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

// Increment date
function incrementDate() {
    let increment = 864000; // 1/100 of a day, 86400000 milliseconds = 1 day (1 x 24 x 60 x 60 x 1000)
    date.setTime(date.getTime() + increment * speedFactor); // Increment in milliseconds
    setDate(date);
}

// Get month name from number
function getMonthName(month) {
    return monthNames[month];
}

// Set date
function setDate() {
    $("#currentDate").val(getMonthName(date.getMonth()) + " " + date.getDate() + ", " + date.getFullYear());
    $("#currentTime").val(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}

// Ambient music
function ambientMusic() {
    // Load sounds
    audioLoader = new THREE.AudioLoader();

    for (let i = 0; i < tracks.length; i++) {
        // Create tracks and put it in global audio source array
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

    // Current date
    date = new Date();

    // Animation flags
    play = true;
    playRotationMovement = true;
    playRevolutionMovement = true;

	// Inclined orbit flag
	inclinedOrbit = true;

    // Texture loader
    textureLoader = new THREE.TextureLoader();

    // Tooltip div
    tooltipDiv = $("#tooltip");

    // Create Solar System group
    createSun();

    // Create planets
    for (let i = mercuryId; i <= moonId; i++) createPlanet(i);

    // Create asteroid belt
    createAsteroidBelt();

    // Create Earth clouds
    createEarthCloud();

    // Stars background
    createStars();

    // Create light viewable from all directions.
    scene.add(new THREE.AmbientLight(0x222222));
    ambientLight = new THREE.AmbientLight(0xaaaaaa);

    // Create an AudioListener and add it to the camera
    audioListener = new THREE.AudioListener();
    camera.add(audioListener);

    // Add ambient music
    ambientMusic();

    // Initialize mouse
    mouse = new THREE.Vector2();

    // Listener for window resizing
    window.addEventListener('resize', function(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);

    // Listener for double click over a planet
    document.getElementById("container").addEventListener('dblclick', dblclickPlanet, false);

    // Listener for hover on a planet
    window.addEventListener('mousemove', showInfoPlanet, false);

    // Listener for ambient music
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

    /** Listeners for sidebar menu **/

    // Listener for play/stop animation
    $("#playButton").on("click", function(event) {
        if (play) {
            play = false;
            $("#playButton").html("<i class='material-icons left'>play_circle_filled</i>Play Animation");
            if ($("#rotationCheckbox").is(':checked')) $("#rotationCheckbox").click();
            if ($("#revolutionCheckbox").is(':checked')) $("#revolutionCheckbox").click();
            $("#rotationCheckbox").attr("disabled", "true");
            $("#revolutionCheckbox").attr("disabled", "true");
        }
        else {
            play = true;
            $("#playButton").html("<i class='material-icons left'>pause_circle_filled</i>Pause Animation");
            $("#rotationCheckbox").removeAttr("disabled");
            $("#revolutionCheckbox").removeAttr("disabled");
            $("#rotationCheckbox").click();
            $("#revolutionCheckbox").click();
        }
    });

    // Listener for play/stop rotation movement
    $("#rotationCheckbox").on("change", function(event) {
        if (event.target.checked) playRotationMovement = true;
        else playRotationMovement= false;
    });

    // Listener for play/stop revolution movement
    $("#revolutionCheckbox").on("change", function(event) {
        if (event.target.checked) playRevolutionMovement = true;
        else playRevolutionMovement= false;
    });

    // Listener for show/hide orbits
    $("#orbitVisibilityCheckbox").on("change", function(event) {
        if (event.target.checked) for (let i = mercuryId; i <= moonId; i++) trajectories[i].visible = true;
        else for (let i = mercuryId; i <= moonId; i++) trajectories[i].visible = false;
    });

    // Listener for incline/not incline orbits
    $("#orbitInclinationCheckbox").on("change", function(event) {
        if (event.target.checked) {
			inclinedOrbit = true;
			for (let i = mercuryId; i <= moonId; i++) trajectories[i].rotation.y = THREE.Math.degToRad(data[i].orbitInclination);
		}
        else {
			inclinedOrbit = false;
			for (let i = mercuryId; i <= moonId; i++) trajectories[i].rotation.y = 0;
		}
    });

    // Listener for modify current date
    $("#setDate").on("change", function(event) {
        if (play) $("#playButton").click();
        let newDate = $("#setDate").val();
        let dateString = newDate + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        date = new Date(dateString);
        setDate();
        for (let i = mercuryId; i <= moonId; i++) revolutionMovement(i);
    });

    // Listener for modify current time
    $("#setTime").on("change", function(event) {
        if (play) $("#playButton").click();
        let newTime = $("#setTime").val();
        let dateString = getMonthName(date.getMonth()) + " " + date.getDate() + ", " + date.getFullYear() + " " + newTime + ":" + date.getSeconds();
        date = new Date(dateString);
        setDate();
        for (let i = mercuryId; i <= moonId; i++) revolutionMovement(i);
    });

    // Listener for modify speedFactor value
    $("#speedSlider").on("input", function(event) {
        speedFactor = event.target.value;
        $("#speedText").html("Speed: " + speedFactor + "x");
    });

    // Listener for modify far value
    $("#farSlider").on("input", function(event) {
        far = parseFloat(event.target.value);
        camera.far = far;
        camera.updateProjectionMatrix();
        $("#farText").html("Far: " + far);
    });

    // Listener for move camera on a selected planet
    $("#cameraSelect").on("change", function(event) {
        let planetId = $("#cameraSelect").val();
        if (data[planetId].hasOwnProperty('groupId')) planetId = data[planetId].groupId;
        followPlanetId = planetId;
        followPlanet(followPlanetId);
        goToObject(followPlanetId);
    });

    // Listener for follow/not follow the target planet
    $("#followPlanetCheckbox").on("change", function(event) {
        if (event.target.checked) cameraFollowsPlanet = true;
        else cameraFollowsPlanet = false;
    });

    // Listener for rotate/not rotate the camera on the target planet
    $("#rotateCameraCheckbox").on("change", function(event) {
        if (event.target.checked) controls.autoRotate = true;
        else controls.autoRotate = false;
    });

    // Listener for show/hide Earth clouds
    $("#earthCloudCheckbox").on("change", function(event) {
        if (event.target.checked) celestialObjects[earthId].add(celestialObjects[earthCloudId]);
        else celestialObjects[earthId].remove(celestialObjects[earthCloudId]);
    });

    // Listener for show/hide asteroid belt
    $("#asteroidBeltCheckbox").on("change", function(event) {
        if (event.target.checked) celestialObjects[solarSystemId].add(celestialObjects[asteroidBeltId]);
        else celestialObjects[solarSystemId].remove(celestialObjects[asteroidBeltId]);
    });

    // Listener for turn on/off ambient light
    $("#ambientLightCheckbox").on("change", function(event) {
        if (event.target.checked) scene.add(ambientLight);
        else scene.remove(ambientLight);
    });

    // Listener for turn on/off sun light
    $("#sunLightCheckbox").on("change", function(event) {
        if (event.target.checked) scene.add(sunLight);
        else scene.remove(sunLight);
    });

    // Listener for show/hide sun glow
    $("#sunGlowCheckbox").on("change", function(event) {
        if (event.target.checked) celestialObjects[sunId].add(celestialObjects[sunGlowId]);
        else celestialObjects[sunId].remove(celestialObjects[sunGlowId]);
    });

    // Listener for modify sun light intensity value
    $("#sunLightSlider").on("input", function(event) {
        let intensity = parseFloat(event.target.value);
        sunLight.intensity = intensity;
        $("#sunLightText").html("Sun light intensity: " + intensity);
    });

    // Listener for modify sound track
    $("#trackSelect").on("change", function(event) {
        let track = $("#trackSelect").val();
        sound.stop();
        sound = sounds[track];
        sound.setVolume(volume);
        sound.play();
    });

    // Listener for modify sound volume
    $("#volumeSlider").on("input", function(event) {
        volume = parseFloat(event.target.value);
        sound.setVolume(volume);
        $("#volumeText").html("Volume: " + volume);
    });

    // Listener for initialize materialize components
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
    for (let i = sunId; i <= moonId; i++) movePlanet(i); // Animate planets
    if (play) incrementDate(); // Increment date
    let theta = THREE.Math.degToRad(360) * (date.getTime() / (data[asteroidBeltId].revolutionRate * 86400000)); // Asteroid belt rotation angle
    if (playRevolutionMovement) celestialObjects[asteroidBeltId].rotation.y = theta; // Rotate asteroid belt
    if (cameraFollowsPlanet) followPlanet(followPlanetId); // Follow target planet
    controls.update();
    renderer.render(scene, camera);
}

init();

// Listener for initial loading page
window.onload = function() {
    document.getElementById("loading").style.display = "none";
	render();
}
