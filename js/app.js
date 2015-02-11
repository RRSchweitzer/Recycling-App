var app = angular.module('mapTrack', ['firebase', 'uiGmapgoogle-maps', 'ngRoute'])

	app.config(function($routeProvider){
		$routeProvider
		.when('/login', {
			templateUrl: "login/loginTmpl.html",
			controller:  "loginCtrl"
		})
		.when('/map/:userId', {  //this is $route.current.params.userId === 1234
			templateUrl: "Map/mapTmpl.html",
			controller: "mapCtrl",
			resolve: {
      	user: function(firebaseService, $route){
        	return firebaseService.getUser($route.current.params.userId);
      	},
        pinsArray: function(firebaseService, $route){
       	 return firebaseService.getPins($route.current.params.userId);
      	}
    	}
		})
		.otherwise({
			redirectTo: "/login"
		})
	})
