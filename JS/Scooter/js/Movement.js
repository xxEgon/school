function Movement() {

    this.position = {
        x: 600,
        y: 210,
    }

    this.startPosition = {
        x: 600,
        y: 210,
    }

    this.speed = 3;
    this.arrowLeft = false;
    this.arrowUp = false;
    this.arrowRight = false;
    this.arrowDown = false;

    var playerImg = new Image();

    var ImgRight1 = new Image();
    var ImgRight2 = new Image();
    var ImgRight3 = new Image();
    var ImgLeft1 = new Image();
    var ImgLeft2 = new Image();
    var ImgLeft3 = new Image();
    var ImgDown1 = new Image();
    var ImgDown2 = new Image();
    var ImgDown3 = new Image();
    var ImgDown4 = new Image();
    var ImgDown5 = new Image();
    var ImgUp1 = new Image();
    var ImgUp2 = new Image();
    var ImgUp3 = new Image();
    var ImgUp4 = new Image();
    var ImgUp5 = new Image();
    var ImgCrouch1 = new Image();
    var ImgCrouch2 = new Image();

    ImgRight1.src = links.img.player.right1
    ImgRight2.src = links.img.player.right2
    ImgRight3.src = links.img.player.right3
    ImgLeft1.src = links.img.player.left1
    ImgLeft2.src = links.img.player.left2
    ImgLeft3.src = links.img.player.left3
    ImgDown1.src = links.img.player.down1
    ImgDown2.src = links.img.player.down2
    ImgDown3.src = links.img.player.down3
    ImgDown4.src = links.img.player.down4
    ImgDown5.src = links.img.player.down5
    ImgUp1.src = links.img.player.up1
    ImgUp2.src = links.img.player.up2
    ImgUp3.src = links.img.player.up3
    ImgUp4.src = links.img.player.up4
    ImgUp5.src = links.img.player.up5
    ImgCrouch1.src = links.img.player.crouch1
    ImgCrouch2.src = links.img.player.crouch2

    var playerHeight = 90;
    var playerWidth = 40;

    this.init = function () {

        document.addEventListener("keydown", function (e) {
            switch (e.which) {
                case 37:
                    movement.arrowLeft = true;
                    movement.arrowRight = false;
                    movement.arrowUp = false;
                    movement.arrowDown = false;
                    break;
                case 38:
                    movement.arrowUp = true;
                    movement.arrowLeft = false;
                    movement.arrowRight = false;
                    movement.arrowDown = false;
                    break;
                case 39:
                    movement.arrowRight = true;
                    movement.arrowLeft = false;
                    movement.arrowUp = false;
                    movement.arrowDown = false;
                    break;
                case 40:
                    movement.arrowDown = true;
                    movement.arrowLeft = false;
                    movement.arrowRight = false;
                    movement.arrowUp = false;
                    break;
            }
        })
        document.addEventListener("keyup", function (e) {
            switch (e.which) {
                case 37:
                    movement.arrowLeft = false;
                    break;
                case 38:
                    movement.arrowUp = false;
                    break;
                case 39:
                    movement.arrowRight = false;
                    break;
                case 40:
                    movement.arrowDown = false;                   
                    if (playerImg.src == lastLink) {
                        playerImg = new Image()
                        playerImg.src = lastLinkExceptCrouch;
                        movement.boolCrouch = false;
                    };
                    break;
            }
        })

        playerImg.src = links.img.player.right3;
        playerImg.onload = function () {
            ctx2.drawImage(playerImg, movement.position.x, movement.position.y, playerWidth, playerHeight);
        }
    }

    var lastLinkExceptCrouch = links.img.player.right3
    var lastLink = links.img.player.right3;
    var liczRight = 1;
    var liczLeft = 1;
    var liczDown = 1;
    var liczUp = 1;

    this.movePossible = function (dir) {
        var imgData;
        switch (dir) {
            case "right":
                imgData = ctx1.getImageData((movement.position.x + 70), (movement.position.y + playerHeight), 1, 1);
                break;
            case "left":
                imgData = ctx1.getImageData((movement.position.x - 30), (movement.position.y + playerHeight), 1, 1);
                break;
            case "down":
                imgData = ctx1.getImageData((movement.position.x + (playerWidth/2)), (movement.position.y + playerHeight + 15), 1, 1);
                break;
            case "up":
                imgData = ctx1.getImageData((movement.position.x + playerWidth), (movement.position.y + playerHeight - 20), 1, 1);
                break;
        }
        
        if (imgData.data[0] == 27 && imgData.data[1] == 42 && imgData.data[2] == 200)
            return true;
        else
            return false;
    }

    this.boolCrouch = false;

    this.move = function () {

        if (movement.arrowRight) {
            if (movement.movePossible("right")) {
                if (movement.position.x >= 760) {
                    objects.bulletsTabUpdatePosition2();  
                    objects.slidersTabUpdatePosition2();
                    objects.birdsTabUpdatePosition2();
                    objects.flower1TabUpdatePosition2()
                    //objects.flower2TabUpdatePosition2()
                    map.position.sx += movement.speed;
                    map.update();
                }
                else
                    movement.position.x += movement.speed;
                switch (liczRight) {
                    case 1:
                        playerImg = ImgRight1;
                        liczRight = 2;
                        break;
                    case 2:
                        playerImg = ImgRight2;
                        liczRight = 3;
                        break;
                    case 3:
                        playerImg = ImgRight3;
                        liczRight = 1;
                        break;
                }               
            }
            lastLinkExceptCrouch = playerImg.src;
        }
        if (movement.arrowLeft) {
            if (movement.movePossible("left")) {
                if (movement.position.x <= 200) {
                    objects.bulletsTabUpdatePosition1();     
                    objects.slidersTabUpdatePosition1();
                    objects.birdsTabUpdatePosition1();
                    objects.flower1TabUpdatePosition1()
                    //objects.flower2TabUpdatePosition1()
                    map.position.sx -= movement.speed;
                    map.update();                    
                }
                else
                    movement.position.x -= movement.speed;

                switch (liczLeft) {
                    case 1:
                        playerImg = ImgLeft1
                        liczLeft = 2;
                        break;
                    case 2:
                        playerImg = ImgLeft2
                        liczLeft = 3;
                        break;
                    case 3:
                        playerImg = ImgLeft3
                        liczLeft = 1;
                        break;
                }               
            }
            lastLinkExceptCrouch = playerImg.src;
        }
        if (movement.arrowDown) {
            if (movement.movePossible("down")) {
                if (movement.position.x <= 200) {
                    objects.bulletsTabUpdatePosition1();    
                    objects.slidersTabUpdatePosition1();
                    objects.birdsTabUpdatePosition1();
                    objects.flower1TabUpdatePosition1()
                    //objects.flower2TabUpdatePosition1()
                    map.position.sx -= movement.speed;
                    map.update();
                }
                else {
                    movement.position.x -= movement.speed;                   
                }
                movement.position.y += (movement.speed / 2);
                    
                switch (liczDown) {
                    case 1:
                        playerImg = ImgDown1
                        liczDown = 2;
                        break;
                    case 2:
                        playerImg = ImgDown2
                        liczDown = 3;
                        break;
                    case 3:
                        playerImg = ImgDown3
                        liczDown = 4;
                        break;
                    case 4:
                        playerImg = ImgDown4
                        liczDown = 5;
                        break;
                    case 5:
                        playerImg = ImgDown5
                        liczDown = 1;
                        break;
                }  
                lastLinkExceptCrouch = playerImg.src;
            }
            else {
                if (lastLinkExceptCrouch.indexOf("right") != -1) 
                    playerImg = ImgCrouch2;
                else 
                    playerImg = ImgCrouch1;
                movement.boolCrouch = true;
            }
        }
        if (movement.arrowUp) {
            if (movement.movePossible("up")) {
                if (movement.position.x >= 760) {
                    objects.bulletsTabUpdatePosition2();    
                    objects.slidersTabUpdatePosition2();
                    objects.birdsTabUpdatePosition2();
                    objects.flower1TabUpdatePosition2()
                   // objects.flower2TabUpdatePosition2()
                    map.position.sx += movement.speed;
                    map.update();
                }
                else {
                    movement.position.x += movement.speed;
                }
                movement.position.y -= (movement.speed / 2);
                switch (liczUp) {
                    case 1:
                        playerImg = ImgUp1
                        liczUp = 2;
                        break;
                    case 2:
                        playerImg = ImgUp2
                        liczUp = 3;
                        break;
                    case 3:
                        playerImg = ImgUp3
                        liczUp = 4;
                        break; 
                    case 4:
                        playerImg = ImgUp4
                        liczUp = 5;
                        break;
                    case 5:
                        playerImg = ImgUp5
                        liczUp = 1;
                        break;
                }             
            }
            lastLinkExceptCrouch = playerImg.src;
        }
        lastLink = playerImg.src;     
    }
    this.update = function () {
        ctx2.clearRect(0, 0, 960, 631);
        ctx2.drawImage(playerImg, movement.position.x, movement.position.y, playerWidth, playerHeight);
    }

    function drawDeath() {
        var i = 0;
        function loop() {
            if (i < 90) {
                ctx2.clearRect(0, 0, 960, 631);
                ctx2.drawImage(playerImg, movement.position.x, movement.position.y + i, playerWidth, playerHeight - i);
                //ctx2.drawImage(playerImg, 0, 0, 300, 520, movement.position.x, movement.position.y + i, playerWidth, playerHeight - i);
                //ctx2.drawImage(playerImg, 0, 0, playerWidth, playerHeight, movement.position.x, movement.position.y, playerWidth, playerHeight);
                i++;
                setTimeout(function () { loop() }, 1);
            }
            else {
                ctx2.clearRect(0, 0, 960, 631);
                ctx2.drawImage(playerImg, movement.position.x, movement.position.y, playerWidth, playerHeight);
                ctx2.filter = "none";
                objects.birdsTab = []
                movement.notDead = true;
                movement.countDead = 0
            }
        }
        loop();
        
    }

    this.notDead = true;
    this.countDead = 0;
    this.dead = function () {
        if (movement.countDead == 0) {
            console.log("death")
            movement.notDead = false;
            ctx2.filter = "invert(70%) saturate(150%) brightness(60%)";
            drawDeath();
            scoreboard.dead();
        }
        movement.countDead++;

    }

}