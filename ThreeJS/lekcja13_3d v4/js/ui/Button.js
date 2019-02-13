function Button(link) {

    var button = document.createElement("div");
    button.setAttribute("class", "button")
    button.style.backgroundImage = "url('" + link + "')";
   

    this.get = function () {
        return button;
    }
}