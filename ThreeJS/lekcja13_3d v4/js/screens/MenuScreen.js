function MenuScreen(kokpit) {

    var screen = document.createElement("div");
    screen.setAttribute("id", "menuScreen")
    screen.style.display = "none";

    var last = 0;
    var active = 1;
    var kokpitVisible = true;

    for (var i = 0; i < Materials.graphics.helicopter_icons.length; i++) {
        var btn = new Button(Materials.graphics.helicopter_icons[i]).get();
        var pos = i * (150)
        btn.setAttribute("id", "buttonMenu" + i)
        btn.setAttribute("class", "buttonMenu")
        btn.style.left = pos + "px"
        screen.appendChild(btn);

        if (i == 1) {
            btn.style.border = "5px yellow solid";
            last = btn
        }

        if(i != 6)
            btn.onclick = function () {
                console.log()
                if (last != 0) {
                    last.style.border = "5px black solid";
                }
            
                this.style.border = "5px yellow solid";
                active = this.id.substr(10, this.id.length)
                console.log("CAM: ",active)
                CameraModes.CURRENT_MODE = CameraModes.CAMERA_MODES[active]
                last = this;
            }
        if (i == 6)
        {
            btn.onclick = function () {
                console.log("TOGGLE KOKPIT")
                if (kokpitVisible) {
                    kokpit.hide()
                    kokpitVisible = false
                }
                else {
                    kokpit.show()
                    kokpitVisible = true
                }
            }
        }
    }

    document.getElementById("div1").onclick = function () {
        console.log("TOGGLE MENU")
        if (screen.style.display == "none")
            screen.style.display = "block";
        else 
            screen.style.display = "none";
    }
        

    /*screen.onclick = function () {
        console.log("off")
        screen.style.display = "none";
    }*/
    
    this.getActive = function () {
        return active;
    };

    /*var startButton = document.createElement("div");
    startButton.setAttribute("id", "btnStart")
    startButton.innerHTML = "START";
    screen.appendChild(startButton)*/

    this.getScreen = function () {
        return screen;
    }

}