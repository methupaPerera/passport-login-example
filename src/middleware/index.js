const passport = require("passport");

const ensureAuthenticated = (req, res, next) => {
    const isAuthenticated = req.isAuthenticated();
    const isLoginPage = req.path === "/login";

    // Making sure unauthenticated user stays in the log in page.

    if (!isAuthenticated && isLoginPage) {
        return next();
    }

    if (isAuthenticated && isLoginPage) {
        return res.redirect("/home");
    }

    if (!isAuthenticated) {
        req.flash("error", "Please log in.");
        return res.redirect("/login");
    }

    return next();
};

// Middleware for authenticating users for protected routes.
const authenticateUser = passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true,
});

module.exports = {
    ensureAuthenticated,
    authenticateUser,
};
