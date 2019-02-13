var http = require("http");
var qs = require("querystring")
var fs = require("fs");

var users = [];

var licznik = 0;

var startTab = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
]

var oldTab = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
]

var newTab = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
]

var server = http.createServer(function (req, res) {
    console.log(req.method)
    
    switch (req.method) {
        case "GET":
            /*fs.readFile("static/index3.html", function (error, data) {
                if (error) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                    res.end();
                }

                else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                }
            });*/
            console.log(req.url)
            if (req.url === "/") {
                fs.readFile("static/index.html", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/style.css") {
                fs.readFile("static/style.css", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/libs/three.js") {
                fs.readFile("static/libs/three.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/js/Game.js") {
                fs.readFile("static/js/Game.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/js/Net.js") {
                fs.readFile("static/js/Net.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/js/UI.js") {
                fs.readFile("static/js/UI.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }

            break;
        case "POST":
            servResp(req, res)
            break;

    }
    var kom = "";
    function servResp(req, res) {
        var allData = "";

        req.on("data", function (data) {
            //console.log("data: " + data)
            allData += data;
        })
        req.on("end", function (data) {
            var finish = qs.parse(allData)
            console.log(finish.action)
            switch (finish.action) {
                //dodanie nowego usera
                case "ADD_USER":
                    kom= addUser(finish.nick);
                    console.log(kom, "users: " + users)
                    res.end(kom);
                    break;
                    //inna akcja
                case "RESET_USER":
                    kom = delUser();
                    newTab = startTab.slice()
                    oldTab = startTab.slice()
                    licznik = 0;
                    console.log(kom, "users: " + users)           
                    res.end(kom);
                    break;
                case "CHECK_USER1":
                    console.log("usersLength1: " + users.length + "a")
                    res.end(users.length + "a");
                    break;
                case "CHECK_USER2":
                    console.log("usersLength2: " + users.length + "b")
                    res.end(users.length + "b");
                    break;
                case "UPDATE_TAB":
                    newTab = JSON.parse(finish.nick).slice();
                    licznik++;
                    console.log(licznik)
                    res.end("Updated")
                    //console.log("NewTab:", newTab)
                    break;
                case "COMPARE_TAB":
                    //console.log("=====================")
                    //console.log(JSON.stringify(oldTab))
                    //console.log("=====================")
                    //console.log(JSON.stringify(newTab))
                    //console.log("=====================")
                    if (JSON.stringify(oldTab) === JSON.stringify(newTab)) {
                        res.end("notUpdated")          
                    }
                    else {                        
                        oldTab = newTab.slice();
                        res.end(JSON.stringify(newTab))                            
                    }
                    break;
            }
           
        })
    }
    function addUser(nick) {
        if(users.length<2)
        {
            if (users.indexOf(nick) == -1) {
                users.push(nick);
                console.log(users)
                return "Dodano usera";
            }
            else
                return "Podany user juz istnieje";
        }
        else {
            return "Jest juz dwoch userow";
        }
    }
    function delUser() {
        users = [];
        return "Usunieto userow";
    }
})

server.listen(3000);
console.log("start serwera: 3000")