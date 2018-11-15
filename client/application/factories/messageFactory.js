angular.module('myApp')
   .factory('messageFactory',['$http',function($http){
      const factory = {};

      factory.messages = [];

      factory.index = function(){
         $http.get('/messages')
            .then(function(response){
               // console.log(response.data);
               Object.assign(factory.messages, response.data);
            })
            .catch(console.log);
      };

      factory.create = function(message, user){
         // console.log('factory:',message);

         $http.post('/message', { message : message})
            .then(function(response){
               factory.index();
            })
            .catch(console.log);
      };
      
      return factory;
   }]);
