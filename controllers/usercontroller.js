const User = require("../models/users");

// Wanttodo File rendering
module.exports.wanttodo = function (req, res) {
  return res.render("wanttodo", {
    title: 'Wanttodo - Your task mate'
  });
};

// rendering the SignUp page
module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/wanttodo");
  }

  return res.render("signup", {
    title: "Sign Up | Wanttodo",
  });
};

// rendering the SignIn page
module.exports.login = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/wanttodo");
  }

  return res.render("login", {
    title: "Login | Wanttodo",
  });
};

// GetSign Up data and Create user
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    console.log("Confirm password and Password are not matching");
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email })
    .then(function (user) {
      if (user) {
        console.log("User is already present");
        return res.redirect("back");
      } else {
        User.create(req.body)
          .then(function () {
            console.log("Successfully User Identity created");
            return res.redirect("/users/login");
          })
          .catch(function (err) {
            console.log("Error in creating user: ", err);
            return res.redirect("back");
          });
      }
    })
    .catch(function (err) {
      console.log("Error in finding up user while signing up: ", err);
      return res.redirect("back");
    });
};

// Using post data create the session
module.exports.create_session = function (req, res) {
  return res.redirect("wanttodo");
};

// Logout or Exist from created session
module.exports.exit_session = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.redirect("/users/login");
  });
};
