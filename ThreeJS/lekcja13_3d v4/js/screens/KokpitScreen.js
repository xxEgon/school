function Kokpit(sliderTHROTTLE, sliderRUDDER, sliderELEVATION) {

    var dark = document.createElement("div");
    dark.setAttribute("class", "canvas")
    dark.setAttribute("id", "dark");
    dark.style.width = 0.8 * innerWidth + "px"
    dark.style.height = 0.8 * innerHeight + "px"
    dark.style.left = innerWidth * 0.1 + "px";
    dark.style.top = innerHeight * 0.1 + "px";
    document.body.appendChild(dark);

    var canvas, context;   
    canvas = document.createElement("canvas");
    canvas.setAttribute("class", "canvas")
    canvas.width = 300;
    canvas.height = 0.8 * innerHeight
    canvas.style.left = innerWidth * 0.1 + "px";
    canvas.style.top = innerHeight * 0.1 + "px";
    context = canvas.getContext("2d");
    document.body.appendChild(canvas);

    var speed = 0;   
    var move = Math.round(sliderTHROTTLE.value() * 100);
    //console.log(speed, move)

    function update1() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        move = Math.round(sliderTHROTTLE.value() * 100);
        speed1 = (canvas.height / 2) + move;
        //console.log(speed, move)

        for (var i = 0; i <= 200; i++) {
            if (i % 20 == 0) {
                context.beginPath();
                context.lineWidth = 10;
                context.strokeStyle = "#FFFFFF";
                context.moveTo(80, speed1); // początek linii
                context.lineTo(120, speed1); // koniec linii
                context.stroke();
                context.closePath()

                context.font = "30px arial";
                context.fillStyle = "#FFFFFF";
                context.fillText(i.toString(), 10, speed1);
                speed1 -= 5 * 20;
            }
        }
        context.lineWidth = 3;
        context.strokeStyle = "#FFFFFF";
        context.strokeRect(140, (canvas.height / 2) - 35, 150, 50);
        context.closePath();

        context.font = "30px arial";
        context.fillStyle = "#FFFFFF";
        context.fillText((Math.round(sliderTHROTTLE.value() * 20)).toString() + " KM/H", 150, canvas.height / 2);
    }

    var canvas2, context2;
    canvas2 = document.createElement("canvas");
    canvas2.setAttribute("class", "canvas")
    canvas2.width = 350
    canvas2.height = 0.8 * innerHeight
    canvas2.style.right = innerWidth * 0.1 + "px";
    canvas2.style.top = innerHeight * 0.1 + "px";
    context2 = canvas2.getContext("2d");
    document.body.appendChild(canvas2);

    var move2 = 0;
    var speed2 = 0;
    //console.log(speed, move)

    function update2() {
        context2.clearRect(0, 0, canvas2.width, canvas2.height);

        move2 = (Math.round(sliderELEVATION.value()/2)  * 5)
        speed2 = (canvas2.height / 2) + move2;

        //console.log(speed2, move2)

        for (var i = 0; i <= 150; i++) {
            if (i % 30 == 0) {
                context2.beginPath();
                context2.lineWidth = 10;
                context2.strokeStyle = "#FFFFFF";
                context2.moveTo(canvas2.width - 120, speed2); // początek linii
                context2.lineTo(canvas2.width - 80, speed2); // koniec linii
                context2.stroke();
                context2.closePath()

                context2.font = "30px arial";
                context2.fillStyle = "#FFFFFF";
                context2.fillText(i.toString(), canvas2.width - 60, speed2);
                speed2 -= 5 * 30;
            }
        }
        context2.lineWidth = 3;
        context2.strokeStyle = "#FFFFFF";
        context2.strokeRect(canvas2.width - 310, (canvas2.height / 2) - 35, 150, 50);
        context2.closePath();

        context2.font = "30px arial";
        context2.fillStyle = "#FFFFFF";
        context2.fillText((Math.round(sliderELEVATION.value()/2)).toString() + " M", canvas2.width - 300, canvas2.height / 2);
    }

    var canvas3, context3;
    canvas3 = document.createElement("canvas");
    canvas3.setAttribute("class", "canvas")
    canvas3.width = 0.6 * innerWidth
    canvas3.height = 150
    canvas3.style.left = innerWidth * 0.2 + "px";
    canvas3.style.top = innerHeight * 0.1 + "px";
    context3 = canvas3.getContext("2d");
    document.body.appendChild(canvas3);

    var move3 = 0;
    var speed3 = 0;
    //console.log(speed, move)

    function update3() {
        context3.clearRect(0, 0, canvas3.width, canvas3.height);

        move3 = (Math.round(sliderRUDDER.value()) * 9 )
        speed3 = (canvas3.height / 2) + move3;

        //console.log(speed3, move3)

        for (var i = 0; i <= 360; i++) {
            if (i % 30 == 0) {
                context3.beginPath();
                context3.lineWidth = 10;
                context3.strokeStyle = "#FFFFFF";
                context3.moveTo(speed3, 50); // początek linii
                context3.lineTo(speed3, 90); // koniec linii
                context3.stroke();
                context3.closePath()

                context3.font = "30px arial";
                context3.fillStyle = "#FFFFFF";
                context3.fillText(i.toString(), speed3 - 20, 35);
                speed3 -= 6 * 12;
            }
            else if (i % 10 == 0) {
                context3.beginPath();
                context3.lineWidth = 10;
                context3.strokeStyle = "#FFFFFF";
                context3.moveTo(speed3, 50); // początek linii
                context3.lineTo(speed3,70); // koniec linii
                context3.stroke();
                context3.closePath()     

                speed3 -= 6 * 12
            }
            
            
        }
        //context3.lineWidth = 3;
        //context3.strokeStyle = "#FFFFFF";
        //context3.strokeRect(canvas3.width - 310, (canvas3.height / 2) - 35, 150, 50);
        //context3.closePath();

        //context3.font = "30px arial";
        //context3.fillStyle = "#FFFFFF";
        //context3.fillText((Math.round(sliderRUDDER.value() / 2)).toString() + " M", canvas3.width - 300, canvas3.height / 2);
    }

    this.update = function () {
        update1();
        update2();
        update3();
    }

    this.hide = function () {
        canvas.style.display = "none"
        canvas2.style.display = "none"
        canvas3.style.display = "none"
        dark.style.display = "none"
    }

    this.show = function () {
        canvas.style.display = "block"
        canvas2.style.display = "block"
        canvas3.style.display = "block"
        dark.style.display = "block"
    }
}