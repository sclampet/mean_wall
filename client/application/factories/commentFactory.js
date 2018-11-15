angular.module('myApp')
   .factory('commentFactory',['$http',function($http){
      const factory = {};

      factory.comments = [];

      factory.createComment = function(messageID, comment, callback){
         // console.log('comment create');
         $http.post('/comment', { messageID : messageID, comment : comment})
            .then(function(response){
               callback();
            })
            .catch(console.log);
      }

      factory.getComments = function(messageID, callback){
         // console.log('fetching comments for message',messageID);
         $http.get('/comments/'+messageID)
            .then(function(response){
               // console.log(response);
               callback(response.data);
            })
            .catch(console.log);
      };


      // no delete or update needed currently

      return factory;
   }]);
