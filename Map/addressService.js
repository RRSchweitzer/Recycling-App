var app = angular.module('mapTrack')

app.service('addressService', function($http, $q){
	this.getGeoCode = function(lat, lon) {
		console.log(lat, lon)
		return $http({
			method: 'GET',
			url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&key=AIzaSyDU8svsjTcUA1GLngFzuDbp5MMyC7CCFpQ'
		})
	}

	this.getAddress = function(array) {
		var promiseArray =  [];
		for (var i = 0; i < array.length; i++) {
			promiseArray.push(this.getGeoCode(array[i].coords.latitude, array[i].coords.longitude))
		};
		return $q.all(promiseArray)
	}




})