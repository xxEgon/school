function Kula(X) {
    console.log("New Kula")

    var geomKula = new THREE.SphereGeometry(4, 32, 32);

    var mat1 = new THREE.MeshBasicMaterial({
        color: 0x00ff00, side: THREE.DoubleSide
    })

    
    var kula = new THREE.Mesh(geomKula, mat1)
    kula.name = "kula"
    kula.position.x = X;
    kula.position.z = 12;
    kula.position.y = 25;

    this.x = X;
    this.z = 12;
    this.y = 25;

    this.get = function () {
        return kula;
    }

}
