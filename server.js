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

var maxAge = 1000 * 60 * 60;

app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(flash())
app.use(cookieParser());
app.use(session({
    secret: "secret-key",
    resave: true,
    saveUninitialized: true
}))



require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

app.engine("handlebars", exphbs({ defaultLayout: "main" })
);
app.set("view engine", "handlebars");

app.set('trust proxy', true)


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