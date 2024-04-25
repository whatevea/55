import React from "react";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { BsBank2 } from "react-icons/bs";

const PaymentMethodOption = ({ jobPost }) => {
  console.log("jobPost is", jobPost);

  return (
    <div className="flex-col justify-center p-4 scroll">
      <div className="bg-white rounded-lg shadow-lg p-6 m-4 w-full max-w-md">
        <div className="font-bold text-lg mb-4 text-green-600">
          Total Amount payable
        </div>
        <div className="text-3xl font-bold mb-4 text-green-600">
          $ {jobPost?.budgetFixed}
        </div>
        <div className="flex items-center mb-4">
          <img
            src={jobPost.imagesUrls[0]}
            alt="Eco-friendly bundle"
            className="mr-4 w-14 h-14"
          />
          <div>
            <div className="font-semibold">{jobPost?.title}</div>
            <div className="text-sm text-zinc-600">{jobPost.description}</div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 m-4 w-full max-w-md">
        <div className="font-bold text-lg mb-4 text-green-600">
          Choose a payment method
        </div>
        <div className="flex flex-col mb-4 gap-2">
          <div className="flex ">
            <div className="p-2 mr-4 text-green-500">
              <span className="material-icons">
                <BsFillCreditCard2FrontFill />
              </span>
            </div>
            <div>
              <div className="font-semibold text-green-600">
                Cards (Credit/Debit)
              </div>
              <div className="text-sm text-zinc-600">
                Amex, Diners Club, Mastercard, Maestro, Visa
              </div>
            </div>
          </div>
          <div className="flex ">
            <div className="p-2 mr-4 text-green-600">
              <span className="material-icons">
                <BsBank2 />
              </span>
            </div>
            <div>
              <div className="font-semibold text-green-600">Net Banking</div>
              <div className="text-sm text-zinc-600">
                Axis Bank, ICICI, SBI & More
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodOption;
