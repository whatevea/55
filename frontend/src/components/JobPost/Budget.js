import { useState, useEffect } from "react";
import { FaClock, FaTag } from "react-icons/fa";

const Budget = ({ setIsValid, updateJobData }) => {
    const [budgetType, setBudgetType] = useState("hourly");
    const [hourlyRateFrom, setHourlyRateFrom] = useState(0);
    const [hourlyRateTo, setHourlyRateTo] = useState(0);
    const [fixedPrice, setFixedPrice] = useState(0);

    // Validation check function
    useEffect(() => {
        if (budgetType === "hourly") {
            // Check if hourly rates are within the acceptable range and 'from' is less than 'to'
            setIsValid(hourlyRateFrom >= 5 && hourlyRateTo <= 100 && hourlyRateFrom < hourlyRateTo);
        } else {
            // Check if fixed price is within the acceptable range
            setIsValid(fixedPrice >= 5 && fixedPrice <= 10000);
        }

        updateJobData({
            budget: {
                type: budgetType,
                hourlyRateFrom: hourlyRateFrom,
                fixedPrice: fixedPrice,
                hourlyRateTo: hourlyRateTo
            },
        })

    }, [budgetType, hourlyRateFrom, hourlyRateTo, fixedPrice]);

    return (
        <div>
            <div className="buttons flex w-1/2 gap-2">
                <button className={`rounded-md border-2 p-2 ${budgetType === "hourly" ? 'border-green-500 font-bold' : 'border-gray-500'}`} onClick={() => setBudgetType("hourly")}>
                    <FaClock className="inline mr-4" />
                    Hourly rate
                </button>
                <button className={`rounded-md border-2 p-2 ${budgetType === "fixedPrice" ? 'border-green-500 font-bold' : 'border-gray-500'}`} onClick={() => setBudgetType("fixedPrice")}>
                    <FaTag className="inline mr-4" />
                    Fixed price
                </button>
            </div>
            {budgetType === "hourly" ? (
                <div className="flex mt-8 justify-between w-1/2">
                    <div>
                        <p>From</p>
                        $<input type="number" className="w-20 h-8 inline p-4 border ml-4 rounded-lg" value={hourlyRateFrom} min={5} max={100} onChange={(e) => setHourlyRateFrom(e.target.valueAsNumber)} /> /hr
                    </div>
                    <div>
                        <p>To</p>
                        $<input type="number" className="w-20 h-8 inline p-4 border ml-4 rounded-lg" value={hourlyRateTo} min={5} max={100} onChange={(e) => setHourlyRateTo(e.target.valueAsNumber)} /> /hr
                    </div>
                </div>
            ) : (
                <div className="mt-8">
                    Total Price : $<input type="number" className="w-20 h-8 inline p-4 border ml-4 rounded-lg" value={fixedPrice} min={5} max={10000} onChange={(e) => setFixedPrice(e.target.valueAsNumber)} />
                </div>
            )}
        </div>
    );
};

export default Budget;
