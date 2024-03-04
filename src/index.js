require("dotenv").config();
require("./config/db");

const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");

const path = require("path");

const app = express();

const { port, secret_key } = require("./config/config");
const { ensureAuthenticated } = require("./middleware");

// Configuring the views and the ejs engine.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Applying the middlewares.
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    session({ secret: secret_key, resave: false, saveUninitialized: false })
);

app.use(flash());
app.use((req, res, next) => {
    res.locals.successMessages = req.flash("success");
    res.locals.errorMessages = req.flash("error");
    next();
});

app.use(passport.initialize());
app.use(passport.session());

// Defining routes.
const authRouter = require("./routes/authRoute");

app.use("/", authRouter);

app.get("/", (req, res) => {
    res.redirect("/home");
});

app.get("/home", ensureAuthenticated, (req, res) => {
    res.render("layout", {
        page: "/home",
        title: "Home",
        username: req?.user.username ?? "Guest",
    });
});

app.get("/about", (req, res) => {
    res.render("layout", {
        page: "/about",
        title: "About",
    });
});

app.get("*", (req, res) => {
    res.render("layout", { page: "/404", title: "P404 page not found." });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});
