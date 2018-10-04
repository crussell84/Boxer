// npm/file linking
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../../models");

// Use a username/password login strategy
passport.use(new LocalStrategy(
    {
        usernameField: "username",
        passwordField: "password"
    },

    (username, password, done) => {
        db.User.findOne({
            where: {
                username: username
            }
        }).then((dbUser) => {
            // If no user/Incorrect password
            if (!dbUser || !dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect Login Credentials"
                });
            }

            return done(null, dbUser);
        });
    }
));

// Used to add the user in the cookies for checking if user is logged in our not
passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

module.exports = passport;