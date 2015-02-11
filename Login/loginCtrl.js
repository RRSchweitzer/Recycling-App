var app = angular.module('mapTrack')

app.controller('loginCtrl', function ($scope, loginService, $location) {
  //Step 4 of Registration
  var loginCallback = function(user){
    user.uid = user.uid.replace('simplelogin:', '');
    $scope.$apply(function(){
      $location.path('/map/' + user.uid)
    });
  };

  $scope.login = function () {
    return loginService.login($scope.details, loginCallback);
  };

  //Step 2 of Registration
  $scope.register = function () {
    return loginService.register($scope.details, loginCallback);
  };

  $scope.status = 'Register';
  $scope.showReg = function(){
    if($scope.status === 'Register'){
      $scope.status = 'Login';
    } else {
      $scope.status = 'Register';
    }
    $scope.reg = !$scope.reg;
  };
});
