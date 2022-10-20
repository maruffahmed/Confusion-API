var express = require("express");
var router = express.Router();
const User = require("../models/user.model");
var passport = require("passport");
var authenticate = require("../authenticate");

/* GET users listing. */
router.get(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  function (req, res, next) {
    User.find({})
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        next(err);
      });
  }
);

router.post("/signup", function (req, res, next) {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.json({ err });
      } else {
        if (req.body.firstname) {
          user.firstname = req.body.firstname;
        }
        if (req.body.lastname) {
          user.lastname = req.body.lastname;
        }
        user.save((err, user) => {
          if (err) {
            res.json({ err });
            return;
          }
          passport.authenticate("local")(req, res, () => {
            res.json({ success: true, status: "Registration successful" });
          });
        });
      }
    }
  );
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  var token = authenticate.getToken({ _id: req.user._id });
  res.json({
    success: true,
    token: token,
    status: "You are succesfully loged in",
  });
});

router.get("/logout", (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    var err = new Error("Your are not loged in");
    err.status = 403;
    next(err);
  }
});

module.exports = router;
