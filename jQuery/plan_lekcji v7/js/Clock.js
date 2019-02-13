var Clock = {
    czas: "<span> </span>" ,
    jest: true,
    init: function () {
        //utworzenie i zastartowanie zegara
        Clock.makeZegar();
        setInterval(Clock.makeZegar, 1000);       
    }, 
    makeZegar: function () {
        //konstrukcja zegara
        var d = new Date();
        var h = d.getHours();
        if (h.toString().length == 1) {
            h = "0" +h;
        }
        var m = d.getMinutes();
        if (m.toString().length == 1) {
            m = "0"+m;
        }
        if (Clock.jest == true) {
            Clock.czas = h + "<span>:</span>" + m;
            Clock.jest = false;
        }
        else {
            Clock.czas = h + "<span> </span>" + m;
            Clock.jest = true;
        }
        $("#zegar").html(Clock.czas);
        $("#zegar").children('span').css("color", Settings.colors.color4);
    }

}