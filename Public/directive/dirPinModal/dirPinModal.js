(function(){
    angular
        .module("dirPinModal", [])
        .directive("dirPinModal", dirPinModal);
    function dirPinModal(){
        return {
            restrict: "E",
            scope: {
                dayArray: "=",
                runFunc: "&"
            },
            transclude: true,
            controller: function($scope){
                $scope.modalCancel = function(){
                };
                $scope.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

                $scope.handleDay = function(day){
                    console.log(day)
                    var index = $scope.dayArray.indexOf(day);
                    if(index === -1){
                        $scope.dayArray.push(day);
                    } else {
                        $scope.dayArray.splice(index, 1)
                    }
                }
            },
            link: function(scope, elem, attrs){

            },
            templateUrl: "directive/dirPinModal/dirPinModal.html"
        }
    }
})();