function UI() {

    var ui1 = $("<DIV>");
    ui1.attr("id", "ui1");
    ui1.attr("class", "ui");
    ui1.css("display", "block");
    $("body").append(ui1)

    var ui2 = $("<DIV>");
    ui2.attr("id", "ui2");
    ui2.attr("class", "ui");
    ui2.css("display", "block");
    $("body").append(ui2)

    var range = $("<INPUT>");
    range.attr("id", "range");
    range.attr("class", "range");
    range.attr("type", "range");
    range.attr("min", "0");
    range.attr("max", "1500");
    range.attr("step", "1");
    range.attr("value", "750");
    range.css("display", "block");
    ui2.append(range)

    this.getRangeVal = function () {
        return range.val();
    }

    var canvas = document.createElement("canvas")
    canvas.setAttribute("id", "canvas1")
    canvas.setAttribute("class", "canvas")
    canvas.setAttribute("width", "300")
    ui2.append(canvas);

    var ctx = canvas.getContext("2d");

    range.on("input", function () {
        updateRange()
    })

    updateRange()

    function addHexColor(c1, c2) {
        var hexStr = (parseInt(c1, 16) + parseInt(c2, 16)).toString(16);
        while (hexStr.length < 6) { hexStr = '0' + hexStr; } // Zero pad.
        return hexStr;
    }
    function subHexColor(c1, c2) {
        var hexStr = (parseInt(c1, 16) - parseInt(c2, 16)).toString(16);
        while (hexStr.length < 6) { hexStr = '0' + hexStr; } // Zero pad.
        return hexStr;
    }

    function updateRange() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var col = "00ff00"
        var col2;
        var col3;
        for (var i = 0; i < range.val() / 5; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            if (col[0] != "f" && col[1] != "f") {
                col2 = addHexColor(col2, "020000")
                col = addHexColor("00FF00", col2);
            }
            else if (col[2] != "0" && col[3] != "0") {
                col3 = addHexColor(col3, "000200")
                col = subHexColor("FFFF00", col3)
            }
            ctx.strokeStyle = "#" + col;
            ctx.moveTo(i, 0); // początek linii
            ctx.lineTo(i, canvas.height); // koniec linii
            ctx.stroke();
            ctx.closePath()
        }
    }


    var nameDiv1 = $("<DIV>");
    nameDiv1.attr("id", "nameDiv1");
    nameDiv1.attr("class", "nameDiv");
    ui1.append(nameDiv1)

    this.setNameDiv1 = function (a) {
        nameDiv1.html(a)
    }

    var nameDiv2 = $("<DIV>");
    nameDiv2.attr("id", "nameDiv2");
    nameDiv2.attr("class", "nameDiv");
    ui1.append(nameDiv2)

    var scoreDiv1 = $("<DIV>");
    scoreDiv1.attr("id", "scoreDiv1");
    scoreDiv1.attr("class", "scoreDiv");
    ui1.append(scoreDiv1)

    this.setMove = function () {
        if (mymove) {
            nameDiv1.css("text-decoration", "underline")
            nameDiv2.css("text-decoration", "none")
        } else {
            nameDiv2.css("text-decoration", "underline")
            nameDiv1.css("text-decoration", "none")
        }
    }

    var scoreDiv2 = $("<DIV>");
    scoreDiv2.attr("id", "scoreDiv2");
    scoreDiv2.attr("class", "scoreDiv");
    ui1.append(scoreDiv2)

    this.setScore = function () {
        scoreDiv1.html(player1.score)
        scoreDiv2.html(player2.score)
    }

    this.setBall = function () {
        scoreDiv1.css("background-image", "url('img/" + player1.ball + ".jpg')")
        scoreDiv2.css("background-image", "url('img/" + player2.ball + ".jpg')")
    }

    var timeDiv1 = $("<DIV>");
    timeDiv1.attr("id", "timeDiv1");
    timeDiv1.attr("class", "timeDiv");
    ui1.append(timeDiv1)

    var timeDiv2 = $("<DIV>");
    timeDiv2.attr("id", "timeDiv2");
    timeDiv2.attr("class", "timeDiv");
    ui1.append(timeDiv2)

    this.setNameDiv2 = function (a) {
        nameDiv2.html(a)
    }

    var aa;
    this.stopTimer1 = function () {
        clearInterval(aa);
    }
    this.startTimer1 = function () {
        stoper()
    }
    this.stopTimer2 = function () {
        clearInterval(aa2);
    }
    this.startTimer2 = function () {
        stoper2()
    }
    function stoper() {
        clearInterval(aa);
        var d = new Date().getTime();
        aa = setInterval(function () {
            time = new Date().getTime();
            var time = time - d;
            time2 = time;

            var h = Math.floor(time / (60 * 60 * 1000));
            time -= (h * 60 * 60 * 1000)
            if (h.toString().length == 1)
                h = "0" + h;
            var m = Math.floor(time / (60 * 1000));
            time -= (m * 60 * 1000)
            if (m.toString().length == 1)
                m = "0" + m;
            var s = Math.floor(time / 1000);
            time -= (s * 1000)
            if (s.toString().length == 1)
                s = "0" + s;
            var ms = time;
            if (ms.toString().length == 2)
                ms = "0" + ms
            if (ms.toString().length == 1)
                ms = "00" + ms;

            czas = h + ":" + m + ":" + s + "." + ms;
            timeDiv1.html(czas)
        }, 1);
    };
    var aa2;
    function stoper2() {
        clearInterval(aa2);
        var d = new Date().getTime();
        aa2 = setInterval(function () {
            time = new Date().getTime();
            var time = time - d;
            time2 = time;

            var h = Math.floor(time / (60 * 60 * 1000));
            time -= (h * 60 * 60 * 1000)
            if (h.toString().length == 1)
                h = "0" + h;
            var m = Math.floor(time / (60 * 1000));
            time -= (m * 60 * 1000)
            if (m.toString().length == 1)
                m = "0" + m;
            var s = Math.floor(time / 1000);
            time -= (s * 1000)
            if (s.toString().length == 1)
                s = "0" + s;
            var ms = time;
            if (ms.toString().length == 2)
                ms = "0" + ms
            if (ms.toString().length == 1)
                ms = "00" + ms;

            czas = h + ":" + m + ":" + s + "." + ms;
            timeDiv2.html(czas)

        }, 1);
    };
    var helpBtn = $("<DIV>");
    helpBtn.attr("id", "helpBtn");
    helpBtn.attr("class", "helpBtn");
    helpBtn.html("i");
    ui2.append(helpBtn)

    var helpDiv = $("<DIV>");
    helpDiv.attr("id", "helpDiv");
    helpDiv.attr("class", "helpDiv");
    helpDiv.html(""+
        "<span>Sterowanie</span><br><br>Moc uderzenia ustala suwak u dołu ekranu. Zmiana kierunku uderzenia ustalana jest przez klawisze prawej<br> i lewej strzałki. Aby uderzyć użyj klawisza spacji.<br><br><span>Zasady gry</span><br><br>Celem gry jest wbicie wszystkich bil koloru, który wybierzemy, lub który nam pozostanie po wbiciu pierwszej bili, a na końcu bili czarnej. Wbicie bili czarnej, jeśli pozostały jeszcze bile naszego koloru na stole, oznacza porażkę. Wbicie białej bili oznacza stratę ruchu. Punkty zdobywane są podczas wbijania bil własnego koloru. Po wbiciu bili własnego koloru przysługuje kontynuacja ruchu. Po wbiciu bili o kolorze przeciwnika to on dostaje punkt. Jeśli podczas ruchu żadna z bil nie wpadnie do kieszeni, to tracimy ruch na rzecz przeciwnika. Czas ruchu gracza wynosi maksymalnie jedną minutę.<br><br>©Skrzypczak Robert & Filipowski Damian 2017"
       +"");
    helpDiv.css("display", "none")
    ui2.append(helpDiv)

    helpBtn.on("click", function () {
        if (helpDiv.css("display") == "none") {
            helpDiv.css("display", "block")
            helpBtn.css("color", "black")
            helpBtn.css("background-color", "crimson")
        }
        else {
            helpDiv.css("display", "none")
            helpBtn.css("color", "crimson")
            helpBtn.css("background-color", "black")
        }
    })

    var fpsDiv = $("<DIV>");
    fpsDiv.attr("id", "fpsDiv");
    fpsDiv.attr("class", "fpsDiv");
    ui2.append(fpsDiv)

    this.setFPS = function (fps) {
        fpsDiv.html(fps+" FPS");
    }
}
