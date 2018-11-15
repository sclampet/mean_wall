const User = require('mongoose').model('User');

module.exports = {
   login(req,res){
      User.findOne({ username : req.body.username })
         .then(function(user){

            if(!user) return res.json({success : false, errorMessage : 'No Such Credentials'});

            if(!req.body.password) return res.json({success : false, errorMessage : 'Password is required'});

            return User.verifyPassword(req.body.password, user.password)
               .then(function(result){

                  // since bcrypt promise does not prevent us from entering this promise, verify we got a valid password match, otherwise exit immeditately
                  if(!result) return res.json({ success : false, errorMessage : 'Password incorrect' });

                  attachSession(req, res, user);
                  res.json({ success : true, user });
               });
         })
         .catch(handleError.bind(res));
   },

   register(req, res){
      if(req.body.user === undefined) return res.json({ success : false, errorMessage : 'You cannot register with empty fields.' });

      if (req.body.user.password !== req.body.passwordConf) return res.json({ success : false, errorMessage : 'Passwords do not match!'});

      User.create(req.body.user)
         .then(function(user){
            attachSession(req, res, user);
            res.json({ success : true, user });
         })
         .catch(handleError.bind(res));
   },

   logout(req,res){
      console.log('destroy user');
      req.session.destroy();
      res.clearCookie('userID');
      res.clearCookie('expiration');
      res.json({ success : true });
   },

   getUser(req,res){
      User.findOne({_id : req.cookies.userID })
         .then(function(user){
            res.json({ success : true, user : {_id : user._id, name : user.name}});
         })
         .catch(handleError.bind(res));
   },
};

function attachSession(req, res, user){
   // console.log('Attaching:',user);
   req.session.user = user;
   res.cookie('userID', user._id.toString());
   res.cookie('expiration', Date.now() + 86400 * 1000);
}

function handleError(error){
   // console.log(error);
   if(error.name === 'ValidationError'){
      this.json({success: false, error : error.errors})
   } else {
      this.status(500).json({ success : false, errorMessage : error.message });
   }
}
