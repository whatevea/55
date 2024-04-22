// import { useState, useEffect } from "react";
// import { FaClock, FaTag } from "react-icons/fa";

// const Budget = ({ setIsValid, updateJobData, jobData }) => {
//   const [budgetType, setBudgetType] = useState(
//     jobData?.budget?.type ||
//       (jobData?.category === "Product" ? "fixedPrice" : "hourlyPrice")
//   );

//   const [hourlyRate, setHourlyRate] = useState(
//     jobData?.budget && jobData?.budget?.hourlyRate
//       ? jobData.budget.hourlyRate
//       : 0
//   );

//   const [fixedPrice, setFixedPrice] = useState(
//     jobData?.budget && jobData?.budget?.fixedPrice
//       ? jobData?.budget?.fixedPrice
//       : 0
//   );

//   // Validation check function
//   useEffect(() => {
//     if (budgetType === "hourlyPrice") {
//       setIsValid(hourlyRate >= 5 && hourlyRate <= 100);
//     } else {
//       setIsValid(fixedPrice >= 5 && fixedPrice <= 10000);
//     }

//     updateJobData({
//       budget: {
//         type: budgetType,
//         hourlyRate: budgetType === "hourlyPrice" ? hourlyRate : null,
//         fixedPrice: budgetType === "fixedPrice" ? fixedPrice : null,
//       },
//     });
//   }, [budgetType, hourlyRate, fixedPrice]);

//   return (
//     <div className="text-center">
//       <div>
//         {jobData?.category === "Product" ? (
//           <h1 className="text-xl font-semibold text-center mb-3 text-green-600">
//             Please set a price for your Product
//           </h1>
//         ) : (
//           <h1 className="text-xl font-semibold text-center mb-3 text-green-600">
//             Please set a price for your Service
//           </h1>
//         )}
//       </div>
//       <div className="buttons flex gap-2 justify-center ">
//         {jobData?.category === "Product" ? (
//           <button
//             className={`rounded-md border-2 p-2 ${
//               budgetType === "fixedPrice"
//                 ? "border-green-500 font-semibold text-green-500"
//                 : "border-gray-500"
//             }`}
//             onClick={() => setBudgetType("fixedPrice")}
//           >
//             <FaTag className="inline mr-4 text-green-600" />
//             Fixed Price
//           </button>
//         ) : (
//           <>
//             <button
//               className={`rounded-md border-2 p-2 ${
//                 budgetType === "fixedPrice"
//                   ? "border-green-500 font-semibold text-green-500"
//                   : "border-gray-500"
//               }`}
//               onClick={() => setBudgetType("fixedPrice")}
//             >
//               <FaTag className="inline mr-4 text-green-600" />
//               Fixed Price
//             </button>
//             <button
//               className={`rounded-md border-2 p-2 ${
//                 budgetType === "hourlyPrice"
//                   ? "border-green-500 font-semibold text-green-500"
//                   : "border-gray-500"
//               }`}
//               onClick={() => setBudgetType("hourlyPrice")}
//             >
//               <FaClock className="inline mr-4 text-green-600" />
//               Hourly Price
//             </button>
//           </>
//         )}
//       </div>
//       <div className="h-52 text-center">
//         {budgetType === "hourlyPrice" ? (
//           <div className="mt-8">
//             <div>
//               <div>
//                 Hourly Price: $
//                 <input
//                   type="number"
//                   className="w-20 h-8 inline p-4 border-2 focus:border-green-500 outline-none ml-4 rounded-lg"
//                   value={hourlyRate}
//                   min={5}
//                   max={100}
//                   onChange={(e) => setHourlyRate(e.target.valueAsNumber)}
//                 />{" "}
//                 /hr
//                 <p className="text-green-600 text-base font-semibold mt-4">
//                   Hourly Price Cannot Be Lower than $5.
//                 </p>
//               </div>
//               {/* <div>
//                 <p>To</p>
//                 $
//                 <input
//                   type="number"
//                   className="w-20 h-8 inline p-4 border-2 focus:border-green-500 outline-none ml-4 rounded-lg"
//                   value={hourlyRateTo}
//                   min={5}
//                   max={100}
//                   onChange={(e) => setHourlyRateTo(e.target.valueAsNumber)}
//                 />{" "}
//                 /hr
//               </div> */}
//             </div>
//           </div>
//         ) : (
//           <div className="mt-8">
//             Total Price : $
//             <input
//               type="number"
//               className="w-20 h-8 inline p-4 border-2 focus:border-green-500 outline-none ml-4 rounded-lg"
//               value={fixedPrice}
//               min={5}
//               max={10000}
//               onChange={(e) => setFixedPrice(e.target.valueAsNumber)}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Budget;

import { useState, useEffect } from "react";
import { FaTag } from "react-icons/fa";

const Budget = ({ setIsValid, updateJobData, jobData }) => {
  const [budgetType, setBudgetType] = useState("fixedPrice");

  const [fixedPrice, setFixedPrice] = useState(
    jobData?.budget && jobData?.budget?.fixedPrice
      ? jobData?.budget?.fixedPrice
      : 0
  );

  // Validation check function
  useEffect(() => {
    setIsValid(fixedPrice >= 5 && fixedPrice <= 10000);

    updateJobData({
      budget: {
        type: budgetType,
        fixedPrice: fixedPrice,
      },
    });
  }, [fixedPrice]);

  return (
    <div className="text-center">
      <div>
        {jobData?.category === "Product" ? (
          <h1 className="text-xl font-semibold text-center mb-3 text-green-600">
            Please set a price for your Product
          </h1>
        ) : (
          <h1 className="text-xl font-semibold text-center mb-3 text-green-600">
            Please set a price for your Service
          </h1>
        )}
      </div>
      <div className="buttons flex gap-2 justify-center ">
        <button className="rounded-md border-2 p-2 border-green-500 font-semibold text-green-500">
          <FaTag className="inline mr-4 text-green-600" />
          Fixed Price
        </button>
      </div>
      <div className="h-52 text-center">
        <div className="mt-8">
          Total Price : $
          <input
            type="number"
            className="w-20 h-8 inline p-4 border-2 focus:border-green-500 outline-none ml-4 rounded-lg"
            value={fixedPrice}
            min={5}
            max={10000}
            onChange={(e) => setFixedPrice(e.target.valueAsNumber)}
          />
        </div>
      </div>
    </div>
  );
};

export default Budget;
