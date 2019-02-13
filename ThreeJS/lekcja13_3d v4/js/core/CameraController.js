function CameraController(camera, player) {

    //przod (0, 5, 23) (0, 0, -20)
    //tyl (0, 5 ,-23) (0, 0, 20)          
    //gora (0, 25, -1)(0, 0, 0)
    //dol (0, -5, -13)(0, 0, 5)
    //poklad (0, 0.5, 2)(0, -1, 20)
    //lewa (25, 0, -3)(0, 0, -3) 
    var kat = 0;

    this.update = function (notCollision) {
        if (notCollision) {
            switch (CameraModes.CURRENT_MODE) {
                case "BACK":
                    var camVect = new THREE.Vector3(0, 5, -23)
                    var lookVect = new THREE.Vector3(0, 0, 20)
                    break;
                case "FRONT":
                    var camVect = new THREE.Vector3(0, 5, 23)
                    var lookVect = new THREE.Vector3(0, 0, -20)
                    break;
                case "UP":
                    var camVect = new THREE.Vector3(0, 25, -1)
                    var lookVect = new THREE.Vector3(0, 0, 0)
                    break;
                case "DOWN":
                    var camVect = new THREE.Vector3(0, -5, -13)
                    var lookVect = new THREE.Vector3(0, 0, 5)
                    break;
                case "PANEL":
                    var camVect = new THREE.Vector3(0, 0.5, 2)
                    var lookVect = new THREE.Vector3(0, -1, 20)
                    break;
                case "LEFT":
                    var camVect = new THREE.Vector3(25, 0, -3)
                    var lookVect = new THREE.Vector3(0, 0, -3)
                    break;
            }
            var camPos = camVect.applyMatrix4(player.matrixWorld);
            var lookPos = lookVect.applyMatrix4(player.matrixWorld);
            camera.position.x = camPos.x
            camera.position.z = camPos.z
            camera.position.y = camPos.y
            camera.lookAt(lookPos)
        }
        else {
            kat += 0.005;
            camera.position.y = player.position.y + 200
            camera.position.x = player.position.x + (150 * Math.cos(kat))
            camera.position.z = player.position.z + (150 * Math.sin(kat))
            camera.lookAt(player.position)

        }
    }
        
}