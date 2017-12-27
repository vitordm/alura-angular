angular.module('minhasDiretivas', [])
    .directive("meuPainel", function() {
        var ddo = {};
        ddo.restrict = "AE";
        ddo.transclude = true;
        ddo.scope = {
            titulo: '@'
        };
        ddo.templateUrl = "js/directives/meu-painel.html";
        return ddo;
    })
    .directive("minhaFoto", function() {
        return  {
            restrict : "AE",
            scope : {
                titulo: "@",
                url: "@"
            },
            template: '<img class="img-responsive center-block fotoListagem" ng-src="{{url}}" alt="{{titulo}}">'
        }
    })
    .directive("meuBotaoPerigo", function() {
        var ddo = {};
        ddo.restrict = "E",
        ddo.scope = {
            "nome" : "@",
            "acao": "&"
        };
        ddo.template = '<button ng-click="acao()" class="btn btn-danger btn-block">{{nome}}</button>';
        return ddo;
    })
    .directive("meuFocus", function() {
        var ddo =  {
            restrict : "A",
            //scope: {
            //    focado: "=",
            //}
        };

        ddo.link = function (scope, element) {
            /*
            scope.$watch("focado", function() {
                console.log("arguments:", arguments);
                console.log("element:", element);
                console.log("scope:", scope);
                if (scope.focado) {
                    element[0].focus();
                }
            })
            */
            scope.$on("fotoCadastrada", function(){
                console.log("arguments:", arguments);
                element[0].focus();
            })
        }

        return ddo;
    });