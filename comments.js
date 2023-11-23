// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var ROOT_DIR = "html/";
var port = 8080;
// Create http server
http.createServer(function (req, res) {
    // Parse the request
    var urlObj = url.parse(req.url, true, false);
    console.log("URL path "+urlObj.pathname);
    console.log("URL search "+urlObj.search);
    console.log("URL query "+urlObj.query["q"]);
    // If this is our comments REST service
    if(urlObj.pathname.indexOf("comment") !=-1) {
        console.log("comment route");
        if(req.method === "POST") {
            // First read the form data
            var jsonData = "";
            req.on('data', function (chunk) {
                jsonData += chunk;
            });
            req.on('end', function () {
                var reqObj = JSON.parse(jsonData);
                console.log(reqObj);
                console.log("Name: "+reqObj.Name);
                console.log("Comment: "+reqObj.Comment);
                // Now put it into the database
                var MongoClient = require('mongodb').MongoClient;
                MongoClient.connect("mongodb://localhost/weather", function(err, db) {
                    if(err) throw err;
                    db.collection('comments').insert(reqObj,function(err, records) {
                        console.log("Record added as "+records[0]._id);
                    });
                });
            });
            res.writeHead(200);
            res.end("");
        } else if(req.method === "GET") {
            console.log("In GET");
            // Read all of the database entries and return them in a JSON array
            var MongoClient = require('mongodb').MongoClient;
            MongoClient.connect("mongodb://localhost/weather", function(err, db) {
                if(err) throw err;
                db.collection("comments", function(err, comments){
                    if(err) throw err;
                    comments.find(function(err, items){
                        items.toArray(function(err, itemArr){
                            console.log("Document Array: ");
                            console.log(itemArr);
                            res.writeHead(200);
                            res.end(JSON.stringify(itemArr));
                        });
                    });
                });
            });
        }
    } else if(urlObj.pathname.indexOf("getcity") !=-1) {
        console.log("In REST service");
        fs.readFile('cities.dat.txt', function (err, data) {
            if(err) throw err;
            cities =