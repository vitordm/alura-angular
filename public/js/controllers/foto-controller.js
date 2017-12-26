angular.module("alurapic").controller("FotoController", function($scope, $http, $routeParams, recursoFoto) {
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

            if ($scope.foto._id) {
                recursoFoto.update({fotoId: $routeParams.fotoId}, $scope.foto, function() {
                    $scope.mensagem = "Foto alterada com sucesso!";
                }, function(err) {
                    console.error(err);
                    $scope.mensagem = "Erro ao alterar!";
                });
                /*
                $http.put("/v1/fotos/" + $scope.foto._id, $scope.foto)
                .success(function() {
                    $scope.mensagem = "Foto alterada com sucesso!";
                })
                .error(function(err) {
                    console.error(err);
                    $scope.mensagem = "Erro ao alterar!";
                });
                */
                return;
            }

            recursoFoto.save($scope.foto, function() {
                $scope.foto = {};
                $scope.mensagem = "Foto cadastrada com sucesso!";
            }, function(err) {
                console.error(err);
                $scope.mensagem = "Erro ao cadastrar!";
            })
            /*
            $http.post("/v1/fotos", $scope.foto)
                .success(function() {
                    $scope.foto = {};
                    $scope.mensagem = "Foto cadastrada com sucesso!";
                })
                .error(function(err) {
                    console.error(err);
                    $scope.mensagem = "Erro ao cadastrar!";
                });
            */
        }

        //return false;
    }
});