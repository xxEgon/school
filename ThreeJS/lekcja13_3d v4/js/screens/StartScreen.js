function StartScreen() {

    var screen = document.createElement("div");
    screen.setAttribute("id", "startScreen")

    for (var i = 0; i < Settings.helicopterModels.length; i++) {
        var btn = new Button(Materials.graphics.startScreen[i]).get();
        var pos = (innerWidth / 2) - 100 + (i*(200))
        btn.style.left =  pos + "px"
        screen.appendChild(btn);

        btn.onclick = function () {
            this.style.border = "5px yellow solid";
        }

    }

    var startButton = document.createElement("div");
    startButton.setAttribute("id", "btnStart")
    startButton.innerHTML = "START";
    screen.appendChild(startButton)

    var loadingScreen = document.createElement("div");
    loadingScreen.setAttribute("id", "loadingScreen")

    var loadingText = document.createElement("div");
    loadingText.setAttribute("id", "loadingText")
    loadingText.innerHTML = "LOADING...";
    loadingScreen.appendChild(loadingText)

    this.getStartButton = function () {
        return startButton;
    }
    
    this.getScreen = function () {
        return screen;
    }

    this.getLoadingScreen = function () {
        return loadingScreen;
    }
}