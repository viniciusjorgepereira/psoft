(function () {
    const app = angular.module('mural');
    app.controller('MensagensCtrl', MensagensCtrl);
    function MensagensCtrl(Mensagens) {
        const vm = this;
        vm.adiciona_menssagem = function () {
            vm.mensagens.push(vm.novo);
        };
        vm.mensagens = Mensagens.mensagens;
    }
}());