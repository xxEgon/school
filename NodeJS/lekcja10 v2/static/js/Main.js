function Main(client) {
    this.setCam = function (x, y, z) {
        camera.position.x = x;
        camera.position.z = z;
        camera.position.y = y;
    }

    function setCam(x, y, z) {
        camera.position.x = x;
        camera.position.z = z;
        camera.position.y = y;
    }

    this.camera;

    var armata1;
    var armataObj1;
    var kula1;
    var kulaObj1;

    var armata2;
    var armataObj2;
    var kula2;
    var kulaObj2;

    var armata;
    var armataObj;
    var kula;
    var kulaObj;
    var siatka;
    var siatkaObj;

    var armata0;
    var armataObj0;
    var kula0;
    var kulaObj0;

    var user = 0;

    this.getUser= function () {
        return user;
    }

    this.setUser = function (u) {
        user = u;

        if (user == 1) {
            console.log("USER NR 1")
            armata = armata1;
            armataObj = armataObj1;
            kula = kula1;
            kulaObj = kulaObj1;

            armata0 = armata2;
            armataObj0 = armataObj2;
            kula0 = kula2;
            kulaObj0 = kulaObj2;
        } else if (user == 2) {
            console.log("USER NR 2")
            armata = armata2;
            armataObj = armataObj2;
            kula = kula2;
            kulaObj = kulaObj2;

            armata0 = armata1;
            armataObj0 = armataObj1;
            kula0 = kula1;
            kulaObj0 = kulaObj1;
        }

        setCam(-25, 100, -100)
        camera.lookAt(middle)
        //setCam(armata.x, 60, -80)
        //camera.lookAt({x:armata.x, y:0, z:100})
    }

    var middle = {
        x: -25,
        y: 0,
        z: 100
    }

    var renderer;
    var scene;

    var pal = false;
    var odrzut = false;

    initEngine() 	// scena, kamera, renderer
    initObjects() 	// obiekty gry - geometrie, osie, meshe
    initMaterials() // wszystkie materia³y
    initEvents() 	// eventy - mysz, klawiatura, resize etc

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
        renderer.setClearColor(0x9AE2FD);

        renderer.setSize(szer_okna, wys_okna);

        document.getElementById("div1").appendChild(renderer.domElement);

        camera.position.x = -25;
        camera.position.y = 100;
        camera.position.z = -100;

        camera.lookAt(middle);

        //var axis = new THREE.AxisHelper(2000);
        //scene.add(axis);
    }

    function initObjects() {

        kula1 = new Kula(0)
        kulaObj1 = kula1.get()
        scene.add(kula1.get())

        armata1 = new Armata(0, 0x0000ff)
        armataObj1 = armata1.get()
        scene.add(armataObj1)        


        kula2 = new Kula(-50)
        kulaObj2 = kula2.get()
        scene.add(kula2.get())

        armata2 = new Armata(-50, 0xff0000)
        armataObj2 = armata2.get()
        scene.add(armataObj2)    

        //var axis1 = new THREE.AxisHelper(2000);
        //armataObj.add(axis1);

        siatka = new Siatka()
        siatkaObj = siatka.get()
        scene.add(siatkaObj)
        
        var kat = 90;

        document.getElementById("obrot").oninput = function () {
            //console.log("Obrot", this.value)
            armata.rotate(this.value);
            kulaObj.position.x = kula.x + 15 * Math.cos((document.getElementById("kat").value) * (Math.PI / 180)) * Math.sin((document.getElementById("obrot").value) * (Math.PI / 180))
            kulaObj.position.z = 15 * Math.cos((document.getElementById("kat").value) * (Math.PI / 180)) * Math.cos((document.getElementById("obrot").value) * (Math.PI / 180))
            kulaObj.position.y = 15 * Math.sin((document.getElementById("kat").value) * (Math.PI / 180)) + 15

            kula.z = kulaObj.position.z
            kula.y = kulaObj.position.y

            client.emit("rotation", {
                armataObj_rotation_y: armataObj.rotation.y,
                kulaObj_position: kulaObj.position,
            })
        }

        document.getElementById("kat").oninput = function () {
            //console.log("Kat", this.value)
            armata.kat(this.value);

            kulaObj.position.x = kula.x + 15 * Math.cos((this.value) * (Math.PI / 180)) * Math.sin((document.getElementById("obrot").value) * (Math.PI / 180))
            kulaObj.position.z = 15 * Math.cos((this.value) * (Math.PI / 180)) * Math.cos((document.getElementById("obrot").value) * (Math.PI / 180))
            kulaObj.position.y = 15 * Math.sin((this.value) * (Math.PI / 180)) + 15
            
            kula.z = kulaObj.position.z
            kula.y = kulaObj.position.y

            client.emit("kat", {
                armataAlpha: this.value,
                kulaObj_position: kulaObj.position,
            })
        }

        document.getElementById("pal").onclick = function () {
            console.log("PAL!")
            pal = true;
            odrzut = true;
        }
    }

    function initMaterials() {

    }

    function initEvents() {

    }

    var drgania = false;
    var powrot = false;

    var v = 100;
    var t = 0;

    camera.lookAt(middle);

    function animateScene() {

        if (odrzut) {
            armata.getKolo1().rotation.x -= 1
            armata.getKolo2().rotation.x -= 1
            armataObj.translateZ(-0.5);
            //armata.getLufa().children[0].translateZ(0.5);
            if (armata.getKolo2().rotation.x < -29) {
                powrot = true;
                odrzut = false;
            }
            client.emit("odrzut", {
                koloRotation: armata.getKolo1().rotation.x,
                armataObj_position_z: armataObj.position.z
            })
        }

        if (powrot) {
            armata.getKolo1().rotation.x += 1
            armata.getKolo2().rotation.x += 1
            armataObj.translateZ(0.5);
            //armata.getLufa().children[0].translateZ(-0.5);
            if (armata.getKolo2().rotation.x > -1) {
                powrot = false;
            }
            client.emit("odrzut", {
                koloRotation: armata.getKolo1().rotation.x,
                armataObj_position_z: armataObj.position.z
            })
        }

        if (pal)
        {
            var alpha = (document.getElementById("kat").value) * (Math.PI / 180)
            kulaObj.position.x = kula.x + (v * t * Math.cos(alpha) * armataObj.getWorldDirection().x)
            kulaObj.position.y = kula.y + (v * t * Math.sin(alpha) - ((50 * t * t) / 2) + 5)
            kulaObj.position.z = kula.z + (v * t * Math.cos(alpha) * armataObj.getWorldDirection().z)
            t += 0.1;
            client.emit("pal", {
                kulaObj_position: kulaObj.position,
            })
            if (kulaObj.position.y <5)
            {
                drgania = true;
                setTimeout(function () {
                    drgania = false
                    camera.rotation.z = Math.PI
                    client.emit("drgania", {
                        camera_rotation_z: camera.rotation.z,
                    })
                }, 500)
				pal = false;
				setTimeout(function(){
				    console.log("POWROT")
                    kulaObj.position.x = kula.x + 15 * Math.cos((document.getElementById("kat").value) * (Math.PI / 180)) * Math.sin((document.getElementById("obrot").value) * (Math.PI / 180))
                    kulaObj.position.z = 15 * Math.cos((document.getElementById("kat").value) * (Math.PI / 180)) * Math.cos((document.getElementById("obrot").value) * (Math.PI / 180))
                    kulaObj.position.y = 15 * Math.sin((document.getElementById("kat").value) * (Math.PI / 180)) + 15
                    t = 0;
                    client.emit("pal", {
                        kulaObj_position: kulaObj.position,
                    })
				}, 1000)
			}
        }

        if (drgania) {
            var a = Math.random() * 0.1;
            console.log("Drgania")            
            camera.rotation.z = Math.PI + a
            client.emit("drgania", {
                camera_rotation_z: camera.rotation.z,
            })
        } 

        requestAnimationFrame(animateScene);
        renderer.render(scene, camera);
    }

    animateScene();

    this.rotate2 = function (armataRot, kulaPos) {
        //console.log(armataRot, kulaPos)

        armataObj0.rotation.y = armataRot

        kulaObj0.position.x = kulaPos.x
        kulaObj0.position.y = kulaPos.y
        kulaObj0.position.z = kulaPos.z

        kula0.z = kulaObj0.position.z
        kula0.y = kulaObj0.position.y
    }

    this.kat2 = function (armataAlpha, kulaPos) {
        //console.log(armataAlpha, kulaPos)

        armata0.kat(armataAlpha)

        kulaObj0.position.x = kulaPos.x
        kulaObj0.position.y = kulaPos.y
        kulaObj0.position.z = kulaPos.z

        kula0.z = kulaObj0.position.z
        kula0.y = kulaObj0.position.y
    }

    this.pal2 = function (kulaPos) {

        kulaObj0.position.x = kulaPos.x
        kulaObj0.position.y = kulaPos.y
        kulaObj0.position.z = kulaPos.z

    }

    this.drgania2 = function (cameraRot) {

        camera.rotation.z = cameraRot

    }

    this.odrzut2 = function (koloRotation, armataObj_position_z) {

        armata0.getKolo1().rotation.x = koloRotation
        armata0.getKolo2().rotation.x = koloRotation

        armataObj0.position.z = armataObj_position_z

    }
}