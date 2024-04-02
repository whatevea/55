import asyncHandler from "express-async-handler";
import Portfolio from "../models/portfolio.js";

const addPortfolio = asyncHandler(async (req, res) => {
  const { image, link, description, userId } = req.body;

  const portfolio = await Portfolio.create({
    imageLink: image,
    websiteLink: link,
    description: description,
    userId: userId,
  });

  res.status(201).json(portfolio);
});

const getPortfolio = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  try {
    const portfolios = await Portfolio.find({ userId: userId });
    res.status(200).json({ portfolios });
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    res.status(500).json({ message: "Error fetching portfolios" });
  }
});

export { addPortfolio, getPortfolio };
