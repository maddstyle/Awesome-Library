// routes/auth.routes.js
const {Router} = require('express');
const router = new Router();
const passport = require('passport');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const ensureLogin = require('connect-ensure-login');

// auth.routes.js
// .get() route ==> to display the signup form to users
router.get('/signup', (req, res) => res.render('auth/signup'));

// .post() route ==> to process form data
router.post('/signup', (req, res, next) => {
  const {
    username,
    email,
    password
  } = req.body;

  bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
      console.log(`Password hash: ${hashedPassword}`);
    })
    .catch(error => next(error));
  

  // .post() route ==> to process form data
  router.post('/signup', (req, res, next) => {
    console.log('The form data: ', req.body);
  });
});

// .get() route for login
router.get('/login', (req, res, next) => {
  res.render('auth/login', { message: req.flash('error') });
});
// .post() route for login
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
    passReqToCallback: true
  })
);

router.get('/private-page', ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('private', { user: req.user });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;