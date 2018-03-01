require('dotenv').config();
var express = require('express');
var session = require('express-session');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var massive = require('massive');
var controller = require ('./controller');

var SESSION_SECRET = process.env.SESSION_SECRET, 
    DOMAIN = process.env.DOMAIN, 
    CLIENT_ID = process.env.CLIENT_ID, 
    CLIENT_SECRET = process.env.CLIENT_SECRET, 
    CALLBACK_URL = process.env.CALLBACK_URL,
    CONNECTION_STRING = process.env.CONNECTION_STRING;
var SERVER_PORT = 3006;

var app = express();
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

massive(CONNECTION_STRING).then( db =>{
  app.set('db', db);
})
.catch( error => console.log(error))

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret:CLIENT_SECRET,
    callbackURL:CALLBACK_URL,
    scope:'openid profile'
}, function (accessToken, refreshToken, extraParams, profile, done) {
    //database calls
    const db = app.get('db');

    const{sub, name} = profile._json
  console.log(profile)
 
    db.find_user([sub])
    .then( user => {
     if ( user[0] ) {
       return done( null, { id: user[0].id } );
     } else {
       db.create_user([name, sub])
       .then( user => {

          return done( null, { id: user[0].id } );
       }) .catch( error => console.log(error))

     }
    }) .catch( error => console.log(error))

  
  
  }));
  
  app.get('/auth', passport.authenticate('auth0'));
  
  app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/StudentHome',
    failureRedirect: 'http://localhost:3000/#/'
  }))
  
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    const db = app.get('db');
    db.find_logged_in_user([user])
    // app.get('db').find_session_user([user.id])
    .then( user => {
      return done(null, user[0]);
    })
  });
  
  app.get('/auth/me', (req, res, next) => {
    if (!req.user) {
      return res.status(401).send('Log in required');
    } else {
      return res.status(200).send(req.user);
    }
  })
  
  app.get('/auth/logout', (req, res) => {
    req.logOut();
    return res.redirect('process.env.REACT_APP_LOGIN/Header/');
  })
  
//student endpoints
app.post('/api/student', controller.addstudent)


  let PORT = 3006;
  app.listen(SERVER_PORT, () => {
      console.log(`Listening on port: ${SERVER_PORT}`);
  })    
  