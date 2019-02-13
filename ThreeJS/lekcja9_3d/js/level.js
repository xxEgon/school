function Level(scene, obj, tMixer, cienie, tAnimations, contLights, collidableMeshList, tabFires, tabEnemyLaser, tabEnemyLaserObj, tabEnemy, tabEnemyModel, tAnimations2, score) {
    this.init = function () {

        var size = obj.size;
        var wlk_pola = 500;

        enemyAmount = 0;
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
            switch (t.type)
            {
                case "wall":
                    createWall(t.z, t.x);                    
                    break;
                case "enemy":
                    createEnemy(t.z, t.x);
                    break;
                case "light":     
                    createFire(t.z, t.x);
                    createLight(t.z, t.x);                       
            }
            //console.log("i:", i)
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
                    meshModel = new THREE.Object3D()

                    meshModel1 = new THREE.Mesh(geometry, modelMaterial)
                    meshModel1.rotation.y = Math.PI / 2;
                    meshModel.add(meshModel1)

                    //var axis2 = new THREE.AxisHelper(2000);    // 200 - wielkość
                    //meshModel.add(axis2);
                    //var axis21 = new THREE.AxisHelper(2000);
                    //meshModel1.add(axis21);

                    meshModel.name = "droid";
                    //meshModel.rotateY(Math.PI / 2);
                    meshModel.position.y = 200; 
                    meshModel.position.x = X * wlk_pola;
                    meshModel.position.z = Z * wlk_pola;
                    meshModel1.scale.set(8, 8, 8); 
                    meshModel.castShadow = true;

                    klony.add(meshModel);
                    collidableMeshList.push(meshModel)
                    tabEnemy.push(meshModel)
                    tabEnemyModel.push(meshModel1)

                    console.log("lol")
                    score.initEnemy(meshModel)
                }
                else {
                    clone = new THREE.Object3D()
                    clone1 = meshModel1.clone();
                    clone1.rotation.y = Math.PI / 2;
                    clone.add(clone1)  

                    //var axis3 = new THREE.AxisHelper(2000);    // 200 - wielkość
                    //clone.add(axis3);
                    //var axis31 = new THREE.AxisHelper(2000);
                    //clone1.add(axis31);

                    clone.position.y = 200; 
                    clone.position.x = X * wlk_pola;
                    clone.position.z = Z * wlk_pola;
                    klony.add(clone);
                    collidableMeshList.push(clone)
                    tabEnemy.push(clone)
                    tabEnemyModel.push(clone1)

                    score.initEnemy(clone)
                }
                //animowanie klonow
                tMixer.push(new THREE.AnimationMixer(klony.children[klony.children.length-1].children[0]));
                tMixer[tMixer.length - 1].uncacheRoot(tMixer[tMixer.length - 1].getRoot())
                //tMixer[tMixer.length - 1].timeScale = Math.random(); //predkosci animacji
                tMixer[tMixer.length - 1].clipAction(tAnimations2[0]).play();

                
                enemyAmount++
            });

            tabEnemyLaser.push(new EnemyLaser())
            var obj = tabEnemyLaser[tabEnemyLaser.length - 1].getLaser()
            tabEnemyLaserObj.push(obj)
            scene.add(obj)           
            
        }
        var contLights2
        function createLight(X, Z) {
            contLights2 = new MyLight(X, Z).getLight();
            //console.log(contLights2)
            contLights2.children[contLights2.children.length-1].position.set(X * wlk_pola, 50, Z * wlk_pola);
            scene.add(contLights2)
            //console.log(contLights2)
            contLights.children.push(contLights2.children[0])
                     
        }

        function createFire(X, Z) {
            //console.log("createFire")

            var fire = new Fire();

            tabFires.push(fire)

            var hehe = fire.getFire()

            for (l = 0; l < hehe.length; l++) {

                hehe[l].position.x = (X * wlk_pola) + Math.ceil(Math.random() * 80);
                hehe[l].position.y = Math.ceil(Math.random() * 120);
                hehe[l].position.z = (Z * wlk_pola) + Math.ceil(Math.random() * 80);

                scene.add(hehe[l])
            }
           
        }

        //console.log("LICZ", licze)

    }

}