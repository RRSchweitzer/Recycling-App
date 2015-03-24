var app = angular.module('recycle');

app.controller('modalEditCtrl', function($scope, mapService, $modalInstance, pinID) {

  $scope.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  $scope.dayArray =[];

  $scope.handleDay = function(day) {
      console.log(day)
      var index = $scope.dayArray.indexOf(day);
      if(index === -1){
          $scope.dayArray.push(day);
      } else {
          $scope.dayArray.splice(index, 1)
      }
  }

  $scope.submit = function () {
  	console.log("this is the pinID")
  	console.log(pinID)
    var editObj = {
    	pinID: pinID,
			days: $scope.dayArray	
				}
			$modalInstance.close(editObj)
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
