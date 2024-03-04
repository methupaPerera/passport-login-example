const User = require("../models/userModel");

const signupController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ username });

        // If a user already exists, users can't sign up.
        if (existingUser) {
            req.flash("error", "User already exists.");
            return res.redirect("/signup");
        }

        const newUser = new User({ username, password, email });

        await newUser.save();

        // Log in the user after signing up.
        req.login(newUser, (error) => {
            if (error) {
                req.flash("error", "Something went wrong.");
                return res.redirect("/signup");
            }

            return res.redirect("/home");
        });
    } catch (error) {
        req.flash("error", "Something went wrong.");
        return res.redirect("/signup");
    }
};

module.exports = { signupController };
