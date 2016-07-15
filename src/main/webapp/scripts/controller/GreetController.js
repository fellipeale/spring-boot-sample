(() => { 
    angular
        .module('greet')
        .controller('GreetController', GreetController);

    function GreetController($scope, greetService) {
        const MSG_MIN_SIZE = 5;
        const MSG_MAX_SIZE = 300;

        $scope.newGreet = {message: ''};
        $scope.alerts = [];

        getActualGreet();

        $scope.submit = () => {
            let newMessage = $scope.newGreet.message;
            if (newMessage.length < MSG_MIN_SIZE || newMessage.length > MSG_MAX_SIZE) {
                $scope.alerts.push({type: 'danger', message: 'There is an error: size must be between 5 and 300.'});
                return;
            }

            setNewGreet($scope.newGreet, () => {
                getActualGreet(); //when one-time binding is disabled the message is updated right after the end of the request
            });
            $scope.newGreet = '';
        }

        function getActualGreet() {
            greetService
                .getGreeting()
                .then((resp) => {
                    $scope.greet = resp.data;
                })
                .catch(() => {
                    $scope.alerts.push({type: 'danger', message: 'There is an error, please try again later.'});
                })
        }

        function setNewGreet(greet, callback) {
            greetService
                .setGreeting(greet)
                .then(() => {
                    $scope.alerts.push({type: 'success', message: 'Message changed! Due to one-time binding refresh the page to see the new message.'});
                    callback();
                })
                .catch((error) => {
                    message = 
                    $scope.alerts.push({type: 'danger', message: 'There is an error, please try again later.'});
                })
        }
    }
})();
