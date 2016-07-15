angular
    .module('greet')
    .controller('GreetController', GreetController);

function GreetController($scope, greetService) {
    $scope.greet = {message: 'Hello world!'};
    $scope.newGreet = {message: ''};
    $scope.messages = [];

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
                $scope.messages.push({type: 'error', message: error});
            })
    }

    function setNewGreet(greet) {
        greetService
            .setGreeting(greet)
            .then(() => {
                $scope.messages.push({type: 'success', message: 'Message changed!'});
            })
            .catch((error) => {
                $scope.messages.push({type: 'error', message: error});
            })
    }
}
