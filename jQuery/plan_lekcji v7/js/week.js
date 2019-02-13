var Week = {
    displayWeek: function (response3) {
        // godziny
        $("#weekTable").remove();
        // console.log("Przed ", response3)
        response3 = JSON.parse(response3);
        //console.log(response3);
        //console.log(response3.tydzien)
        var t = $("<TABLE>");
        t.attr("id", "weekTable");
        $("#parentWeek").append(t);
        var licz;
        //var k = response3.tydzien[licz];
        for (var i = -1; i < 14; i++) {
            licz = i;            
            //  console.log(response3.godziny[i].id)
            var tr = $("<TR>");
            tr.attr("id", "weekTable" + i);
            t.append(tr);
            for (n = -1; n < 5; n++) {
                              
                var td = $("<TD>");
                td.attr("id", "id" + licz);
                td.attr("class", "weekTableTd");
                td.css("float", "left");
                /*if (i != -1 || n != -1) {
                    td.hover(function () {
                        $(this).css("backgroundColor", Settings.colors.color4);
                    }, function () {
                        $(this).css("backgroundColor", Settings.colors.color2);
                    });
                    //td.click(Hours.changeHours);
                }
                else {
                    td.css("cursor", "auto");
                }*/
                tr.append(td);
                if (i == -1) {
                    td.css("cursor", "auto");
                    td.css("color", Settings.colors.color5);
                    switch (n) {
                        case 0:
                            td.append("PN");
                            break;
                        case 1:
                            td.append("WT");
                            break;
                        case 2:
                            td.append("SR");
                            break;
                        case 3:
                            td.append("CZ");
                            break;
                        case 4:
                            td.append("PT");
                            break;
                    }
                } else {
                    if (n == -1) {
                        td.append(i + 1);
                        td.css("cursor", "auto");
                    }
                    else {
                        td.hover(function () {
                            $(this).css("backgroundColor", Settings.colors.color4);
                        }, function () {
                            $(this).css("backgroundColor", Settings.colors.color2);
                        });
                        k = response3.tydzien[licz];
                        td.append(k.subjectShortName + "<br>" + k.nr);
                        licz += 14;
                        //console.log(licz);
                    }
                }
            }                      
        }
    },
}