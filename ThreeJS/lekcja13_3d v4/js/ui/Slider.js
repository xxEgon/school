function Slider(kierunek, min, max, dlugosc, tekst) {
    //console.log("new SLIDER")

    var slider = document.createElement("div");
    slider.setAttribute("id", "slider" + tekst)
    slider.setAttribute("class", "slider")

    var border = document.createElement("div");
    border.setAttribute("class", "sliderBorder")

    if (kierunek == "pionowy") {
        border.style.width = "50px";
        border.style.height = dlugosc + "px";

        slider.style.width = "50px";
        slider.style.height = dlugosc + "px";
    }
    else {
        border.style.width = dlugosc + "px";
        border.style.height = "50px";

        slider.style.width = dlugosc + "px";
        slider.style.height = "50px";
    }
    //slider.appendChild(border)

    var firstDiv = document.createElement("div");
    firstDiv.setAttribute("id", "firstDiv" + tekst)
    firstDiv.setAttribute("class", "firstDiv")
    firstDiv.innerHTML = tekst;
    slider.appendChild(firstDiv)

    var secondDiv = document.createElement("div");
    secondDiv.setAttribute("id", "secondDiv" + tekst)
    secondDiv.setAttribute("class", "secondDiv")
    slider.appendChild(secondDiv)

    this.getFirstDiv = function () {
        return firstDiv;
    }

    this.getSecondDiv = function () {
        return secondDiv;
    }

    this.getSlider = function () {
        return slider;
    }

    var isDown = false;
    this.setISDOWN = function (a) {
        isDown = a
    }

    firstDiv.onmousedown = function () {
        console.log(tekst)
        if (isDown == false)
            isDown = true;
    }

    var value;

    var zakresWartosci = (max - min);

    var jednostka = dlugosc / zakresWartosci

    //console.log(zakresWartosci)

    this.value = function () {
        return value;
    }

    this.setValue = function (a) {
        if (kierunek == "pionowy") {
            value = a;
            firstDiv.style.top = ((zakresWartosci - value) * jednostka) - 50 + "px"
            secondDiv.style.top = ((zakresWartosci - value) * jednostka) - 50 + "px"
            //console.log(value)
            //console.log(zakresWartosci - ((secondDiv.style.top.substr(0, secondDiv.style.top.length - 2) ) / (dlugosc - 49.9999)) * zakresWartosci)
        }
        else {
            value = a;
            firstDiv.style.left = value * jednostka + "px"
            secondDiv.style.left = value * jednostka + "px"
            //console.log(value)
        }
    }
    var cursorX;
    var cursorY;

    this.setCURSOR = function (pageX, pageY) {
        cursorX = pageX;
        cursorY = pageY;
    }

    var licz = 0;

    this.update = function () {
        //console.log("updateSLIDER " + tekst)
        licz++;
        if (isDown) {
            //console.log("isDown" + tekst)            
            if (kierunek == "pionowy") {
                if (cursorY >= 25 && cursorY <= 0.9 * (innerHeight) - 20) {
                    firstDiv.style.top = cursorY - 25 + "px"
                    //console.log("przesuwam")
                }
            }
            else {
                if (cursorX >= 100 && cursorX <= 0.8 * (innerWidth) + 50) {
                    firstDiv.style.left = cursorX - 100 + "px"
                    //console.log("przesuwam")
                }             
            }
        }
        if (kierunek == "pionowy") {
            var currentPos = Number(secondDiv.style.top.substr(0, secondDiv.style.top.length - 2))
            //console.log(currentPos)
            if (firstDiv.style.top.substr(0, firstDiv.style.top.length - 2) > currentPos) {
                currentPos += 3;
                secondDiv.style.top = currentPos + "px"
            }
            if (firstDiv.style.top.substr(0, firstDiv.style.top.length - 2) < currentPos) {
                currentPos -= 3;
                secondDiv.style.top = currentPos + "px"
            }
            value = Math.sqrt(Math.pow(zakresWartosci - ((secondDiv.style.top.substr(0, secondDiv.style.top.length - 2)) / (dlugosc - 49.9999)) * zakresWartosci, 2))
            //console.log(value)
        }
        else {
            var currentPos = Number(secondDiv.style.left.substr(0, secondDiv.style.left.length - 2))
            //console.log(currentPos)
            if (firstDiv.style.left.substr(0, firstDiv.style.left.length - 2) > currentPos) {
                currentPos += 0.8;
                secondDiv.style.left = currentPos + "px"
            }
            if (firstDiv.style.left.substr(0, firstDiv.style.left.length - 2) < currentPos) {
                currentPos -= 0.8;
                secondDiv.style.left = currentPos + "px"
            }
            value = (secondDiv.style.left.substr(0, secondDiv.style.left.length - 2) / (dlugosc - 50)) * zakresWartosci
            //console.log(value)
        }
    }
}