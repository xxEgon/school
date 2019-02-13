var Color = {
    colors: ["(244,67,54)", "(63,81,181)", "(0,150,136)", "(255,193,7)", "(233,30,99)", "(33,150,243)", "(76,175,80)", "(255,235,59)", "(156,39,176)", "(3,169,244)", "(139,195,74)", "(255,152,0)", "(103,58,183)", "(0,188,212)", "(205,220,57)", "(255,87,34)", "(255,255,255)", "(0,0,0)"],
    fonts: ["Aladin", "Amiko","Anonymous", "FiraMono" , "Gruppo", "Stoke"],
    methods: {
        create: function () {
            var s1 = $("<DIV>");
            s1.attr("id", "colorBackground")
            s1.attr("class", "select")
            $("#parentColor").append(s1);

            var t1 = $("<DIV>");
            t1.attr("id", "colorBackgroundTitle")
            t1.attr("class", "ColorTitle")
            t1.html("Kolor tła 1");
            $("#colorBackground").append(t1);

            for (i = 0; i < 18; i++) {
                var op1 = $("<DIV>");
                op1.attr("id", "colorBackgroundOp" + i)
                op1.attr("class", "option1")
                op1.css("backgroundColor", "rgb" + Color.colors[i])
                $("#colorBackground").append(op1);
            }
            /////////////////
            var s11 = $("<DIV>");
            s11.attr("id", "colorBackground2")
            s11.attr("class", "select")
            $("#parentColor").append(s11);

            var t11 = $("<DIV>");
            t11.attr("id", "colorBackgroundTitle")
            t11.attr("class", "ColorTitle")
            t11.html("Kolor tła 2");
            $("#colorBackground2").append(t11);

            for (i = 0; i < 18; i++) {
                var op11 = $("<DIV>");
                op11.attr("id", "colorBackground2Op" + i)
                op11.attr("class", "option11")
                op11.css("backgroundColor", "rgb" + Color.colors[i])
                $("#colorBackground2").append(op11);
            }
            //alert("no elo")////////////////////////
            var s2 = $("<DIV>");
            s2.attr("id", "colorFont")
            s2.attr("class", "select")
            $("#parentColor").append(s2);

            var t2 = $("<DIV>");
            t2.attr("id", "colorFontTitle")
            t2.attr("class", "ColorTitle")
            t2.html("Kolor czcionki");
            $("#colorFont").append(t2);

            for (i = 0; i < 18; i++) {
                var op2 = $("<DIV>");
                op2.attr("id", "colorFontOp" + i)
                op2.attr("class", "option2")
                op2.css("backgroundColor", "rgb" + Color.colors[i])
                op2.css("value", "rgb" + Color.colors[i])
                $("#colorFont").append(op2);
            }
            //////////////////////////////
            var s3 = $("<DIV>");
            s3.attr("id", "fontType")
            s3.attr("class", "select")
            $("#parentColor").append(s3);

            var t3 = $("<DIV>");
            t3.attr("id", "fontTypeTitle")
            t3.attr("class", "ColorTitle")
            t3.html("Czcionka");
            $("#fontType").append(t3);

            for (i = 0; i < 6; i++) {
                var op3 = $("<DIV>");
                op3.attr("id", "fontTypeOp" + i)
                op3.attr("class", "option3")
                op3.css("fontFamily", Color.fonts[i])
                op3.html(Color.fonts[i])
                $("#fontType").append(op3);
            }
            ////////////////////////////////////
            var f1;
            var f11;
            var f2;
            var f3;
            $(".option1").click(function () {
                f1 = this.id.substr(17, this.id.length-1);
                Settings.colors.color2 = "rgb"+Color.colors[f1];
                //console.log(f, Settings.color2)
                Main.init();
            })
            $(".option11").click(function () {
                f11 = this.id.substr(18, this.id.length - 1);
                Settings.colors.color4 = "rgb" + Color.colors[f11];
                //console.log(f, Settings.color4)
                Main.init();
            })
            $(".option2").click(function () {
                f2 = this.id.substr(11, this.id.length - 1);
                Settings.colors.fontColor = "rgb" + Color.colors[f2];
                //console.log(f, Settings.colors.colorFont)
                $("body").css("color", Settings.colors.fontColor);
            })
            $(".option3").click(function () {
                f3 = this.id.charAt(10);
                Settings.font = Color.fonts[f3];
                //console.log(f, Settings.font)
                $("body").css("fontFamily", Settings.font);
            })
            $("#defaultColor").click(function () {
                Settings.colors.color2= Settings.defaultSettings.color2;
                Settings.colors.color4= Settings.defaultSettings.color4;
                Settings.colors.fontColor= Settings.defaultSettings.fontColor;
                Settings.font = Settings.defaultSettings.fontType;
                Main.init();
            })
            $("#acceptColor").click(function () {
                var obj = {
                    action: "updateColor",
                    color2: Settings.colors.color2,
                    color4: Settings.colors.color4,
                    fontColor: Settings.colors.fontColor,
                    fontType: Settings.font,
                    user: Settings.users.user,
                }
                //console.log(obj.kol1Name, obj.kol1, obj.kol2Name,obj.kol2,obj.toID)
                Database.methods.updateData(obj)
                 .done(function (response) {
                     /*if (response != "ERROR") {
                         $("#" + taGodzina).html(hh + ":" + mm);
                         console.log(response);
                     }
                     else {
                     */
                         UI.methods.showDatabaseAlert(response);
                         UI.methods.closeDatabaseAlert();
                     //}
                 })
                 .fail(function (response) {
                     alert(response.response1Text)
                 })
            })
        },
    }
}