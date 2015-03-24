var app = angular.module('recycle');

app.controller('modalInstanceCtrl', function($scope, mapService, $modalInstance, bigObj) {

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

				console.log(bigObj)
				if (bigObj.road === undefined) {
				$modalInstance.close($scope.dayArray);
			} else {
				var manualObj = {

					addressObj: bigObj,
					days: $scope.dayArray	
				}
				$modalInstance.close(manualObj)
			}
  }

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
