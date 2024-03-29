import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    imageLink: {
      type: String,
      required: true,
    },
    websiteLink: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
