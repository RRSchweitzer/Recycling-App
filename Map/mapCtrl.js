var app = angular.module('mapTrack')

  app.controller('mapCtrl', function($scope, mapService, addressService, user, pinsArray, firebaseService) {

  	$scope.items = pinsArray;
    $scope.user = user;
    
   console.log(pinsArray);

    $scope.removePin = function(pin){
      console.log(pin);
      console.log($scope.pinList)
      $scope.pinList.remove(pin);
    }



  	$scope.pinSpot = function(){
  		mapService.pinSpot($scope.items).then(function(res){
        $scope.items = res;
  			alert("Spot Saved");
  		}, function(){
  			alert("Geolocation failed");
  		})
  	}

      $scope.map = {
      	center: {
      		latitude: 40.228968,
      		longitude: -111.657783
      	},
      	zoom: 14
      }

      $scope.options = {
        scrollwheel: false,
      }
      $scope.TemperatureUnits = {
        }

      $scope.showWeather = true;
  

  $scope.items.$loaded(function(){
    addressService.getAddress($scope.items)
    .then(function(data){
      $scope.pinList = data;
      console.log(data);
    })  
  }) //works like a promise
  




  });





