function Table() {

    var daeModel

    this.loadModel = function (url, callback) {

        var loader = new THREE.ColladaLoader();

        loader.load(url, function (collada) {

            daeModel = collada.scene;
            daeModel.scale.set(4, 4, 4)

            /*var table = new THREE.MeshPhongMaterial({
                side: THREE.DoubleSide,
                map: THREE.ImageUtils.loadTexture("models/pooltable/PoolTableFelt.jpg")
            });*/
            var bandtexture = new THREE.MeshToonMaterial({
                side: THREE.DoubleSide,
                map: THREE.ImageUtils.loadTexture("models/pooltable/Mahogany.jpg"),
            });
            var construction = new THREE.MeshPhongMaterial({
                side: THREE.DoubleSide,
                map: THREE.ImageUtils.loadTexture("models/pooltable/PoolTableFelt.jpg"),
            })
            daeModel.traverse(function (mesh) {
                if (mesh instanceof THREE.Mesh) {
                    mesh.material = bandtexture
                    //console.log(mesh.parent.name)
                }
            });
            var felt = daeModel.getObjectByName("mian02", true)
            felt.children[0].material = construction
            /*var band1 = daeModel.getObjectByName("Shape21", true)
            band1.children[0].material = bandtexture
            band1 = daeModel.getObjectByName("Shape22", true)
            band1.children[0].material = bandtexture
            band1 = daeModel.getObjectByName("Shape23", true)
            band1.children[0].material = bandtexture
            band1 = daeModel.getObjectByName("Shape24", true)
            band1.children[0].material = bandtexture
            band1 = daeModel.getObjectByName("Shape25", true)
            band1.children[0].material = bandtexture
            band1 = daeModel.getObjectByName("Shape26", true)
            band1.children[0].material = bandtexture
            var band1 = daeModel.getObjectByName("Line80", true)
            band1.children[0].material = construction*/
            var band1 = daeModel.getObjectByName("Line79", true)
            band1.children[0].material = construction
            band1 = daeModel.getObjectByName("Line77", true)
            band1.children[0].material = construction
            band1 = daeModel.getObjectByName("Line76", true)
            band1.children[0].material = construction
            band1 = daeModel.getObjectByName("Line87", true)
            band1.children[0].material = construction
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