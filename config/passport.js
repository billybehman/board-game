var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
function initialize() {

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

    // In order to help keep authentication state across HTTP requests,
    // Sequelize needs to serialize and deserialize the Player
    // Just consider this part boilerplate needed to make it all work
    passport.serializeUser(function (Player, cb) {
        cb(null, Player);
    });

    passport.deserializeUser(function (obj, cb) {
        cb(null, obj);
    });

}

// Exporting our configured passport
module.exports = initialize;
