function WaitingScreen() {
    console.log("New WaitingScreen")

    var waitingScreen = $("<DIV>");
    waitingScreen.attr("id", "waitingScreen");
    waitingScreen.attr("class", "fullScreen");
    waitingScreen.css("display", "block");
    $("body").append(waitingScreen)

    var textDiv = $("<DIV>");
    textDiv.attr("id", "textDivWaiting");
    textDiv.attr("class", "textDiv");
    textDiv.html("Wait for second player...");
    waitingScreen.append(textDiv)

    this.thirdPlayer = function () {
        textDiv.html("There ale already two players, sorry.");
        waitingScreen.css("z-index", "110");
    }

    this.show = function () {
        waitingScreen.css("display", "block");
        $("#resetButton").css("display", "block");
    }

    this.hide = function () {
        waitingScreen.css("display", "none");
        $("#resetButton").css("display", "none");
    }

    this.endGame = function (win) {
        waitingScreen.css("display", "block");

        if (win)
            textDiv.html("YOU WON!");
        else
            textDiv.html("YOU LOST.");

        $("#resetButton").css("display", "block");
      
        waitingScreen.css("z-index", "110");
        waitingScreen.css("opacity", "0.8");
    }

}