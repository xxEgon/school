/*
    klasa Game
*/

function Game() {

    /*
        zmienna prywatna widoczna tylko w tej funkcji (klasie)
    */


    this.setCam = function (x, y, z) {
        camera.position.x = x;
        camera.position.z = z;
        camera.position.y = y;
    }

    this.camera;

    var middle = {
        x: 320,
        y: 20,
        z: 320
    }

    var plansza = new THREE.Object3D();
    var niebieskie = new THREE.Object3D();
    var czerwone = new THREE.Object3D();

    var renderer;
    var scene;
    var mat;
    var geom;
    var mesh;
    //var mat2;
    var geom2;
    var geom3;
    //var mesh2;

    var raycaster = new THREE.Raycaster(); // obiekt symuluj¹cy "rzucanie" promieni
    var mouseVector = new THREE.Vector2() // wektor (x,y) wykorzystany bêdzie do okreœlenie pozycji myszy na ekranie

    initEngine() 	// scena, kamera, renderer
    initObjects() 	// obiekty gry - geometrie, osie, meshe
    initMaterials() // wszystkie materia³y
    initEvents() 	// eventy - mysz, klawiatura, resize etc        
    animateScene(); // pêtla g³owna gry
    szachownica();

    function initEngine() {
        var wys_okna = window.innerHeight;
        var szer_okna = window.innerWidth;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
            45, // k¹t patrzenia kamery (FOV - field of view)
            szer_okna / wys_okna, // proporcje widoku, powinny odpowiadaæ proporjom naszego ekranu przegl¹darki
            0.1, // minimalna renderowana odleg³oœæ
            10000 // maxymalna renderowana odleg³oœæ
        );
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x006400);

        renderer.setSize(szer_okna, wys_okna);

        document.getElementById("div1").appendChild(renderer.domElement);

        camera.position.x = 320;
        camera.position.y = 700;
        camera.position.z = -500;

        camera.lookAt(middle);

        //var axis = new THREE.AxisHelper(2000);    // 200 - wielkoœæ 
        //scene.add(axis);
    }

    function initObjects() {
        geom = new THREE.PlaneGeometry(1000, 1000, 8, 8);

        mesh = new THREE.Mesh(geom, mat);
        mesh.rotateX(Math.PI / 2);
        //mesh.rotateY(obrot_w_radianach); 
        //mesh.rotateZ(Math.PI/2); 
        //mesh.material.map.repeat.set(8, 8); //gêstoœæ powtarzania
        //mesh.material.map.wrapS = mesh.material.map.wrapT = THREE.RepeatWrapping; // powtarzanie w obu kierunkach
        scene.add(mesh)
        camera.lookAt(mesh.position);

        geom2 = new THREE.CubeGeometry(80, 20, 80, 1, 1, 1);

        geom3 = new THREE.CylinderGeometry(35, 35, 20, 40);

        /*
        var geom3 = new THREE.CubeGeometry(250, 125, 125, 1, 1, 1);

        var mesh3 = new THREE.Mesh(geom3, mat3);
        //mesh2.rotation.y = 1.5; // ustaw obrót modelu
        mesh3.position.y = 62; // ustaw pozycje modelu
        mesh3.position.z = 435;
        scene.add(mesh3)*/
    }

    function initMaterials() {
        var mat = new THREE.MeshBasicMaterial({
            color: 0x00ff00, side: THREE.DoubleSide, wireframe: true
        })

        /*
        var mat3 = new THREE.MeshBasicMaterial({
            color: 0xffff00, side: THREE.DoubleSide,
        })*/
    }

    function initEvents() {

    }

    function animateScene() {
        camera.lookAt(middle);
        //camera.lookAt(mesh.position);
        requestAnimationFrame(animateScene);
        renderer.render(scene, camera);
    }

    function szachownica() {
        var szachownica = [

            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],

        ];
        for (i = 0; i < 8; i++) {
            for (j = 0; j < 8; j++) {
                if (szachownica[i][j] == 1)
                    var mat2 = new THREE.MeshBasicMaterial({
                        color: 0xffffff, side: THREE.DoubleSide,
                    })
                else
                    var mat2 = new THREE.MeshBasicMaterial({
                        color: 0x000000, side: THREE.DoubleSide,
                    })

                var mesh2 = new THREE.Mesh(geom2, mat2);

                mesh2.userData = { pusty: false, x: i, y: j };

                if (szachownica[i][j] == 1) {
                    mesh2.name = "white"
                }
                else {
                    mesh2.name = "black";
                    mesh2.userData.pusty = true;
                }

                //mesh2.rotation.y = 1.5; // ustaw obrót modelu
                mesh2.position.z = i * 80 + 40; // ustaw pozycje modelu
                mesh2.position.x = j * 80 + 40;
                plansza.add(mesh2)

                if (i < 2 && szachownica[i][j] == 0) {
                    console.log()
                    var mat3 = new THREE.MeshBasicMaterial({
                        color: 0x0000ff, side: THREE.DoubleSide
                    })
                    var mesh3 = new THREE.Mesh(geom3, mat3);
                    //mesh2.rotation.y = 1.5; // ustaw obrót modelu
                    mesh3.position.z = i * 80 + 40; // ustaw pozycje modelu
                    mesh3.position.x = j * 80 + 40;
                    mesh3.position.y = 20;
                    mesh3.name = "pionek1";
                    mesh3.userData = { x: i, y: j };
                    niebieskie.add(mesh3)
                    mesh2.userData.pusty = false;
                }

                if (i > 5 && szachownica[i][j] == 0) {
                    console.log()
                    var mat3 = new THREE.MeshBasicMaterial({
                        color: 0xff0000, side: THREE.DoubleSide
                    })
                    var mesh3 = new THREE.Mesh(geom3, mat3);
                    //mesh2.rotation.y = 1.5; // ustaw obrót modelu
                    mesh3.position.z = i * 80 + 40; // ustaw pozycje modelu
                    mesh3.position.x = j * 80 + 40;
                    mesh3.position.y = 20;
                    mesh3.name = "pionek2";
                    mesh3.userData = { x: i, y: j };
                    czerwone.add(mesh3)
                    mesh2.userData.pusty = false;
                }
            }
        }
        scene.add(plansza)
        scene.add(niebieskie)
        scene.add(czerwone)

    }
    var lastPionek = 0;
    var lastCzarny = 0;
    var przesunieto = false;

    this.MouseDown = function () {
        przesunieto = false;
        console.log("BLOCK CLICKED")
        if (net.mojRuch) {
            console.log("MOJ RUCH")
            mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouseVector, camera);
            var intersects = raycaster.intersectObjects(scene.children, true);
            if (intersects.length > 0) {
                chosenBlock = intersects[0].object;
                console.log(chosenBlock)
                //console.log("lastPionek", lastPionek)

                switch (chosenBlock.name) {
                    case "pionek1":
                        console.log("pionek1")
                        if (net.user == "red")
                            chosenBlock = 0;
                        //lastPionek = chosenBlock;
                        break;
                    case "pionek2":
                        console.log("pionek2")
                        if (net.user == "blue")
                            chosenBlock = 0;
                        //lastPionek = chosenBlock;
                        break;
                    case "black":
                        console.log("black")
                        //console.log("last", lastPionek.position)
                        //console.log("chosen", chosenBlock.position)
                        if (lastPionek != 0 && chosenBlock.userData.pusty == true
                            && (chosenBlock.position.z == lastPionek.position.z + 80
                                || chosenBlock.position.z == lastPionek.position.z - 80)) {

                            //console.log("LASTPIONEK:", lastPionek.userData.x, lastPionek.userData.y)
                            net.gameTab[lastPionek.userData.x][lastPionek.userData.y] = 0;
                            if (net.user == "blue")
                                net.gameTab[chosenBlock.userData.x][chosenBlock.userData.y] = 1;
                            else if (net.user == "red")
                                net.gameTab[chosenBlock.userData.x][chosenBlock.userData.y] = 2;

                            for (i = 0; i < plansza.children.length; i++) {
                                //console.log(plansza.children[i])
                                if (plansza.children[i].position.x == lastPionek.position.x &&
                                    plansza.children[i].position.z == lastPionek.position.z) {
                                    //console.log("ZNALAZLEM")
                                    plansza.children[i].userData.pusty = true;
                                    break;
                                }
                            }

                            net.NewgameTab = net.gameTab.slice()

                            lastPionek.userData.x = chosenBlock.userData.x;
                            lastPionek.userData.y = chosenBlock.userData.y;

                            lastPionek.position.x = chosenBlock.position.x;
                            lastPionek.position.z = chosenBlock.position.z;
                            chosenBlock.userData.pusty = false;

                            przesunieto = true;
                            net.sendData("UPDATE_TAB", JSON.stringify(net.gameTab));
                            $("#turn").css("display", "block");
                            ui.updateTabDiv(net.gameTab)
                            //setTimeout(function () {
                            //    console.log("ZACZYNAM ODPYTYWAC =====")
                            //    net.sendData("COMPARE_TAB", "0");
                            //}, 600)

                        }
                        break;
                    case "white":
                        console.log("white")
                        break;
                }
                if (net.user == "blue") {
                    if (chosenBlock.name == "pionek1") {
                        chosenBlock.material.color.setHex(0xffff00);
                    }
                    if (lastPionek != 0 && lastPionek != chosenBlock) {
                        if (lastPionek.name == "pionek1")
                            lastPionek.material.color.setHex(0x0000ff);

                    }
                }
                else {
                    if (chosenBlock.name == "pionek2") {
                        chosenBlock.material.color.setHex(0xffff00);
                    }
                    if (lastPionek != 0) {
                        if (lastPionek.name == "pionek2" && lastPionek != chosenBlock)
                            lastPionek.material.color.setHex(0xff0000);
                    }
                }


                if (chosenBlock.name == "black")
                    lastCzarny = chosenBlock;
                if (chosenBlock.name == "pionek1" || chosenBlock.name == "pionek2") {
                    lastPionek = chosenBlock;
                    //console.log("ZMIENILEM NO ===========", lastPionek.userData.x, lastPionek.userData.y)
                }
                if (przesunieto) {
                    lastPionek = 0;
                    //console.log("OJEJ ===========")
                    //net.send()

                }

            }
            else {
                chosenBlock = "0";
            }
        }
    }

    this.moveEnemy = function () {
        console.log("MoveEnemy")

        var I = -1;
        var J = -1;

        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (net.gameTab[i][j] != net.NewgameTab[i][j]) {
                    console.log("BYLA ZMIANA1", i, j, "[" + net.NewgameTab[i][j] + "]")
                    if (net.user == "red") {
                        if (net.NewgameTab[i][j] == 0) {
                            console.log("BYLA ZMIANA2", i, j)
                            for (var k = 0; k < niebieskie.children.length; k++) {
                                if (niebieskie.children[k].userData.x == i && niebieskie.children[k].userData.y == j) {
                                    I = i;
                                    J = j;
                                }
                            }
                        }
                    }
                    if (net.user == "blue") {
                        if (net.NewgameTab[i][j] == 0) {
                            console.log("BYLA ZMIANA2", i, j)
                            for (var k = 0; k < czerwone.children.length; k++) {
                                if (czerwone.children[k].userData.x == i && czerwone.children[k].userData.y == j ) {
                                    I = i;
                                    J = j;
                                }
                            }
                        }
                    }
                }
            }
        }
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (net.gameTab[i][j] != net.NewgameTab[i][j]) {
                    console.log("BYLA ZMIANA3", i, j, "[" + net.NewgameTab[i][j] + "]")
                    if (net.user == "red") {
                        console.log("BYLA ZMIANA4")
                        if (net.NewgameTab[i][j] != 0) {
                            console.log("BYLA ZMIANA5", I, J)
                            for (var k = 0; k < niebieskie.children.length; k++) {
                                console.log(czerwone.children[k].userData.x, czerwone.children[k].userData.y)
                                if (niebieskie.children[k].userData.x == I && niebieskie.children[k].userData.y == J) {
                                    niebieskie.children[k].position.x = j * 80 + 40;
                                    niebieskie.children[k].position.z = i * 80 + 40;
                                    niebieskie.children[k].userData.x = i;
                                    niebieskie.children[k].userData.y = j;
                                    console.log("MOVED ============ !!", i, j)
                                }
                            }
                        }
                    }
                    if (net.user == "blue") {
                        console.log("BYLA ZMIANA4")
                        if (net.NewgameTab[i][j] != 0) {
                            console.log("BYLA ZMIANA5", I, J)
                            for (var k = 0; k < czerwone.children.length; k++) {
                                console.log(czerwone.children[k].userData.x, czerwone.children[k].userData.y)
                                if (czerwone.children[k].userData.x == I && czerwone.children[k].userData.y == J) {
                                    czerwone.children[k].position.x = j * 80 + 40;
                                    czerwone.children[k].position.z = i * 80 + 40;
                                    czerwone.children[k].userData.x = i;
                                    czerwone.children[k].userData.y = j;
                                    console.log("MOVED ============ !!", i, j)
                                }
                            }
                        }
                    }
                }
            }
        }
        net.gameTab = net.NewgameTab.slice()
    }

}