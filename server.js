const express = require('express');
const parser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

const sessionConfig = {
   secret : 'TheCookieMonsterLovesCookies',
   resave : false,
   saveUninitialized : true,
   name : 'myAppCookie',
   cookie : {
      secure : false,
      httpOnly : false,
      maxAge : 3600000,
   }
};

require(path.resolve('server','config','db'));

app.use(express.static(path.resolve('client')))
   .use(express.static(path.resolve('bower_components')))
   .use(cookieParser('cookieParser'))
   .use(parser.json())
   .use(session(sessionConfig));


require(path.resolve('server','config','routes'))(app);

app.listen(port, function(){
   console.log(`listening on port ${port}`);
});
