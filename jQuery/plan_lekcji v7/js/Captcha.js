var Captcha = {
    methods: {
        createCaptcha: function () {
            $("#startDiv").html("Wybierz niepasujący obrazek");

            var di = $("<DIV>");
            di.attr("id", "captchaDiv")
            di.html("Wybierz niepasujący obrazek");
            $("#startDiv").append(di);

            var d = $("<DIV>");
            d.attr("id", "chooseCaptcha")
            $("#captchaDiv").append(d);

            var r = $("<DIV>");
            r.attr("id", "acceptCaptcha");
            r.html("Nie jestem robotem")
            r.css("backgroundColor", Settings.colors.color2)
            r.click(Captcha.methods.acceptCaptcha);
            $("#captchaDiv").append(r);

            var ri = $("<DIV>");
            ri.attr("id", "reloadCaptcha");
            ri.html("Wylosuj ponownie")
            ri.css("backgroundColor", Settings.colors.color2)
            ri.click(Captcha.methods.randomCaptcha);
            $("#captchaDiv").append(ri);

            $("#acceptCaptcha").hover(function () {
                $(this).css("backgroundColor", Settings.colors.color4);
            }, function () {
                $(this).css("backgroundColor", Settings.colors.color2);
            });
            $("#reloadCaptcha").hover(function () {
                $(this).css("backgroundColor", Settings.colors.color4);
            }, function () {
                $(this).css("backgroundColor", Settings.colors.color2);
            });
        },
        last: "",
        randomCaptcha: function () {
            $("#chooseCaptcha").empty();
            var ran = Math.ceil((Math.random() * 3));
            //console.log("startowe:", ran, Captcha.methods.last);
            if (Captcha.methods.last == ran) {
                //console.log("powtorzenie");
                Captcha.methods.randomCaptcha();
            }
            else {
                for (i = 1; i < 5; i++) {
                    var pi = $("<IMG>");
                    pi.attr("class", "captchaPic")
                    pi.attr("id", "captchaPic" + ran + "nr" + i)
                    pi.attr("alt", "captchaPic" + ran + "nr" + i)
                    pi.attr("src", "../gfx/cap" + ran + "_" + i + ".jpg")
                    pi.css("left", ((i - 1) * 25) + "%");
                    pi.click(Captcha.methods.pickCaptcha);
                    $("#chooseCaptcha").append(pi);
                }
                switch (ran) {
                    case 1:
                        $("#captchaPic1nr2").attr("id", "captchaPicWrong");
                        break;
                    case 2:
                        $("#captchaPic2nr3").attr("id", "captchaPicWrong");
                    case 3:
                        $("#captchaPic3nr4").attr("id", "captchaPicWrong");
                }
                //console.log("przed:", Captcha.methods.last);
                Captcha.methods.last = ran;
                //console.log("po:", Captcha.methods.last);
            }
        },
        pickCaptcha: function (ran) {           
            //console.log("klik");
            $(this).css("opacity", "0.5");
            $(".captchaPic").off("click");
            $(".captchaPic").css("cursor", "auto");
            var toID = this.id;
            //console.log(toID)
            $(this).attr("id", toID + "Checked");
        },
        acceptCaptcha: function () {
            if ($(".captchaPic").is("#captchaPicWrongChecked"))
            {
                console.log("Zaloguj się lub zarejestruj");
                //UI.methods.showDatabaseAlert("Zaloguj się lub zarejestruj");
                //UI.methods.closeDatabaseAlert();
                $("#startDiv").empty();
                Form.methods.createForm();
            }
            else 
            {
                console.log("Jesteś robotem albo nie umiesz czytać");
                UI.methods.showDatabaseAlert("Jesteś robotem albo nie umiesz czytać");
                UI.methods.closeDatabaseAlert();
                Captcha.methods.randomCaptcha();
            }
        },
    }
}