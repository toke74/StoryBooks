const mongoose = require("mongoose");
const Story = mongoose.model("stories");
const User = mongoose.model("users");

const validateStoryInput = require("../validation/story");

const { ensureAuthenticated, ensureGuest } = require("../helpers/auth");

module.exports = app => {
  // Stories Index
  app.get("/api/public/show", (req, res) => {
    Story.find({ status: "public" })
      .populate("user")
      .sort({ date: "desc" })
      .then(stories => {
        res.json({ stories });
      });
  });

  // Logged in users stories
  app.get("/api/my", ensureAuthenticated, (req, res) => {
    Story.find({ user: req.user.id })
      .populate("user")
      .then(stories => {
        res.json({ stories });
      });
  });

  // Logged in users stories
  app.get("/api/my/stories/:id", ensureAuthenticated, (req, res) => {
    Story.find({ user: req.user.id })
      .populate("user")
      .then(stories => {
        res.json({ stories });
      });
  });

  // Show Single Story
  app.get("/api/show/:id", (req, res) => {
    Story.findOne({
      _id: req.params.id
    })
      .populate("user")
      .populate("comments.commentUser")
      .then(story => {
        if (story.status == "public") {
          res.json({ story });
        } else {
          if (req.user) {
            if (req.user.id == story.user._id) {
              res.json({ story });
            } else {
              res.redirect("/dashboard");
            }
          } else {
            res.redirect("/dashboard");
          }
        }
      });
  });

  // List public stories from a user
  app.get("/api/user/stories/:userId", (req, res) => {
    Story.find({ user: req.params.userId, status: "public" })
      .populate("user")
      .then(story => {
        res.json({ story });
      });
  });

  // Process Add Story
  app.post("/api/add", ensureAuthenticated, (req, res) => {
    const { errors, isValid } = validateStoryInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newStory = {
      title: req.body.title,
      body: req.body.body,
      status: req.body.status,
      allowComments: req.body.allowComments,
      user: req.user.id
    };

    // Create Story
    new Story(newStory).save().then(story => {
      res.json({ story });
    });
  });

  // Edit Form Process
  app.put("/api/edit/:id", ensureAuthenticated, (req, res) => {
    Story.findOne({
      _id: req.params.id
    }).then(story => {
      // New values
      story.title = req.body.title;
      story.body = req.body.body;
      story.status = req.body.status;
      story.allowComments = req.body.allowComments;

      story.save().then(story => {
        res.json({ story });
      });
    });
  });

  // Delete Story
  app.delete("/api/delete/:id", ensureAuthenticated, (req, res) => {
    Story.remove({ _id: req.params.id }).then(story => {
      res.json({ story });
    });
  });
};
