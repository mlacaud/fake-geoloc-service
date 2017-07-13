var express = require('express'),
    cors = require('cors'),
    url = require('url')
var app = express();

app.use(cors());

var myip = {
  ip: "localhost",
  port: "9003",
  porttracker: "8030"
}

var limit = "china";
var pointuser = "HongKong";

var maplimit = {};
var specialpoint = {};

specialpoint.HongKong = {lat:22.302932, long: 114.192283};

maplimit.china = {
  upleft: {lat: 36.82, long: 100.26},
  downright: {lat: 24.69,long: 117.77}
};

//argv
var flag = process.argv;
for(var i=0; i<flag.length; i++) {
    switch (flag[i]) {
      case "-i":
          myip.ip = flag[i+1] || myip.ip;
          break;
      case "-p":
          myip.port = flag[i+1] || myip.port;
          break;
      case "-pt":
          myip.porttracker = flag[i+1] || myip.porttracker;
          break;
      default:
          break;
    }
}

app.use(express.static('static'));

//ip
app.get('/ip', function(req, res) {
    res.send(myip);
});

//json/ip
app.get('/json/:ip', function(req, res) {
    var ip = req.params.ip,
        result = {
      		ip: ip,
      		country_code: "CH",
      		country_name: "China",
      		region_code: "",
      		region_name: "",
      		city: "",
      		zip_code: "",
      		time_zone: "",
      		latitude: 44.8048,
      		longitude: -0.5954,
      		metro_code: 0
      	};
    var lat = Math.random() * (maplimit[limit].upleft.lat - maplimit[limit].downright.lat) + maplimit[limit].downright.lat;
    var long = Math.random() * (maplimit[limit].downright.long - maplimit[limit].upleft.long) + maplimit[limit].upleft.long;

    result.latitude = lat;
    result.longitude = long;

    res.send(result);
});

//json
app.get('/json', function(req, res) {
    var result = {
  		ip: "127.0.0.1",
  		country_code: "CH",
  		country_name: "China",
  		region_code: "",
  		region_name: "",
  		city: "",
  		zip_code: "",
  		time_zone: "",
  		latitude: 44.8048,
  		longitude: -0.5954,
  		metro_code: 0
  	};

    result.latitude = specialpoint[pointuser].lat;
    result.longitude = specialpoint[pointuser].long;

    res.send(result);
});



var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Fake-geoloc-service http://%s:%s", host, port);
});
