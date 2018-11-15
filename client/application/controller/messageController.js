angular.module('myApp')
   .controller('messageController',
      ['$scope','$location','AuthService', 'messageFactory', 'commentFactory',
         function($scope, $location, auth, messageFactory, commentFactory){
            if(!auth.isAuthed()){
               console.log('Nice try! LOLZ');
               return $location.path('/');
            }

            $scope.index = function(){
               messageFactory.index();
            }

            $scope.getUser = function(){
               auth.getUser()
                  .then(function(response){
                     $scope.userName = response.data.user.name.first + " " + response.data.user.name.last;
                  })
                  .catch(function(error){
                     console.log(error);
                  });
            }();

            $scope.logout = function(){
               auth.logout()
                  .then(function(response){
                     $location.path('/');
                  })
                  .catch(function(error){
                     console.log(error);
                  });
            };

            $scope.messages = messageFactory.messages;


            $scope.addMessage = function(){
               // console.log('addMessage:',$scope.newMessage);
               messageFactory.create($scope.newMessage);
               $scope.newMessage = '';
            }

            $scope.addComment = function(messageID){
               // console.log('messageID:',messageID);
               var message = $scope.messages.find(function(message){
                  return message._id === messageID;
               });

               if(message){
                  commentFactory.createComment(messageID, message.newComment, $scope.index);
                  message.newComment = '';
               }
            }

            $scope.getComments = function(messageID){
               // console.log(messageID);
               var message = $scope.messages.find(function(message){
                  return message._id === messageID;
               });
               if(message){
                  commentFactory.getComments(messageID, function(comments){
                     message._comments = comments;
                  });
               }
            };
         }
      ]
   )
