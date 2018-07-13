(function () {
    const app = angular.module('mural');
    app.controller('AppCtrl', AppCtrl);
    app.controller('AppNumericCtrl', AppNumericCtrl);

    function AppCtrl($timeout) {
        const vm = this;
        vm.msg = "oi (vindo do controller)";
        $timeout(function () {
            vm.msg = 'OI!!! (mudado pelo controller)';
        }, 3000)
    };

    function AppNumericCtrl() {
        const vm = this;
        vm.title = "Controller com propriedades numericas";
        vm.num = 11;
        vm.date = "Qua 11 de Jul de 2018";
    }
}());