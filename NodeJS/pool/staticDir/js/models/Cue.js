function Cue() {

    var daeModel

    this.loadModel = function (url, callback) {

        var loader = new THREE.ColladaLoader();

        loader.load(url, function (collada) {

            daeModel = collada.scene;
            daeModel.scale.set(10, 10, 10)

            var cue = new THREE.MeshPhongMaterial({
                side: THREE.DoubleSide,
                map: THREE.ImageUtils.loadTexture("models/cue/cue.png"),
                specular: 0xffffff,
                shininess: 50
            });
            daeModel.traverse(function (mesh) {
                if (mesh instanceof THREE.Mesh) {
                    mesh.material = cue
                }
            });
            callback(daeModel)
        })
    }

    this.getModel = function () {
        return daeModel
    }

    /*this.updateModel = function () {
        wirnik.rotateZ(Settings.szybkoscWirnika)
        tylnywirnik.rotateX(Settings.szybkoscWirnika)
        //return daeModel
        // ruch wirnika      
    }*/

}