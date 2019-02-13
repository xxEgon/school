var Main = {
    init: function () {
        //np inicjalizacja wyglądu elementów interfejsu
        //poszczególnych ekranów
        $("body").css("fontFamily", Settings.font);
        $("body").css("color", Settings.colors.fontColor);

        $("#main").css("backgroundColor", Settings.colors.color2);
        $("#zegar").children('span').css("color", Settings.colors.color4);
        $("#menuBtn").css("color", Settings.colors.color4);
        $(".icon").css("backgroundColor", Settings.colors.color2);
        $(".text").css("backgroundColor", Settings.colors.color2);
        $(".leftPanel").css("backgroundColor", Settings.colors.color2);
        $("#databaseAlertDiv").css("backgroundColor", Settings.colors.color2);
        $("#databaseAlertDivText").css("backgroundColor", Settings.colors.color4);
        $("#changeHoursDiv").css("backgroundColor", Settings.colors.color2);
        $("#captchaDiv").css("backgroundColor", Settings.colors.color2);
        $("#colorDiv").css("backgroundColor", Settings.colors.color2);
        $("#closeChangeHoursDiv").css("color", Settings.colors.color4);
        $("#changeHoursDivTimeZnak").css("color", Settings.colors.color4);
        $(".closeLeftPanel").css("color", Settings.colors.color4);
        $(".leftPaneltitle").css("color", Settings.colors.color4);
        $("#acceptColor").css("color", Settings.colors.color4);
        $("#defaultColor").css("color", Settings.colors.color4);

        $(".panelBtn").children(".icon").css("backgroundColor", Settings.colors.color2);
        $(".panelBtn").children(".text").css("backgroundColor", Settings.colors.color2);

        $(".leftPanelsettingsBtn").css("backgroundColor", Settings.colors.color2);

        $(".leftPaneldatabaseBtn").css("backgroundColor", Settings.colors.color2);

        $(".panelBtn").hover(function () {
            $(this).children(".icon").css("backgroundColor", Settings.colors.color4);
            $(this).children(".text").css("backgroundColor", Settings.colors.color4);
        }, function () {
            $(this).children(".icon").css("backgroundColor", Settings.colors.color2);
            $(this).children(".text").css("backgroundColor", Settings.colors.color2);
        });
        $(".leftPanelsettingsBtn").hover(function () {
            $(this).css("backgroundColor", Settings.colors.color4);
        }, function () {
            $(this).css("backgroundColor", Settings.colors.color2);
        });
        $(".leftPaneldatabaseBtn").hover(function () {
            $(this).css("backgroundColor", Settings.colors.color4);
        }, function () {
            $(this).css("backgroundColor", Settings.colors.color2);
        });
        /*
        $("#main").css("backgroundColor", Settings.colors.color1);
        $("#zegar").children('span').css("color", Settings.colors.color5);
        $("#menuBtn").css("color", Settings.colors.color5);
        $(".icon").css("backgroundColor", Settings.colors.color2);
        $(".text").css("backgroundColor", Settings.colors.color3);
        $(".leftPanel").css("backgroundColor", Settings.colors.color2);
        $("#databaseAlertDiv").css("backgroundColor", Settings.colors.color2);
        $("#databaseAlertDivText").css("backgroundColor", Settings.colors.color4);
        $("#changeHoursDiv").css("backgroundColor", Settings.colors.color2);
        $("#captchaDiv").css("backgroundColor", Settings.colors.color2);
        $("#colorDiv").css("backgroundColor", Settings.colors.color2);
        $("#closeChangeHoursDiv").css("color", Settings.colors.color5);      
        $("#changeHoursDivTimeZnak").css("color", Settings.colors.color5);
        $(".closeLeftPanel").css("color", Settings.colors.color5);
        $(".leftPaneltitle").css("color", Settings.colors.color5);       
        $(".panelBtn").hover(function () {
            $(this).children(".icon").css("backgroundColor", Settings.colors.color4);
            $(this).children(".text").css("backgroundColor", Settings.colors.color5);
        }, function () {
            $(this).children(".icon").css("backgroundColor", Settings.colors.color2);
            $(this).children(".text").css("backgroundColor", Settings.colors.color3);
        });
        $(".leftPanelsettingsBtn").hover(function () {
            $(this).css("backgroundColor", Settings.colors.color4);
        }, function () {
            $(this).css("backgroundColor", Settings.colors.color2);
        });
        $(".leftPaneldatabaseBtn").hover(function () {
            $(this).css("backgroundColor", Settings.colors.color4);
        }, function () {
            $(this).css("backgroundColor", Settings.colors.color2);
        });   
        */
        $("#lekcjaTeraz").html("Teraz:<br>JĘZYK POLSKI<br>sala 123");
        $("#lekcjaZaChwile").html("Za chwilę:<br>MATEMATYKA<br>sala 234")
    }
}

