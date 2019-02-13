var Hours = {
    displayHours: function (response1) {
        // godziny
        $("#hoursTable").remove();
        // console.log("Przed ", response1)
        response1 = JSON.parse(response1);
        //console.log(response1);
        //console.log(response1.godziny)
        var t = $("<TABLE>");
        t.attr("id", "hoursTable");
        $("#parentHours").append(t);
        for (var i = 0; i < response1.godziny.length; i++) {
            //  console.log(response1.godziny[i].id)
            var k = response1.godziny[i];
            var tr = $("<TR>");
            tr.attr("id", "hoursTable" + i);
            t.append(tr);
            for (n = 0; n < 3; n++) {
                var td = $("<TD>");
                if (n == 0)
                    var x = "";
                if (n == 1)
                    var x = "odGodM";
                if (n == 2)
                    var x = "doGdoM";
                var y = (i+1);
                if (y < 10)
                    y = "0" + y;
                td.attr("id", "id" + y + x + n);
                td.attr("class", "hoursTableTd");
                if (n != 0) {
                    td.hover(function () {
                        $(this).css("backgroundColor", Settings.colors.color4);
                    }, function () {
                        $(this).css("backgroundColor", Settings.colors.color2);
                    });
                    td.click(Hours.changeHours);
                }
                else
                {
                    td.css("cursor", "auto");
                }
                tr.append(td);
                switch (n) {
                    case 0:
                        td.append(k.id);
                        break;
                    case 1:
                        td.append(k.odG + ":" + k.odM);
                        break;
                    case 2:
                        td.append(k.doG + ":" + k.doM);
                        break;
                }
            }
        }
    },
    changeHours: function () {
        zmiana = false;
        zmiana2 = false;
        console.log("Zmiana godziny");
        $("#changeHoursDivHours").empty();
        $("#changeHoursDivMinutes").empty();
        $("#changeHoursDivTimeH").html("00");
        $("#changeHoursDivTimeM").html("00");
        for (i = 7; i < 21; i++)
        {
            var h = $("<DIV>");
            h.attr("id", "changeHoursDivHour" + i);
            h.attr("class", "changeHoursDivHour");
            if (i < 10)
                h.html("0" + i);
            else
                h.html(i);
            $("#changeHoursDivHours").append(h);
        }
        for (i = 0; i <= 55; i+=5) {
            var m = $("<DIV>");
            m.attr("id", "changeHoursDivMin" + i);
            m.attr("class", "changeHoursDivMin");
            if (i < 10)
                m.html("0"+i);
            else
                m.html(i);
            $("#changeHoursDivMinutes").append(m);
        }
        $("#changeHoursDiv").fadeIn(500);        
        var hh = "00";
        var mm = "00";
        $(".changeHoursDivHour").click(function () {
            var nr = $(this).html();
            hh = nr;
            zmiana = true;
            //console.log(zmiana, zmiana2)
            $("#changeHoursDivTimeH").html(nr);
        });
        $(".changeHoursDivMin").click(function () {
            var nr = $(this).html();
            mm = nr;
            zmiana2 = true;
            //console.log(zmiana, zmiana2)
            $("#changeHoursDivTimeM").html(nr);
        });
        var taGodzina = this.id;
        $("#closeChangeHoursDiv").click(function () {
            //console.log(zmiana, zmiana2)
            if ((zmiana == true) && (zmiana2 == true)) {
                $("#changeHoursDiv").fadeOut(500);              
                //UI.methods.showDatabaseAlert("ZAPISANO ZMIANY");
                //UI.methods.closeDatabaseAlert();
                //zmiana = false;
                //zmiana2 = false;
                //console.log(taGodzina);
                var kol1Name = taGodzina.substr(4, 3);
                var kol2Name = taGodzina.substr(7, 3);
                var kol1 = hh;
                var kol2 = mm;             
                var toID = taGodzina.substr(2, 2);
                if(toID.charAt(0) == "0")
                    toID = toID.charAt(1);
                console.log("Zaktualizuj dane");
                var obj = {
                    action: "update",
                    //UPDATE tabela SET odG = 7, odM  = 30 WHERE id = 1
                    //updateString: "UPDATE godziny SET " + kol1Name + " = '" + kol1 +"', " + kol2Name + " = '" + kol2 + "' WHERE id = " + toID
                    kol1Name: kol1Name,
                    kol1: kol1,
                    kol2Name: kol2Name,
                    kol2: kol2,
                    toID: toID,
                }
                //console.log(obj.kol1Name, obj.kol1, obj.kol2Name,obj.kol2,obj.toID)
                Database.methods.updateData(obj)
                 .done(function (response) {
                     if (response != "ERROR") {
                         $("#" + taGodzina).html(hh + ":" + mm);
                         console.log(response);
                     }
                     else {
                         UI.methods.showDatabaseAlert(response);
                         UI.methods.closeDatabaseAlert();
                     }
                 })
                 .fail(function (response) {
                     alert(response.response1Text)
                 })
            }
            if ((zmiana == false) || (zmiana2 == false)) {
                UI.methods.showDatabaseAlert("NAJPIERW WPROWADZ ZMIANY");
                UI.methods.closeDatabaseAlert();
            }
        });
    }
}



        