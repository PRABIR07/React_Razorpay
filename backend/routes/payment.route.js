const { Router } = require("express");
const shortid = require("shortid");
const router = Router();
const razorpay = require("../config/razorpay.config");

router.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const amount = 19;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    //console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error?.message || "Something broke");
  }
});

module.exports = router;
