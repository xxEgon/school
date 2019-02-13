var UI = {
    init: function () {
        $("#menuBtn").click(function () {
            $("#bottomPanel").toggleClass("animBottomPanel");
        });

        $(".panelBtn").click(function () {
            switch ($(this).index()) {
                case 0:
                    if ($('#menuBtn').css('display') == 'none') {
                        $("#leftPanelsettings").animate({ left: "0%" }, 'fast', function () { console.log("JQ") });
                    }
                    else {
                        $(".leftPanel").css("left", "0");
                        $("#leftPanelsettings").toggleClass("animleftPanel");
                        $("#bottomPanel").toggleClass("animBottomPanel");
                    }
                    break;
                case 1:
                    if ($('#menuBtn').css('display') == 'none') {
                        $("#leftPaneltoday").animate({ left: "0%" }, 'fast', function () { console.log("JQ") });
                    }
                    else {
                        $(".leftPanel").css("left", "0");
                        $("#leftPaneltoday").toggleClass("animleftPanel");
                        $("#bottomPanel").toggleClass("animBottomPanel");
                    }
                    break;
                case 2:
                    if ($('#menuBtn').css('display') == 'none') {
                        $("#leftPanelweek").animate({ left: "0%" }, 'fast', function () { console.log("JQ") });
                    }
                    else {
                        $(".leftPanel").css("left", "0");
                        $("#leftPanelweek").toggleClass("animleftPanel");
                        $("#bottomPanel").toggleClass("animBottomPanel");
                    }
                    break;
            }
        })      
        $(".closeLeftPanel").click(UI.methods.zamknijPanel);
        $(".leftPanelsettingsBtn").click(function () {
            switch ($(this).index()) {
                case 2:
                    console.log("Godziny");
                    UI.methods.zamknijPanel();
                    if ($('#menuBtn').css('display') == 'none') {
                        $("#leftPanelhours").animate({ left: "0%" }, 'fast', function () { console.log("JQ") });
                    }
                    else {
                        $(".leftPanel").css("left", "0");
                        $("#leftPanelhours").toggleClass("animleftPanel");
                    }
                    break;
                case 3:
                    console.log("Kolorystyka");
                    UI.methods.zamknijPanel();
                    if ($('#menuBtn').css('display') == 'none') {
                        $("#leftPanelColor").animate({ left: "0%" }, 'fast', function () { console.log("JQ") });
                    }
                    else {
                        $(".leftPanel").css("left", "0");
                        $("#leftPanelColor").toggleClass("animleftPanel");
                    }
                    break;
                case 4:
                    console.log("Ekran główny");
                    break;
                case 5:
                    console.log("Baza danych");
                    UI.methods.zamknijPanel();
                    if ($('#menuBtn').css('display') == 'none') {
                        $("#leftPaneldatabase").animate({ left: "0%" }, 'fast', function () { console.log("JQ") });
                    }
                    else {
                        $(".leftPanel").css("left", "0");
                        $("#leftPaneldatabase").toggleClass("animleftPanel");
                    }
                    break;
            }
        });
        
        $(".leftPaneldatabaseBtn").click(function () {
            switch ($(this).index()) {
                case 2:
                    console.log("Dodaj tabele");
                    var obj = {
                        action: "create",
                    }
                    Database.methods.createTables(obj)
                     .done(function (response) {
                         if (response == "TABELE UTWORZONE") {
                             $("#databaseAlertDivText").html("TWORZĘ TABELE...");
                             $("#databaseAlertDiv").append("<img id='loadingImg'src='gfx/loading.gif' alt='LOADING'/>");
                             $("#databaseAlertDiv").fadeIn(500);
                             setTimeout(function () {
                                 $("#loadingImg").remove();
                                 UI.methods.showDatabaseAlert(response);
                                 UI.methods.closeDatabaseAlert();
                             }, 1500);
                         }
                         else {
                             UI.methods.showDatabaseAlert(response);
                             UI.methods.closeDatabaseAlert();
                         }
                     })
                     .fail(function (response) {
                         alert(response.responseText)
                     })
                    break;
                case 3:
                    console.log("Usuń tabele");
                    var obj = {
                        action: "drop",
                    }
                    Database.methods.dropTables(obj)
                     .done(function (response) {
                         UI.methods.showDatabaseAlert(response);
                         UI.methods.closeDatabaseAlert();
                     })
                     .fail(function (response) {
                         alert(response.responseText)
                     })
                    Settings.users.user = "1";
                    break;
                case 4:
                    console.log("Dodaj dane");
                    var obj = {
                        action: "add",
                        user: Settings.users.user,
                    }
                    Database.methods.addData(obj)
                     .done(function (response) {
                         UI.methods.showDatabaseAlert(response);
                         UI.methods.closeDatabaseAlert();
                     })
                     .fail(function (response) {
                         alert(response.responseText)
                     })
                    break;
                case 5:
                    console.log("Usuń dane");
                    var obj = {
                        action: "del",
                    }
                    Database.methods.delData(obj)
                     .done(function (response) {
                         UI.methods.showDatabaseAlert(response);
                         UI.methods.closeDatabaseAlert();
                     })
                     .fail(function (response) {
                         alert(response.responseText)
                     })
                    break;
                case 6:
                    console.log("Pobierz dane");
                    var d = new Date();
                    var day = d.getDay();
                    if (day == 0 || day == 6) {
                        console.log("DZISIAJ NIE MA LEKCJI, POBRANO PLAN NA PONIEDZIAŁEK");
                        day = 1;
                    }
                    var obj = {
                        action: "get",
                        day: day,
                        user: Settings.users.user,
                    }
                    //console.log(obj)
                    Database.methods.getData(obj)
                     .done(function (response) {
                         //console.log(response)
                         if (response.substr(2, 7) == "godziny") {
                             response = response.split("|");
                             //console.log(response)
                             response1 = response[0];
                             response2 = response[1];
                             response3 = response[2];
                             response4 = response[3];
                             console.log(response1, response2, response3, response4)
                             Hours.displayHours(response1);
                             Today.displayToday(response2);
                             Week.displayWeek(response3);
                             response4 = response4.split("/");
                             console.log(response4[0], response4[1], response4[2], response4[3])
                             Settings.colors.color2 = response4[0];
                             Settings.colors.color4 = response4[1];
                             Settings.colors.fontColor = response4[2];
                             Settings.font = response4[3];
                             console.log(Settings.colors)
                             Main.init();
                             UI.methods.showDatabaseAlert("POBRANO DANE");
                         }
                         else
                             UI.methods.showDatabaseAlert(response);
                         UI.methods.closeDatabaseAlert();
                     })
                     .fail(function (response) {
                         alert(response.responseText)
                     })
                    break;
            }
        });
        
    },
    methods: {
        zamknijPanel: function () {
            if ($('#menuBtn').css('display') == 'none')
                $(".leftPanel").animate({ left: "-100%" }, 'fast', function () { console.log("JQ") });
            else
                $(".leftPanel").removeClass("animleftPanel");
            $(".leftPanel").css("left", "-100%");
        },
        showDatabaseAlert: function (response) {
            // animacja pokazania ekranu alerta
            $("#databaseAlertDivText").html(response);
            $("#databaseAlertDiv").fadeIn(500);
        },
        closeDatabaseAlert: function () {
            // animacja ukrycia ekranu alerta
            setTimeout(function () { $("#databaseAlertDiv").fadeOut(500); }, 1000);
        },
        
    }

}