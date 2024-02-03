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
            const user = await this.db.users.findOne({ where: { email } });

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

    passport.serializeUser((user, done) => {
      // Serialize the user object (e.g., store the user id in the session)
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      // Deserialize the user object (e.g., retrieve the user from the database based on the id)
      this.db.users
        .findByPk(id)
        .then((user) => {
          done(null, user);
        })
        .catch((error) => {
          done(error);
        });
    });
  }

  register = async (req, res) => {
    // Handle the registration logic
    // Extract the email and password from the request body
    try {
      const {
        username,
        email,
        password,
        plantype,
        bio,
        imageURL,
        userAddress,
      } = req.body;

      // Generate a salt and hash the password
      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(password, saltRounds);
      const newUser = {
        username: username,
        email: email,
        password: hashedPassword,
        planType: plantype,
        bio: bio,
        imageURL: imageURL,
        userAddress: userAddress,
      };

      // Create a new user record in the database
      const createdUser = await this.db.users.create(newUser);
      req.session.userId = createdUser.id;
      res.status(200).json('successful registration');
    } catch (error) {
      console.log(error);
      res.redirect('/register');
    }
  };

  logout(req, res, next) {
    // Handle the logout logic
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      // Logout the user from Passport
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });

      // Redirect or send a response as needed
      res.send('Logged out successfully');
    });
  }

  login(req, res, next) {
    try {
      passport.authenticate('local', (err, user, info) => {
        if (err) {
          // Handle error
          return next(err);
        }

        if (!user) {
          // Authentication failed
          return res
            .status(401)
            .json({ message: 'Incorrect email or password.' });
        }

        req.login(user, (err) => {
          if (err) {
            // Handle error
            return next(err);
          }

          // Set session data
          req.session.userId = user.id;

          // Successful login
          return res.status(200).json({ message: 'Login successful' });
        });
      })(req, res, next);
    } catch (error) {
      console.log(error);
      // Handle error
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = AuthController;
