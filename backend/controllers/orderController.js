import asyncHandler from "express-async-handler";
import Order from "../models/order.js";
// import stripe from stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order from frontend

const placeOrder = asyncHandler(async (req, res) => {
  const {
    customerName,
    customerEmail,
    serviceType,
    serviceName,
    serviceDescription,
    price,
  } = req.body;

  if (
    !customerName ||
    !customerEmail ||
    !serviceType ||
    !serviceName ||
    !price
  ) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const formattedPrice = parseFloat(price).toFixed(2); // Format price to 2 decimal places

  const order = new Order({
    customerName,
    customerEmail,
    serviceType,
    serviceName,
    serviceDescription,
    price: formattedPrice, // Use the formatted price value
    status: "completed",
    date: Date.now(),
  });

  try {
    await order.save();
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export { placeOrder };
