var app = angular.module('recycle');

app.controller('loginCtrl', function($scope, $location, loginService, mapService) {
	$scope.logout = function () {
		loginService.logout()
			.then(function (res) {
				console.log(res);
				console.log($location.path())
			})
	}

	$scope.getUserInfo = function () {
	mapService.getUserInfo()
		.then(function (res) {
			$scope.userInfo = res.data
			console.log($scope.userInfo)
		})
	}
	$scope.getUserInfo();
});

