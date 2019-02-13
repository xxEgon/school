function Main() {
    this.setCam = function (x, y, z) {
        camera.position.x = x;
        camera.position.z = z;
        camera.position.y = y;
    }

    this.camera;

    var middle = {
        x: 0,
        y: 0,
        z: 0
    }

    var renderer;
    var scene;

    var armata;
    var armataObj
    var kula;
    var kulaObj
    var siatka;
    var siatkaObj

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

        camera.position.x = 0;
        camera.position.y = 400;
        camera.position.z = -1;

        camera.lookAt(middle);

        var axis = new THREE.AxisHelper(2000);
        scene.add(axis);
    }

    function initObjects() {

        kula = new Kula()
        kulaObj = kula.get()
        scene.add(kula.get())

        armata = new Armata(kulaObj)
        armataObj = armata.get()
        scene.add(armataObj)        

        var axis1 = new THREE.AxisHelper(2000);
        armataObj.add(axis1);

        siatka = new Siatka()
        siatkaObj = siatka.get()
        scene.add(siatkaObj)

        document.getElementById("obrot").oninput = function () {
            console.log("Obrot", this.value)
            armata.rotate(this.value);

        }

        document.getElementById("kat").oninput = function () {
            console.log("Kat", this.value)
            armata.kat(this.value);
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

    var v = 80;
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
        }

        if (powrot) {
            armata.getKolo1().rotation.x += 1
            armata.getKolo2().rotation.x += 1
            armataObj.translateZ(0.5);
            //armata.getLufa().children[0].translateZ(-0.5);
            if (armata.getKolo2().rotation.x > -1) {
                powrot = false;
            }
        }

        if (pal)
        {
            var alpha = (90 - document.getElementById("kat").value) * (Math.PI / 180)
            kulaObj.position.x = v * t * Math.cos(alpha) * armataObj.getWorldDirection().x
            kulaObj.position.y = v * t * Math.sin(alpha) - ((50 * t * t) / 2) + 5
            kulaObj.position.z = v * t * Math.cos(alpha) * armataObj.getWorldDirection().z
            console.log(kulaObj.position)
            t += 0.1;
            if (kulaObj.position.y <5)
            {
                drgania = true;
                setTimeout(function () {
                    drgania = false
                    camera.rotation.z = Math.PI
                }, 500)
				pal = false;
				setTimeout(function(){
					console.log("POWROT")
                    kulaObj.position.z = 0;
                    kulaObj.position.x = 0;
                    kulaObj.position.y = 15;
					t=0;
				}, 1000)
			}
        }

        if (drgania) {
            var a = Math.random() * 0.1;
            console.log("Drgania")            
            camera.rotation.z = Math.PI + a
        } 

        requestAnimationFrame(animateScene);
        renderer.render(scene, camera);
    }

    animateScene();
}