var http = require("http");
var qs = require("querystring")
var fs = require("fs");

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