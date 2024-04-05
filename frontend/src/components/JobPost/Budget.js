// import { useState, useEffect } from "react";
// import { FaClock, FaTag } from "react-icons/fa";

// const Budget = ({ setIsValid, updateJobData, jobData }) => {
//   console.log("jobData is", jobData);

//   const [budgetType, setBudgetType] = useState("hourly");
//   const [hourlyRateFrom, setHourlyRateFrom] = useState(0);
//   const [hourlyRateTo, setHourlyRateTo] = useState(0);
//   const [fixedPrice, setFixedPrice] = useState(0);

//   // Validation check function
//   useEffect(() => {
//     if (budgetType === "hourly") {
//       // Check if hourly rates are within the acceptable range and 'from' is less than 'to'
//       setIsValid(
//         hourlyRateFrom >= 5 &&
//           hourlyRateTo <= 100 &&
//           hourlyRateFrom < hourlyRateTo
//       );
//     } else {
//       // Check if fixed price is within the acceptable range
//       setIsValid(fixedPrice >= 5 && fixedPrice <= 10000);
//     }

//     updateJobData({
//       budget: {
//         type: budgetType,
//         hourlyRateFrom: hourlyRateFrom,
//         fixedPrice: fixedPrice,
//         hourlyRateTo: hourlyRateTo,
//       },
//     });
//   }, [budgetType, hourlyRateFrom, hourlyRateTo, fixedPrice]);

//   return (
//     <div className="">
//       <div className="buttons flex w-1/2 gap-2">
//         {jobData.selectedOption === "Product" ? (
//           <button
//             className={`rounded-md border-2 p-2 ${
//               budgetType === "fixedPrice"
//                 ? "border-green-500 font-semibold text-green-500"
//                 : "border-gray-500"
//             }`}
//             onClick={() => setBudgetType("fixedPrice")}
//           >
//             <FaTag className="inline mr-4 text-green-600" />
//             Fixed Rate
//           </button>
//         ) : (
//           <button
//             className={`rounded-md border-2 p-2 ${
//               budgetType === "hourly"
//                 ? "border-green-500 font-semibold text-green-500"
//                 : "border-gray-500"
//             }`}
//             onClick={() => setBudgetType("hourly")}
//           >
//             <FaClock className="inline mr-4 text-green-600" />
//             Hourly Rate
//           </button>
//         )}
//       </div>
//       <div className="h-52">
//         {budgetType === "hourly" ? (
//           <div className="flex mt-8 justify-between w-1/2">
//             <div>
//               <p>From</p>
//               $
//               <input
//                 type="number"
//                 className="w-20 h-8 inline p-4 border-2 focus:border-green-600 outline-none ml-4 rounded-lg"
//                 value={hourlyRateFrom}
//                 min={5}
//                 max={100}
//                 onChange={(e) => setHourlyRateFrom(e.target.valueAsNumber)}
//               />{" "}
//               /hr
//             </div>
//             <div>
//               <p>To</p>
//               $
//               <input
//                 type="number"
//                 className="w-20 h-8 inline p-4 border-2 focus:border-green-600 outline-none ml-4 rounded-lg"
//                 value={hourlyRateTo}
//                 min={5}
//                 max={100}
//                 onChange={(e) => setHourlyRateTo(e.target.valueAsNumber)}
//               />{" "}
//               /hr
//             </div>
//           </div>
//         ) : (
//           <div className="mt-8">
//             Total Price : $
//             <input
//               type="number"
//               className="w-20 h-8 inline p-4 border-2 focus:border-green-600 outline-none ml-4 rounded-lg"
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

// import { useState, useEffect } from "react";
// import { FaClock, FaTag } from "react-icons/fa";

// const Budget = ({ setIsValid, updateJobData, jobData }) => {
//   console.log("jobData is", jobData);

//   const [budgetType, setBudgetType] = useState(
//     jobData.selectedOption === "Product" ? "fixedPrice" : "hourly"
//   );
//   const [hourlyRateFrom, setHourlyRateFrom] = useState(0);
//   const [hourlyRateTo, setHourlyRateTo] = useState(0);
//   const [fixedPrice, setFixedPrice] = useState(0);

//   // Validation check function
//   useEffect(() => {
//     if (budgetType === "hourly") {
//       // Check if hourly rates are within the acceptable range and 'from' is less than 'to'
//       setIsValid(
//         hourlyRateFrom >= 5 &&
//           hourlyRateTo <= 100 &&
//           hourlyRateFrom < hourlyRateTo
//       );
//     } else {
//       // Check if fixed price is within the acceptable range
//       setIsValid(fixedPrice >= 5 && fixedPrice <= 10000);
//     }

//     updateJobData({
//       budget: {
//         type: budgetType,
//         hourlyRateFrom: hourlyRateFrom,
//         fixedPrice: fixedPrice,
//         hourlyRateTo: hourlyRateTo,
//       },
//     });
//   }, [budgetType, hourlyRateFrom, hourlyRateTo, fixedPrice]);

