function Load () {
    this.init = function () {
        console.log("Load")

        map.init();
        movement.init();
        objects.init();
        scoreboard.init();


        this.refreshInterval = setInterval(function () {
            if (movement.notDead) {
                movement.move();
                movement.update();
                objects.flower1TabUpdateCheckCollision()
            }            
        }, 15)

        this.bulletsInterval = setInterval(function () {
            if(movement.notDead)
                objects.bulletsTabUpdate();           
        }, 100)

        this.birdsInterval = setInterval(function () {
            if (movement.notDead)
                objects.birdsTab.push(new objects.bird(0))
        }, 3500) 
	}   
}