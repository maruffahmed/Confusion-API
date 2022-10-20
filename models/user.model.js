const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

/**
 * @openapi
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *            _id:
 *              type: string
 *              example: 5f9f1b0b0b1b1b1b1b1b1b1b
 *            firstname:
 *              type: string
 *              example: John
 *            lastname:
 *              type: string
 *              example: Doe
 *            admin:
 *              type: boolean
 *              example: false
 *            username:
 *              type: string
 *              example: john
 *            __v:
 *              type: number
 *              example: 0
 */

var User = new Schema({
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

User.plugin(passportLocalMongoose);

var UserShcema = mongoose.model("User", User);

module.exports = UserShcema;
