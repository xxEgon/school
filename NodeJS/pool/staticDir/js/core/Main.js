var Main = function () {
    console.log("NEW MAIN")
    var fov = 45
    var res = 4 / 3
    var minrender = 0.1
    var maxrender = 10000

    window.onresize = function () {
        renderer.setSize(window.innerWidth, window.innerHeight)
        camera.aspect = window.innerWidth / window.innerHeight
    }

    var scene = new Physijs.Scene;
    scene.setGravity(new THREE.Vector3(0, -1000, 0));
    var camera = new THREE.PerspectiveCamera(fov, res, minrender, maxrender);
    camera.aspect = window.innerWidth / window.innerHeight
    camera.position.set(-10, 1300, 0)
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.autoClear = false;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;
    renderer.shadowMapEnabled = true;
    document.getElementById("main").appendChild(renderer.domElement);
    renderer.setSize(window.innerWidth, window.innerHeight)

    render_stats = new Stats();
    var light = new THREE.PointLight(0xffffff, 2, 5000);
    light.position.y = 3000
    light.position.x = 750
    light.position.z = -600
    light.castShadow = true;
    scene.add(light);
    var geom = new THREE.SphereGeometry(14, 100, 100)
    var coords = [
        { x: 330, y: 0, z: 20 },
        { x: 390, y: 0, z: 80 },
        { x: 360, y: 0, z: 35 },
        { x: 390, y: 0, z: 20 },
        { x: 390, y: 0, z: -10 },
        { x: 360, y: 0, z: 95 },
        { x: 300, y: 0, z: 65 },
        { x: 330, y: 0, z: 50 },
        { x: 270, y: 0, z: 50 },
        { x: 360, y: 0, z: 65 },
        { x: 390, y: 0, z: 110 },
        { x: 300, y: 0, z: 35 },
        { x: 390, y: 0, z: 50 },
        { x: 360, y: 0, z: 5 },
        { x: 330, y: 0, z: 80 }
    ]
    var ballstab = []
    for (var i = 1; i < 16; i++) {
        var mat = Physijs.createMaterial(
            new THREE.MeshPhongMaterial({
                side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture("mats/b" + i + ".jpg")
            }),
            1, // high friction
            1.2 // low restitution
        )

        var mesh = new Physijs.SphereMesh(geom, mat)
        scene.add(mesh)
        mesh.position.set(coords[i - 1].x, coords[i - 1].y, coords[i - 1].z);
        mesh.__dirtyPosition = true;
        mesh.__dirtyRotation = true;
        if (i < 8) {
            mesh.name = "full"
        }
        else if (i == 8) {
            mesh.name = "black"
        }
        else {
            mesh.name = "half"
        }
        mesh.userData = { nr: i, exists: true }
        ballstab.push(mesh)
        mesh.castShadow = true
        mesh.setDamping(0.5, 0.5);
        mesh.setCcdMotionThreshold(1);
        mesh.setCcdSweptSphereRadius(0.2);
    }
    var playmat = Physijs.createMaterial(
        new THREE.MeshPhongMaterial({
            color: 0xffffff
        }),
        0.1, // high friction
        0.1 // low restitution
    )
    var player = new Physijs.SphereMesh(geom, playmat)
    player.position.x = -240
    player.position.z = 50
    player.setDamping(0.6, 0.6)
    player.__dirtyPosition = true;
    player.name = "white"
    ballstab.push(player)
    player.userData = { nr: 0, exists: true }
    player.setCcdSweptSphereRadius(0.1);
    scene.add(player)
    var poolcue
    var cueready = false
    var cue = new Cue()
    cue.loadModel("models/cue/cue.xml", function (modelData) {
        poolcue = new THREE.Mesh(modelData.children[0].children[0].geometry, modelData.children[0].children[0].material)
        poolcue.scale.set(9, 9, 9)
        poolcue.rotateX(Math.PI / 2)
        poolcue.rotateY(-0.1)
        scene.add(poolcue)
        poolcue.castShadow = true;
        poolcue.lookAt(player.position)
        poolcue.__dirtyPosition = true;
        cueready = true
    })
    var tableready = false
    var pooltable
    var table = new Table()
    table.loadModel("models/pooltable/PoolTable.xml", function (modelData) {
        pooltable = modelData
        pooltable.position.z = -1200
        pooltable.position.x = 1300
        pooltable.position.y = -265
        scene.add(pooltable)
        pooltable.receiveShadow = true;
        tableready = true
        var geom = new THREE.PlaneGeometry(820, 440)
        var wireframeBool = true;
        geom.rotateX(Math.PI / 2)
        /*var felmat = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: wireframeBool }),
            0.3, // high friction
            0.5 // low restitution
        )
        var felmat2 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: wireframeBool }),
            0.8, // high friction
            0.1 // low restitution
        )
        var felmat3 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: wireframeBool }),
            0.8, // high friction
            0.1 // low restitution
        )*/
        var felmat = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }),
            0.3, // high friction
            0.5 // low restitution
        )
        var felmat2 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }),
            0.8, // high friction
            0.1 // low restitution
        )
        var felmat3 = Physijs.createMaterial(
            new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }),
            0.8, // high friction
            0.1 // low restitution
        )
        var geomesh = new Physijs.BoxMesh(geom, felmat2, 0)
        geomesh.position.x = 70
        geomesh.position.z = 65
        geomesh.position.y = -13
        scene.add(geomesh)
        var geom2 = new THREE.PlaneGeometry(1640, 880)
        geom2.rotateX(Math.PI / 2)
        var geom3 = new THREE.PlaneGeometry(1000, 300, 1)
        var geom4 = new THREE.PlaneGeometry(1000, 300, 1)
        var catcher = new Physijs.BoxMesh(geom2, felmat2, 0)
        catcher.position.x = 70
        catcher.position.z = 65
        catcher.position.y = -100
        scene.add(catcher)
        var box1 = new Physijs.BoxMesh(geom3, felmat, 0)
        box1.position.x = 70
        box1.position.z = 330
        scene.add(box1)
        var box2 = new Physijs.BoxMesh(geom3, felmat, 0)
        box2.position.x = 70
        box2.position.z = -210
        scene.add(box2)
        var box3 = new Physijs.BoxMesh(geom4, felmat, 0)
        box3.rotateY(Math.PI / 2)
        box3.position.x = 530
        box3.position.z = 70
        scene.add(box3)
        var box4 = new Physijs.BoxMesh(geom4, felmat, 0)
        box4.rotateY(Math.PI / 2)
        box4.position.x = -370
        box4.position.z = 70
        scene.add(box4)
        var planeband = new THREE.PlaneGeometry(380, 300, 1)
        var planeband2 = new THREE.PlaneGeometry(360, 300, 1)
        for (var i = 0; i < 6; i++) {
            var band = new Physijs.BoxMesh(planeband, felmat, 0)
            var band2 = new Physijs.BoxMesh(planeband2, felmat, 0)
            switch (i) {
                case 0:
                    band.position.x = -140
                    band.position.z = -170
                    scene.add(band)
                    break
                case 1:
                    band.position.x = 280
                    band.position.z = -170
                    scene.add(band)
                    break
                case 2:
                    band.position.x = 280
                    band.position.z = 300
                    scene.add(band)
                    break
                case 3:
                    band.position.x = -140
                    band.position.z = 300
                    scene.add(band)
                    break
                case 4:
                    band2.position.x = -340
                    band2.position.z = 60
                    band2.rotateY(Math.PI / 2)
                    scene.add(band2)
                    break
                case 5:
                    band2.position.x = 490
                    band2.position.z = 60
                    band2.rotateY(Math.PI / 2)
                    scene.add(band2)
                    break
            }
            band.addEventListener('collision', function (player, relative_velocity, relative_rotation, contact_normal) {
                var v = new THREE.Vector3(0, 0, 0)
                v.copy(relative_velocity)
                v.x *= -1
                player.setLinearVelocity(v);
            });
            band2.addEventListener('collision', function (player, relative_velocity, relative_rotation, contact_normal) {
                var v = new THREE.Vector3(0, 0, 0)
                v.copy(relative_velocity)
                v.z *= -1
                player.setLinearVelocity(v);
            });
        }
    })
    var blockade = false
    var camleft = false
    var camright = false
    document.addEventListener("keydown", onKeyDown, false)
    document.addEventListener("keyup", onKeyUp, false)
    document.addEventListener("keypress", onKeyPress, false)
    function onKeyDown(event) {
        var keyCode = event.which;
        if (mymove)
            switch (keyCode) {
                case 37:
                    camleft = true
                    break;
                case 39:
                    camright = true
                    break;
            }
    }
    function onKeyUp(event) {
        var keyCode = event.which;
        if (mymove)
            switch (keyCode) {
                case 37:
                    camleft = false
                    break;
                case 39:
                    camright = false
                    break;
            }
    }
    function onKeyPress(event) {
        var keyCode = event.which;
        if (mymove)
            switch (keyCode) {
                case 32:
                    if (!blockade) {
                        shot();
                    }
                    break;
            }

    }
    this.clearPlayerVelocity = function () {
        player.setLinearVelocity(new THREE.Vector3(0, 0, 0))
    }
    function shot() {
        blockade = true;
        ui.stopTimer2()
        net.getClient().emit("timer", {})
        console.log("SHOT")
        notShot = false;
        player.rotation.set(0, (-Math.PI / 2) - kat, 0)
        poolcue.lookAt(player.position)
        var v = new THREE.Vector3(0, 0, 0)
        v.copy(player.getWorldDirection())
        v.x *= ui.getRangeVal();
        v.z *= ui.getRangeVal();
        v.y = 0;
        player.setLinearVelocity(v);

    }
    var data1;
    var kat = Math.PI
    var notShot = true;
    var licz1 = true;
    function animateScene() {

        if (tableready && cueready) {
            if ($("#timeDiv2").html().slice(0, 8) == "00:01:00") {
                console.log("TIME'S UP!")
                mymove = false;
                ui.setMove()
                ui.startTimer2()
                net.getClient().emit("moveEnd", {})
                net.getClient().emit("timer", {})
                washere = false
                blockade = false
            }
            if (licz1) {
                waitingScreen.hide();
                licz1 = false
                ui.startTimer1()
                ui.startTimer2()
            }
            if (mymove) {
                if (notShot) {
                    player.setLinearVelocity(new THREE.Vector3(0, 0, 0))

                    camera.position.y = player.position.y + 30
                    camera.position.x = player.position.x + (150 * Math.cos(kat))
                    camera.position.z = player.position.z + (150 * Math.sin(kat))
                    poolcue.position.y = player.position.y + 50
                    poolcue.position.x = player.position.x + (370 * Math.cos(kat))
                    poolcue.position.z = player.position.z + (370 * Math.sin(kat))
                    player.rotation.set(0, (-Math.PI / 2) - kat, 0)
                    camera.lookAt(player.position)
                    poolcue.lookAt(player.position)
                    player.setDamping(0.6, 0.6)
                }
                else {
                    player.rotation.set(0, (-Math.PI / 2) - kat, 0)
                    if (camera.position.y < 400) {
                        camera.position.y += 3
                        camera.lookAt(player.position)
                    }
                    if (camera.position.y > 40) {
                        var checkmovement = true
                        var checkHole = false;
                        for (var i = 0; i < ballstab.length; i++) {
                            if (ballstab[i].getLinearVelocity().x != 0 || ballstab[i].getLinearVelocity().y != 0 || ballstab[i].getLinearVelocity().z != 0) {
                                checkmovement = false
                            }
                            if (ballstab[i].position.y < -30 && ballstab[i].position.y > -40) {
                                handleHoles(ballstab[i])
                            }
                            
                        }
                        if (!washere) {
                            changemove = true
                        }
                        if (checkmovement) {
                            notShot = true
                            if (changemove){
                                console.log("MOVE END")
                                mymove = false;
                                ui.setMove()
                                net.getClient().emit("moveEnd", {})
                            }
                            else {
                                console.log("MOVE CONTINUE")
                                mymove = true;
                                ui.setMove()
                            }
                            washere = false
                            blockade = false
                            ui.startTimer2()
                        }
                    }
                }
                if (camleft) {
                    kat -= 0.01
                }
                if (camright) {
                    kat += 0.01
                }
                if (mymove) {
                    var posTab = []
                    var posTab2 = []
                    var existTab = []

                    for (var i = 0; i < ballstab.length; i++) {
                        posTab.push(ballstab[i].position)
                        posTab2.push(ballstab[i].rotation)
                        existTab.push(ballstab[i].userData.exists)
                    }

                    var objToSend = {
                        posTab: JSON.stringify(posTab),
                        camera: JSON.stringify(camera.position),
                        cue: JSON.stringify(poolcue.position),
                        player: JSON.stringify(player.position),
                        posTab2: JSON.stringify(posTab2),
                        existTab: JSON.stringify(existTab),

                    }
                    net.getClient().emit("update", objToSend)
                }
            }
            else if (mymove == false && licz > 0) {
                var posTab = JSON.parse(data1.posTab).slice()
                var posTab2 = JSON.parse(data1.posTab2).slice()
                var existTab = JSON.parse(data1.existTab).slice()

                for (var i = 0; i < posTab.length; i++) {
                    ballstab[i].__dirtyPosition = true
                    ballstab[i].__dirtyRotation = true
                    ballstab[i].position.copy(posTab[i])
                    ballstab[i].rotation.copy(posTab2[i])
                    ballstab[i].userData.exists = existTab[i]
                }
                var cueTemp = JSON.parse(data1.cue)
                poolcue.__dirtyPosition = true
                poolcue.position.x = cueTemp.x
                poolcue.position.y = cueTemp.y
                poolcue.position.z = cueTemp.z

                player.__dirtyRotation = true
                player.__dirtyPosition = true
                var playerTemp = JSON.parse(data1.player)
                player.__dirtyPosition = true

                camera.position.set(40, 600, -700)
                camera.lookAt({ x: 40, y: 0, z: 70 })

                poolcue.lookAt(player.position)
            }
            scene.simulate()
            ui.setFPS(render_stats.update())
        }

        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        requestAnimationFrame(animateScene);
    }
    animateScene()
    var licz = 0;
    this.setScene = function (data) {
        if (mymove == false) {
            licz = 1;
            data1 = data
        }


    }
    this.setBlockade = function (a) {
        blockade = a
    }
    this.countInHoles = 0;
    var changemove = true
    var washere = false
    var raisePlayer1points = false
    var raisePlayer2points = false
    function handleHoles(b) {
        washere = true
        if (b.userData.exists == false) {
            return
        }
        if (player1.ball == "" && player2.ball == "" && b.name != "white" && b.name != "black") {
            console.log("SETTING COLOR")
            player1.ball = b.name
            if (b.name == "half") {
                player2.ball = "full"
            }
            else {
                player2.ball = "half"
            }
            ui.setBall()
            net.getClient().emit("ballChosen", {
                ball: b.name,
            })
        }
        if (b.name == "white") {
            console.log("WHITE IN HOLE")
            changemove = true
        }
        else if (b.name == "black") {
            console.log("BLACK IN HOLE")
            if (player1.score == 7) {
                waitingScreen.endGame(true)
                net.getClient().emit("end", { state: "lost" })               
            }
            else {
                waitingScreen.endGame(false)
                net.getClient().emit("end", { state: "won" })
            }
            ui.stopTimer1()
            ui.stopTimer2()
            blockade = true
        }
        else if (player1.ball == b.name) {
            console.log("NICE SHOT!")
            changemove = false
            player1.score++
        }
        else {
            console.log("POOR SHOT!")
            changemove = true
            player2.score++
        }
        if (b.name != "white" && b.name != "black") {
            if (b.userData.exists == true) {
                b.userData.exists = false;
                main.countInHoles++
                console.log("IN HOLES: " + main.countInHoles, " LEFT: " + (15 - main.countInHoles))
            }
        }
        console.log("SETTING SCORE")
        ui.setScore()
        net.getClient().emit("score", { score: player1.score })
        net.getClient().emit("score2", { score: player2.score })
    }
}