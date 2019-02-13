var Today = {
    displayToday: function (response2) {
        // godziny
        $("#todayTable").remove();
         //console.log("Przed ", response2)
        response2 = JSON.parse(response2);
        //console.log(response2);
        //console.log(response2.dzisiaj)
        var t = $("<TABLE>");
        t.attr("id", "todayTable");
        $("#parentToday").append(t);
        for (var i = 0; i < response2.dzisiaj.length; i++) {
            //  console.log(response2.godziny[i].id)
            var k = response2.dzisiaj[i];
            var tr = $("<TR>");
            tr.attr("id", "todayTable" + i);
            t.append(tr);
            for (n = 0; n < 3; n++) {
                var td = $("<TD>");
                if (n == 0)
                    var x = "";
                if (n == 1)
                    var x = "subjectLongName";
                if (n == 2)
                    var x = "nr";
                var y = (i + 1);
                if (y < 10)
                    y = "0" + y;
                td.attr("id", "id" + y + x + n);
                td.attr("class", "todayTableTd");
                tr.append(td);
                switch (n) {
                    case 0:
                        td.append(i+1);
                        break;
                    case 1:
                        td.append(k.subjectLongName);
                        break;
                    case 2:
                        td.append(k.nr);
                        break;
                }
            }
        }
    },
}