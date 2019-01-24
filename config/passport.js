const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const mongoose = require("mongoose");
const keys = require("./keys");

const User = mongoose.model("users");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleKeys.clientID,
      clientSecret: keys.googleKeys.clientSecret,
      callbackURL: "/auth/google/redirect",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleID: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }
      const image = profile.photos[0].value.substring(
        0,
        profile.photos[0].value.indexOf("?")
      );

      const user = await new User({
        googleID: profile.id,
        googleAccessToken: accessToken,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        image: image
      }).save();
      done(null, user);
    }
  )
);

//Github Strategy
passport.use(
  new GithubStrategy(
    {
      clientID: keys.githubKeys.clientID,
      clientSecret: keys.githubKeys.clientSecret,
      scope: ["user:email"],
      callbackURL: "/auth/github/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      const image = profile.photos[0].value.substring(
        0,
        profile.photos[0].value.indexOf("?")
      );

      const fName = profile.displayName.substring(
        0,
        profile.displayName.indexOf(" ")
      );

      const lName = profile.displayName.substring(
        profile.displayName.indexOf(" "),
        profile.displayName.length
      );

      const newUser = {
        githubID: profile.id,
        githubAccessToken: accessToken,
        firstName: fName,
        lastName: lName,
        email: profile.emails[0].value,
        image: image
      };

      // Check for existing user
      User.findOne({
        githubID: profile.id
      }).then(existingUser => {
        if (existingUser) {
          // Return user
          done(null, existingUser);
        } else {
          // Create user
          new User(newUser).save().then(user => done(null, user));
        }
      });
    }
  )
);

//JWT auth
passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => console.log(err));
  })
);