//   return (
//     <div className="border-2 border-red-500 text-center">
//       <div>
//         {jobData.selectedOption === "Product" ? (
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
//         {jobData.selectedOption === "Product" ? (
//           <button
//             className={`rounded-md border-2 p-2 ${
//               budgetType === "fixedPrice"
//                 ? "border-green-500 font-semibold text-green-500"
//                 : "border-gray-500"
//             }`}
//             onClick={() => setBudgetType("fixedPrice")}
//           >
//             <FaTag className="inline mr-4 text-green-600" />
//             Fixed Rate
//           </button>
//         ) : (
//           <button
//             className={`rounded-md border-2 p-2 ${
//               budgetType === "hourly"
//                 ? "border-green-500 font-semibold text-green-500"
//                 : "border-gray-500"
//             }`}
//             onClick={() => setBudgetType("hourly")}
//           >
//             <FaClock className="inline mr-4 text-green-600" />
//             Hourly Rate
//           </button>
//         )}
//       </div>
//       <div className="h-52 text-center">
//         {budgetType === "hourly" ? (
//           <div className="">
//             <div className="flex justify-center gap-4">
//               <div>
//                 <p>From</p>
//                 $
//                 <input
//                   type="number"
//                   className="w-20 h-8 inline p-4 border-2 focus:border-green-500 outline-none ml-4 rounded-lg"
//                   value={hourlyRateFrom}
//                   min={5}
//                   max={100}
//                   onChange={(e) => setHourlyRateFrom(e.target.valueAsNumber)}
//                 />{" "}
//                 /hr
//               </div>
//               <div>
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
//               </div>
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
import { FaClock, FaTag } from "react-icons/fa";

const Budget = ({ setIsValid, updateJobData, jobData }) => {
  const [budgetType, setBudgetType] = useState(
    jobData?.selectedOption === "Product" ? "fixedPrice" : "hourly"
  );
  const [hourlyRateFrom, setHourlyRateFrom] = useState(
    jobData?.budget && jobData?.budget?.hourlyRateFrom
      ? jobData.budget.hourlyRateFrom
      : 0
  );
  const [hourlyRateTo, setHourlyRateTo] = useState(
    jobData?.budget && jobData?.budget?.hourlyRateTo
      ? jobData.budget.hourlyRateTo
      : 0
  );
  const [fixedPrice, setFixedPrice] = useState(
    jobData?.budget && jobData?.budget?.fixedPrice
      ? jobData?.budget?.fixedPrice
      : 0
  );

  // Validation check function
  useEffect(() => {
    if (budgetType === "hourly") {
      setIsValid(
        hourlyRateFrom >= 5 &&
          hourlyRateTo <= 100 &&
          hourlyRateFrom < hourlyRateTo
      );
    } else {
      setIsValid(fixedPrice >= 5 && fixedPrice <= 10000);
    }

    updateJobData({
      budget: {
        type: budgetType,
        hourlyRateFrom: budgetType === "hourly" ? hourlyRateFrom : null,
        hourlyRateTo: budgetType === "hourly" ? hourlyRateTo : null,
        fixedPrice: budgetType === "fixedPrice" ? fixedPrice : null,
      },
    });
  }, [budgetType, hourlyRateFrom, hourlyRateTo, fixedPrice]);

  return (
    <div className="border-2 border-red-500 text-center">
      <div>
        {jobData?.selectedOption === "Product" ? (
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
        {jobData?.selectedOption === "Product" ? (
          <button
            className={`rounded-md border-2 p-2 ${
              budgetType === "fixedPrice"
                ? "border-green-500 font-semibold text-green-500"
                : "border-gray-500"
            }`}
            onClick={() => setBudgetType("fixedPrice")}
          >
            <FaTag className="inline mr-4 text-green-600" />
            Fixed Rate
          </button>
        ) : (
          <button
            className={`rounded-md border-2 p-2 ${
              budgetType === "hourly"
                ? "border-green-500 font-semibold text-green-500"
                : "border-gray-500"
            }`}
            onClick={() => setBudgetType("hourly")}
          >
            <FaClock className="inline mr-4 text-green-600" />
            Hourly Rate
          </button>
        )}
      </div>
      <div className="h-52 text-center">
        {budgetType === "hourly" ? (
          <div className="">
            <div className="flex justify-center gap-4">
              <div>
                <p>From</p>
                $
                <input
                  type="number"
                  className="w-20 h-8 inline p-4 border-2 focus:border-green-500 outline-none ml-4 rounded-lg"
                  value={hourlyRateFrom}
                  min={5}
                  max={100}
                  onChange={(e) => setHourlyRateFrom(e.target.valueAsNumber)}
                />{" "}
                /hr
              </div>
              <div>
                <p>To</p>
                $
                <input
                  type="number"
                  className="w-20 h-8 inline p-4 border-2 focus:border-green-500 outline-none ml-4 rounded-lg"
                  value={hourlyRateTo}
                  min={5}
                  max={100}
                  onChange={(e) => setHourlyRateTo(e.target.valueAsNumber)}
                />{" "}
                /hr
              </div>
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Budget;
