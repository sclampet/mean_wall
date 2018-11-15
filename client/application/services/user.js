angular.module('myApp')
   .service('UserService',['$http', function($http){
      this.login = function(user){
         return $http.post('/login', user);
      };

      this.register = function(user, passwordConf){
         // pass in user object and password confirmation as one object
         return $http.post('/register', { user : user, passwordConf : passwordConf});
      };
   }]);
