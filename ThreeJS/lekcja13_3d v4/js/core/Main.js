function Main() {

    this.setCam = function (x, y, z) {
        camera.position.x = x;
        camera.position.z = z;
        camera.position.y = y;
    }

    this.camera;

    var wys_okna = window.innerHeight;
    var szer_okna = window.innerWidth;

    var scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        45, 
        szer_okna / wys_okna,
        0.1, 
        2000 
    );

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x0e2f44);

    renderer.setSize(szer_okna, wys_okna);

    document.getElementById("div1").appendChild(renderer.domElement);

    renderer.autoClear = false;

    var stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    //camera.rotation.y = Math.PI

    //var axis = new THREE.AxisHelper(10000);
    //scene.add(axis);

    var startScreen = new StartScreen();
    document.body.appendChild(startScreen.getScreen());
    document.body.appendChild(startScreen.getLoadingScreen());
    var menuScreen;
   

    //====================================================================
    var skybox = new Skybox();
    scene.add(skybox)

    var helicopter = new Helicopter();
    var tree = new Tree()

    var tabTrees = [];
    var treesLoaded = false;   
    var mid;

    var allLoaded = 0;

    var tabCollision = [];

    console.time("Tree loaded")
    tree.loadModel(Materials.models.treeModel, function (modelData) {
        console.timeEnd("Tree loaded")
        var tree;
        var ground;
        var geomGround = new THREE.BoxGeometry(Settings.blockSize, 1, Settings.blockSize);
        var matGround = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture(Materials.graphics.ground) });
        for (var i = 0; i < Settings.blockAmount; i++) {
            tabTrees.push([])
            for (var j = 0; j < Settings.blockAmount; j++) {
                var obj = new THREE.Object3D();
                if (i == 0 && j == 0) {
                    tree = modelData//new THREE.Mesh(geomBox, matBox);//modelData;
                    tree.name="tree"
                    ground = new THREE.Mesh(geomGround, matGround);
                    ground.name = "ground"
                    obj.position.x = i * Settings.blockSize + Settings.blockSize / 2;
                    obj.position.z = j * Settings.blockSize + Settings.blockSize / 2;
                    //scene.add(tree);
                    obj.add(ground)
                    obj.add(tree)
                    //var axis1 = new THREE.AxisHelper(10000);
                    //obj.add(axis1);
                    tabCollision.push(tree.children[0].children[0])
                    tabCollision.push(ground)
                }
                else {
                    var cloneGround = ground.clone();
                    cloneGround.name = "cloneGround"
                    var clone = tree.clone();
                    clone.name = "clone"
                    obj.position.x = i * Settings.blockSize + Settings.blockSize / 2;
                    obj.position.z = j * Settings.blockSize + Settings.blockSize / 2;
                    //scene.add(clone);
                    obj.add(clone)
                    obj.add(cloneGround)
                    tabCollision.push(clone.children[0].children[0])
                    tabCollision.push(cloneGround)
                }
                tabTrees[i].push(obj)
                scene.add(obj)
            }
        }
        mid = Math.floor(tabTrees.length / 2)
        //console.log(mid)
        treesLoaded = true;
        allLoaded++;
    })

    function start() {
        console.time("Helicopter loaded")
        
        helicopter.loadModel(Settings.helicopterModels[0], function (modelData) {
            console.timeEnd("Helicopter loaded")
            player = modelData
            player.position.x = (Settings.blockAmount * Settings.blockSize) / 2;
            player.position.y = 100;
            player.position.z = (Settings.blockAmount * Settings.blockSize) / 2;
            scene.add(player);
            allLoaded++;

            //var axis1 = new THREE.AxisHelper(10000);
            //player.add(axis1);

            camController = new CameraController(camera, player);

            sliderTHROTTLE = new Slider("pionowy", 0, 10, (0.9) * innerHeight, "THROTTLE")
            sliderTHROTTLE.getSlider().style.top = "10px";
            sliderTHROTTLE.getSlider().style.left = "10px";
            sliderTHROTTLE.setValue(0)
            document.body.appendChild(sliderTHROTTLE.getSlider());            

            sliderRUDDER = new Slider("poziomy", 0, 360, (0.8) * innerWidth, "RUDDER")
            sliderRUDDER.getSlider().style.bottom = "10px";
            sliderRUDDER.getSlider().style.left = "100px";
            sliderRUDDER.setValue(180)
            document.body.appendChild(sliderRUDDER.getSlider());    

            sliderELEVATION = new Slider("pionowy", 0, 300, (0.9) * innerHeight, "ELEVATION")
            sliderELEVATION.getSlider().style.top = "10px";
            sliderELEVATION.getSlider().style.right = "10px";
            sliderELEVATION.setValue(100)
            document.body.appendChild(sliderELEVATION.getSlider());    

            document.onmousemove = function (e) {
                sliderTHROTTLE.setCURSOR(e.pageX, e.pageY);
                sliderRUDDER.setCURSOR(e.pageX, e.pageY);
                sliderELEVATION.setCURSOR(e.pageX, e.pageY);
            }

            document.onmouseup = function () {
                //console.log("Up" + tekst)
                sliderTHROTTLE.setISDOWN(false);
                sliderRUDDER.setISDOWN(false);
                sliderELEVATION.setISDOWN(false);
            }         

            kokpit = new Kokpit(sliderTHROTTLE, sliderRUDDER, sliderELEVATION)

            menuScreen = new MenuScreen(kokpit);
            document.body.appendChild(menuScreen.getScreen());

            //console.log(sliderTHROTTLE, sliderRUDDER, sliderELEVATION)
           

            startScreen.getLoadingScreen().style.display = "none";

            //for (var i = 0; i < tabCollision.length; i++) {
            //    console.log(tabCollision[i])
            //}
        })
    }

    //start()

    startScreen.getStartButton().onclick = function () {
        console.log("START")
        startScreen.getScreen().style.display = "none";
        start();
    }  

    var left = false;
    var up = false;
    var right = false;

    function distanceVector(v1, v2) {
        var dx = v1.x - v2.x;
        var dy = 0//v1.y - v2.y;
        var dz = v1.z - v2.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }  

    var raycaster = new THREE.Raycaster()

    var notCollision = true;

    function animateScene() {
        stats.begin();
        if (allLoaded == 2) {
            if (up) {
                player.translateZ(2)                
            }
            if (left) {
                player.rotation.y += 0.05;
            }
            if (right) {
                player.rotation.y -= 0.05;
            }

            if (notCollision) {
                //console.log(tabCollision.length)
                ray = new THREE.Ray(player.position, player.getWorldDirection())
                raycaster.ray = ray
                var intersects = raycaster.intersectObjects(tabCollision);
                //console.log(intersects.length)
                if (intersects[0]) {
                    //console.log(intersects[0].distance) // odleg³oœæ od vertexa na wprost
                    //console.log(intersects[0].point) // wspó³rzêdne vertexa na wprost

                    if ((intersects[0].distance) < 5) {
                        console.log("KOLIZJA")
                        helicopter.stop()
                        notCollision = false;

                        fire = new Fire()

                        var hehe = fire.getFire()

                        for (l = 0; l < hehe.length; l++) {

                            hehe[l].position.x = player.position.x - 10 + Math.ceil(Math.random() * 20);
                            hehe[l].position.y = player.position.y + Math.ceil(Math.random() * 220);
                            hehe[l].position.z = player.position.z +  Math.ceil(Math.random() * 20);
                            //console.log(player.position.z, hehe[l].z)
                            scene.add(hehe[l])
                        }
                    }

                }
            }

            if (notCollision == false) {
                fire.updateFire(player.position.y)
            }

            moveForest()

            kokpit.update();

            sliderTHROTTLE.update();
            sliderRUDDER.update();
            sliderELEVATION.update();

            helicopter.update(sliderTHROTTLE.value(), sliderRUDDER.value(), sliderELEVATION.value())

            camController.update(notCollision)

            skybox.position.x = player.position.x
            skybox.position.z = player.position.z

            helicopter.updateModel()
        }
        requestAnimationFrame(animateScene);
        renderer.render(scene, camera);

        stats.end();
    }

    document.addEventListener("keydown", onKeyDown, false);
    document.addEventListener("keyup", onKeyUp, false);

    function onKeyDown(event) {
        var keyCode = event.which;
        switch (keyCode) {
            case 65:
                left = true;
                break;
            case 87:
                up = true;
                break;
            case 68:
                right = true;
                break;
        }
    }

    function onKeyUp(event) {
        var keyCode = event.which;
        switch (keyCode) {
            case 65:
                left = false;
                break;
            case 87:
                up = false;
                break;
            case 68:
                right = false;
                break;
        }
    }

    function moveForest() {
        if (treesLoaded) {
            //console.log(distanceVector(tabTrees[mid][tabTrees[mid].length - 1].position, player.position), (tabTrees.length / 2) * Settings.blockSize + 5)
            if (distanceVector(tabTrees[mid][tabTrees[mid].length - 1].position, player.position) > (tabTrees.length / 2) * Settings.blockSize + 5) {
                //console.log("1")
                for (var i = 0; i < tabTrees[mid].length; i++) {
                    tabTrees[i].unshift(tabTrees[i].pop())
                    tabTrees[i][0].translateZ(-tabTrees.length * Settings.blockSize)
                }
            }
            //console.log(distanceVector(tabTrees[mid][0].position, player.position), (tabTrees.length / 2) * Settings.blockSize + 5)
            if (distanceVector(tabTrees[mid][0].position, player.position) > (tabTrees.length / 2) * Settings.blockSize + 5) {
                //console.log("2")
                for (var i = 0; i < tabTrees[mid].length; i++) {
                    tabTrees[i][0].translateZ(tabTrees.length * Settings.blockSize)
                    tabTrees[i].push(tabTrees[i].shift())
                }
            }
            //console.log(distanceVector(tabTrees[0][mid].position, player.position), (tabTrees.length / 2) * Settings.blockSize + 5)
            if (distanceVector(tabTrees[0][mid].position, player.position) > (tabTrees.length / 2) * Settings.blockSize + 5) {
                //console.log("3")
                for (var i = 0; i < tabTrees[0].length; i++) {
                    tabTrees[0][i].translateX(tabTrees.length * Settings.blockSize)
                }
                tabTrees.push(tabTrees.shift())
            }
            //console.log(distanceVector(tabTrees[mid][tabTrees[mid].length - 1].position, player.position), (tabTrees.length / 2) * Settings.blockSize + 5)
            if (distanceVector(tabTrees[mid][tabTrees[mid].length - 1].position, player.position) > (tabTrees.length / 2) * Settings.blockSize + 5) {
                //console.log("4")
                tabTrees.unshift(tabTrees.pop())
                for (var i = 0; i < tabTrees[0].length; i++) {
                    tabTrees[0][i].translateX(-tabTrees.length * Settings.blockSize)
                }
            }

            for (var i = 0; i < tabTrees.length; i++) {
                for (var j = 0; j < tabTrees[i].length; j++) {
                    if (distanceVector(tabTrees[i][j].position, player.position) > (tabTrees.length / 2) * Settings.blockSize)
                        tabTrees[i][j].visible = false;
                    else
                        tabTrees[i][j].visible = true;
                }
            }
        }
    }

    animateScene();
}