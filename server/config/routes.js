const path = require('path');

const Auth = require(path.resolve('server','controllers','auth'));
const messagesController = require(path.resolve('server','controllers', 'messages'));
const commentsController = require(path.resolve('server','controllers','comments'));

module.exports = function(app){
   app
   .post('/login', Auth.login)
   .post('/register', Auth.register)
   .delete('/logout/:id', Auth.logout)
   .get('/user', Auth.getUser)
   .get('/messages',messagesController.index)
   .post('/message',messagesController.create)
   .post('/comment',commentsController.create);
   // .get('/comments/:id',commentsController.getComments);
};
