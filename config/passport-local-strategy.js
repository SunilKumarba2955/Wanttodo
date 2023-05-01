const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/users");

// authentication using passport
passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      function (email, password, done) {
        User.findOne({ email: email })
          .then(function (user) {
            if (!user || user.password !== password) {
              console.log("Invalid Username/Password");
              return done(null, false);
            }
            return done(null, user);
          })
          .catch(function (err) {
            console.log("Error in finding user --> Passport");
            return done(err);
          });
      }
    )
  );
  

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser( function(user, done) {
    done(null, user.id);
});

// Deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then(function (user) {
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    })
    .catch(function (err) {
      console.log("Error in finding user --> Passport");
      return done(err);
    });
});

// Check if user is authenticated
passport.checkAuthentication = function(req, res, next) {
    // if the user is signed in, then pass on the request to next function(controller's action)
    if(req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/users/login');
}

passport.setAuthenticatedUser = function(req, res, next) {
    if(req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;