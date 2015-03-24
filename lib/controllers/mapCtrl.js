var mapLocation = require('./../models/mapLocation');
var q = require('q');
var request = require('request');
var pinLocation = {};
var BodyParser = require('body-parser')

// var queryObj = { user: user.id };
// 		var updateObj = {
// 					days: [days]
// 					}

var createMapLocationObject =  function (apiResult, daysArr) {
	var manualLoc = {};
	manualLoc.coords = {};
	manualLoc.address = {};
	manualLoc.days = daysArr;
	var address_components = apiResult.address_components;
	manualLoc.coords.latitude = apiResult.geometry.location.lat;
	manualLoc.coords.longitude = apiResult.geometry.location.lng;
	manualLoc.full_name = apiResult.formatted_address;

	for (var i = 0; i < address_components.length; i++) {
		switch(address_components[i].types[0]) {
			case 'street_number':
				manualLoc.address.street_number = address_components[i].long_name;
				break;
			case 'route':
				manualLoc.address.road = address_components[i].long_name;
				break;
			case 'locality':
				manualLoc.address.city = address_components[i].long_name;
				break;
			case 'administrative_area_level_1':
				manualLoc.address.state = address_components[i].short_name;
				break;
			case 'postal_code':
				manualLoc.address.postcode = address_components[i].long_name;
		} 
	};

	manualLoc.address.road = manualLoc.address.street_number + " " + manualLoc.address.road;

	return manualLoc;
} 

module.exports = {
	pinSpot: function(req, res) {
		request('http://nominatim.openstreetmap.org/reverse?format=json&lat=' + req.body.coords.latitude + '&lon=' + req.body.coords.longitude + '&zoom=18&addressdetails=1',
			function (error, response, body) {
				body = JSON.parse(body);
				console.log(req.user);
				var pinLocation = new mapLocation({
					coords: {
						latitude: body.lat,
						longitude: body.lon
					},
					days: req.body.days,
					// days: body.daysSelected
					full_name: body.display_name,
					address: {
						road: body.address.road,
					  city: body.address.city,
						county: body.address.county,
						state: body.address.state,
						postcode: body.address.postcode,
						country: body.address.country,
						country_code: body.address.country_code
					}
				});
				pinLocation.user = req.user._id;
				pinLocation.save(function (err, response) {
					if (err) {
						return res.status(500).end();
					} 
					return res.json(response);
				});
		});
	},
	
	getPins: function (req, res) {
		mapLocation.find({}, function (err, results) {
			if (!err) {
				return res.status(200).json(results)
			} else {
				return res.status(500).end()
			}
		})
	},

	manualAdd: function (req, res) {
		console.log("this is req")
		console.log(req)

		request('https://maps.googleapis.com/maps/api/geocode/json?address=' + req.body.addressObj.road + ','+ req.body.addressObj.city + ',' + req.body.addressObj.state + ',' + req.body.addressObj.zipCode + '&key=AIzaSyBroTN1ZS6AswjW6zdJsjQlNPfhQa5K8Tc',
			function (error, response, body) {
				console.log("HELLO")
				console.log(req.body.days);
				body = JSON.parse(body);
				console.log("address_components: ")
				console.log(body.address_components);
				var obj = createMapLocationObject(body.results[0], req.body.days);

				var pinLocation = new mapLocation(obj);
				pinLocation.user = req.user._id;
				pinLocation.days = req.body.days;
				pinLocation.save(function (err, response) {
					if (err) {
						return res.status(500).end();
					} 
					return res.json(response);
			});
		});
	},
	removePin: function (req, res) {
		mapLocation.findById(req.params.pinID).exec().then(function(pin){
			// console.log(req.user._id.trim(), JSON.stringify(pin.user).trim().replace(/\"/g, ''), req.user._id.trim() === JSON.stringify(pin.user).trim().replace(/\"/g, ''));
			if(req.user._id.trim() === JSON.stringify(pin.user).trim().replace(/\"/g, '')){
				pin.remove(function(err, response){
					if(!err){
						console.log(response)
						return res.status(200).json(response);
					} else {
						return res.status(500).json(err);
					}
				})
			} else {
				return res.status(401).send("Not authorized to remove this pin");
			}
		}, function(err){
			return res.status(500).json(err)
		});
	},

	editDays: function (req, res) {
		// id whatToUpdate callback
		console.log(req.body);
		mapLocation.findByIdAndUpdate(req.params.pinID, {days: req.body}).exec().then(function(pin){

			return res.status(200).json(pin);		
		}, function(err){
			res.status(500).json(err);
		})
	}
}



