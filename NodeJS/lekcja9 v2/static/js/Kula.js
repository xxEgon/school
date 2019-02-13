function Kula() {
    console.log("New Kula")

    var geomKula = new THREE.SphereGeometry(5, 32, 32);

    var mat1 = new THREE.MeshBasicMaterial({
        color: 0x00ff00, side: THREE.DoubleSide
    })

    
    var kula = new THREE.Mesh(geomKula, mat1)
    kula.name = "kula"

    this.get = function () {
        return kula;
    }

}
