import React, { useState } from "react";

const initialFuels = [
  { name: "Gasohol 95", percentage: 80, capacity: 100, tank: 2000, stock: 1600 },
  { name: "Gasohol 91", percentage: 60, capacity: 100, tank: 2000, stock: 1200 },
  { name: "E85", percentage: 40, capacity: 100, tank: 2000, stock: 800 },
  { name: "E20", percentage: 20, capacity: 100, tank: 2000, stock: 400 },
];

const FuelStock = () => {
  const [fuels, setFuels] = useState(initialFuels);

  const addFuel = (index) => {
    setFuels((prevFuels) =>
      prevFuels.map((fuel, i) => {
        if (i === index) {
          const newPercentage = Math.min(fuel.percentage + 10, fuel.capacity);
          const newStock = (newPercentage / 100) * fuel.tank;
          return { ...fuel, percentage: newPercentage, stock: newStock };
        }
        return fuel;
      })
    );
  };

  return (
    <div className="flex flex-col justify-center items-center mx-auto pt-20 p-6">
      <div className="grid grid-cols-2 gap-4 p-4">
        {fuels.map((fuel, index) => (
          <div key={index} className="border-2 border-gray-700 p-4 rounded-lg relative w-40 h-48">
            <div className="absolute bottom-0 left-0 bg-yellow-500 w-full" style={{ height: `${fuel.percentage}%` }}></div>
            <div className="relative z-10 text-center font-bold text-black">
              {fuel.name}
              <br />
              {fuel.percentage}% / {fuel.capacity}%
              <br />
              Fuel Tank: {fuel.stock.toFixed(2)} L / {fuel.tank} L
            </div>
            <button
              className="relative z-10 mt-2 bg-blue-500 text-white px-4 py-1 rounded w-full"
              onClick={() => addFuel(index)}
            >
              เติมน้ำมัน
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FuelStock;
