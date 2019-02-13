/*
    UI - obs³uga interfejsu u¿ytkownika
*/

function Ui() {

    document.getElementById("bLoguj").addEventListener("click", function () {
        console.log("ADD: " + iText.value)
        if (iText.value.length > 0)
        { 
            net.sendData("ADD_USER", iText.value);

            //net.sendData("CHECK_USER2", "1");

            setTimeout(function () {
                var ktory_gracz = net.receivedData;
                console.log("GRACZ NR: ", ktory_gracz)
                if (ktory_gracz == "2a") {
                    game.setCam(320, 700, 1140);
                    net.user = "red";
                    net.sendData("COMPARE_TAB", "0");
                    $("#turn").css("display", "block");
                }
            }, 100);
        }
    })
   

    document.getElementById("bReset").addEventListener("click", function () {
        //alert("pobieram zmienn¹ test z klasy Game: " + game.getTest());
        console.log("RESET")
        net.sendData("RESET_USER", "0");
    })
              
    $("#div1").mousedown(function () {
        console.log("KLIK")
        game.MouseDown();
    })

    net.sendData("CHECK_USER2", "1");

    setTimeout(function () {
        var ktory_gracz = net.receivedData;
        console.log("GRACZ NR: ", ktory_gracz)
        if (ktory_gracz == "1b")
        {
            game.setCam(320, 700, 1140);
            net.user = "red";
            //net.mojRuch = false;
        }
    }, 100);

    this.updateTabDiv = function (t) {
        $("#tablica").html("");
        if (net.user == "red") {
            for (i = 0; i < 8; i++) {
                for (j = 0; j < 8; j++) {
                    $("#tablica").html(document.getElementById("tablica").innerHTML + t[i][j] + " ")
                }
                $("#tablica").html(document.getElementById("tablica").innerHTML + "<br>")
            }
        }
        else {
            for (i = 7; i >= 0; i--) {
                for (j = 7; j >= 0; j--) {
                    $("#tablica").html(document.getElementById("tablica").innerHTML + t[i][j] + " ")
                }
                $("#tablica").html(document.getElementById("tablica").innerHTML + "<br>")
            }
        }
    }
    
}