angular
    .module('greet')
    .factory('greetService', greetService);

function greetService($http, API_ENDPOINT) {
    let service = {};

    service.getGreeting = () => {
        return $http.get(API_ENDPOINT + '/greeting');
    }

    service.setGreeting = (message) => {
        return $http.post(API_ENDPOINT + '/greeting', message);
    }

    return service;
}