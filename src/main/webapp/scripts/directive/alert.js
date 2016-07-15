(()=> {
    angular
        .module('greet')
        .directive('alert', alert);

    function alert() {
        const DELAY_TIME = 3000;
        const FADE_TIME = 1000; 

        return {
            templateUrl: 'scripts/directive/alert.html',
            restrict: 'E',
            scope: {
                alerts: '='
            },
            link(scope, element) {
                scope.$watchCollection('alerts', () => {
                    $(element)
                        .find('.alert:visible')
                        .each((index, child) => {
                            $(child).delay(DELAY_TIME).fadeOut(FADE_TIME);
                        });
                });
            }
        }
    }
})()
