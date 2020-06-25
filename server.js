var express = require("express")

var exphbs = require('express-handlebars');

var db = require("./models");

var passport = require("passport");

var LocalStrategy = require("passport-local").Strategy;

var cookieParser = require('cookie-parser');

const flash = require("flash")

const bodyParser = require("body-parser")

const session = require("express-session")

var app = express()

var PORT = process.env.PORT || 8080;

app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(flash())
app.use(cookieParser());
app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
        usernameField: "name"
    },
    function (name, password, done) {
        // When a user tries to sign in this code runs
        db.Player.findOne({
            where: {
                name: name
            }
        }).then(function (dbPlayer) {
            // If there's no Player with the given email
            if (!dbPlayer) {
                return done(null, false, {
                    message: "Incorrect Playername."
                });
            }
            // If none of the above, return the Player
            return done(null, dbPlayer);
        });
    }
));

passport.serializeUser(function (Player, cb) {
    cb(null, Player);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});



require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

app.engine("handlebars", exphbs({ defaultLayout: "main" })
);
app.set("view engine", "handlebars");


var syncOptions = { force: false };


db.sequelize.sync(syncOptions).then(function () {
    app.listen(PORT, function () {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
        );
    });
});

module.exports = app;