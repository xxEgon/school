var http = require("http");
var qs = require("querystring")
var fs = require("fs");
var socketio = require("socket.io")

var usersCount = 0;

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
            else if (req.url === "/libs/three.js") {
                fs.readFile("static/libs/three.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
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

var io = socketio.listen(server) // server -> server nodejs
io.sockets.on("connection", function (client) {
    usersCount++;
    if (usersCount > 2)
        usersCount = 1;
    console.log("klient nr " + usersCount + " sie podłączył: " + client.id)

    client.emit("onconnect", {
        clientName: client.id,
        userNr: usersCount,
    })

    client.on("disconnect", function () {
        console.log("klient się rozłącza")
    })

    client.on("mouseposition", function (data) {
        client.broadcast.emit("mouseposition", { posX: data.posX, posY: data.posY });
    })

    client.on("rotation", function (data) {
        //console.log(data)
        client.broadcast.emit("rotation", {
            armataObj_rotation_y: data.armataObj_rotation_y,
            kulaObj_position: data.kulaObj_position, });
    })

    client.on("kat", function (data) {
        //console.log(data)
        client.broadcast.emit("kat", {
            armataAlpha: data.armataAlpha,
            kulaObj_position: data.kulaObj_position,
        });
    })

    client.on("pal", function (data) {
        //console.log(data)
        client.broadcast.emit("pal", {
            kulaObj_position: data.kulaObj_position,
        });
    })

    client.on("drgania", function (data) {
        //console.log(data)
        client.broadcast.emit("drgania", {
            camera_rotation_z: data.camera_rotation_z,
        });
    })

    client.on("odrzut", function (data) {
        //console.log(data)
        client.broadcast.emit("odrzut", {
            koloRotation: data.koloRotation,
            armataObj_position_z: data.armataObj_position_z,
        });
    })

})