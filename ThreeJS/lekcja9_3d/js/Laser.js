function Laser() {
    var obj3D = new THREE.Object3D();

    var particleSystem;
    var particles;

    function generateLaser() {

        var v2 = new THREE.Vector3(0, 30, 0)
        var v1 = new THREE.Vector3(0, 100, 4000)

        obj3D.remove(particleSystem)

        particles = new THREE.Geometry() // geometria - tablica cząsteczek

        particleSize = 45//document.getElementById("size").value;
        rozstrzal = 20//document.getElementById("motion").value;

        var particleMaterial = new THREE.PointsMaterial(
            {
                color: 0x00ff00,
                size: particleSize, // ta wartośc zmieniamy suwakiem skali
                map: THREE.ImageUtils.loadTexture("mats/particle.png"), // grafika zapewniająca "okrągły" kształt cząsteczki
                blending: THREE.AdditiveBlending,
                transparent: true,
                depthWrite: false,
                opacity: 0.6
            });

        function getDifference(v1, v2) {

            var subV = new THREE.Vector3(
                v2.x - v1.x,
                v2.y - v1.y,
                v2.z - v1.z
            )
            return subV
        }

        var subV = getDifference(v1, v2)

        
        //console.log(subV)

        var particlesCount = 300;
        var stepV = subV.divideScalar(particlesCount) // particlesCount - przewidywana ilość cząsteczek

        function genParticles() {
            for (var z = 0; z < particlesCount; z++) {
                var particle = new THREE.Vector3(
                    v1.x + stepV.x * z,
                    v1.y + stepV.y * z,
                    v1.z + stepV.z * z)
                particles.vertices.push(particle);
            }
        }

        genParticles();

        particleSystem = new THREE.Points(particles, particleMaterial);
        //console.log(particleSystem)
        obj3D.add(particleSystem)
    }

    generateLaser()

    this.update = function() {
        //console.log("update")
        var verts = particles.vertices
        for (var s = 0; s < verts.length; s++) {
            var particle = verts[s];
            particle.x = (Math.random() * rozstrzal)
        }
        particleSystem.geometry.verticesNeedUpdate = true;
        particleSystem.material.size = particleSize
    }

    this.setLaser = function(v1, v2) {
        generateLaser(v1, v2)
    }
    /*document.getElementById("size").oninput = function () {
        console.log("SIZE")
        particleSize = this.value
    }*/

    /*document.getElementById("motion").oninput = function () {
        console.log("MOTION")
        rozstrzal = this.value
    }*/

    this.getLaser = function () {
        return obj3D;
    }
}