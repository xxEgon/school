function Fire() {

    //var contFires = new THREE.Object3D();
    var particles = [];
    var speed = 1;

    function generateFire() {
        //console.log("GenerateFire")      

        var material = new THREE.MeshBasicMaterial({
            color: 0xff6600,
            transparent: true,
            opacity: 0.8,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        for (j = 0; j < 250; j++) {
            var rand = Math.ceil(Math.random() * 5)

            var geometry = new THREE.CubeGeometry(rand * 1, rand * 1, rand * 1);

            var particle = new THREE.Mesh( geometry, material.clone() )

            particles.push(particle)

            //contFires.add(particle)
        }

    }

    generateFire();

    this.getFire = function () {
        return particles;
    }

    this.setSpeed = function (get) {
        speed = get;
    }

    this.updateFire = function (Y) {
        //console.log("updateFire")
        for (i = 0; i < particles.length; i++) {
           
            if (particles[i].position.y > Y + 220)
            {
                particles[i].position.y = Y;
                particles[i].material.opacity = 1;
            }

            particles[i].position.y += (Math.random() * 3) * Number(speed);
            particles[i].material.opacity -= 0.018;         
            
        }
    }

}