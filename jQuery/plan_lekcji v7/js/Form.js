var Form = {
    methods:
        {
            createForm: function () {
                $("#startDiv").html("Zarejestruj się lub zaloguj");

                var di = $("<DIV>");
                di.attr("id", "formDiv")
                $("#startDiv").append(di);

                var d1 = $("<LABEL>");
                d1.attr("id", "labelFormLogin")
                d1.attr("class", "labelForm")
                d1.attr("for", "inputForm");
                d1.html("Login: ");
                $("#formDiv").append(d1);

                var d = $("<INPUT>");
                d.attr("id", "inputFormLogin")
                d.attr("class", "inputForm")
                d.attr("type", "text");
                $("#labelFormLogin").append(d);

                var d3 = $("<LABEL>");
                d3.attr("id", "labelFormPasswd")
                d3.attr("class", "labelForm")
                d3.attr("for", "inputForm");
                d3.html("Hasło: ");
                $("#formDiv").append(d3);

                var d2 = $("<INPUT>");
                d2.attr("id", "inputFormPasswd")
                d2.attr("class", "inputForm")
                d2.attr("type", "password");
                $("#labelFormPasswd").append(d2);

                var r = $("<DIV>");
                r.attr("id", "acceptForm");
                r.html("DALEJ")
                r.css("backgroundColor", Settings.colors.color2)
                r.click(Form.methods.acceptForm);
                $("#formDiv").append(r);

                $("#acceptForm").hover(function () {
                    $(this).css("backgroundColor", Settings.colors.color4);
                }, function () {
                    $(this).css("backgroundColor", Settings.colors.color2);
                });
            },
            tab: ["\'",'\"',"<",">","javascript"],
            acceptForm: function () {
                //console.log("klik")
                var safe = true;
                var n = $("#inputFormLogin").val();
                var p = $("#inputFormPasswd").val();
                for (i = 0 ; i < Form.methods.tab.length ; i++) {
                    if ((-1 != n.search(Form.methods.tab[i])) || (-1 != p.search(Form.methods.tab[i]))) {
                        UI.methods.showDatabaseAlert("UŻYTO NIEPRAWIDŁOWEGO ZNAKU");
                        UI.methods.closeDatabaseAlert();
                        safe = false;
                        break;
                    }
                }
                if (safe == true) {
                    //console.log(n, p);
                    console.log("Zatwierdz");
                    var obj = {
                        action: "log",
                        login: n,
                        passwd: p,
                    }
                    Database.methods.registerUser(obj)
                     .done(function (response) {
                         if (response.substr(0, 10) == "ZALOGOWANO") {
                             var u = response.substr(10, response.length - 1)
                             response = response.substr(0, 10);
                             //console.log(response, response, u)
                             Form.methods.logIn(u);
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
                         }
                         else {
                             if (response.substr(0, 14) == "ZAREJESTROWANO") {
                                 var u = response.substr(14, response.length - 1)
                                 response = response.substr(0, 14);
                                 //console.log(response, response, u)
                                 Settings.users.user = u;
                                 var obj = {
                                     action: "add",
                                     user: Settings.users.user,
                                 }
                                 console.log("WAZNE", Settings.users.user)
                                 Database.methods.addData(obj)
                                  .done(function (response) {
                                      console.log(response);
                                  })
                                  .fail(function (response) {
                                      alert(response.responseText)
                                  })
                                 Settings.users.user = "1";
                             }
                         }
                         UI.methods.showDatabaseAlert(response);
                         UI.methods.closeDatabaseAlert();
                     })
                     .fail(function (response) {
                         alert(response.responseText)
                     })
                }
            },
            logIn: function (u) {
                $("#startDiv").fadeOut(2000, function () {
                    $("#startDiv").remove();
                });
                //console.log(u);
                Settings.users.user = u;
                //console.log(Settings.users.user);
            },
        }
}