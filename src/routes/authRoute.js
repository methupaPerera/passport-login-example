const express = require("express");
const router = express.Router();

const { ensureAuthenticated, authenticateUser } = require("../middleware");
const { signupController } = require("../controllers/authControllers");

router
    .route("/login")
    .get(ensureAuthenticated, (req, res) => {
        return res.render("layout", { page: "/login", title: "Log in" });
    })
    .post(authenticateUser);

router
    .route("/signup")
    .get((req, res) => {
        return res.render("layout", { page: "/signup", title: "Sign up" });
    })
    .post(signupController);

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        return res.redirect("/login");
    });
});

module.exports = router;
