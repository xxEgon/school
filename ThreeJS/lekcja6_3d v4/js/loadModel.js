function LoadModel(scene, obj, mixer, cienie, tAnimations) {

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
            player = new THREE.Mesh(geometry, modelMaterial)
            player.name = "vader";
            player.rotation.y = Math.PI * 1.5;
            player.position.y = 200;
            player.position.x = (size - 2) * wlk_pola;
            player.position.z = (size - 4) * wlk_pola;
            player.scale.set(8, 8, 8);
            player.castShadow = true;
            scene.add(player);

            mixer[0] = new THREE.AnimationMixer(player);
            mixer[0].uncacheRoot(mixer[0].getRoot())
            mixer[0].clipAction(tAnimations[0]).play();               
            
        });
    }
}