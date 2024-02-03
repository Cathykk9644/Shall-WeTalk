const BaseController = require('./base.controller');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

class AuthController extends BaseController {
  constructor(db) {
    super();
    this.db = db;
    this.initializePassport();
  }

  initializePassport() {
    passport.use(
      new LocalStrategy(
        {
          usernameField: 'email',
          passwordField: 'password',
        },
        async (email, password, done) => {
          try {
            // Find the user with the provided email
            const user = await this.db.user.findOne({ where: { email } });

            // If the user doesn't exist, return error
            if (!user) {
              return done(null, false, {
                message: 'Incorrect email or password.',
              });
            }

            // Compare the provided password with the stored hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);

            // If the passwords don't match, return error
            if (!passwordMatch) {
              return done(null, false, {
                message: 'Incorrect email or password.',
              });
            }

            // If authentication is successful, return the user
            return done(null, user);
          } catch (error) {
            return done(error);
          }
        }
      )
    );
  }

  register(req, res) {
    // Handle the registration logic
    // Extract the email and password from the request body
    const { email, password } = req.body;

    // Generate a salt and hash the password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    // Create a new user record in the database
    this.db.user
      .create({ email, password: hashedPassword })
      .then((user) => {
        // Redirect or send a response indicating successful registration
        res.redirect('/login');
      })
      .catch((error) => {
        // Handle the registration error
        console.error(error);
        // Redirect or send a response indicating the error
        res.redirect('/register');
      });
  }

  logout(req, res) {
    // Handle the logout logic
    req.logout(); // Passport method to clear the login session
    res.redirect('/'); // Redirect to the home page or any desired destination after logout
  }

  login(req, res) {
    // Handle the login request
    passport.authenticate('local', {
      successRedirect: '/profile',
      failureRedirect: '/login',
    })(req, res);
  }
}

module.exports = AuthController;
