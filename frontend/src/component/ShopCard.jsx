import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const ShopCard = ({ img, dress_Name, color, size }) => {
  const [data, setData] = useState({
    currency: "INR",
    amount: 19,
    id: 555,
  });

  const LoadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    LoadScript("https://checkout.razorpay.com/v1/checkout.js");
  });

  const displayContent = async () => {
    try {
      const response = await axios.post("http://localhost:8000/razorpay");

      console.log(response);
      const { amount, id: order_id, currency } = response.data;
      const options = {
        key: "rzp_test_iRDdGIt1gSzbZU",
        currency: currency,
        amount: amount,
        name: "iNeuron online",
        description: "Test Wallet Transaction",
        order_id: order_id,
        handler: function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        prefill: {
          name: "Prabir Kumar",
          email: "prabir@gmail.com",
          contact: "9999999765",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-white">
        <div className="max-w-3xl py-16 px-8 mx-auto">
          <h1 className="text-3xl font-bold text-center">Shopping Cart</h1>
          <div className="flex justify-between border-t-2 p-4 mt-4">
            <div className="flex">
              <img src={img} alt="img" className="w-40 h-30" />
              <div className="flex flex-col justify-between ml-8">
                <div className="space-y-0.5">
                  <h3>{dress_Name}</h3>
                  <h5 className="text-sm text-gray-500">{color}</h5>
                  <h5 className="text-sm text-gray-500">{size}</h5>
                </div>
                <h5 className="text-gray-700">In stock</h5>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <h3>{data.amount}</h3>
              <button className="text-md text-indigo-500">Remove</button>
            </div>
          </div>

          <div className="flex justify-between border-t-2 mt-5">
            <div className="mt-6 space-y-1">
              <h4>Subtotal</h4>
              <p>Shipping and taxes will be calculated at checkout</p>
            </div>
            <div>
              <h6 className="mt-6">{data.amount}</h6>
            </div>
          </div>
          <button
            onClick={displayContent}
            type="button"
            className="w-[700px] border-solid border-2 rounded bg-indigo-600 text-md text-white mt-4 p-3"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default ShopCard;
