const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @openapi
 * components:
 *  schemas:
 *    Comment:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          example: 5f9f1b0b0b1b1b1b1b1b1b1b
 *        rating:
 *          type: number
 *          example: 5
 *        comment:
 *          type: string
 *          example: Imagine all the eatables, living in conFusion!
 *        author:
 *          $ref: '#/components/schemas/User'
 *        createdAt:
 *          type: string
 *          example: 2020-11-01T20:00:00.000Z
 *        updatedAt:
 *          type: string
 *          example: 2020-11-01T20:00:00.000Z

 */

const commentSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @openapi
 * components:
 *  schemas:
 *   Dish:
 *    type: object
 *    properties:
 *     _id:
 *       type: string
 *       example: 5f9f1b0b0b1b1b1b1b1b1b1b
 *     name:
 *       type: string
 *       example: Uthappizza
 *     image:
 *       type: string
 *       example: images/uthappizza.png
 *     category:
 *       type: string
 *       example: m
 *     label:
 *       type: string
 *       example: Hot
 *     price:
 *       type: number
 *       example: 4.99
 *     description:
 *       type: string
 *       example: A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.
 *     featured:
 *       type: boolean
 *       example: false
 *     comments:
 *       type: array
 *       items:
 *        $ref: '#/components/schemas/Comment'
 *     createdAt:
 *       type: string
 *       example: 2020-11-01T20:00:00.000Z
 *     updatedAt:
 *       type: string
 *       example: 2020-11-01T20:00:00.000Z
 *     __v:
 *       type: number
 *       example: 3
 */

const dishSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Dishes = mongoose.model("Dishe", dishSchema);
module.exports = Dishes;
