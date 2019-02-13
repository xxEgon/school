function Armata(kulaObj) {
    console.log("New Armata")

    var armata3D = new THREE.Object3D();

    var geomLufa = new THREE.CylinderGeometry(5, 5, 30, 32);
    var geomKolo = new THREE.CylinderGeometry(7, 7, 5, 7);

    var mat1 = new THREE.MeshBasicMaterial({
        color: 0x0000ff, side: THREE.DoubleSide
    })
    var mat2 = new THREE.MeshBasicMaterial({
        color: 0xff0000, side: THREE.DoubleSide
    })

    var lufa = new THREE.Mesh(geomLufa, mat1)
    lufa.name = "lufa"
    lufa.position.y = 15;
    lufa.rotation.x = (document.getElementById("kat").value) * (Math.PI / 180) ;

    armata3D.add(lufa)

    //==================================
    //lufa.add(kulaObj)
    kulaObj.position.x = 0;
    kulaObj.position.z = 0;
    kulaObj.position.y = 15;
    //================================== 

    var kolo1 = new THREE.Mesh(geomKolo, mat2)
    kolo1.name = "kolo1"
    kolo1.position.x = 7;
    kolo1.position.y = 7;
    kolo1.rotateZ(1.55);
    armata3D.add(kolo1)

    var kolo2 = new THREE.Mesh(geomKolo, mat2)
    kolo2.name = "kolo2"
    kolo2.position.x = -7;
    kolo2.position.y = 7;
    kolo2.rotateZ(1.55);
    armata3D.add(kolo2)

    //console.log(armata3D)

    this.get = function (){
        return armata3D;
    }

    this.rotate = function (alpha) {
        alpha = alpha * (Math.PI / 180)
        //console.log(alpha)
        armata3D.rotation.y = alpha;
    }

    this.kat = function (alpha) {
        alpha = alpha * (Math.PI / 180)
        //console.log(alpha)       
        lufa.rotation.x = alpha;
    }

    this.getKolo1 = function () {
        return kolo1;
    }

    this.getKolo2 = function () {
        return kolo2;
    }

    this.getLufa = function () {
        return lufa;
    }
}