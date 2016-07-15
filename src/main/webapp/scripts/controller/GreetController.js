(() => { 
    angular
        .module('greet')
        .controller('GreetController', GreetController);

    function GreetController($scope, greetService) {
        $scope.greet = {message: 'Hello world!'};
        $scope.newGreet = {message: ''};
        $scope.alerts = [];

        getActualGreet();

        $scope.submit = () => {
            setNewGreet($scope.newGreet);
            $scope.newGreet = '';
            getActualGreet();
        }

        function getActualGreet() {
            greetService
                .getGreeting()
                .then((resp) => {
                    $scope.greet = resp.data;
                })
                .catch((error) => {
                    $scope.alerts.push({type: 'danger', message: error});
                })
        }

        function setNewGreet(greet) {
            greetService
                .setGreeting(greet)
                .then(() => {
                    $scope.alerts.push({type: 'success', message: 'Message changed!'});
                })
                .catch((error) => {
                    $scope.alerts.push({type: 'danger', message: error});
                })
        }
    }
})();
