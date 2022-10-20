const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const promoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
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
    description: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Promotions = mongoose.model("Promotion", promoSchema);
module.exports = Promotions;
