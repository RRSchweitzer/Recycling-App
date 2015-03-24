var app = angular.module('recycle');

app.service('loginService', function($http, $location) {	
	
	this.logout = function () {
		return $http({
			method: 'GET',
			url: '/api/user/logout'
		}).then(function (res) {
			$location.path('/login')
			return res
		})
	}

});