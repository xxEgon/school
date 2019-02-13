function Siatka() {
    console.log("New Siatka")

    var siatka = new THREE.Object3D()

    var lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
    var geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3(-200, 0, 0));
    geometry.vertices.push(new THREE.Vector3(200, 0, 0));

    var line = new THREE.Line(geometry, lineMaterial);   

    for (var i = -20; i < 41; i++) {
        var lineClone = line.clone()
        lineClone.position.x = 0
        //lineClone.position.x = i * 10;
        lineClone.position.z = i * 10;
        lineClone.position.y = 0;
        siatka.add(lineClone)
    }

    var geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3(0, 0, -200));
    geometry.vertices.push(new THREE.Vector3(0, 0, 400));

    var line = new THREE.Line(geometry, lineMaterial);   

    for (var i = -20; i < 21; i++) {
        var lineClone = line.clone()
        lineClone.position.x = i * 10;
        lineClone.position.z = 0
        lineClone.position.y = 0;
        siatka.add(lineClone)
    }

    this.get = function () {
        return siatka;
    }

}
