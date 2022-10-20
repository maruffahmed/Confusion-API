const Dishes = require("../models/dishes.model");

// GET all dishes
async function getAllDishes(req, res) {
  try {
    const dishes = await Dishes.find({}).populate("comments.author");
    res.json({ status: "OK", data: dishes });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
}

// POST create new dish
async function createNewDishe(req, res) {
  try {
    const dish = await Dishes.create(req.body);
    res.status(201).json({ status: "OK", data: dish });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
}

// PUT update dish
async function updateDishe(req, res) {
  res.status(403).json({
    status: "FAILED",
    data: { error: "PUT operation not supported on /dishes" },
  });
}

// DELETE all dishes
async function deleteAllDishe(req, res) {
  try {
    const dish = await Dishes.remove({});
    res.json({ status: "OK", data: dish });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
}

// GET dish by id
async function getDishById(req, res) {
  try {
    const dish = await Dishes.findById(req.params.dishId).populate(
      "comments.author"
    );
    res.json({ status: "OK", data: dish });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
}

// POST create dish by id
async function createDishById(req, res) {
  res.status(403).json({
    status: "FAILED",
    data: {
      error: "POST operation not supported on /dishes/" + req.params.dishId,
    },
  });
}

// PUT update dish by id
async function updateDishById(req, res) {
  try {
    const dish = await Dishes.findByIdAndUpdate(
      req.params.dishId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.json({ status: "OK", data: dish });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
}

// DELETE dish by id
async function deleteDishById(req, res) {
  try {
    const dish = await Dishes.findByIdAndRemove(req.params.dishId);
    res.json({ status: "OK", data: dish });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
}

// GET dish comments by dish id
async function getDishCommentsById(req, res) {
  try {
    const dish = await Dishes.findById(req.params.dishId).populate(
      "comments.author"
    );
    if (dish != null) {
      res.json({ status: "OK", data: dish.comments });
    } else {
      res.status(404).json({
        status: "FAILED",
        data: { error: "Dish " + req.params.dishId + " is not found" },
      });
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
}

// POST dish comments by dish id
async function createDishCommentsById(req, res) {
  try {
    const dishById = await Dishes.findById(req.params.dishId);
    if (dishById != null) {
      req.body.author = req.user._id;
      dishById.comments.push(req.body);
      try {
        const saveDish = await dishById.save();
        if (saveDish) {
          const dish = await Dishes.findById(saveDish._id).populate(
            "comments.author"
          );
          res.status(201).json({ status: "OK", data: dish });
        } else {
          res.status(500).json({
            status: "FAILED",
            data: {
              error: "Dish " + req.params.dishId + " could not be saved",
            },
          });
        }
      } catch (error) {
        res
          .status(error?.status || 500)
          .json({ status: "FAILED", data: { error: error?.message || error } });
      }
    } else {
      res.status(404).json({
        status: "FAILED",
        data: { error: "Dish " + req.params.dishId + " is not found" },
      });
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
}

// PUT dish comments by id
async function updateDishCommentsById(req, res) {
  res.status(403).json({
    status: "FAILED",
    data: {
      error:
        "PUT operation not supported on /dishes/" +
        req.params.dishId +
        "/comments",
    },
  });
}

// DELETE all dish comments by dish id
async function deleteDishCommentsById(req, res) {
  try {
    const dishById = await Dishes.findById(req.params.dishId);
    if (dishById != null) {
      for (var i = dishById.comments.length - 1; i >= 0; i--) {
        dishById.comments.id(dishById.comments[i]._id).remove();
      }
      try {
        const saveDish = await dishById.save();
        res.json({ status: "OK", data: saveDish });
      } catch (error) {
        res
          .status(error?.status || 500)
          .json({ status: "FAILED", data: { error: error?.message || error } });
      }
    } else {
      res.status(404).json({
        status: "FAILED",
        data: { error: "Dish " + req.params.dishId + " is not found" },
      });
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
}

// GET dish comment by dish id and comment id
async function getDishCommentById(req, res) {
  try {
    const dish = await Dishes.findById(req.params.dishId).populate(
      "comments.author"
    );
    if (dish != null && dish.comments.id(req.params.commentId) != null) {
      res.json({ status: "OK", data: dish.comments.id(req.params.commentId) });
    } else if (dish == null) {
      res.status(404).json({
        status: "FAILED",
        data: { error: "Dish " + req.params.dishId + " is not found" },
      });
    } else {
      res.status(404).json({
        status: "FAILED",
        data: { error: "Comment " + req.params.commentId + " is not found" },
      });
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
}

// POST dish comment by dish id and comment id
async function createDishCommentById(req, res) {
  res.status(403).json({
    status: "FAILED",
    data: {
      error:
        "POST operation not supported on /dishes/" +
        req.params.dishId +
        "/comments/" +
        req.params.commentId,
    },
  });
}

// PUT dish comment by dish id and comment id
async function updateDishCommentById(req, res) {
  try {
    const dishById = await Dishes.findById(req.params.dishId);

    if (
      !dishById.comments.id(req.params.commentId).author.equals(req.user._id)
    ) {
      res.status(403).json({
        status: "FAILED",
        data: {
          error: "You are not authorized to perform this operation!",
        },
      });
    }

    if (
      dishById != null &&
      dishById.comments.id(req.params.commentId) != null
    ) {
      if (req.body.rating) {
        dishById.comments.id(req.params.commentId).rating = req.body.rating;
      }
      if (req.body.comment) {
        dishById.comments.id(req.params.commentId).comment = req.body.comment;
      }
      try {
        const saveDish = await dishById.save();
        if (saveDish) {
          const dish = await Dishes.findById(saveDish._id).populate(
            "comments.author"
          );
          res.status(201).json({ status: "OK", data: dish });
        } else {
          res.status(500).json({
            status: "FAILED",
            data: {
              error: "Dish " + req.params.dishId + " could not be saved",
            },
          });
        }
      } catch (error) {
        res
          .status(error?.status || 500)
          .json({ status: "FAILED", data: { error: error?.message || error } });
      }
    } else if (dishById == null) {
      res.status(404).json({
        status: "FAILED",
        data: { error: "Dish " + req.params.dishId + " is not found" },
      });
    } else {
      res.status(404).json({
        status: "FAILED",
        data: { error: "Comment " + req.params.commentId + " is not found" },
      });
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
}

// DELETE dish comment by dish id and comment id
async function deleteDishCommentById(req, res) {
  try {
    const dishById = await Dishes.findById(req.params.dishId);
    if (
      dishById != null &&
      dishById.comments.id(req.params.commentId) != null
    ) {
      if (
        !dishById.comments.id(req.params.commentId).author.equals(req.user._id)
      ) {
        res.status(403).json({
          status: "FAILED",
          data: {
            error: "You are not authorized to perform this operation!",
          },
        });
      }
      dishById.comments.id(req.params.commentId).remove();
      try {
        const saveDish = await dishById.save();
        if (saveDish) {
          const dish = await Dishes.findById(saveDish._id).populate(
            "comments.author"
          );
          res.status(201).json({ status: "OK", data: dish });
        } else {
          res.status(500).json({
            status: "FAILED",
            data: {
              error: "Dish " + req.params.dishId + " could not be saved",
            },
          });
        }
      } catch (error) {
        res.status(error?.status || 500).json({
          status: "FAILED",
          data: { error: error?.message || error },
        });
      }
    } else if (dishById == null) {
      res.status(404).json({
        status: "FAILED",
        data: { error: "Dish " + req.params.dishId + " is not found" },
      });
    } else {
      res.status(404).json({
        status: "FAILED",
        data: { error: "Comment " + req.params.commentId + " is not found" },
      });
    }
  } catch (error) {
    res.status(error?.status || 500).json({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
}

module.exports = {
  getAllDishes,
  createNewDishe,
  updateDishe,
  deleteAllDishe,
  getDishById,
  createDishById,
  updateDishById,
  deleteDishById,
  getDishCommentsById,
  createDishCommentsById,
  updateDishCommentsById,
  deleteDishCommentsById,
  getDishCommentById,
  createDishCommentById,
  updateDishCommentById,
  deleteDishCommentById,
};
