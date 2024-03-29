import asyncHandler from "express-async-handler";
import Portfolio from "../models/portfolio.js";

const addPortfolio = asyncHandler(async (req, res) => {
  console.log("we are here inside addPortfolio");

  const { image, link, description } = req.body;

  const portfolio = await Portfolio.create({
    imageLink: image,
    websiteLink: link,
    description: description,
  });

  res.status(201).json(portfolio);
});

export { addPortfolio };
