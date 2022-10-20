const express = require("express");
const Leaders = require("../models/leaders.model");
const authenticate = require("../authenticate");
const leadersRouter = express.Router();

leadersRouter.get("/", (req, res, next) => {
  Leaders.find({})
    .then(
      (leaders) => {
        res.json(leaders);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

leadersRouter.post(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    Leaders.create(req.body)
      .then(
        (leaders) => {
          res.json(leaders);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  }
);

leadersRouter.put(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    res.statusCode = 403;
    res.send("PUT operation not supported on /leaders");
  }
);

leadersRouter.delete(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    Leaders.remove({})
      .then(
        (resp) => {
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  }
);

// Id
leadersRouter.get("/:leaderId", (req, res, next) => {
  let id = req.params.leaderId;
  Leaders.findById(id)
    .then(
      (leader) => {
        res.json(leader);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

leadersRouter.post(
  "/:leaderId",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    let id = req.params.leaderId;
    res.statusCode = 403;
    res.end(`POST operation is not supported on /leaders/${id}`);
  }
);

leadersRouter.put(
  "/:leaderId",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    let id = req.params.leaderId;
    Leaders.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (leader) => {
          res.json(leader);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  }
);

leadersRouter.delete(
  "/:leaderId",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    let id = req.params.leaderId;
    Leaders.findByIdAndRemove(id)
      .then(
        (resp) => {
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  }
);

module.exports = leadersRouter;
