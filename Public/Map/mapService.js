var app = angular.module('recycle');


app.service('mapService', function($http, $q) {
	this.pinSpot = function (days) {
		var dfd = $q.defer()
		navigator.geolocation
		.getCurrentPosition(function (position) {

			$http({
				method: 'POST',
				url: '/api/user/postPin',
				data: {
					coords: position.coords,
					days: days
				}
			}).then(function(response){
				//if saved
				console.log(response)
				dfd.resolve(response);
			})
		}, function(err){
			console.log(err);
		}, {
			enableHighAccuracy: true
		})

		return dfd.promise;
	}

	this.getPins = function () {
		return $http({
			method: 'GET',
			url: '/api/user/getpins'
		})
	};

	this.manualAdd = function(data) {
		console.log("data on service")
		return $http({
			method: 'POST',
			url: '/api/user/manualAdd',
			data: data
			})
	};
	this.getUserInfo = function () {
		return $http({
			method: 'GET',
			url: '/api/user/userInfo'
		})

	}
	this.removePin = function (pin) {
		return $http({
			method: 'DELETE',
			url: '/api/user/removePin/' + pin
		})
	}

	this.editDays = function (data) {
		return $http({
			method: 'PUT',
			url: '/api/user/editDays/' + data.pinID,
			data: data.days
		})
	}

});

