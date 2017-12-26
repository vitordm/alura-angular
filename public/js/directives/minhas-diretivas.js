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
    });