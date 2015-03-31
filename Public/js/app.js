var app = angular.module('recycle', ['uiGmapgoogle-maps', 'ngRoute','ui.bootstrap'])

	app.config(function($routeProvider) {
		$routeProvider
		.when('/login', {
			templateUrl: "Login/loginTmpl.html",
			controller:  "loginCtrl"
		})
		.when('/map', {
			templateUrl: "Map/mapTmpl.html",
			controller: "mapCtrl",
			resolve: {
				getMap: function (mapService) {
					return mapService.getPins();
					return mapService.getUserInfo();
				}
			}
			
		})
		.otherwise({
			redirectTo: "/login"
		})
	})



