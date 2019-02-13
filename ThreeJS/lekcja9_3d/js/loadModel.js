function LoadModel(scene, obj, mixer, cienie, tAnimations, score) {

    this.init = function () {
        var size = obj.size;
        var wlk_pola = 500;
        var modelMaterial = new THREE.MeshPhongMaterial(
            {
                side: THREE.DoubleSide,
                map: THREE.ImageUtils.loadTexture("mats/vader.png"),
                //color: 0xffffff,
                specular: 0xffffff,
                shininess: 50,
                morphTargets: true,
                //wireframe:true,

            });

        var loader = new THREE.JSONLoader();

        loader.load('models/vader/tris.js', function (geometry) {

            player = new THREE.Object3D()

            player1 = new THREE.Mesh(geometry, modelMaterial)
            player.add(player1)

            player.name = "vader";
            player.position.y = 200;
            player.position.x = (size - 6) * wlk_pola;
            player.position.z = (size - 4) * wlk_pola;
            //player.position.x = (size - 2) * wlk_pola;
            //player.position.z = (size - 4) * wlk_pola;
            player.scale.set(8, 8, 8);
            player.castShadow = true;
            scene.add(player);

            player1.rotation.y = Math.PI / 2
            player.rotation.y = Math.PI 

            //player.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)

            //var axis1 = new THREE.AxisHelper(2000);    // 200 - wielkość
            //player.add(axis1);

            mixer[0] = new THREE.AnimationMixer(player1);
            mixer[0].uncacheRoot(mixer[0].getRoot())
            mixer[0].clipAction(tAnimations[0]).play();   

            score.initPlayer(player)
        });
    }
}