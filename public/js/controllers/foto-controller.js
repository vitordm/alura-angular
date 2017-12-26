angular.module("alurapic").controller("FotoController", function($scope, $http) {
    $scope.foto = {};
    $scope.mensagem = "";
    $scope.submeter = function() {
        console.log($scope.foto);
        console.log(this);

        if ($scope.formulario.$valid) {
            $http.post("/v1/fotos", $scope.foto)
                .success(function() {
                    $scope.foto = {};
                    $scope.mensagem = "Foto cadastrada com sucesso!";
                })
                .error(function(err) {
                    console.error(err);
                    $scope.mensagem = "Erro ao cadastrar!";
                });
        }

        //return false;
    }
});