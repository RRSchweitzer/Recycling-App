var app = angular.module('recycle');

app.controller('modalCtrl', function ($scope, $modal, $log) {

	  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'Modals/modalView.html',
      controller: 'Modals/modalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });