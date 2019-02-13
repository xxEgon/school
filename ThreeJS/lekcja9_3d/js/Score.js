function Score() {

    var player_life = 100;
    var player_max_life = 100;

    var player_ammo = 100;
    var player_max_ammo = 100;

    var enemy_life = 100;
    var enemy_max_life = 100;

    var pasekHp = document.getElementById("hp")

    var pasekAmmo = document.getElementById("ammo")

    this.initPlayer = function (player) {
        console.log("initPlayer")

        player.userData = {
            dead: false,
            life: player_life,
            max_life: player_max_life,
            ammo: player_ammo,
            max_ammo: player_max_ammo,
            have_ammo: true,
        }

        for (var i = 1; i <= player.userData.life; i++) {
            var d = document.createElement("div");
            d.setAttribute("id", "hp;" + i);
            d.setAttribute("class", "hp");
            d.style.width = ((pasekHp.offsetWidth - 2) / player.userData.max_life) + "px"
            d.style.height = "20px";
            d.style.backgroundColor = "red";
            d.style.display = "inline-block";
            pasekHp.appendChild(d)
        } 

        for (var i = 1; i <= player_ammo; i++) {
            var d = document.createElement("div");
            d.setAttribute("id", "ammo;" + i);
            d.setAttribute("class", "ammo");
            d.style.width = ((pasekAmmo.offsetWidth - 2) / player.userData.max_ammo) + "px"
            d.style.height = "20px";
            d.style.backgroundColor = "green";
            d.style.display = "inline-block";
            pasekAmmo.appendChild(d)
        }  
    }

    this.updatePlayerHp = function (player) {
        if (player.userData.life == 0) {
            player.userData.dead = true;
           
        }
        else {
            player.userData.life--
            pasekHp.removeChild(pasekHp.lastChild)
        }
    }

    this.updatePlayerAmmo = function (player) {
        if (player.userData.ammo == 0) {
            player.userData.have_ammo = false;
        }
        else {
            player.userData.ammo--
            pasekAmmo.removeChild(pasekAmmo.lastChild)
        }
    }

    this.initEnemy = function (enemy) {
        console.log("initEnemy")
        enemy.userData = {
            dead: false,
            life: enemy_life,
            max_life: enemy_max_life,
        }
    }

    var pasekEnemy = document.getElementById("wrog")

    this.initSingleEnemy = function (enemy) {
        console.log("initSingleEnemy")
        pasekEnemy.style.display = "block";
        while (pasekEnemy.firstChild) {
            pasekEnemy.removeChild(pasekEnemy.firstChild);
        }
        for (var i = 1; i <= enemy.userData.life; i++) {
            var d = document.createElement("div");
            d.setAttribute("id", "wrog;" + i) ;
            d.setAttribute("class", "wrog");
            d.style.width = ((pasekEnemy.offsetWidth-2) / enemy.userData.max_life) + "px"
            d.style.height = "20px";
            d.style.backgroundColor = "red";
            d.style.display = "inline-block";
            pasekEnemy.appendChild(d)
        }       
    }

    this.updateEnemy = function (enemy) {
        if (enemy.userData.life == 0) {
            enemy.userData.dead = true;
            
        }
        else {
            enemy.userData.life--
            pasekEnemy.removeChild(pasekEnemy.lastChild)
        }
    }

    this.hideEnemy = function (enemy) {
        pasekEnemy.style.display = "none";;
    }
}