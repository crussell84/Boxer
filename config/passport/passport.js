const bCrypt = require("bcrypt-nodejs");

module.exports = (passport, user) => {
    const User = user;
    const LocalStrategy = require("passport-local").Strategy;

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then((user) => {
            if(user) {
                done(null, user.get());
            }

            else {
                done(user.errors, null);
            }
        });        
    });

    passport.use("local-signup", new LocalStrategy({
        usernameField: "username",
        passwordFeild: "password",
        passReqToCallback: true
    }, (req, username, password, done) => {
        const generateHash = (password) => {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
        }

        User.findOne({
            where: {
                username: username
            }
        }).then((user) => {
            if(user) {
                return done(null, false, {message: "That username is already taken"});
            }

            else {
                let userPassword = generateHash(password);
                const data = {
                    username: username,
                    password: userPassword
                }
                
                User.create(data).then((newUser, created) => {
                    if(!newUser) {
                        return done(null, false);
                    }

                    if(newUser) {
                        return done(null, newUser);
                    }
                });
            }
        });
    }));

    passport.use("local-signin", new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, username, password, done) => {
        const User = user;

        const isValidPassword = (userpass, password) => {
            return bCrypt.compareSync(password, userpass);
        }

        User.findOne({
            where: {
                username: username
            }
        }).then((user) => {
            if(!user || !isValidPassword(user.password, password)) {
                return done(null, false, {message: 'Username or Password is incorrect'})
            }

            const userinfo = user.get();

            return done(null, userInfo);
        }).catch((err) => {
            console.log(`Error: ${err}`);

            return done(null, false, {message: "There was an issue loggin in"});
        })        
    }));
}