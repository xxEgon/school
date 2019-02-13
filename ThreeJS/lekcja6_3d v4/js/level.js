function Level(scene, obj, tMixer, cienie, tAnimations, contLights, collidableMeshList) {
    this.init = function () {

        var size = obj.size;
        var wlk_pola = 500;
        //var contLights = contLights
        

        var geom = new THREE.PlaneBufferGeometry(size * wlk_pola, size * wlk_pola);
        var mat = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide,
            color: 0xffffff,
            specular: 0xffffff,
            shininess: 50,
            map: THREE.ImageUtils.loadTexture("mats/floor.jpg")
        })

        var mesh = new THREE.Mesh(geom, mat);
        mesh.rotateX(Math.PI / 2);
        mesh.material.map.repeat.set(8, 8); 
        mesh.material.map.wrapS = mesh.material.map.wrapT = THREE.RepeatWrapping; 
        mesh.receiveShadow = true;
        mesh.position.z = size / 2 * wlk_pola - wlk_pola / 2;
        mesh.position.x = size / 2 * wlk_pola - wlk_pola / 2;
        mesh.position.y = 0;
        scene.add(mesh)

        var mat2 = new THREE.MeshPhongMaterial({
            side: THREE.FrontSide,
            color: 0xffffff,
            specular: 0xffffff,
            shininess: 100,
            map: THREE.ImageUtils.loadTexture("mats/ceiling.jpg")
        })

        var mesh2 = new THREE.Mesh(geom, mat2);
        mesh2.rotateX(Math.PI / 2);
        mesh2.material.map.repeat.set(8, 8); 
        mesh2.material.map.wrapS = mesh2.material.map.wrapT = THREE.RepeatWrapping; 
        mesh2.position.z = size / 2 * wlk_pola - wlk_pola / 2;
        mesh2.position.x = size / 2 * wlk_pola - wlk_pola / 2;
        mesh2.position.y = wlk_pola*1.5;
        scene.add(mesh2)

        for (i = 0; i < obj.level.length ; i++) {
            var t = obj.level[i];
            switch (t.type) {
                case "wall":
                    createWall(t.z, t.x);
                    break;
                case "enemy":
                    createEnemy(t.z, t.x);
                    break;
                case "light":
                    createLight(t.z, t.x);
                    break;
            }
        }

        function createWall(X, Z) {
            var g = new THREE.CubeGeometry(wlk_pola, wlk_pola*2, wlk_pola, 1, 1, 1);
            var m = new THREE.MeshPhongMaterial({
                side: THREE.FrontSide,
                //color: 0xffffff,
                specular: 0xffffff,
                shininess: 50,
                map: THREE.ImageUtils.loadTexture('mats/wall.jpg')
            })
            var mesh = new THREE.Mesh(g, m);
            mesh.position.x = X * wlk_pola;
            mesh.position.z = Z * wlk_pola;
            mesh.position.y = wlk_pola / 2;
            scene.add(mesh)
            collidableMeshList.push(mesh)
        }

        
        var loadLicz = 0;
        var meshModel;
        function createEnemy(X, Z) {
            var modelMaterial = new THREE.MeshPhongMaterial(
             {
                 map: THREE.ImageUtils.loadTexture("mats/droid.png"),
                 color: 0xffffff,
                 specular: 0xffffff,
                 shininess: 50,
                 morphTargets: true,
                 //wireframe:true,

             });

            var loader = new THREE.JSONLoader();
            var mixer;
            
            var klony = new THREE.Object3D();
            
            scene.add(klony)
            loader.load('models/droid/tris.js', function (geometry) {
                loadLicz++;
                if (loadLicz == 1) {
                    meshModel = new THREE.Mesh(geometry, modelMaterial)
                    meshModel.name = "droid";
                    meshModel.rotation.y = 1.5; 
                    meshModel.position.y = 200; 
                    meshModel.position.x = X * wlk_pola;
                    meshModel.position.z = Z * wlk_pola;
                    meshModel.scale.set(8, 8, 8); 
                    meshModel.castShadow = true;
                    klony.add(meshModel);
                    collidableMeshList.push(meshModel)
                }
                else {
                    var clone = meshModel.clone();
                    clone.rotation.y = 1.5; 
                    clone.position.y = 200; 
                    clone.position.x = X * wlk_pola;
                    clone.position.z = Z * wlk_pola;
                    klony.add(clone);
                    collidableMeshList.push(clone)
                }
                //animowanie klonow
                tMixer.push(new THREE.AnimationMixer(klony.children[klony.children.length-1]));
                tMixer[tMixer.length - 1].uncacheRoot(tMixer[tMixer.length - 1].getRoot())
                //tMixer[tMixer.length - 1].timeScale = Math.random(); //predkosci animacji
                tMixer[tMixer.length - 1].clipAction(tAnimations[0]).play();
            });
        }
        var contLights2
        function createLight(X, Z) {
            contLights2 = new MyLight(X, Z).getLight();
            //console.log(contLights2)
            contLights2.children[contLights2.children.length-1].position.set(X * wlk_pola, 650, Z * wlk_pola);
            scene.add(contLights2)
            //console.log(contLights2)
            contLights.children.push(contLights2.children[0])
        }
            

    }

}