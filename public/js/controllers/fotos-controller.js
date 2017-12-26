angular.module("alurapic").controller("FotosController", function($scope, recursoFoto) {
    $scope.fotos =[];
    $scope.filtro = '';
    $scope.mensagem = '';

    /*var recursoFoto = $resource("/v1/fotos/:fotoId");*/

    recursoFoto.query(function(fotos){
        $scope.fotos = fotos;
    },
    function(err) {
        console.error(err);
    })
    /*
    $http.get("v1/fotos")
        .success(function(d){
            $scope.fotos = d;
        })
        .error(function(err) {
            console.error(err);
        });
    */

    $scope.remover = function(foto) {
        
        recursoFoto.delete({fotoId: foto._id}, function(){
            var index = $scope.fotos.indexOf(foto);
                $scope.fotos.splice(index, 1);
                $scope.mensagem = 'Foto ' + foto.titulo + ' removida com sucesso!';
        }, function(err){
            console.log(err);
            $scope.mensagem = 'Não foi possível apagar a foto ' + foto.titulo;
        })
        /*$http.delete("/v1/fotos/" + foto._id)
            .success(function(){
                var index = $scope.fotos.indexOf(foto);
                $scope.fotos.splice(index, 1);
                $scope.mensagem = 'Foto ' + foto.titulo + ' removida com sucesso!';
                
            })
            .error(function(erro) {
                console.log(erro);
                $scope.mensagem = 'Não foi possível apagar a foto ' + foto.titulo;
            });
        */
    }

});