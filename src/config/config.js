const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/userModel");

// Configuring the passport local strategy to authenticate users.
passport.use(
    new LocalStrategy(async function (username, password, done) {
        try {
            const user = await User.findOne({ username: username });

            if (!user) {
                return done(null, false, { message: "Incorrect username." });
            }

            const isPasswordValid = await User.verifyPassword(
                password,
                user.password
            );

            if (!isPasswordValid) {
                return done(null, false, { message: "Incorrect password." });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    User.findById(id)
        .then((user) => {
            done(null, user);
        })
        .catch((err) => {
            done(err);
        });
});

// Exporting configuration items.
module.exports = {
    port: process.env.PORT || 3000,
    mongodbURI: process.env.DB_URI,
    secret_key: process.env.SECRET_KEY,
};
