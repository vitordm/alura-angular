angular.module("alurapic").controller("FotoController", function($scope, $http, $routeParams,recursoFoto, cadastroFotos) {
    $scope.foto = {};
    $scope.mensagem = "";
    
    /*var recursoFoto = $resource("/v1/fotos/:fotoId", null, {
        update: {
            method: "PUT"
        }
    });*/

    if ($routeParams.fotoId) {
        recursoFoto.get({fotoId: $routeParams.fotoId}, function(foto){
            console.log(foto);
            $scope.foto = foto;
        }, function(err){
            console.log(err);
            $scope.mensagem = "Erro ao buscar foto (" + $routeParams.fotoId +") !";
        })
        /*
        $http.get("/v1/fotos/" + $routeParams.fotoId)
        .success(function(foto){
            console.log(foto);
            $scope.foto = foto;
        })
        .error(function(err){
            console.log(err);
            $scope.mensagem = "Erro ao buscar foto (" + $routeParams.fotoId +") !";
        })*/
    }

    $scope.submeter = function() {
        console.log($scope.foto);
        console.log(this);

        if ($scope.formulario.$valid) {
            if ($scope.formulario.$valid) {
                cadastroFotos.cadastrar($scope.foto)
                    .then(function(result){
                        $scope.mensagem = result.mensagem;
                    })
                    .catch(function(erro) {
                        $scope.mensagem = erro.mensagem;
                    })
            }
        }
    
    }
});