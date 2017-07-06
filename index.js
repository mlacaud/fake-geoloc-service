var express = require('express'),
    cors = require('cors'),
    url = require('url')
var app = express();

app.use(cors());

app.get('/json/:ip', function(req, res) {
    var ip = req.params.ip,
        result = {
		ip: "147.210.128.117",
		country_code: "FR",
		country_name: "France",
		region_code: "NAQ",
		region_name: "Nouvelle-Aquitaine",
		city: "Talence",
		zip_code: "33400",
		time_zone: "Europe/Paris",
		latitude: 44.8048,
		longitude: -0.5954,
		metro_code: 0
	};
    
    
    res.send(result);
});

app.get('/json', function(req, res) {
    var result = {
		ip: "147.210.128.116",
		country_code: "FR",
		country_name: "France",
		region_code: "NAQ",
		region_name: "Nouvelle-Aquitaine",
		city: "Talence",
		zip_code: "33400",
		time_zone: "Europe/Paris",
		latitude: 44.8048,
		longitude: -0.5954,
		metro_code: 0
	};
    res.send(result);
});



var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Fake-geoloc-service http://%s:%s", host, port);
});
