function Objects() {
    this.allElements;
    this.init = function () {

        for (var i = 0; i < objects.bulletsCordsTab.length; i++) {
            objects.bulletsTab.push(new objects.bullet(objects.bulletsCordsTab[i].x, objects.bulletsCordsTab[i].y, objects.bulletsCordsTab[i].l))
        }

        for (var i = 0; i < objects.slidersCordsTab.length; i++) {
            objects.slidersTab.push(new objects.slider(objects.slidersCordsTab[i].x, objects.slidersCordsTab[i].y, objects.slidersCordsTab[i].l))
        }
        objects.slidersTabUpdate();

        objects.birdsTab.push(new objects.bird(-300))
        objects.birdsTab.push(new objects.bird(-500))
        objects.birdsTab.push(new objects.bird(-800))
        objects.birdsTab.push(new objects.bird(-1500))
        objects.birdsTab.push(new objects.bird(-1200))
        objects.birdsTabUpdate()


        for (var i = 0; i < objects.flower1CordsTab.length; i++) {
            objects.flower1Tab.push(new objects.flower1(objects.flower1CordsTab[i].x, objects.flower1CordsTab[i].y, i))
        }
        for (var i = 0; i < objects.flower2CordsTab.length; i++) {
            objects.flower2Tab.push(new objects.flower2(objects.flower2CordsTab[i].x, objects.flower2CordsTab[i].y, i))
        }
		for (var i = 0; i < objects.keyCordsTab.length; i++) {
            objects.keyTab.push(new objects.key(objects.keyCordsTab[i].x, objects.keyCordsTab[i].y, i))
        }
        setTimeout(function () { objects.flower1TabUpdate() }, 500);

        objects.allElements = objects.flower1Tab.length + objects.flower2Tab.length + objects.keyTab.length
        console.log("All elements: ", objects.allElements)
    }

    this.bulletsTab = []

    this.bulletsCordsTab = [
        { x: 1835, y: 465, l: 0 },
        { x: 1782, y: 465, l: 1 },
        { x: 2063, y: 270, l: 0 },
        { x: 2006, y: 270, l: 0 },
        { x: 1835, y: 270, l: 0 },
        { x: 1780, y: 270, l: 1 },
        { x: 1491, y: 270, l: 0 },
        { x: 1178, y: 465, l: 0 },
        { x: 1120, y: 465, l: 0 },
        { x: 945, y: 358, l: 0 },
        { x: 890, y: 358, l: 0 },
        { x: 831, y: 358, l: 0 },
        { x: 773, y: 358, l: 0 },
    ]

    this.bulletsTabUpdate = function () {
        ctx3.clearRect(0, 0, 960, 631);
        for (var i = 0; i < objects.bulletsTab.length; i++) {
            objects.bulletsTab[i].update();
        }
    }

    this.bulletsTabUpdatePosition1 = function () {
        for (var i = 0; i < objects.bulletsTab.length; i++) {
            objects.bulletsTab[i].updatePosition1();
        }
    }

    this.bulletsTabUpdatePosition2 = function () {
        for (var i = 0; i < objects.bulletsTab.length; i++) {
            objects.bulletsTab[i].updatePosition2();
        }
    }

    this.bullet = function (X, Y, Latency) {
        var startPosition = {
            x: -(2280 - X) - 90,
            y: Y + 45,
        }
        var currentPosition = {
            x: -(2280 - X) - 90,
            y: Y - 90,
        }
        var finalPosition = {
            x: -(2280 - X),
            y: Y - 90,
        }
        var latency = Latency;
        var speed = 5;
        var graphic1 = true;

        var bulletImg = new Image();

        var bulletImg1 = new Image();
        var bulletImg2 = new Image();

        bulletImg1.src = links.img.bullet.b1
        bulletImg2.src = links.img.bullet.b2

        this.updatePosition1 = function () {
            startPosition.x += movement.speed;
            currentPosition.x += movement.speed;
            finalPosition.x += movement.speed;
        }
        this.updatePosition2 = function () {
            startPosition.x -= movement.speed;
            currentPosition.x -= movement.speed;
            finalPosition.x -= movement.speed;
        }
        this.update = function () {

            setTimeout(function () {
                if (graphic1) {
                    bulletImg = bulletImg1;
                    graphic1 = false;
                }
                else {
                    bulletImg = bulletImg2;
                    graphic1 = true;
                }

                currentPosition.x += speed;
                currentPosition.y -= (speed / 3);

                ctx3.drawImage(bulletImg, currentPosition.x, currentPosition.y, 10, 6);

                if (currentPosition.x >= finalPosition.x) {
                    currentPosition.x = startPosition.x;
                    currentPosition.y = startPosition.y;
                }

                for (var j = 0; j < 3; j++) {
                    for (var i = 0; i < 40; i++) {
                        var imgData = ctx3.getImageData((movement.position.x + i), (movement.position.y + 88 - j), 1, 1);
                        if ((imgData.data[0] != 0 && imgData.data[1] != 0 && imgData.data[2] != 0)) {
                            movement.dead();
                        }
                    }
                }

            }, latency * 300)
        }
    }

    this.slidersTab = []

    this.slidersCordsTab = [
        { x: 2268, y: 494, l: 4 },
        { x: 1321, y: 466, l: 4 },
        { x: 1151, y: 407, l: 12 },
        { x: 1636, y: 350, l: 4 },
        { x: 661, y: 292, l: 3 },
        { x: 918, y: 292, l: 2 },
        { x: 372, y: 437, l: 3 },
        { x: 632, y: 437, l: 2 },
        { x: 287, y: 494, l: 3 },
        { x: 545, y: 494, l: 2 },
    ]

    this.slidersTabUpdate = function () {
        ctx15.clearRect(0, 0, 960, 631);
        for (var i = 0; i < objects.slidersTab.length; i++) {
            objects.slidersTab[i].update();
        }
        setTimeout(function () {
            objects.slidersTabUpdate()
        }, 600 / objects.speed)
    }

    this.slidersTabUpdatePosition1 = function () {
        ctx15.clearRect(0, 0, 960, 631);
        for (var i = 0; i < objects.slidersTab.length; i++) {
            objects.slidersTab[i].updatePosition1();
        }
    }
    this.slidersTabUpdatePosition2 = function () {
        ctx15.clearRect(0, 0, 960, 631);
        for (var i = 0; i < objects.slidersTab.length; i++) {
            objects.slidersTab[i].updatePosition2();
        }
    }

    this.speed = 1;
    var speedUp = false;

    this.sliderDirectionInterval = setInterval(function () {

        if (speedUp) {
            objects.speed -= 1;
            if (objects.speed <= 1) {
                speedUp = false;
            }
        }
        else {
            objects.speed += 1;
            if (objects.speed >= 11) {
                speedUp = true;
            }
        }

        //console.log("Changing speed", objects.speed)
        if (document.getElementById("one").style.display == "none") {
            document.getElementById("one").style.display = "block"
        }
        else {
            document.getElementById("one").style.display = "none"
        }
    }, 500)

    this.sliderDirection = "leftRight"

    this.sliderDirectionInterval = setInterval(function () {

        if (objects.sliderDirection == "leftRight")
            objects.sliderDirection = "rightLeft"
        else
            objects.sliderDirection = "leftRight"

        //console.log("Changing direction: ", objects.sliderDirection )
    }, 10000)



    this.slider = function (X, Y, length) {
        var startPosition = {
            x: -(2280 - X),
            y: Y,
        }

        if (X == 2268) {
            startPosition = {
                x: -20,
                y: Y,
            }
        }

        var length = length;
        //var speed = 5;
        var step1 = 0;
        var step2 = 5;
        //var direction = "rightLeft";

        var leftImgTab = [];
        var middleImgTab = [];
        var rightImgTab = [];

        for (var i = 1; i <= 5 + 1; i++) {
            var left = new Image();
            left.src = links.img.slider.left.l0 + i + ".png"
            leftImgTab.push(left)

            var middle = new Image();
            middle.src = links.img.slider.middle.m0 + i + ".png"
            middleImgTab.push(middle)

            var right = new Image();
            right.src = links.img.slider.right.r0 + i + ".png"
            rightImgTab.push(right)
        }

        this.update = function () {

            if (map.position.sx <= X + (64 * (length - 2) + 80 + 112) || X == 2268) {
                if (objects.sliderDirection == "leftRight") {
                    ctx15.drawImage(leftImgTab[step1], startPosition.x, startPosition.y, 80, 20);
                    for (var i = 1; i <= length - 2; i++) {
                        ctx15.drawImage(middleImgTab[step1], startPosition.x + ((64 * (i - 1)) + 80), startPosition.y, 64, 20);
                    }
                    ctx15.drawImage(rightImgTab[step1], startPosition.x + (64 * (length - 2) + 80), startPosition.y, 112, 20);
                    step1++;
                    if (step1 >= 5) {
                        step1 = 0;
                    }
                }
                else {
                    ctx15.drawImage(leftImgTab[step2], startPosition.x, startPosition.y, 80, 20);
                    for (var i = 1; i <= length - 2; i++) {
                        ctx15.drawImage(middleImgTab[step2], startPosition.x + ((64 * (i - 1)) + 80), startPosition.y, 64, 20);
                    }
                    ctx15.drawImage(rightImgTab[step2], startPosition.x + (64 * (length - 2) + 80), startPosition.y, 112, 20);
                    step2--;
                    if (step2 <= 0) {
                        step2 = 5;
                    }
                }

                for (var j = -2; j < 3; j++) {
                    var imgData = ctx15.getImageData((movement.position.x), (movement.position.y + 90 - j), 1, 1);

                    if ((imgData.data[0] == 157 && imgData.data[1] == 84 && imgData.data[2] == 0) || (imgData.data[0] != 0 && imgData.data[1] != 0 && imgData.data[2] != 0)) {
                        if (objects.sliderDirection == "rightLeft") {
                            if (movement.position.x <= 200) {
                                var help = movement.speed;
                                movement.speed = objects.speed / 2;
                                objects.bulletsTabUpdatePosition1();
                                objects.slidersTabUpdatePosition1();
                                objects.birdsTabUpdatePosition1();
                                objects.flower1TabUpdatePosition1()
                                //objects.flower2TabUpdatePosition1()
                                map.position.sx -= objects.speed / 2;
                                map.update();
                                movement.speed = help
                            }
                            else {
                                movement.position.x -= objects.speed / 2;
                            }
                        }
                        else {

                            if (movement.position.x >= 760) {
                                var help = movement.speed;
                                movement.speed = objects.speed / 2;
                                objects.bulletsTabUpdatePosition2();
                                objects.slidersTabUpdatePosition2();
                                objects.birdsTabUpdatePosition2();
                                objects.flower1TabUpdatePosition2()
                                //objects.flower2TabUpdatePosition2()
                                map.position.sx += objects.speed / 2;
                                map.update();
                                console.log()
                                movement.speed = help
                            }
                            else {
                                movement.position.x += objects.speed / 2;
                            }
                        }
                        movement.update();
                    }
                }
            }
        }

        this.updatePosition1 = function () {
            //if (map.position.sx <= X + (64 * (length - 2) + 80 + 112)) {

                startPosition.x += movement.speed

                if (objects.sliderDirection == "leftRight") {
                    ctx15.drawImage(leftImgTab[step1], startPosition.x, startPosition.y, 80, 20);
                    for (var i = 1; i <= length - 2; i++) {
                        ctx15.drawImage(middleImgTab[step1], startPosition.x + ((64 * (i - 1)) + 80), startPosition.y, 64, 20);
                    }
                    ctx15.drawImage(rightImgTab[step1], startPosition.x + (64 * (length - 2) + 80), startPosition.y, 112, 20);
                }
                else {
                    ctx15.drawImage(leftImgTab[step2], startPosition.x, startPosition.y, 80, 20);
                    for (var i = 1; i <= length - 2; i++) {
                        ctx15.drawImage(middleImgTab[step2], startPosition.x + ((64 * (i - 1)) + 80), startPosition.y, 64, 20);
                    }
                    ctx15.drawImage(rightImgTab[step2], startPosition.x + (64 * (length - 2) + 80), startPosition.y, 112, 20);
                }
           // }


        }
        this.updatePosition2 = function () {
            //if (map.position.sx >= X) {

                startPosition.x -= movement.speed

                if (objects.sliderDirection == "leftRight") {
                    ctx15.drawImage(leftImgTab[step1], startPosition.x, startPosition.y, 80, 20);
                    for (var i = 1; i <= length - 2; i++) {
                        ctx15.drawImage(middleImgTab[step1], startPosition.x + ((64 * (i - 1)) + 80), startPosition.y, 64, 20);
                    }
                    ctx15.drawImage(rightImgTab[step1], startPosition.x + (64 * (length - 2) + 80), startPosition.y, 112, 20);
                }
                else {
                    ctx15.drawImage(leftImgTab[step2], startPosition.x, startPosition.y, 80, 20);
                    for (var i = 1; i <= length - 2; i++) {
                        ctx15.drawImage(middleImgTab[step2], startPosition.x + ((64 * (i - 1)) + 80), startPosition.y, 64, 20);
                    }
                    ctx15.drawImage(rightImgTab[step2], startPosition.x + (64 * (length - 2) + 80), startPosition.y, 112, 20);
                }
            //}

        }

    }

    this.birdsPositionTab = [198, 225, 256, 287, 314, 344, 370, 400]

    this.bird = function (X) {
        //console.log("NEW BIRD")

        var position = {
            x: X,
            y: objects.birdsPositionTab[Math.floor(Math.random() * 8)],
        }

        if (X == 0)
            position.x = -2380

        var step = 0;
        var speed = Math.floor((Math.random() * 12) + 8);
        var birdImages = [];

        for (var i = 1; i < 7; i++) {
            var b = new Image();
            b.src = links.img.bird.b0 + i + ".PNG"
            birdImages.push(b)
        }

        this.updatePosition1 = function () {
            position.x += movement.speed;
        }
        this.updatePosition2 = function () {
            position.x -= movement.speed;
        }
        this.update = function () {

            position.x += speed;

            ctx17.drawImage(birdImages[step], position.x, position.y, 40, 110);

            if (position.x > 3300) {
                objects.birdsTab.splice(objects.birdsTab - 1, 1)
                //console.log("DELETE BIRD")
            }

            step++
            if (step > 5) {
                step = 0;
            }

            for (var j = 0; j < 5; j++) {
                for (var i = 0; i < 40; i++) {
                    var imgData = ctx17.getImageData((movement.position.x + i), (movement.position.y + 90 - j), 1, 1);
                    if ((imgData.data[0] == 0 && imgData.data[1] == 6 && imgData.data[2] == 163) && movement.boolCrouch == false) {
                        movement.dead();
                    }
                }
            }
        }
    }
    this.birdsTab = [];

    this.birdsTabUpdate = function () {
        if (movement.notDead)
        { 
            ctx17.clearRect(0, 0, 960, 631);
            for (var i = 0; i < objects.birdsTab.length; i++) {
                objects.birdsTab[i].update();
            }
        }
        setTimeout(function () { objects.birdsTabUpdate() }, 100)
    }

    this.birdsTabUpdatePosition1 = function () {
        for (var i = 0; i < objects.birdsTab.length; i++) {
            objects.birdsTab[i].updatePosition1();
        }
    }

    this.birdsTabUpdatePosition2 = function () {
        for (var i = 0; i < objects.birdsTab.length; i++) {
            objects.birdsTab[i].updatePosition2();
        }
    }

    this.flower1 = function (X, Y, NR) {

        //console.log("NEW FLOWER1", NR)

        var position = {
            x: -(2280 - X),
            y: Y,
        }

        var nr = NR

        var step = 0;
        var flowerImages = [];

        for (var i = 1; i < 3; i++) {
            var b = new Image();
            b.src = links.img.flower.flower1 + i + ".PNG"
            flowerImages.push(b)
        }

        this.updatePosition1 = function () {
            position.x += movement.speed;
            ctx12.drawImage(flowerImages[step], position.x, position.y, 22, 15);
        }
        this.updatePosition2 = function () {
            position.x -= movement.speed;
            ctx12.drawImage(flowerImages[step], position.x, position.y, 22, 15);
        }

        var countGet = 0;

        this.update = function () {

            ctx12.drawImage(flowerImages[step], position.x, position.y, 22, 15);

            step++
            if (step > 1) {
                step = 0;
            }
        }

        this.simpleUpdate = function () {
            ctx12.drawImage(flowerImages[step], position.x, position.y, 22, 15);
        }

        this.checkCollision = function () {

            if (movement.position.x > position.x && movement.position.x < position.x + 22 && movement.position.y + 90 > position.y - 10 && movement.position.y + 90 < position.y + 25 ||
                movement.position.x + 40 > position.x && movement.position.x + 40< position.x + 22 && movement.position.y + 90 > position.y - 10 && movement.position.y + 90 < position.y + 25
                ) {
                if (countGet == 0) {
                    console.log("GET FLOWER1", nr)
                    objects.flower1Tab[nr] = 0;
                    objects.flower1TabSimpleUpdate()
					scoreboard.scoreFlower()
                    setTimeout(function () { countGet = 0 }, 100)
                }
                countGet++;
            }
        }

    }

    this.flower1Tab = [];

    this.flower1CordsTab = [
        { x: 2378, y: 295 },
        { x: 2322, y: 295 },
        { x: 2292, y: 295 },
        { x: 2349, y: 437 },
        { x: 2376, y: 437 },
        { x: 2436, y: 437 },
        { x: 2463, y: 437 },
        { x: 2120, y: 493 },
        { x: 1949, y: 408 },
        { x: 1955, y: 350 },
        { x: 1985, y: 350 },
        { x: 1605, y: 350 },
        { x: 1808, y: 295 },
        { x: 1833, y: 295 },
        { x: 1860, y: 295 },
        { x: 1888, y: 295 },
        { x: 1320, y: 350 },
        { x: 1150, y: 493 },
        { x: 620, y: 437 },
    ];

    this.flower1TabUpdate = function () {
        ctx12.clearRect(0, 0, 960, 631);
        for (var i = 0; i < objects.flower1Tab.length; i++) {
            if (objects.flower1Tab[i] != 0)
                objects.flower1Tab[i].update();

        }
        for (var i = 0; i < objects.flower2Tab.length; i++) {
            if (objects.flower2Tab[i] != 0)
                objects.flower2Tab[i].update();
        }
		for (var i = 0; i < objects.keyTab.length; i++) {
            if (objects.keyTab[i] != 0)
                objects.keyTab[i].update();
        }
        setTimeout(function () { objects.flower1TabUpdate() }, 2000)
    }

    this.flower1TabSimpleUpdate = function () {
        ctx12.clearRect(0, 0, 960, 631);
        for (var i = 0; i < objects.flower1Tab.length; i++) {
            if (objects.flower1Tab[i] != 0)
                objects.flower1Tab[i].simpleUpdate();
        }
        for (var i = 0; i < objects.flower2Tab.length; i++) {
            if (objects.flower2Tab[i] != 0)
                objects.flower2Tab[i].simpleUpdate();
        }
		for (var i = 0; i < objects.keyTab.length; i++) {
            if (objects.keyTab[i] != 0)
                objects.keyTab[i].simpleUpdate();
        }
    }

    this.flower1TabUpdatePosition1 = function () {
        ctx12.clearRect(0, 0, 960, 631);
        for (var i = 0; i < objects.flower1Tab.length; i++) {
            if (objects.flower1Tab[i] != 0)
                objects.flower1Tab[i].updatePosition1();
        }
        for (var i = 0; i < objects.flower2Tab.length; i++) {
            if (objects.flower2Tab[i] != 0)
                objects.flower2Tab[i].updatePosition1();
        }
		for (var i = 0; i < objects.keyTab.length; i++) {
            if (objects.keyTab[i] != 0)
                objects.keyTab[i].updatePosition1();
        }
    }

    this.flower1TabUpdatePosition2 = function () {
        ctx12.clearRect(0, 0, 960, 631);
        for (var i = 0; i < objects.flower1Tab.length; i++) {
            if (objects.flower1Tab[i] != 0)
                objects.flower1Tab[i].updatePosition2();
        }
        for (var i = 0; i < objects.flower2Tab.length; i++) {
            if (objects.flower2Tab[i] != 0)
                objects.flower2Tab[i].updatePosition2();
        }
		for (var i = 0; i < objects.keyTab.length; i++) {
            if (objects.keyTab[i] != 0)
                objects.keyTab[i].updatePosition2();
        }
    }

    this.flower1TabUpdateCheckCollision = function () {
        for (var i = 0; i < objects.flower1Tab.length; i++) {
            if (objects.flower1Tab[i] != 0)
                objects.flower1Tab[i].checkCollision();
        }
        for (var i = 0; i < objects.flower2Tab.length; i++) {
            if (objects.flower2Tab[i] != 0)
                objects.flower2Tab[i].checkCollision();
        }       
		for (var i = 0; i < objects.keyTab.length; i++) {
            if (objects.keyTab[i] != 0)
                objects.keyTab[i].checkCollision();
        }
    }

    this.flower2 = function (X, Y, NR) {

        //console.log("NEW FLOWER1", NR)

        var position = {
            x: -(2280 - X),
            y: Y,
        }

        var nr = NR

        var step = 0;
        var flowerImages = [];

        for (var i = 1; i < 3; i++) {
            var b = new Image();
            b.src = links.img.flower.flower2 + i + ".PNG"
            flowerImages.push(b)
        }

        this.updatePosition1 = function () {
            position.x += movement.speed;
            ctx12.drawImage(flowerImages[step], position.x, position.y, 22, 15);
        }
        this.updatePosition2 = function () {
            position.x -= movement.speed;
            ctx12.drawImage(flowerImages[step], position.x, position.y, 22, 15);
        }

        var countGet = 0;

        this.update = function () {

            ctx12.drawImage(flowerImages[step], position.x, position.y, 22, 15);

            step++
            if (step > 1) {
                step = 0;
            }
        }

        this.simpleUpdate = function () {
            ctx12.drawImage(flowerImages[step], position.x, position.y, 22, 15);
        }

        this.checkCollision = function () {

            if (movement.position.x > position.x && movement.position.x < position.x + 22 && movement.position.y + 90 > position.y - 10 && movement.position.y + 90 < position.y + 25 ||
                movement.position.x + 40 > position.x && movement.position.x + 40 < position.x + 22 && movement.position.y + 90 > position.y - 10 && movement.position.y + 90 < position.y + 25
            ) {
                if (countGet == 0) {
                    console.log("GET FLOWER2", nr)
                    objects.flower2Tab[nr] = 0;
                    objects.flower1TabSimpleUpdate()
					scoreboard.scoreFlower()
                    setTimeout(function () { countGet = 0 }, 100)
                }
                countGet++;
            }
        }

    }

    this.flower2Tab = [];

    this.flower2CordsTab = [
        { x: 2923 , y: 320 },
    ];

	this.key = function (X, Y, NR) {

        //console.log("NEW KEY", NR, X, Y)

        var position = {
            x: -(2280 - X),
            y: Y,
        }

        var nr = NR

        var keyImage = new Image();
		keyImage.src = links.img.flower.key

        this.updatePosition1 = function () {
            position.x += movement.speed;
            ctx12.drawImage(keyImage, position.x, position.y, 22, 35);
        }
        this.updatePosition2 = function () {
            position.x -= movement.speed;
            ctx12.drawImage(keyImage, position.x, position.y, 22, 35);
        }

        var countGet = 0;

        this.update = function () {

            ctx12.drawImage(keyImage, position.x, position.y, 22, 35);

        }

        this.simpleUpdate = function () {
            ctx12.drawImage(keyImage, position.x, position.y, 22, 35);
        }
		var bright = false;

        this.checkCollision = function () {

            if (movement.position.x > position.x && movement.position.x < position.x + 22 && movement.position.y + 90 > position.y - 10 && movement.position.y + 90 < position.y + 45 ||
                movement.position.x + 40 > position.x && movement.position.x + 40 < position.x + 22 && movement.position.y + 90 > position.y - 10 && movement.position.y + 90 < position.y + 45
            ) {
                if (countGet == 0) {
                    console.log("GET KEY", nr)
                    objects.keyTab[nr] = 0;
                    objects.flower1TabSimpleUpdate()
					scoreboard.scoreKey()
					
                    var animate = setInterval(function () {
                        if (movement.notDead) {
                            if (bright) {
                                ctx2.filter = "none";
                                bright = false;
                            }
                            else {
                                ctx2.filter = "brightness(200%)";
                                bright = true;
                            }
                        }
                        else {
                            clearInterval(animate);
                        }
					}, 100)
					setTimeout(function() {
						 clearInterval(animate);
						 ctx2.filter = "none";
					}, 5000)
                    setTimeout(function () { countGet = 0 }, 100)
                }
                countGet++;
            }
        }

    }

    this.keyTab = [];

    this.keyCordsTab = [
        { x: 2903 , y: 340 },
    ];


}