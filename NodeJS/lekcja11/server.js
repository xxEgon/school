var http = require("http");
var qs = require("querystring")
var fs = require("fs");
var socketio = require("socket.io")
var mongoClient = require('mongodb').MongoClient

var ObjectID = require('mongodb').ObjectID;
var Operations = require("./modules/Operations.js")

var db;
var opers = new Operations();

var server = http.createServer(function (req, res) {
    console.log(req.method)
    
    switch (req.method) {
        case "GET":
            console.log(req.url)
            if (req.url === "/") {
                fs.readFile("static/index.html", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/favicon.ico") {

            }
            else if (req.url === "/style.css") {
                fs.readFile("static/style.css", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.write(data);
                    res.end();
                })
            }
            else {
                var str = req.url.split("/")
                if (str[str.length - 1].endsWith(".js")) {
                    fs.readFile("static" + req.url, function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'application/javascript' });
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
console.log("start serwera: 3000")

var coll;
mongoClient.connect("mongodb://localhost/3ic1", function (err, db) {
    if (err) console.log(err)
    else console.log("mongo podłączone")
    //tu można operować na utworzonej bazie danych db lub podstawić jej obiekt 
    // pod zmienną widoczną na zewnątrz    
    db.createCollection("test", function (err, coll) {
        //console.log("coll:",coll)
    })

    var data =
        {
            a: "1",
            b: "3",
        };

    coll = db.collection("test")
    //opers.Insert(coll, data)

    //opers.SelectAll(coll)
    //opers.UpdateById(ObjectID, coll, data)
    //opers.DeleteById(ObjectID, coll, "id_ktore_chcemy_usunac")
})



var io = socketio.listen(server) // server -> server nodejs
io.sockets.on("connection", function (client) {
    console.log("Client connected: " + client.id)
    // client.id - unikalna nazwa klienta generowana przez socket.io

    client.emit("onconnect", {
        clientName: client.id
    })

    client.on("disconnect", function () {
        console.log("klient się rozłącza")
    })

    client.on("add", function (data) {
        console.log("Add:", data)

        opers.Insert(coll, data)
    })

    client.on("select", function () {
        console.log("Select")

        function selected(items) {
            console.log("Selected: ", items)    

            client.emit("selected", {
                selected: JSON.stringify(items, null, 3),
            })
        }

        var items = opers.SelectAll(coll, selected)  

    });

    client.on("update", function (data) {
        console.log("Update:", data)

        opers.UpdateById(ObjectID, coll, data)
    })

    client.on("delete", function (data) {
        console.log("Delete:", data)

        opers.DeleteById(ObjectID, coll, data.id)
    })
})