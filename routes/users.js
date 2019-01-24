const passport = require("passport");
const mongoose = require("mongoose");

//load keys file
const keys = require("../config/keys");

//load model file
const User = mongoose.model("users");

module.exports = app => {
  //google auth
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      prompt: "select_account"
    })
  );

  app.get(
    "/auth/google/redirect",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/dashboard");
    }
  );

  //github auth
  app.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["profile", "user:email"] })
  );

  app.get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/" }),
    function(req, res) {
      res.redirect("/dashboard");
    }
  );

  app.get("/api/delete/me", async (req, res) => {
    await req.user.delete();
    req.logout();
    res.send("deleted user");
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.json(req.user);
  });
};
