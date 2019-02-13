function EnemyLaser() {
    var obj3D = new THREE.Object3D();

    var particleSystem;
    var particles;

    function generateLaser() {

        v2 = new THREE.Vector3(0, 100, 0)
        var v1 = new THREE.Vector3(0, 150, -500 )

        obj3D.remove(particleSystem)

        particles = new THREE.Geometry() // geometria - tablica cząsteczek

        particleSize = 45//document.getElementById("size").value;
        rozstrzal = 45//document.getElementById("motion").value;

        var particleMaterial = new THREE.PointsMaterial(
            {
                color: 0xff0000,
                size: particleSize, // ta wartośc zmieniamy suwakiem skali
                map: THREE.ImageUtils.loadTexture("mats/particle.png"), // grafika zapewniająca "okrągły" kształt cząsteczki
                blending: THREE.AdditiveBlending,
                transparent: true,
                depthWrite: false,
                opacity: 1
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

        var particlesCount = 50;
        stepV = subV.divideScalar(particlesCount) // particlesCount - przewidywana ilość cząsteczek

        function genParticles() {
            for (var z = 0; z < particlesCount; z++) {
                var particle = new THREE.Vector3(
                    v2.x + stepV.x + (Math.random() * rozstrzal),
                    v2.y + stepV.y + (Math.random() * rozstrzal),
                    v2.z + stepV.z + (Math.random() * rozstrzal))
                particles.vertices.push(particle);
            }
        }

        genParticles();

        particleSystem = new THREE.Points(particles, particleMaterial);
        //console.log(particleSystem)
        obj3D.add(particleSystem)
    }

    generateLaser()

    this.update = function () {
        //console.log("update")
        var verts = particles.vertices
        for (var s = 0; s < verts.length; s++) {
            var particle = verts[s];
            //console.log("PRZED:", particle.x)
            //console.log(stepV)
            //particle.x -= (stepV.x * 50)
            //particle.y -= (stepV.y * 50)
            particle.z += 100
            //console.log("PO:",particle.x)
            if (particle.z > 1000) {
                //console.log("NIEEE")
                particle.z = v2.z + (Math.random() * rozstrzal)
                //console.log(particle)
            }
            //console.log(particle.z)
        }
        particleSystem.geometry.verticesNeedUpdate = true;
        particleSystem.material.size = particleSize
    }

    this.setLaser = function (v1, v2) {
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