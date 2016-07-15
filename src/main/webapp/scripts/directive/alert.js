(()=> {
    angular
        .module('greet')
        .directive('alert', alert);

    function alert() {
        const FADE_TIME = 5000; 

        return {
            templateUrl: 'scripts/directive/alert.html',
            restrict: 'E',
            scope: {
                alerts: '='
            },
            link(scope, element) {
                scope.$watchCollection('alerts', (newValue, oldValue) => {
                });
            }
        }
    }
})()
