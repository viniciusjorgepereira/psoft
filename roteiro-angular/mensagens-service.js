(function () {
    const app = angular.module('mural');
    app.service('Mensagens', function MensagensCtrl() {
        const service = {};
        service.mensagens = [
            { autor: "fulano", texto: "mensagem 1" },
            { autor: "beltrano", texto: "outra mensagem" },
            { autor: "sicrano", texto: "terceira mensagem" },
            { autor: "beltrano", texto: "quarta mensagem" }
        ];
        return service;
    });
}());