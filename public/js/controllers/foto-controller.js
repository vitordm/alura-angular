angular.module("alurapic").controller("FotoController", function($scope, $http, $routeParams) {
    $scope.foto = {};
    $scope.mensagem = "";

    if ($routeParams.fotoId) {
        $http.get("/v1/fotos/" + $routeParams.fotoId)
        .success(function(foto){
            console.log(foto);
            $scope.foto = foto;
        })
        .error(function(err){
            console.log(err);
            $scope.mensagem = "Erro ao buscar foto (" + $routeParams.fotoId +") !";
        })
    }

    $scope.submeter = function() {
        console.log($scope.foto);
        console.log(this);

        if ($scope.formulario.$valid) {

            if ($scope.foto._id) {
                $http.put("/v1/fotos/" + $scope.foto._id, $scope.foto)
                .success(function() {
                    $scope.foto = {};
                    $scope.mensagem = "Foto alterada com sucesso!";
                })
                .error(function(err) {
                    console.error(err);
                    $scope.mensagem = "Erro ao alterar!";
                });
                return;
            }

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