var http = require("http");
var qs = require("querystring")
var fs = require("fs");
var socketio = require("socket.io")
var mongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
var Operations = require("./modules/Operations.js")
var db;
var opers = new Operations();
var usersCount = 0;
var server = http.createServer(function (req, res) {
    //console.log(req.method)
    switch (req.method) {
        case "GET":
            console.log(req.method +" : "+ req.url)
            if (req.url === "/") {
                fs.readFile("staticDir/index.html", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/favicon.ico") {

            }
            else if (req.url ==="/css/style.css") {
                fs.readFile("staticDir/css/style.css", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/css/range.css") {
                fs.readFile("staticDir/css/range.css", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.write(data);
                    res.end();
                })
            }
            else {
                var str = req.url.split("/")
                if (str[str.length - 1].endsWith(".js")) {
                    //console.log("staticDir" + req.url)
                    fs.readFile("staticDir" + req.url, function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'application/javascript' });
                        res.write(data);
                        res.end();
                    })
                }
                if (str[str.length - 1].endsWith(".jpg")) {
                    //console.log("staticDir" + req.url)
                    fs.readFile("staticDir" + req.url, function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                        res.write(data);
                        res.end();
                    })
                }
                if (str[str.length - 1].endsWith(".png")) {
                    //console.log("staticDir" + req.url)
                    fs.readFile("staticDir" + req.url, function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'image/png' });
                        res.write(data);
                        res.end();
                    })
                }
                if (str[str.length - 1].endsWith(".xml")) {
                    //console.log("staticDir" + req.url)
                    fs.readFile("staticDir" + req.url, function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'text/xml' });
                        res.write(data);
                        res.end();
                    })
                }
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
        })
    }
})

server.listen(3000);
console.log("Start serwera: 3000")

var coll;
mongoClient.connect("mongodb://localhost/pool", function (err, db) {

    if (err) console.log(err)
    else console.log("Mongo podlaczone")
    //tu mo¿na operowaæ na utworzonej bazie danych db lub podstawiæ jej obiekt 
    // pod zmienn¹ widoczn¹ na zewn¹trz    
    db.createCollection("users", function (err, coll) {
        //console.log("coll:",coll)
    })

    coll = db.collection("users")
})

var user1 = {
    login: 0,
    password: 0
}

var user2 = {
    login: 0,
    password: 0
}

var logged_users = 0;

var io = socketio.listen(server) // server -> server nodejs
io.sockets.on("connection", function (client) {
    usersCount++;

    console.log("Klient nr " + usersCount + " sie podlaczyl: " + client.id)

    if (usersCount == 3 ) {
        client.emit("onconnect", {
            clientName: client.id,
            userNr: usersCount,
            alreadyGame : true,
        })
        usersCount = 2;
    }
    else {
        client.emit("onconnect", {
            clientName: client.id,
            userNr: usersCount,
            alreadyGame: false,
        })
    }

    client.on("disconnect", function () {
        console.log("Klient sie rozlacza")
    })

    client.on("DBreset", function (data) {
        console.log("==RESET==")
        usersCount = 0;
        logged_users = 0;
        user1 = {
            login: 0,
            password: 0
        }

        user2 = {
            login: 0,
            password: 0
        }
        client.broadcast.emit("refresh", data)
    })

    client.on("DBinsert", function (data) {
        function selected(items) {
            //console.log("Selected: ", items)
            if (items.length > 0)
                client.emit("alreadyExists", {
                    response: "User with this login already exists.",
                })
            else if (items.length == 0) {
                opers.Insert(coll, data)
            }
            
        }

        var items = opers.SelectAndLimit2(coll, data.login, selected)
        
    })

    client.on("DBselect", function (data) {
        function selected(items) {
            console.log("Selected: ", items)
            var response;
            var tab = true;
            if (items.length > 0) {
                response = JSON.stringify(items)
                logged_users++;
            
                if (logged_users == 1) {
                    user1.login = items[0].login
                    user1.password = items[0].password
                }
                if (logged_users == 2) {
                    user2.login = items[0].login
                    user2.password = items[0].password
                    console.log("ALL USERS LOGGED")
                    io.sockets.emit("all_logged", {
                        user1Login: user1.login,
                        user2Login: user2.login,
                    })
                }
            }
            else if (items.length == 0) {
                response = "Wrong login or password.";
                tab = false;
            }
            client.emit("loggedin", {             
                response: response,
                tab: tab,
            })
        }

        var items = opers.SelectAndLimit(coll, data.login, data.password, selected)
        
    })
    client.on("update", function (data) {
        //console.log()
        client.broadcast.emit("update", data)
    })
    client.on("moveEnd", function (data) {
        client.broadcast.emit("moveEnd", {
            
        })
    })

    client.on("ballChosen", function (data) {
        console.log("BALL:", data)
        client.broadcast.emit("ballChosen", data)
    })

    client.on("end", function (data) {
        console.log("END:", data)
        client.broadcast.emit("end", data)
    })

    client.on("score", function (data) {
        console.log("SCORE:", data)
        client.broadcast.emit("score", data)
    })
    client.on("score2", function (data) {
        console.log("SCORE2:", data)
        client.broadcast.emit("score2", data)
    })
    client.on("timer", function () {
        client.broadcast.emit("timer", {})
    })
})