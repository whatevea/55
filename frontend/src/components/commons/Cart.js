import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
// import PaymentMethodOption from "./PaymentMethodOption";
import CheckoutPaymentMethodOption from "./CheckoutPaymentMethodOption";

const Cart = () => {
  const cart = useSelector((state) => state?.Cart);

  console.log("cart is", cart);

  const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the pop-up

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(
      cart?.reduce((acc, curr) => {
        // Check the job type and add the corresponding budget value
        if (curr.budgetType === "fixedPrice") {
          return acc + curr.budgetFixed;
        } else if (curr.budgetType === "hourlyPrice") {
          return acc + curr.budgetHourlyPrice;
        }
        return acc;
      }, 0)
    );
  }, [cart]);

  const handleCheckout = () => {
    // Show the pop-up component
    setShowPopup(true);
    // Disable scrolling when the pop-up is displayed
    document.body.style.overflow = "hidden";
  };

  const handleClosePopup = () => {
    // Hide the pop-up component
    setShowPopup(false);
    // Enable scrolling when the pop-up is closed
    document.body.style.overflow = "auto";
  };

  return (
    <div>
      {cart.length > 0 ? (
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-center">
          <div className="w-[100%] md:w-[60%] flex flex-col p-2">
            {cart.map((item, index) => {
              return <CartItem key={item._id} item={item} itemIndex={index} />;
            })}
          </div>
          <div className="w-[100%] md:w-[40%] mt-5  flex flex-col">
            <div className="flex flex-col p-5 gap-5 my-14  h-[100%] justify-between">
              <div className="flex flex-col gap-5 ">
                <div className="font-semibold text-xl text-green-800 uppercase">
                  YOUR CART
                </div>
                <div className="font-semibold text-5xl text-green-700  -mt-5 uppercase">
                  Summary
                </div>
                <p className="text-xl">
                  <span className="text-gray-700 font-semibold text-xl">
                    Total Items: {cart.length}
                  </span>
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-xl font-bold">
                  <span className="text-gray-700 font-semibold">
                    Total Amount{" "}
                  </span>{" "}
                  : ${totalAmount.toFixed(2)}
                </p>
                <button
                  className="bg-green-600 hover:bg-gray-100 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-green-600 font-bold hover:text-green-700 p-3 text-xl
                "
                  onClick={handleCheckout}
                >
                  Checkout Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <h1 className="text-gray-700 font-semibold text-xl mb-2">
            Your cart is empty!
          </h1>
          <Link to="/buy">
            <button className="bg-green-600 hover:bg-gray-100 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-green-600 font-semibold hover:text-green-700 p-3 px-10 tracking-wider capitalize">
              SHOP NOW
            </button>
          </Link>
        </div>
      )}
      {/* Pop-up component */}
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-20">
          {" "}
          {/* Pop-up container */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-h-[100vh] overflow-y-auto relative">
            <CheckoutPaymentMethodOption cart={cart} />
            <MdClose
              className="absolute top-0 right-0 p-2 text-zinc-700 text-4xl cursor-pointer"
              onClick={handleClosePopup}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
