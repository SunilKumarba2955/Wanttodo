const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportLocal = require('../config/passport-local-strategy');

const userController = require('../controllers/usercontroller');
router.get('/wanttodo', passport.checkAuthentication, userController.wanttodo);
router.get('/login', userController.login);
router.get('/signup', userController.signup);

router.post('/create', userController.create);

// Manual Authentication
// router.post('/create-session', userController.create_session);

// Authenticating using passport JS
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/login" }),
  userController.create_session
);

router.get('/exit-session', userController.exit_session);

// console.log('Router is Loaded');

module.exports = router;