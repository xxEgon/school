/*
    klasa obs³uguj¹ca komunikacjê Ajax - em z serwerem
*/

function Net() {
    /*
        funkcja publiczna mo¿liwa do uruchomienia 
        z innych klas
    */
    this.gameTab = [
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],       
        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0],
    ]

    this.NewgameTab = [
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0],
    ]

    this.receivedData;

    this.user = "blue";

    this.mojRuch = true;

    this.sendData = function (akcja, name) {
        console.log("send data")
        
        $.ajax({
            url: "http://localhost:3000",
            data: {
                action: akcja,
                nick: name,
            },
            type: "POST",
            success: function (data) {

                console.log(data)

                net.receivedData = data

                if (data == "Dodano usera")
                {
                    $("#log").css("display", "none");
                    $("#nick").css("display", "block");
                    $("#nick").html(iText.value)

                    $("#wait").css("display", "block");

                    net.sendData("CHECK_USER1", "0")
                }

                if (data == "1a")
                {
                    setTimeout(function () { net.sendData("CHECK_USER1", "0"); }, 500);
                }

                if (data == "2a")
                {
                    $("#wait").css("display", "none");
                }

                if (data != "0a" && data != "1a" && data != "2a" && data != "0b" && data != "1b" && data != "2b")
                {
                    $("#inf").html(data);
                    setTimeout(function () {
                        $("#inf").html("");
                    }, 3000)
                }

                if (data == "notUpdated") {
                    setTimeout(function () { net.sendData("COMPARE_TAB", "0"); }, 500);
                }

                if (data == "Updated") {
                    setTimeout(function () { net.sendData("COMPARE_TAB", "0"); }, 500);
                }

                //console.log(data)
                if( data[0] == "[")
                {
                    console.log("Dostalem JSONa")

                    net.NewgameTab = JSON.parse(data)

                    $("#turn").css("display", "none");

                    ui.updateTabDiv(net.NewgameTab);

                    game.moveEnemy();

                }

            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
    }

}
