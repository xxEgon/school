function Tree() {

    var daeModel

    function callback(daeModel) {
        return daeModel;
    }

    this.loadModel = function (url, callback) {

        var loader = new THREE.ColladaLoader();

        loader.load(url, function (collada) {

            daeModel = collada.scene;
            daeModel.scale.set(14, 14, 14)

            daeModel.rotation.z = Math.PI / 2
            daeModel.rotation.x = -Math.PI / 2

            daeModel.position.x = 0
            daeModel.position.y = 0
            daeModel.position.z = 0

            //po załadowaniu jest możliwy dostęp do składników / meshów modelu:

            daeModel.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture(Materials.graphics.tree)})
                }
            });

            //console.log(daeModel)

            // callback czyli zwrócenie danych modelu na zewnątrz pliku 

            callback(daeModel)

        })
    }

    this.getModel = function () {
        return daeModel
    }

}
