function Helicopter() {

    var daeModel
    var wirnik

    function callback(daeModel) {
        return daeModel;
    }

    this.loadModel = function (url, callback) {

        var loader = new THREE.ColladaLoader();

        loader.load(url, function (collada) {

            daeModel = collada.scene;
            daeModel.scale.set(6, 6, 6)

            //main_rotor, rear_rotor
            wirnik = daeModel.getObjectByName("main_rotor", true)  
            wirnik.rotation.x = -Math.PI / 2

            wirnik2 = daeModel.getObjectByName("rear_rotor", true)


            var licz = 0;
            daeModel.traverse(function (mesh) {
                if (mesh instanceof THREE.Mesh) {
                    //console.log(mesh.parent.name)
                    //console.log(mesh)    
                    mesh.material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture(Materials.graphics.helicopter[0]) })
                }
            });
            /*var okno1 = daeModel.getObjectByName("Window_L2", true)
            console.log(okno1)
            okno1.children[0].material = new THREE.MeshBasicMaterial({ opacity: 0 })

            var okno2 = daeModel.getObjectByName("Window_L1", true)
            console.log(okno2)
            okno2.children[0].material = new THREE.MeshBasicMaterial({ opacity: 0 })

            var okno3 = daeModel.getObjectByName("Window_R2", true)
            console.log(okno3)
            okno3.children[0].material = new THREE.MeshBasicMaterial({ opacity: 0 })

            var okno4 = daeModel.getObjectByName("window_R1", true)
            console.log(okno4)
            okno4.children[0].material = new THREE.MeshBasicMaterial({ opacity: 0 })*/

            var pilot = daeModel.getObjectByName("pilot", true)
            pilot.children[0].material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture(Materials.graphics.helicopter[4]) })

            //var elevator = daeModel.getObjectByName("elevator", true)
            //elevator.children[0].material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture(Materials.graphics.helicopter[3]) })

            callback(daeModel)

        })
    }
    var notStopped = true;

    this.getModel = function () {
        return daeModel
    }

    this.updateModel = function () {
        if (notStopped) {
            wirnik.rotation.z += Settings.szybkoscWirnika

            wirnik2.rotation.x -= Settings.szybkoscWirnika
        }
    }

    this.update = function (speed, rotation, height) {
        if (notStopped) {
            daeModel.translateZ(speed)
            daeModel.rotation.y = -rotation * (Math.PI / 180)
            daeModel.position.y = height;
        }
    }

    this.stop = function () {
        notStopped = false;
    }

}
