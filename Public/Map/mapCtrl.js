var app = angular.module('recycle');

app.controller('mapCtrl', function($scope, mapService, $log, $modal) {
	  $scope.isCollapsed = false;
	  

	  $scope.open = function(size){
	    var modalInstance = $modal.open({
	      templateUrl: 'Modals/modalView.html',
	      controller: 'modalInstanceCtrl',
	      size: size,
	      resolve: {
	        bigObj: function () {
	        				var addressObj = {
										road: $scope.road,
										city: $scope.city,
										state: $scope.state,
										zipCode: $scope.zipCode
									}
	          return addressObj;
	        }
	      }
	    })

	 		modalInstance.result.then(function(data){
	    	if (data.addressObj) {
	    		$scope.manualAdd(data)
	    	} else {
	    		$scope.dayArray = data
		    	$scope.pinSpot(data)
	    	}
	    })
	  }

	$scope.edit = function(pinID) {
    var modalInstance = $modal.open({
      templateUrl: 'Modals/modalView.html',
      controller: 'modalEditCtrl',
      size: 'sm',
      resolve: {
    	  pinID: function () {
    	  	$scope.pinID = pinID
        return $scope.pinID;
      	}
      }
    })

 		modalInstance.result.then(function(data){
			$scope.editDays(data)
		})
 	}



var d = new Date();
var weekday = new Array(7);
	weekday[0]=  "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";

var today = weekday[d.getDay()];


//angular maps
  $scope.map = {
  center: {
  		latitude: 40.228968,
  		longitude: -111.657783
  	},
  	zoom: 12
  }

	$scope.options = {
    scrollwheel: false,
	};

  $scope.showWeather = true;

  $scope.dayArray = [];

//Pinning Spot
	$scope.pinSpot = function () {
		mapService.pinSpot($scope.dayArray)
			.then(function(res) {
				$scope.showMapPins();
				$scope.usersBins();
			})
	};

	$scope.showMapPins = function () {
		var todaysPins = [];
		mapService.getPins()
		 .then(function (res) {
			 	$scope.allPins = res.data;
		 	for (var i = 0; i < res.data.length; i++) {
		 		for (var j = 0; j < res.data[i].days.length; j++) {
		 			if (res.data[i].days[j] === today) {
		 			todaysPins.push(res.data[i])
					}
				}
			}
		 	$scope.todaysPins = todaysPins
		});
	}
	$scope.showMapPins();

	$scope.manualAdd = function(data) {
		var data = {
				addressObj: {
					road: data.addressObj.road,
					city: data.addressObj.city,
					state: data.addressObj.state,
					zipCode: data.addressObj.zipCode
			},
			days: data.days
		}
		mapService.manualAdd(data)
			.then(function (res) {
				console.log(res);
				$scope.showMapPins();
				$scope.usersBins();
				$scope.getOtherUserPins

				// $scope.allPins.push(res.data);
				$scope.clearFields();
			})
	}

	$scope.removePin = function (pin) {
		mapService.removePin(pin)
			.then(function() {
				$scope.showMapPins()
				$scope.usersBins();
				$scope.getOtherUserPins();

			})
	}

	$scope.editDays = function (data) {
		mapService.editDays(data)
		.then(function (res){
					$scope.showMapPins()

				})
		}
	

	$scope.clearFields = function () {
			$scope.road = "";
	    $scope.city = "";
	    $scope.state = "";
	    $scope.zipCode = "";
	}
	
	$scope.getUserInfo = function () {
	mapService.getUserInfo()
		.then(function (res) {
			$scope.userInfo = res.data
		})
	}
	$scope.getUserInfo();

$scope.usersBins = function () {
			var userPins = [];
			mapService.getPins()
			 .then(function (res) {
			 	$scope.allPins = res.data;
			 	for (var i = 0; i < res.data.length; i++) {
			 			if (res.data[i].user === $scope.userInfo._id) {
		 					userPins.push(res.data[i])
					}
				}
		 	$scope.userPins = userPins
		});
	}
	$scope.usersBins();

	$scope.getOtherUserPins = function () {
			var otherUserPins = [];
			mapService.getPins()
			 .then(function (res) {
			 	$scope.allPins = res.data;
			 	console.log("below is res.data")
			 	console.log(res.data)
			 	for (var i = 0; i < res.data.length; i++) {
			 			if (res.data[i].user != $scope.userInfo._id) {
			 			otherUserPins.push(res.data[i])
						}
					
				}
			 	$scope.otherUserPins = otherUserPins
			});
		}
		$scope.getOtherUserPins();

		window.setInterval(function(){
			$scope.getOtherUserPins();
			$scope.showMapPins();
}, 10000);
})
	




