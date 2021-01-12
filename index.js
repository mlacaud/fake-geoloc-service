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
var pointuser = "Bordeaux";


var specialpoint = {
    HongKong: {
        lat: 22.302932, 
        long: 114.192283
    },
    Bordeaux: {
        lat: 44.808409, 
        long: -0.596845
    }
};

var otherPoints = [
    {
        name: "Versailles",
        country_code: "FR",
        country_name: "France",
        lat: 48.798861, 
        long: 2.129816,
    },
    {
        name : "Paris",
        country_code: "FR",
        country_name: "France",
        lat: 48.838725, 
        long: 2.350727,
    },
    {
        name: "Athene",
        country_code: "GR",
        country_name: "Greece",
        lat: 37.998891, 
        long: 23.818904
    },
    {
        name: "Varsovie",
        country_code: "PL",
        country_name: "Poland",
        lat: 52.230037, 
        long: 21.013175,
    },
    {
        name: "Bucarest",
        country_code: "RO",
        country_name: "Romania",
        lat: 44.425967, 
        long: 26.115381,
    }
]

var maplimit = {
    china: {
        upleft: {
            lat: 36.82, 
            long: 100.26
        },
        downright: {
            lat: 24.69,
            long: 117.77
        }
      }
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

var getByLimit = function(req, res) {
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
}

var currentPosition = 0;

var getByPoints = function(req, res) {
    var ip = req.params.ip;
    var result = {
        ip: ip,
        country_code: "",
        country_name: "",
        region_code: "",
        region_name: "",
        city: "",
        zip_code: "",
        time_zone: "",
        latitude: 0,
        longitude: 0,
        metro_code: 0
    };

    currentPosition = currentPosition%otherPoints.length;

    var point = otherPoints[currentPosition];
    currentPosition++;

    result.latitude = point.lat;
    result.longitude = point.long;
    result.country_code = point.country_code;
    result.country_name = point.country_name;

    res.send(result);
}

//app.use(express.static('static'));

//ip
app.get('/ip', function(req, res) {
    res.send(myip);
});

//json/ip
app.get('/json/:ip', getByPoints);

//json
app.get('/json', function(req, res) {
    var result = {
  		ip: "127.0.0.1",
  		country_code: "FR",
  		country_name: "France",
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
