const express = require("express");
const Promotions = require("../models/promotions.model");
const authenticate = require("../authenticate");
const promoRouter = express.Router();

promoRouter.get("/", (req, res, next) => {
  Promotions.find({})
    .then(
      (promotions) => {
        res.json(promotions);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

promoRouter.post(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    Promotions.create(req.body)
      .then(
        (promotions) => {
          res.json(promotions);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  }
);

promoRouter.put(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    res.statusCode = 403;
    res.send("PUT operation not supported on /promotions");
  }
);

promoRouter.delete(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    Promotions.remove({})
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
promoRouter.get("/:promoid", (req, res, next) => {
  let id = req.params.promoid;
  Promotions.findById(id)
    .then(
      (promo) => {
        res.json(promo);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

promoRouter.post(
  "/:promoid",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    let id = req.params.promoid;
    res.statusCode = 403;
    res.end(`POST operation is not supported on /promotions/${id}`);
  }
);

promoRouter.put(
  "/:promoid",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    let id = req.params.promoid;
    Promotions.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (promo) => {
          res.json(promo);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  }
);

promoRouter.delete(
  "/:promoid",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    let id = req.params.promoid;
    Promotions.findByIdAndRemove(id)
      .then(
        (resp) => {
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  }
);

module.exports = promoRouter;
