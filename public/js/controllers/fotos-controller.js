angular.module("alurapic").controller("FotosController", function($scope, $http) {
    $scope.fotos =[];
    $http.get("v1/fotos")
        .success(function(d){
            $scope.fotos = d;
        })
        .error(function(err) {
            console.error(err);
        });

});